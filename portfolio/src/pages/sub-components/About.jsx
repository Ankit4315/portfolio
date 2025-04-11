import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "/api/v1/user/me/portfolio",
          { withCredentials: true }
        );
        if (data.success) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={user?.avatar?.url || "/avatarHolder.jpg"}
              alt="avatar"
              className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              Hi, I'm Ankit — a passionate developer specializing in Flutter and
              the MERN stack. I love creating intuitive, high-performance mobile
              apps and full-stack web applications that not only look great but
              also solve real-world problems. With Flutter, I focus on building
              smooth, responsive UIs and integrating powerful features like PDF
              generation, image and signature capture, and real-time
              notifications using Firebase. On the web side, my experience with
              the MERN stack (MongoDB, Express.js, React, Node.js) allows me to
              craft scalable, efficient web solutions from front to back. I'm
              always learning, always building, and always excited to take on
              new challenges that push my skills further. Whether it's a mobile
              app or a web platform, I bring a strong eye for detail and a
              commitment to quality in everything I create.
            </p>
            <p>
              I have interests not only in technology but also in movies,
              series, video games, and cooking. I excel in meeting deadlines for
              my work.
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          My dedication and perseverance in timely delivery of work are integral
          to me. I maintain the courage to face any challenges for extended
          periods.
        </p>
      </div>
    </div>
  );
};

export default About;
