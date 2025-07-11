import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { PiGoogleLogo } from "react-icons/pi";


import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

const ContactSection: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  // Styles for the text fields
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      fontSize: "16px",
      fontWeight: 400,
      pl: 2,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#19181899", // 60% opacity border
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#191818",
    },
    "& .MuiInputLabel-root": {
      fontSize: "16px",
      fontWeight: 300,
      color: "#19181899",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#191818",
      fontWeight: 400,
    },
  };

  // errors state
  const [errors, setErrors] = useState({
    from_name: false,
    from_phone: false,
    from_email: false,
    main_service: false,
    sub_service: false,
    message: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // show error only if empty
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const isValidPhone = (phone: string) => /^(\+94|0)?7|8\d{8}$/.test(phone);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const name = formData.get("from_name")?.toString().trim();
    const phone = formData.get("from_phone")?.toString().trim();
    const email = formData.get("from_email")?.toString().trim();
    const service = formData.get("main_service")?.toString().trim();
    const subService = formData.get("sub_service")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    const newErrors = {
      from_name: !name,
      from_phone: !phone || !isValidPhone(phone),
      from_email: !email || !isValidEmail(email),
      main_service: !service,
      sub_service: !subService,
      message: !message,
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setErrors({
      from_name: false,
      from_phone: false,
      from_email: false,
      message: false,
      main_service: false,
      sub_service: false,
    });

    // Start sending
    setIsSending(true);

    emailjs
      .sendForm("service_yxj2rit", "template_d3x0uv7", form.current, {
        publicKey: "vC8wukAc-UNdnr0Cu",
      })
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We’ll get back to you soon.",
            confirmButtonColor: "#02ec97",
          });
          form.current?.reset();
          setSelectedSubService("");
          setErrors({
            from_name: false,
            from_phone: false,
            from_email: false,
            message: false,
            main_service: false,
            sub_service: false,
          });
          setIsSending(false);
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again.",
            confirmButtonColor: "#02ec97",
          });
          setIsSending(false);
        }
      );
  };

  // Get current path using useLocation hook
  const location = useLocation();

  // Extract last part of URL like "marketing", "design", etc.
  const currentPath = location.pathname.split("/").filter(Boolean).pop() || "";

  // Main services dropdown options
  const services = [
    { label: "Marketing", value: "Marketing" },
    { label: "Technology", value: "Technology" },
    { label: "Design", value: "Design" },
  ];

  // sub services for each main service
  const subService: Record<string, { label: string; value: string }[]> = {
    Marketing: [
      { label: "Brand Strategy", value: "Brand Strategy" },
      { label: "Social Media Management", value: "Social Media Management" },
      { label: "SEO Audit and Setup", value: "SEO Audit and Setup" },
      {
        label: "Digital Marketing Consulting",
        value: "Digital Marketing Consulting",
      },
      { label: "Social Media Advertising", value: "Social Media Advertising" },
      { label: "Brand Strategy Sample", value: "Brand Strategy Sample" },
    ],
    Technology: [
      { label: "Web site development", value: "Web site development" },
      { label: "Web system development", value: "Web system development" },
      { label: "Standalone system", value: "Standalone system" },
      { label: "Cloud solution", value: "Cloud solution" },
      { label: "AI solutions", value: "AI solutions" },
      { label: "UI/UX solutions", value: "UI/UX solutions" },
    ],
    Design: [
      { label: "Video and advertising", value: "Video and advertising" },
      {
        label: "Brand identity development",
        value: "Brand identity development",
      },
      { label: "Package design", value: "Package design" },
      { label: "Creative content", value: "Creative content" },
    ],
  };

  // Default selected service based on current path
  const defaultService =
    services.find((s) => s.value === currentPath)?.value || "";

  // State to manage selected main service
  const [selectedMainService, setSelectedMainService] =
    useState(defaultService);

  const [selectedSubService, setSelectedSubService] = useState("");

  // State to manage sending state for the button
  const [isSending, setIsSending] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row items-start lg:gap-16 mx-auto gap-16 w-11/12 py-10">
      {/* Left sec */}
      <div className="w-full lg:w-1/2 space-y-10 lg:space-y-6 lg:pt-4">
        <div className="lg:hidden block text-center justify-center">
          <h1 className="text-[26px] md:text-3xl lg:text-5xl lg:leading-[62px] font-bold">
            Partner with us to build what’s{" "}
            <span className="text-primary">next</span>
          </h1>
          <p className="lg:w-1/2 mt-4 text-sm lg:text-lg leading-6 md:leading-6 lg:leading-7 font-light text-center">
            Have an idea? Let’s bring it to life. Whether it's a bold vision or
            a simple spark, we're here to help turn your ideas into reality.
          </p>
        </div>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
          {/* Name */}
          <Box sx={{ width: "100%" }}>
            <TextField
              name="from_name"
              label="Your name"
              fullWidth
              error={errors.from_name}
              helperText={errors.from_name ? "Name is required." : ""}
              onChange={handleInputChange}
              sx={textFieldStyles}
            />
          </Box>

          {/* Phone */}
          <Box sx={{ width: "100%" }}>
            <TextField
              name="from_phone"
              label="Contact number"
              fullWidth
              error={errors.from_phone}
              helperText={
                errors.from_phone ? "Please enter a valid contact number." : ""
              }
              onChange={handleInputChange}
              sx={textFieldStyles}
            />
          </Box>

          {/* Email */}
          <Box sx={{ width: "100%" }}>
            <TextField
              name="from_email"
              label="E-mail"
              fullWidth
              error={errors.from_email}
              helperText={
                errors.from_email ? "Please enter a valid email address." : ""
              }
              onChange={handleInputChange}
              sx={textFieldStyles}
            />
          </Box>

          {/* Main service Dropdown */}
          <Box sx={{ width: "100%" }}>
            <TextField
              name="main_service"
              label="Main service"
              select
              fullWidth
              defaultValue={defaultService}
              error={errors.main_service}
              helperText={
                errors.main_service ? "Please select a main service." : ""
              }
              sx={textFieldStyles}
              onChange={(e) => {
                handleInputChange(e);
                setSelectedMainService(e.target.value);
              }}
            >
              {services.map((service) => (
                <MenuItem key={service.value} value={service.value}>
                  {service.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Sub services Dropdown */}
          <Box sx={{ width: "100%" }}>
            <TextField
              name="sub_service"
              label="Select a sub service"
              select
              fullWidth
              value={selectedSubService}
              onChange={(e) => setSelectedSubService(e.target.value)}
              error={errors.sub_service && !selectedSubService}
              helperText={
                !selectedSubService && errors.sub_service
                  ? "Please select a sub service."
                  : ""
              }
              sx={textFieldStyles}
            >
              {subService[selectedMainService]?.map((sub) => (
                <MenuItem key={sub.value} value={sub.value}>
                  {sub.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Message */}
          <Box sx={{ width: "100%" }}>
            <TextField
              name="message"
              label="Enter your message"
              multiline
              rows={6}
              fullWidth
              error={errors.message}
              helperText={errors.message ? "Message is required." : ""}
              onChange={handleInputChange}
              sx={textFieldStyles}
            />
          </Box>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className={`w-full lg:w-fit my-4 lg:mt-6 px-6 py-3 rounded-full font-medium transition cursor-pointer ${
              isSending
                ? "bg-primary/60 text-[#19181899] cursor-not-allowed"
                : "bg-primary text-[#191818] hover:bg-primary/80"
            }`}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Right sec */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="hidden lg:block">
          <h1 className="text-[26px] md:text-3xl lg:text-5xl lg:leading-[62px] font-bold">
            Partner with us to build what’s{" "}
            <span className="text-primary">next</span>
          </h1>
          <p className="mt-4 text-sm lg:text-lg leading-6 md:leading-7 lg:leading-8 font-light text-justify">
            Have an idea? Let’s bring it to life. Whether it's a bold vision or
            a simple spark, we're here to help turn your ideas into reality.
          </p>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 w-full">
          {/* Address Card */}
          <div className="bg-gradient-to-b from-[#01213A] from-0% to-[#035BA0] to-100% rounded-[20px] p-6">
            <p className="text-lg font-normal mb-1 text-white ">Address :</p>
            <p className="text-base text-white leading-6 font-light">
              3rd Floor, All in one Holdings, <br />
              349/2/1 Katugastota Rd, <br />
              Kandy, Sri Lanka.
            </p>
          </div>

          <div className="flex flex-row sm:flex-col gap-2 sm:gap-0 px-4 py-6 sm:p-0">
            {/* Phone - Card */}
            <div className="flex-1 rounded-[20px] md:p-6 bg-white items-center md:items-start">
              <p className="text-lg font-normal mb-1">Phone :</p>
              <div className="text-base leading-6 font-light">
                <p>+94 81 2121 051</p>
                <p>+94 76 8572 709</p>
              </div>
            </div>
            {/* Email Card - mpbile */}
            <div className="sm:hidden block flex-1 bg-white rounded-[20px] md:p-6">
              <p className="text-lg font-normal mb-1">E-mail :</p>
              <p className="text-base  leading-6 font-light">
                info@allinoneholdings.com
              </p>
            </div>
          </div>

          {/* Email Card - tab & desktop*/}
          <div className="hidden sm:block bg-white rounded-[20px] p-6">
            <p className="text-lg font-normal mb-1">E-mail :</p>
            <p className="text-base  leading-6 font-light">
              info@allinoneholdings.com
            </p>
          </div>

          {/* Card 4 - Social Icons */}
          <div className="rounded-[20px] p-6 flex flex-col items-center md:items-start justify-center mb-1">
            <p className="text-lg font-normal mb-2 text-center lg:text-left">
              Follow Us:
            </p>

            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/allinoneholdings"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary border-2 border-primary flex items-center justify-center transition hover:bg-primary/80"
              >
                <CiFacebook className="w-6 h-6" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/all_in_one_holdings"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary border-2 border-primary flex items-center justify-center transition hover:bg-primary/80"
              >
                <IoLogoInstagram className="w-6 h-6" />
              </a>

              {/* Google */}
              <a
                href="https://g.co/kgs/Cw4rrUZ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary border-2 border-primary flex items-center justify-center transition hover:bg-primary/80"
              >
                <PiGoogleLogo className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
