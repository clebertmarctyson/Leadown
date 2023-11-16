import Image from "next/image";

/* eslint-disable react/no-unescaped-entities */
const AboutPage = () => {
  return (
    <div className="mx-auto my-8 flex flex-col md:flex-row gap-16 text-center md:text-left">
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-extrabold mb-6">
          About <span className="text-blue-500">LeadOwn</span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-loose">
          LeadOwn is a revolutionary platform dedicated to empowering
          individuals in their learning journeys. Our mission is to provide a
          space where users can create, customize, and navigate their own
          educational paths, tailoring courses to their unique interests and
          goals.
        </p>
        <p className="text-base mt-6 text-gray-600 dark:text-gray-300 leading-loose">
          Whether you're exploring new subjects, enhancing your skills, or
          diving deep into a passion, LeadOwn is designed to be your one-stop
          solution. Join our community, connect with like-minded learners, and
          take control of your educational success.
        </p>
      </div>

      <div className="w-full md:w-1/2">
        <Image
          width={800}
          height={400}
          src="https://via.placeholder.com/800x400" // Replace with your image source
          alt="LeadOwn Platform"
          className="rounded-lg shadow-md"
        />
        <p className="text-base mt-6 text-gray-600 dark:text-gray-300 leading-loose">
          Our interactive platform fosters a dynamic learning environment,
          enabling users to seamlessly create and explore courses tailored to
          their unique learning styles.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
