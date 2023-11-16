import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const Home = () => {
  const sections = [
    {
      title: "Create Personal Courses",
      description:
        "Craft personalized learning experiences tailored to your unique interests and educational goals.",
    },
    {
      title: "Manage Your Learning Path",
      description:
        "Effortlessly navigate through your educational journey with detailed progress tracking and personal achievements.",
    },
    {
      title: "Individualized Learning",
      description:
        "Connect with like-minded learners, share insights, and participate in discussions catered to your specific learning path.",
    },
    {
      title: "Empower Your Knowledge",
      description:
        "Take command of your educational trajectory and empower your knowledge journey with LeadOwn.",
    },
  ];

  return (
    <>
      <div className="mb-8 text-center w-full md:w-1/2 mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">
          Welcome to <span className="text-blue-500">LeadOwn</span>
        </h1>

        <p className="text-base text-gray-600 dark:text-gray-300">
          Your ultimate platform for personalized education. Craft courses,
          manage your learning path, connect with learners, and empower your
          knowledge journey with LeadOwn.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-8 gap-4">
        {sections.map((section, index) => (
          <Card key={index} className="w-full md:w-96 text-center shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300">
              {section.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
