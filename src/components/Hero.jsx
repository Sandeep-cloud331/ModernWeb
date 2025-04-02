import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocation, TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0.1,
          duration: 1.5,
          ease: "power1.inOut",

        });
        gsap.from("#next-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 2.5,
          ease: "power1.out",
          onStart: () => nextVdRef.current.play(),
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  return (
    <div className="absolute h-dvh w-screen overflow-hidden z-10">
      {/* badi vali vid */}

      <video id="current-video"
        src={getVideoSrc(currentIndex)}
        autoPlay
        loop
        muted
        className="absolute inset-0 h-full w-full object-cover"
      ></video>


      {/* choti vali vid*/}
      <div id="next-video" className="absolute inset-0 flex justify-center items-center rounded-2xl overflow-hidden">
        <video

          src={getVideoSrc(currentIndex === totalVideos ? 1 : currentIndex + 1
          )}
          loop
          muted
          className="inset-0 w-32 h-32 sm:w-32 object-cover cursor-pointer hover:scale-110 opacity-0 hover:opacity-100 rounded-2xl"
          onClick={handleMiniVdClick}
          onLoadedData={handleVideoLoad}
        ></video>
      </div>
      <div className="absolute  m-10 special-font">
        <h1 className="m-1 font-bold text-7xl md:text-8xl text-white" ><span className=" bg-blue-700 rounded-xl size-fit">RED</span>EFI<b className="ml-0.5 text-[4.3rem] md:text-[5.8rem]">n</b>E</h1>
        <p className="p-1 text-white font-robert-regular h-auto overflow-hidden ">
          Enter the Metagame Layer <br /> Unleash the Play Economy
        </p>
        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="bg-yellow-300 flex-center gap-1 cursor-pointer " />
      </div>

      {/* first gaming with z */}
      <div className="absolute uppercase special-font text-blue-200 font-bold bottom-0 z-40 right-0 m-5 text-7xl ">
        <h1>G<b>a</b>ming</h1>

      </div>
      {/* second gaming without z */}
      <div className="absolute uppercase special-font text-blue-200 font-bold bottom-0  right-0 m-5 text-7xl ">
        <h1>G<b>a</b>ming</h1>
      </div>

    </div>
  );
}

export default Hero;
