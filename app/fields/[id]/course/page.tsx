/* eslint-disable react/no-unescaped-entities */
"use client";

import axios, { AxiosError } from "axios";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useParams, useRouter } from "next/navigation";

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
import { Field, Course } from "@/types";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Field name is required" }),
});

const NewCourseForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data: field, isLoading: isFieldLoading } = useQuery({
    queryKey: ["fields", id],
    queryFn: async () => {
      const { data: field } = await axios.get<Field>(`/api/fields/${id}`);
      return field;
    },
    onSuccess: (data) => {
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
    mutationKey: ["courses"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await axios.post("/api/courses", {
        name: data.name,
        fieldId: field?.id,
        creatorId: session?.user.id,
      });
      return response.data;
    },
    onSuccess: (data: { course: Course; message: string }) => {
      queryClient.invalidateQueries(["courses", data?.course?.id]);
      toast({
        title: "Success",
        description: data?.message,
        variant: "default",
      });
      router.push(`/fields/${data?.course?.fieldId}`);
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
        <h1 className="text-3xl font-semibold mb-4">Add New Course</h1>

        <FormDescription className="mb-4">
          Add a new course to the {field?.name} field
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
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the name of the course to be added"
                    {...field}
                    disabled={isLoading || isFieldLoading || !session?.user.id}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isFieldLoading || !session?.user.id}
          >
            {isLoading || isFieldLoading || !session?.user.id ? (
              <LucideLoader className="w-5 h-5 animate-spin" />
            ) : (
              <span>Create Field</span>
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default NewCourseForm;
