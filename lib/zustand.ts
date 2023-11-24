import { Field } from "@/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        fields: [],
        addField: (field: Field) =>
          set((state: { fields: Field[] }) => ({
            fields: [...state.fields, field],
          })),
        removeField: (field: Field) =>
          set((state: { fields: Field[] }) => ({
            fields: state.fields.filter((f) => f.id !== field.id),
          })),
        updateField: (field: Field) =>
          set((state: { fields: Field[] }) => ({
            fields: state.fields.map((f) => (f.id === field.id ? field : f)),
          })),
      }),
      {
        name: "leadown-field-store",
        getStorage: () => localStorage,
      }
    )
  )
);
