import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import AIlandscape from "@/assets/AIlandscape.jpg";
import React, {useState, useEffect} from "react";
import {Link} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300){
        setShowImage(true);
      } else {
        setShowImage(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="h-[100px]"></div>
      <div className="mx-auto flex max-w-3xl grow flex-col items-center justify-center gap-6">
        <h1 className="text-6xl font-medium text-center mb-5">Turn your stories into magical animations!</h1>
        <h2 className="text-4xl font-thin text-center mb-10">Transform any story into an AI-generated animation in seconds.</h2>
        <Link to="/create">
        <Button variant="default" size="lg" >Tell your story!</Button>
        </Link>
        <div className="h-[300px] mb-10 flex items-center justify-center w-full">
          <p className="max-w-2xl mx-auto font-thin text-center text-lg">Check out how we implemented 
            powerful AI tools to bring your imaginary characters to life. Whether it be dinosaurs walking the earth or robots exploring distant galaxies, 
            our platform transforms your creative ideas into stunning animations. Dive into a world where your stories are visualized with cutting-edge technology, 
            making every tale unique and memorable. Let your imagination run wild and see your characters move, interact, and evolve in ways you never thought possible.</p>
        </div>
        <img src={AIlandscape} alt="AI landscape" className={`transition-all duration-1500 ease-linear ${showImage ? "scale-125" : "scale-100"} max-w-4xl w-full h-auto mx-auto`} /> {/* just a placeholder for a video later?*/}
      </div>
    </>
  );
}

export default Index;
