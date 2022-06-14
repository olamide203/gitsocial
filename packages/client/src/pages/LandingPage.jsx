import React from "react";
import { NavLink } from "react-router-dom";
import Accordion from "../components/Accordion";
import {
  BsCheckCircleFill,
  BsFillLightningChargeFill,
  BsShieldFillCheck,
} from "react-icons/bs";

function LandingPage() {
  return (
    <div className="landing">
      <div className=" text-white w-full aspect-square lg:aspect-[900/600] xl:aspect-[900/450] bg-no-repeat bg-center bg-cover lg:bg-[url('/images/waves-2.svg')] bg-[url('/images/waves-sm.svg')] sm:bg-[url('/images/waves-md.svg')] px-6 md:px-16 lg:px-20 pt-10">
        <div className="grid grid-cols-5 max-w-screen-xl mx-auto gap-20">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="text-4xl md:text-7xl lg:text-5xl font-bold leading-tight rotate-[-3deg]">
              A fast and easy way to
              <span className="relative z-30 inline-block before:absolute before:bg-sky-700 before:block before:-inset-1 before:skew-y-[-3deg] mx-1.5">
                <span className="relative">Share</span>
              </span>
              your projects
            </h1>
            <p className="mt-5 rotate-[-3deg] ">
              share your projects and ideas with other developers in your
              community easily
            </p>
            <div className="mt-10">
              <NavLink
                to={"/login"}
                className="capitalize btn mr-3 bg-blue-700 text-white border-none px-10 rounded hover:scale-95"
              >
                Login
              </NavLink>

              <NavLink
                to={"/signup"}
                className="capitalize btn text-white hover:bg-blue-700 border-none rounded hover:scale-95"
              >
                Signup
              </NavLink>
            </div>
          </div>
          <div className="hide lg:col-span-3 lg:block">
            <div className="mockup-window border bg-base-300 aspect-[1334/750] border-gray-700 shadow-xl rotate-[5deg]">
              <div className="aspect-[667/375] bg-no-repeat bg-center bg-contain bg-[url('/images/laptop_mockup.png')]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-400 relative sm:-top-32 sm:-mb-32 pb-32 lg:px-32 lg:pt-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto gap-10 px-5 sm:px-20">
          <div className="grid bg-neutral aspect-square max-w-sm  justify-self-center justify-center items-center p-5 rounded-lg">
            <div>
              <BsCheckCircleFill className="text-9xl text-white mx-auto my-5" />
              <h3 className="font-bold text-xl text-white text-center">
                Easy to use
              </h3>
              <p className="text-center">
                modern and accessible user interface
              </p>
            </div>
          </div>
          <div className="grid bg-neutral aspect-square max-w-xs justify-self-center justify-center items-center p-5 rounded-lg">
            <div>
              <BsFillLightningChargeFill className="text-9xl text-white mx-auto my-5" />
              <h3 className="font-bold text-xl text-white text-center">Fast</h3>
              <p className="text-center">
                loads real-time data from your github profile.
              </p>
            </div>
          </div>
          <div className="grid bg-neutral aspect-square max-w-sm  justify-self-center justify-center items-center p-5 rounded-lg">
            <div>
              <BsShieldFillCheck className="text-9xl text-white mx-auto my-5" />
              <h3 className="font-bold text-xl text-white text-center">
                Secure
              </h3>
              <p className="text-center">adheres to security best practices</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fafafa] lg:px-28 py-20">
        <div className="grid max-screen-xl md:grid-cols-5 justify-center align-center px-8 gap-20">
          <div className="col-span-2  self-center justify-self-center hide lg:block">
            <div className="mockup-phone lg:rotate-[-3deg] relative shadow-xl">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1 bg-[url('/images/phone.png')] bg-center bg-cover"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 self-center justify-self-center align-self-center col-span-5 lg:col-span-3 max-w-lg">
            <div className="">
              <Accordion
                heading="Share tweets"
                content="gittz automatically generates the body of your tweets based on the description and topics of your github repositories, saving you time while still allowing you to edit the content if necessary."
              />
            </div>
            <div className="">
              <Accordion
                heading="Advanced search"
                content="our advanced search functionality with filters and result pagination makes it easy for you to find other github users and repositories."
              />
            </div>
            <div className="">
              <Accordion
                heading="Simple dashboard"
                content="gittz comes with a simple dashboard with a user friendly interface which displays useful user data in a easy to understand manner. "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-center align-center bg-[url('/images/blob-3.svg')] aspect-square lg:aspect-[900/450] bg-center bg-no-repeat bg-contain relative text-white px-10 gap-10">
        <div className="self-end">
          <h3 className="font-bold md:text-4xl text-2xl sm:text-3xl h-auto ">
            Start using gittz today!
          </h3>
        </div>
        <div className=" grid grid-cols-2 justify-center align-center">
          <NavLink
            to={"/login"}
            className="capitalize btn btn-lg mr-3 text-white border-none px-10 rounded"
          >
            Login
          </NavLink>

          <NavLink
            to={"/signup"}
            className="capitalize btn btn-lg text-white border-none rounded"
          >
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
