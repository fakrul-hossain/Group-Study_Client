import React, { useState } from "react";
import { FaQuestionCircle, FaRegLightbulb, FaUserAlt, FaFileAlt, FaClock } from "react-icons/fa";

const FAQ = () => {
  const AccordionItem = ({ header, text, icon }) => {
    const [active, setActive] = useState(false);

    const handleToggle = () => {
      setActive(!active);
    };

    return (
      <div className="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:bg-slate-700 dark:text-white dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] sm:p-8 lg:px-6 xl:px-8">
        <button
          className={`faq-btn flex w-full text-left`}
          onClick={handleToggle}
        >
          <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-teal-500 dark:bg-teal-700 text-white">
            {icon}
          </div>

          <div className="w-full">
            <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
              {header}
            </h4>
          </div>
        </button>

        <div
          className={`pl-[62px] duration-200 ease-in-out ${active ? "block" : "hidden"}`}
        >
          <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
            {text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className=" dark:bg-slate-700 dark:text-white relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-teal-500 dark:text-teal-400">
                FAQ
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                Any Questions? Look Here
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Here are some frequently asked questions that might help you better understand how Study-Sphere works.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="How do I create assignments?"
              text="To create assignments, simply log in to your account, go to the 'Create Assignments' page, and fill in the details for your assignment including title, description, difficulty, and due date."
              icon={<FaFileAlt size={24} />}
            />
            <AccordionItem
              header="How do I grade assignments?"
              text="Once assignments are submitted by your friends, you can access them under 'My Attempted Assignments'. You can grade them by entering marks and giving feedback."
              icon={<FaClock size={24} />}
            />
            <AccordionItem
              header="Can I update assignments?"
              text="Yes, you can update assignments you’ve created anytime. Just go to the 'My Campaigns' section and select 'Update'."
              icon={<FaRegLightbulb size={24} />}
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="What if I don't know how to create an assignment?"
              text="We provide helpful guides and tips within the platform to assist you in creating effective assignments. You can also get help from other users."
              icon={<FaQuestionCircle size={24} />}
            />
            <AccordionItem
              header="How do I view my feedback?"
              text="After grading your assignments, you’ll receive feedback directly on your dashboard. You can also see feedback from other users on their assignments."
              icon={<FaUserAlt size={24} />}
            />
            <AccordionItem
              header="How can I get help with using Study-Sphere?"
              text="If you face any issues, check out our FAQ section or contact support. We're here to help you with any problems you may encounter."
              icon={<FaQuestionCircle size={24} />}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default FAQ;
