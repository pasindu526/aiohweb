import { GoArrowUpRight } from "react-icons/go";
import sc1 from "../../assets/marketing/sc1.png";
import sc2 from "../../assets/marketing/sc2.png";
import sc3 from "../../assets/marketing/sc3.png";
import sc4 from "../../assets/marketing/sc4.png";
import sc5 from "../../assets/marketing/sc5.png";
import sc6 from "../../assets/marketing/sc6.png";
import { motion } from "framer-motion";

const services = [
  {
    title: "Brand Strategy",
    description:
      "We manage your social media to grow your audience, boost engagement, and strengthen your brand presence online.",
    img: sc1,
  },
  {
    title: "Social Media Management",
    description:
      "We manage your social media to grow your audience, boost engagement, and strengthen your brand presence online.",
    img: sc2,
  },
  {
    title: "SEO Audit and Setup",
    description:
      "We manage your social media to grow your audience, boost engagement, and strengthen your brand presence online.",
    img: sc3,
  },
  {
    title: "Digital Marketing Consulting",
    description:
      "We manage your social media to grow your audience, boost engagement, and strengthen your brand presence online.",
    img: sc4,
  },
  {
    title: "Social Media Advertising",
    description:
      "We manage your social media to grow your audience, boost engagement, and strengthen your brand presence online.",
    img: sc5,
  },
  {
    title: "Brand Strategy Sample",
    description:
      "We manage your social media to grow your audience, boost engagement, and strengthen your brand presence online.",
    img: sc6,
  },
];

const Service: React.FC = () => {
  return (
    <div className="w-5/6 mx-auto py-4">
      {/* sec heading */}
      <div className="flex flex-col items-center">
        <h1 className="text-[26px] md:text-3xl lg:text-5xl lg:leading-[62px] font-bold text-center">
          Expertise That Powers Growth
        </h1>
        <p className="md:w-5/6 lg:w-2/3 mt-4 text-sm lg:text-lg leading-6 md:leading-7 lg:leading-8 font-light text-center">
          We deliver data-driven marketing services tailored to your brand —
          combining strategy, creativity, and technology to accelerate your
          digital growth.
        </p>
      </div>

      {/* servise card sec */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-5/6 mx-auto py-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative rounded-[20px] overflow-hidden group shadow-lg"
          >
            {/* Bg image */}
            <img
              src={service.img}
              alt={service.title}
              className="object-cover w-full h-40 md:h-auto duration-500 group-hover:scale-105 transition "
            />

            {/* Floating Label with Line */}
            <div className="absolute top-4 left-4 right-4 items-center z-50 mx-auto">
              <span className="absolute -top-3.5 md:-top-2.5 lg:-top-3  left-4 mr-4 rounded-xl bg-white/0 backdrop-blur-lg px-1 text-slate-400 text-sm md:text-md lg:text-lg font-medium text-white">
                {service.title}
              </span>
            </div>
            <div className="absolute inset-0 rounded-xl border-3 border-white z-40 pointer-events-none m-3 md:m-4 lg:m-4.5"></div>

            <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 bg-primary text-secondary w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full z-10 group-hover:scale-110 transition cursor-pointer">
              <GoArrowUpRight className="text-base md:text-lg" />
            </div>

            {/* hover effect */}
            <div className="hidden group-hover:block">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="absolute min-h-[50%] py-2 bottom-0 left-0 w-full bg-[#01213A]/20 backdrop-blur-md flex-col items-center justify-between z-30 px-8"
              >
                <p className="text-justify leading-[22px] text-sm text-white">
                  {service.description}
                </p>
                <button className="w-full lg:w-fit lg:my-4 px-4 py-2 bg-primary hover:bg-primary/80 text-xs rounded-full cursor-pointer font-medium">
                  Explore Service
                </button>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
