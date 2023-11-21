"use client";

import { useParams } from "next/navigation";

const Slug = () => {
  const params = useParams();

  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
};

export default Slug;
