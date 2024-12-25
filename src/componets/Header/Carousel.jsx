import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImg1 from "../../assets/banner (2).jpg";
import bannerImg2 from "../../assets/banner (1).jpg";
import bannerImg3 from "../../assets/banner (3).jpg";
import bannerImg4 from "../../assets/banner (4).jpg";
import bannerImg5 from "../../assets/banner (5).jpg";
import { Typewriter } from 'react-simple-typewriter';
import { Bounce, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";

export default function SimpleSlider() {
  var settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: true,
    infinite: true,
    fade: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      src: bannerImg1,
      title: "Empower Creative Ideas.",
      description: "Help innovators bring their dreams to life with your support.",
      buttons: ["View Campaigns", "Learn More"],
    },
    {
      src: bannerImg2,
      title: "Support Startups for a Better Future.",
      description: "Help entrepreneurs turn their vision into reality.",
      buttons: ["Explore Startups", "Get Involved"],
    },
    {
      src: bannerImg3,
      title: "Join Hands to Tackle Emergencies.",
      description: "Your donation can save lives in critical situations.",
      buttons: ["Donate Now", "Learn More"],
    },
    {
      src: bannerImg4,
      title: "Fund Medical Emergencies.",
      description: "Make a difference by funding essential medical care.",
      buttons: ["Start Donating", "See Campaigns"],
    },
    {
      src: bannerImg5,
      title: "Support Rural Communities.",
      description: "Help uplift underprivileged areas with your contribution.",
      buttons: ["View Programs", "Make a Donation"],
    },
  ];

  return (
    <div
      className="w-[93%] container mx-auto mt-4"
      data-aos="flip-left"
      data-aos-duration="2000"
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-[600px] w-full rounded-xl overflow-hidden relative"
          >
            <img
              className="h-[600px] object-cover w-full rounded-xl"
              src={slide.src}
              alt={slide.title}
            />
            <div className="absolute top-0 h-full flex flex-col justify-center items-center bg-teal-900 w-full bg-opacity-60 rounded-xl dark:bg-gray-900 dark:bg-opacity-70">
              <h3 className="text-4xl font-semibold text-center text-white dark:text-teal-300">
                {/* Typewriter effect on the title */}
                <Typewriter 
                  words={[slide.title]} 
                  loop={0}
                  cursor 
                  cursorStyle="_" 
                  typeSpeed={50} 
                  deleteSpeed={30} 
                  delaySpeed={1000}
                />
              </h3>
              <p className="mt-4 text-lg text-center text-white dark:text-teal-200">
                {slide.description}
              </p>
              <Bounce>
                 
                
                <Link  to={'/campaigns'}>
                <div className="flex gap-7 mt-12">
                {slide.buttons.map((button, idx) => (
                  <button
                    key={idx}
                    className={`${
                      idx === 0
                        ? "bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                        : "bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                    } inline-flex items-center justify-center rounded-lg py-4 px-6 text-center text-base font-medium text-white sm:px-10 lg:px-8 xl:px-10`}
                  >
                    {button}
                  </button>
                ))}
</div>
                </Link>
              
              </Bounce>
             
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
