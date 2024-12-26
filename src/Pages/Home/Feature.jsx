import React from "react";
import { FaTasks, FaClipboardList, FaUsers, FaChartLine, FaRegComment, FaBell } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide } from "react-awesome-reveal";

const Feature = () => {
  const ServiceCard = ({ icon, title, details }) => {
    return (
      <>
        <div className="w-full  px-4 md:w-1/2 lg:w-1/3">
          <div className="mb-9 rounded-[20px] dark:bg-slate-500 dark:text-slate-300 bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
            <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-teal-500 dark:bg-teal-700">
              {icon}
            </div>
            <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              {title}
            </h4>
            <p className="text-body-color dark:text-dark-6">{details}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="pb-12 pt-20 dark:bg-dark-900 dark:text-slate-300 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-teal-500 dark:text-teal-400">
                Our Features
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Study-Sphere offers a collaborative platform where students can create, attempt, and grade assignments, helping them learn and grow together.
              </p>
            </div>
          </div>
        </div>

          <Slide direction="right"> <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Create Assignments"
            details="Easily create assignments with various difficulty levels and due dates. You can set specific instructions for each task."
            icon={<FaTasks size={36} className="text-white" />}
          />
          <ServiceCard
            title="Grade Assignments"
            details="Once assignments are submitted, you can grade them easily by entering marks and providing feedback for improvement."
            icon={<FaClipboardList size={36} className="text-white" />}
          />
          <ServiceCard
            title="Collaborative Learning"
            details="Study-Sphere allows students to collaborate on assignments, learn from each other, and provide valuable feedback."
            icon={<FaUsers size={36} className="text-white" />}
          />
          <ServiceCard
            title="Progress Tracking"
            details="Students can track their progress and see how much they have improved over time by viewing assignment grades and feedback."
            icon={<FaChartLine size={36} className="text-white" />}
          />
          <ServiceCard
            title="Peer Feedback"
            details="Allow peers to give feedback on assignments, enabling constructive criticism to help each other grow academically."
            icon={<FaRegComment size={36} className="text-white" />}
          />
          <ServiceCard
            title="Real-Time Notifications"
            details="Get notified in real-time when assignments are graded or when peers provide feedback."
            icon={<FaBell size={36} className="text-white" />}
          />
        </div></Slide>
       
      </div>
    </section>
  );
};

export default Feature;
