/* eslint-disable react/no-unescaped-entities */
"use client";

import { useParams } from "next/navigation";

import axios, { AxiosError } from "axios";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useSession } from "next-auth/react";

import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/components/ClientProvider";
import { LucideLoader } from "lucide-react";
import { Field } from "@/types";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Field name is required" }),
});

const EditFieldForm = () => {
  const { id } = useParams();

  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    reValidateMode: "onSubmit",
  });

  const { data, isLoading: isFieldLoading } = useQuery({
    queryKey: ["fields", id],
    queryFn: async () => {
      const { data: field } = await axios.get<Field>(`/api/fields/${id}`);
      return field;
    },
    onSuccess: (data) => {
      form.reset({
        name: data?.name,
      });
      queryClient.setQueryData(["fields", data?.id], data);
    },
    onError: (error: AxiosError | any) => {
      toast({
        title: "Error",
        description:
          error instanceof AxiosError ? error?.response?.data : error?.message,
        variant: "destructive",
      });
    },
    enabled: Boolean(session?.user.id),
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["fields", data?.id],
    mutationFn: async ({ name }: z.infer<typeof formSchema>) => {
      const response = await axios.patch(`/api/fields/${data?.id}`, {
        name,
        creatorId: session?.user.id,
      });
      return response.data;
    },
    onSuccess: (data: { field: Field; message: string }) => {
      queryClient.invalidateQueries(["fields", data?.field.id]);
      router.push(`/fields`);
      toast({
        title: "Success",
        description: data?.message,
        variant: "default",
      });
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
    <section className="w-full md:w-3/4 lg:w-2/3 p-4 md:p-8 mx-auto flex flex-col">
      <Form {...form}>
        <h1 className="text-3xl font-semibold mb-4">Edit Field</h1>

        <FormDescription className="mb-4">
          Edit the name of the field.
        </FormDescription>

        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the name of the field you'd like to create"
                    {...field}
                    disabled={
                      isLoading ||
                      isFieldLoading ||
                      !(session?.user.id === data?.creatorId)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={
              isLoading ||
              isFieldLoading ||
              !(session?.user.id === data?.creatorId)
            }
          >
            {isLoading ? (
              <LucideLoader className="w-5 h-5 animate-spin" />
            ) : (
              <span>Save Field</span>
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default EditFieldForm;
