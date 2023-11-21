export type Field = {
  id: string;
  name: string;
  slug: string;
  creatorId: string;
  courses: {
    id: string;
    name: string;
    slug: string;
    fields: string[];
  }[];
};
