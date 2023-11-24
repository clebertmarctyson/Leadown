/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { useParams } from "next/navigation";

import axios, { AxiosError } from "axios";

import { useToast } from "@/components/ui/use-toast";

import { useSession } from "next-auth/react";

import { useQuery } from "react-query";
import { queryClient } from "@/components/ClientProvider";
import { LucideLoader } from "lucide-react";
import { Field } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ViewField = () => {
  const { id } = useParams();

  const { toast } = useToast();
  const { data: session } = useSession();

  const { data: field, isLoading } = useQuery({
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

  return (
    <section className="w-full px-4 flex flex-col">
      {isLoading && (
        <div className="flex w-full text-center mx-auto">
          <LucideLoader className="w-10 h-10 animate-spin mx-auto" />
        </div>
      )}

      <nav className="mt-2 w-full md:w-1/4">
        <h1 className="text-2xl font-bold mb-6 text-center">{field?.name}</h1>

        <Link href={`/fields/${field?.id}/course`}>
          <Button variant="secondary" className="w-full" size="sm">
            Add New Course
          </Button>
        </Link>

        <p className="mt-4 text-lg text-gray-500">Courses</p>

        {field?.courses.length === 0 && (
          <p className="mt-4 text-sm italic text-gray-500">
            No courses available for this field
          </p>
        )}

        <ul>
          {field?.courses.map((course) => {
            return (
              <li key={course?.id}>
                <Accordion type="single" collapsible>
                  <AccordionItem value={course?.id}>
                    <AccordionTrigger>{course?.name}</AccordionTrigger>

                    {course?.chapters?.length === 0 && (
                      <AccordionContent>
                        <p className="mt-4 text-sm italic text-gray-500">
                          No chapters available for this course
                        </p>
                      </AccordionContent>
                    )}

                    <AccordionContent>
                      <ul>
                        {course?.chapters?.map((chapter, index) => (
                          <li key={chapter?.id}>
                            <Accordion type="single" collapsible>
                              <AccordionItem value={chapter?.id}>
                                <AccordionTrigger>
                                  {chapter?.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="mt-4 text-sm italic text-gray-500">
                                    No lessons available for this chapter
                                  </p>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default ViewField;
