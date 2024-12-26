import React from "react";
import { Slide } from "react-awesome-reveal";
import { FaLightbulb, FaHandsHelping, FaRocket } from "react-icons/fa";

const AIFeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Create & Collaborate on Assignments:",
      description:
        "In Study-Sphere, users can create their own assignments and collaborate with friends. It’s a place where learning becomes a group activity, and everyone works together to complete tasks and solve problems.",
      buttonText: "Start a Study Group",
      buttonLink: "/login",
      imageSrc:
        "https://i.ibb.co.com/2KhYRKt/banner-3.jpg", // Replace with your image URL
      icon: <FaLightbulb className="h-8 w-8 text-teal-500" />,
    },
    {
      id: 2,
      title: "Complete Assignments with Friends:",
      description:
        "Study-Sphere allows you to work on assignments with your friends. Complete challenges together, share your solutions, and learn as a team, making the study process fun and engaging.",
      buttonText: "Learn More",
      buttonLink: "/login",
      imageSrc:
        "https://i.ibb.co.com/N1jpGCW/banner-1.jpg", // Replace with your image URL
      icon: <FaHandsHelping className="h-8 w-8 text-teal-500" />,
    },
    {
      id: 3,
      title: "Grade & Provide Feedback:",
      description:
        "Study-Sphere lets you grade your friends' assignments and give feedback, ensuring everyone gets the opportunity to learn and improve. This feature helps foster a collaborative learning environment.",
      buttonText: "Get Started",
      buttonLink: "/login",
      imageSrc:
        "https://i.ibb.co.com/DrpGMBj/banner-2.jpg", // Replace with your image URL
      icon: <FaRocket className="h-8 w-8 text-teal-500" />,
    },
  ];

  return (
    <div className="py-16 space-y-24 sm:px-4">
      <Slide>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Empowering Group Study Through Assignments
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Study-Sphere is designed to make group study easier and more engaging. Explore features that allow users to create, complete, and grade assignments together, all within a friendly and collaborative environment.
          </p>
        </div>
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8 ${
              index % 2 !== 0 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            <div
              className={`mx-auto max-w-xl px-6 sm:px-4 lg:max-w-none lg:py-16 lg:px-0 ${
                index % 2 !== 0 ? "lg:col-start-2" : ""
              }`}
            >
              <div>
                <div className="flex h-12 w-12 bg-teal-100 dark:bg-teal-800 items-center justify-center rounded-xl">
                  {feature.icon}
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                  <div className="mt-6">
                    <a
                      href={feature.buttonLink}
                      className="inline-flex rounded-lg bg-teal-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-teal-600 hover:bg-teal-700 hover:ring-teal-700 focus:outline-none dark:bg-teal-700 dark:ring-teal-500 dark:hover:bg-teal-600"
                    >
                      {feature.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div
                className={`overflow-hidden rounded-lg ${
                  index % 2 !== 0 ? "md:pl-4" : "md:pr-4"
                } px-4 lg:px-0`}
              >
                <img
                  alt={feature.title}
                  src={feature.imageSrc}
                  className="w-full max-w-full h-auto rounded-xl shadow-xl object-cover ring-1 ring-black ring-opacity-5 dark:ring-gray-700"
                />
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default AIFeaturesSection;
