"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const Slug = () => {
  const params = useParams();

  return (
    <div>
      <h1>{params.slug}</h1>

      <p>
        <Link href="/fields">Back</Link>
      </p>
    </div>
  );
};

export default Slug;
