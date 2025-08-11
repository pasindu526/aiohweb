import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Image1 from "../../assets/about/locimage1.png";
import Image2 from "../../assets/about/locimage2.png";
import Image3 from "../../assets/about/locimage3.png";
import Image4 from "../../assets/about/ausimage1.jpeg";
import Image5 from "../../assets/about/ausimage2.jpeg";
import Image6 from "../../assets/about/ausimage3.jpeg";
import Image7 from "../../assets/about/loccol1.jpeg";
import Image8 from "../../assets/about/loccol2.jpeg";

// Types
type SubLocation = {
  label: string;
  address: string;
  phone?: string;
};

type LocationCard = {
  title: string;
  description: string;
  address?: string;
  phone?: string;
  subLocations?: SubLocation[];
  images: string[];
  layout: "full" | "split";
};

type ImageSliderProps = {
  images: string[];
  startDelay?: number;
};

// Location content
const locationCards: LocationCard[] = [
  {
    title: "Australia",
    description:
      "Our state-of-the-art workspace in Australia offers modern amenities and flexible environments designed to foster creativity and business success.",
    address: "1 Redwood Dr Notting Hill VIC 3168 Australia",
    phone: "0434276273",
    images: [Image4, Image5, Image6],
    layout: "full",
  },
  {
    title: "Sri Lanka",
    description:
      "Our Sri Lankan hub is a blend of culture and tech innovation, fueling regional growth and talent development.",
    subLocations: [
      {
        label: "Kandy",
        address:
          "3rd Floor, All in One Holdings Headquarters, 349/2/1 Katugastota Rd, Kandy 20800",
        phone: "0812121051",
      },
      {
        label: "Colombo",
        address: "22 Sea Avenue, Colombo 00300",
        phone: "0812121051",
      },
    ],
    // 🔄 You can replace these with real Kandy/Colombo sets
    images: [Image7, Image8, Image2, Image1, Image3], // General set for desktop
    layout: "split",
  },
  {
    title: "USA",
    description:
      "Our U.S. office is strategically located to serve clients nationwide with tailored solutions and tech leadership.",
    address: "456 Enterprise Lane, San Francisco, CA 94107",
    phone: "+1 415 123 4567",
    images: [Image1, Image3, Image2],
    layout: "full",
  },
];

// ✅ New image arrays per sub-location
const kandyImages = [Image2, Image3, Image1];
const colomboImages = [Image7, Image8];

// ✅ ImageSlider
const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  startDelay = 0,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [images.length, startDelay]);

  const currentImage = images[index];
  const nextImage = images[(index + 1) % images.length];

  return (
    <div className="relative w-full h-full min-h-full overflow-hidden rounded-xl">
      <motion.div
        key={index}
        className="flex w-[200%] h-full"
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <img
          src={currentImage}
          alt="Current"
          className="w-1/2 h-full object-cover"
        />
        <img src={nextImage} alt="Next" className="w-1/2 h-full object-cover" />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
    </div>
  );
};

// ✅ Main Locations Component
const Locations: React.FC = () => {
  return (
    <div className="w-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-[28px] md:text-[48px] lg:text-[52px] font-bold text-black">
          Expanding Excellence, Locally & Beyond
        </h2>
        <p className="text-[18px] font-light text-black mt-2">
          From local roots to international reach, our branches reflect our
          commitment to serving clients wherever they are.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col lg:flex-row justify-between items-stretch gap-8 "
      >
        {/* Australia Card */}
        <div className="w-full lg:w-[50%] h-[560px] relative shadow-md rounded-[20px] overflow-hidden">
          <ImageSlider images={locationCards[0].images} startDelay={0} />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-20 text-center">
            <h3 className="text-[36px] font-bold mb-4">
              {locationCards[0].title}
            </h3>
            <p className="mt-2 md:text-[16px] text-[14px] leading-relaxed mb-2">
              {locationCards[0].description}
            </p>
            <p>{locationCards[0].address}</p>
            <p className="font-bold">{locationCards[0].phone}</p>
          </div>
        </div>

        {/* Sri Lanka - Mobile & Tablet ONLY */}
        <div className="flex flex-col gap-6 lg:hidden w-full">
          {/* Kandy Card */}
          <div className="h-[264px] relative shadow-md rounded-[20px] overflow-hidden mb-2">
            <ImageSlider images={kandyImages} startDelay={500} />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white z-20 text-center">
              <h3 className="text-[28px] font-bold mb-1">
                {locationCards[1].title}
              </h3>
              <p className="text-[14px] font-medium mb-2">
                {locationCards[1].subLocations?.[0]?.label}{" "}
                {locationCards[1].subLocations?.[0]?.address
                  ?.toLowerCase()
                  .includes("headquarters") && (
                  <span className="text-[#02EC97]">(Headquarters)</span>
                )}
              </p>

              <p className="text-[12px]">
                {locationCards[1].subLocations?.[0]?.address}
              </p>
              <p className="text-[12px] font-bold mt-1">
                {locationCards[1].subLocations?.[0]?.phone}
              </p>
            </div>
          </div>

          {/* Colombo Card */}
          <div className="h-[264px] relative shadow-md rounded-[20px] overflow-hidden">
            <ImageSlider images={colomboImages} startDelay={1500} />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white z-20 text-center">
              <h3 className="text-[28px] font-bold mb-1">
                {locationCards[1].title}
              </h3>
              <p className="text-[14px] font-medium mb-2">
                {locationCards[1].subLocations?.[1]?.label}
              </p>
              <p className="text-[12px]">
                {locationCards[1].subLocations?.[1]?.address}
              </p>
              <p className="text-[12px] font-bold mt-1">
                {locationCards[1].subLocations?.[1]?.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Sri Lanka Desktop + USA */}
        <div className="w-full lg:w-[48%] flex flex-col gap-8">
          {/* Sri Lanka - Desktop Only */}
          <div className="hidden lg:block h-[264px] relative shadow-md rounded-[20px] overflow-hidden">
            <ImageSlider images={locationCards[1].images} startDelay={1800} />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white z-20 text-center">
              <h3 className="text-[36px] font-bold mb-0">
                {locationCards[1].title}
              </h3>
              <div className="flex justify-between mt-2 text-[12px] md:px-6 px-2 items-start gap-2">
                <div className="w-1/2 text-left">
                  <p className="font-semibold text-[14px] mb-2">
                    {locationCards[1].subLocations?.[0]?.label}{" "}
                    {locationCards[1].subLocations?.[0]?.address?.includes(
                      "Headquarters"
                    ) && <span className="text-[#02EC97]">(Headquarters)</span>}
                  </p>

                  <p>{locationCards[1].subLocations?.[0]?.address}</p>
                  <p className="font-bold">
                    {locationCards[1].subLocations?.[0]?.phone}
                  </p>
                </div>
                <div className="w-1/2 text-right">
                  <p className="font-semibold text-[14px] mb-2">
                    {locationCards[1].subLocations?.[1]?.label}
                  </p>
                  <p>{locationCards[1].subLocations?.[1]?.address}</p>
                  <p className="font-bold">
                    {locationCards[1].subLocations?.[1]?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* USA Card */}
          <div className="h-[264px] relative shadow-md rounded-[20px] overflow-hidden">
            <ImageSlider images={locationCards[2].images} startDelay={3800} />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white z-20 text-center">
              <h3 className="text-[36px] font-bold mb-2">
                {locationCards[2].title}
              </h3>
              <p className="mt-2 text-[12px]">{locationCards[2].address}</p>
              <p className="text-[12px] font-bold">{locationCards[2].phone}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Locations;
