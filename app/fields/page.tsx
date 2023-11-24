"use client";

import axios from "axios";
import Link from "next/link";

import { useState } from "react";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/components/ClientProvider";
import { LucideLoader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { Field } from "@/types";

import FieldItem from "./FieldItem";

const Fields = () => {
  const { toast } = useToast();

  const [searchField, setSearchField] = useState("");

  const { data: fields, isLoading } = useQuery<Field[]>({
    queryKey: ["fields"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data: fields } = await axios.get<Field[]>(`/api/fields`);
      return fields;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["fields"], data);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="text-center">
        <LucideLoader className="w-10 h-10 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Fields</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <Link href="/fields/new">
          <Button className="w-full">Create New Field</Button>
        </Link>

        <input
          className="w-full md:w-96 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
      </div>

      {fields?.length === 0 && (
        <p className="text-gray-600 mb-6">No fields available.</p>
      )}

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields
          ?.filter((field) => field.name.includes(searchField))
          .map((field) => (
            <FieldItem key={field?.id} field={field} />
          ))}
      </ul>
    </div>
  );
};

export default Fields;
