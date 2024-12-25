import React from "react";
import { Slide } from "react-awesome-reveal";
import { FaLightbulb, FaHandsHelping, FaRocket } from "react-icons/fa";

const AIFeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Empowering Creative Projects:",
      description:
        "Crowdcube enables individuals to bring their creative ideas to life. Whether it's a film, a tech gadget, or an innovative app, users can easily launch campaigns and invite supporters to contribute.",
      buttonText: "Start a Campaign",
      buttonLink: "/login",
      imageSrc:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      icon: <FaLightbulb className="h-8 w-8 text-teal-500" />,
    },
    {
      id: 2,
      title: "Supporting Personal Needs:",
      description:
        "Crowdcube provides a platform for users to share their personal stories, from medical expenses to education, and gather support from a compassionate community. Make a difference by helping others.",
      buttonText: "Learn More",
      buttonLink: "/login",
      imageSrc: "https://i.ibb.co.com/S7j0jGc/banner-img-1-1.jpg",
      icon: <FaHandsHelping className="h-8 w-8 text-teal-500" />,
    },
    {
      id: 3,
      title: "Fueling Startups:",
      description:
        "Entrepreneurs can raise funds for their startups, connect with investors, and turn their ideas into reality through Crowdcube’s easy-to-use platform. Join the startup revolution and be a part of something big.",
      buttonText: "Get Started",
      buttonLink: "/login",
      imageSrc:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      icon: <FaRocket className="h-8 w-8 text-teal-500" />,
    },
  ];

  return (
    <div className="py-16 space-y-24 sm:px-4">
      
      <Slide>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Discover What Crowdcube Can Do
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Crowdcube connects ideas, causes, and needs with people eager to make a difference. Explore our <br />
          features designed to empower individuals and communities alike.
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
