/* eslint-disable react/no-unescaped-entities */
"use client";

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

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Field name is required" }),
});

const NewFieldForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/fields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        creatorId: session?.user.id,
      }),
    });

    if (!response.ok) {
      return;
    } else {
      router.push(`/fields`);
    }
  };

  return (
    <section className="w-full md:w-1/2 mx-auto p-8 flex flex-col">
      <Form {...form}>
        <h1 className="text-3xl font-semibold mb-4">Create Field</h1>

        <FormDescription className="mb-4">
          Create a new field in your learning journey. This will allow you to
          customize your courses to fit your needs.
        </FormDescription>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create Field
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default NewFieldForm;
