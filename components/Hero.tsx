"use client";
import { heroVideo, smallHeroVideo } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Hero = () => {
    const [vedioSrc, setVedioSrc] = useState<string | Blob | MediaSource | MediaStream | undefined>();
    
    useEffect(()=>{
        setVedioSrc(window.innerWidth > 768 ? heroVideo : smallHeroVideo);
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setVedioSrc(heroVideo);
            } else {
                setVedioSrc(smallHeroVideo);
            }
        };
        window.addEventListener("resize", handleResize);
        return ()=> window.removeEventListener("resize", handleResize);
    }, []);

	useGSAP(() => {
		gsap.to("#hero-title", {
			y: -50,
			opacity: 1,
            delay: 2.5,
            duration: .8,
            ease: "power2.out",
		});
        gsap.to("#hero-action", {
            y: -40,
            opacity: 1,
            delay: 2.5,
            duration: 0.8,
            ease: "power2.out",
        });
	}, []);
	return (
		<section className='w-full flex flex-col justify-center h-150 items-center '>
			<div className="flex flex-col justify-center items-center lg:w-8/10">
				<h1
					id='hero-title'
					className='text-2xl mt-5 lg:text-4xl bg-gradient-to-b from-gray-500 to-gray-200 bg-clip-text text-transparent font-bold opacity-0 m-auto'
				>
					Iphone 15 Pro
				</h1>
				<div className='w-8/12 md:w-10/12 lg:h-9/10 m-auto'>
					<video className='pointer-events-none' src={vedioSrc} autoPlay muted loop />
				</div>
			</div>
            <div id="hero-action" className="flex flex-col justify-center items-center mt-10 space-y-2 opacity-0">
                <button className='bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-400 cursor-pointer'>Buy</button>
                <p>From $199/month or $999 one-time</p>
            </div>
		</section>
	);
};

export default Hero;
