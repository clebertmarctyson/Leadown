import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 hadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          Welcome to <span className="text-blue-500">LeadOwn</span>
        </h1>
        <p className=" mb-6">
          Empower your learning journey with LeadOwn. Customize your path,
          explore exciting courses, and achieve your educational goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Explore Courses
            </h2>
            <p className="">
              Choose from a diverse range of courses tailored to your interests
              and goals.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Track Your Progress
            </h2>
            <p className="">
              Monitor your learning journey with detailed progress tracking and
              achievements.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Engage with Community
            </h2>
            <p className="">
              Connect with fellow learners, share insights, and participate in
              discussions.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Achieve Success
            </h2>
            <p className="">
              Take control of your educational path and achieve success with
              LeadOwn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
