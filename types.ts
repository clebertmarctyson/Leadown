declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    };
  }
}

import type {
  Field as TField,
  Course as TCourse,
  Chapter as TChapter,
  User as TUser,
} from "@prisma/client";

export type User = TUser & {
  id: string;
  fields: TField[];
};

export type Course = TCourse & {
  fields: TField[];
  chapters: TChapter[];
};

export type Field = TField & {
  courses: Course[];
  creator: User;
};
