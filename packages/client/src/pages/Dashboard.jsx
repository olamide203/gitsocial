import React, { useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";
import { RiBuilding2Line } from "react-icons/ri";
import StatItem from "../components/Dashboard/StatItem";
import useUser from "../Hooks/useUser";

function Dashboard() {
  const { user } = useUser();
  const profile = user.data;
  return (
    <div className=" text-white dashboard h-screen w-full overflow-y-scroll">
      {/* <h1 className="text-3xl font-bold">overview</h1> */}
      <div className="grid grid-cols-auto-fit sm:grid-cols-auto-fit-2 gap-10 p-10 w-full">
        <div className=" grid grid-cols-1 sm:grid-cols-auto gap-x-4 bg-neutral rounded-xl items-center justify-center self-center justify-self-center max-w-[32rem] h-full lg:justify-self-end w-full p-5">
          <div className="avatar online aspect-square mx-auto my-3 max-w-[10rem]">
            <div className=" rounded-full">
              <img src={profile.avatar_url} alt="" />
            </div>
          </div>
          <div className="text-center sm:text-left md:mx-4">
            <h2 className="text-xl md:text-2xl">{profile.name}</h2>
            <h3 className="text-sm font-bold">@{profile.login}</h3>
            <h4 className="text-sm font-bold">
              <MdLocationPin className="inline text-xl" /> {profile.location}
            </h4>
            <a
              href={`https://twitter.com/${profile.twitter_username}`}
              className="btn btn-circle mt-2 mr-2 bg-blue-600 text-white border-none"
              target="_blank"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href={profile.html_url}
              className="btn btn-circle bg-blue-600 text-white border-none"
              target="_blank"
            >
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 items-center justify-center self-center justify-self-center gap-4 max-w-[32rem] h-full lg:justify-self-start w-full">
          <StatItem
            icon={<ImBooks className="text-4xl text-blue-600" />}
            value={profile.public_repos + profile.owned_private_repos}
            title="repos"
          />
          <StatItem
            icon={<BsPeople className="text-4xl text-blue-600" />}
            value={profile.followers}
            title="followers"
          />
          <StatItem
            icon={<BsPeople className="text-4xl text-blue-600" />}
            value={profile.following}
            title="following"
          />
          <StatItem
            icon={<AiOutlineStar className="text-4xl text-blue-600" />}
            value={profile.stars}
            title="starred"
          />
          <StatItem
            icon={<RiBuilding2Line className="text-4xl text-blue-600" />}
            value={profile.organizations}
            title="organizations"
          />
        </div>
      </div>
      <img
        src={`https://ghchart.rshah.org/075985/${profile.login}`}
        alt="hello"
      ></img>
    </div>
  );
}

export default Dashboard;
