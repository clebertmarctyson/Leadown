import { Field as TField, Course, User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      image: string;
      email: string;
    };
  }
}

export type Field = TField & {
  courses: Course[];
  creator: User | null;
};
