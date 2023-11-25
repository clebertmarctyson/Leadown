/* eslint-disable react/jsx-no-undef */
"use client";

import { Button } from "@/components/ui/button";
import { EditIcon, LucideLoader, TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { queryClient } from "@/components/ClientProvider";

import { useMutation } from "react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field } from "@/types";

const FieldItem = ({ field }: { field: Field }) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const removeField = async (id: string) => {
    const response = await fetch(`/api/fields/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        creatorId: session?.user.id,
      }),
      cache: "no-cache",
    });

    return await response.json();
  };

  const { mutate, isLoading: isRemoving } = useMutation({
    mutationKey: ["fields"],
    mutationFn: removeField,
    onSuccess: (data: { field: Field; message: string }) => {
      toast({
        title: "Success",
        description: data?.message,
        variant: "default",
      });
      queryClient.invalidateQueries(["fields"]);
    },
    onError: (error: AxiosError | any) => {
      toast({
        title: "Error",
        description:
          error instanceof AxiosError ? error?.response?.data : error?.message,
        variant: "destructive",
      });
    },
  });

  return (
    <li className="flex flex-col p-4 border rounded-md border-blue-500 transition duration-300 shadow-lg">
      <div className="flex items-center justify-start gap-2 mb-4">
        <Avatar>
          <AvatarImage src={field?.creator?.image!} />
          <AvatarFallback>{field?.creator?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold">
            {field.creatorId === session?.user.id ? (
              <span>You</span>
            ) : (
              <span>{field?.creator?.name}</span>
            )}
          </p>
          <p>
            <span className="text-gray-500 text-xs italic">
              {field?.creator?.email}
            </span>
          </p>
        </div>
      </div>

      <h1 className="text-lg font-semibold mb-2">{field.name}</h1>

      <p className="text-sm mb-2 italic">
        {field?.courses?.length === 0 ? (
          <span className="text-gray-600">
            No courses available for this field
          </span>
        ) : (
          <span>
            {field?.courses?.length === 1
              ? "1 course available for this field"
              : `${field?.courses?.length} courses available for this field`}
          </span>
        )}
      </p>

      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <Link href={`/fields/${field?.id}`}>
            <Button>View Details</Button>
          </Link>

          {field?.creatorId === session?.user.id && (
            <div className="flex items-center gap-2">
              <Link href={`/fields/${field?.id}/edit`}>
                <EditIcon className="w-5 h-5" />
              </Link>

              {isRemoving ? (
                <Button disabled>
                  <LucideLoader className="w-5 h-5 animate-spin" />
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <TrashIcon className="w-5 h-5" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this field?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. All data associated with
                        this field will be deleted. Make sure to backup your
                        data before proceeding.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => mutate(field?.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default FieldItem;
