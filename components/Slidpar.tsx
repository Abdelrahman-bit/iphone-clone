"use client";
import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg } from "@/utils";
import { useEffect, useRef, useState } from "react";

const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false); // State to track if the section is in view
    const sectionRef = useRef<HTMLDivElement | null>(null); // Ref to the section element
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    
    useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setInView(entry.isIntersecting); // Updates when section enters/exits viewport
			},
			{ threshold: 0.8 } // Detects when 80% of the section is visible
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
    
	}, []);
    
	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % hightlightsSlides.length);
	};
	useEffect(() => {
		if (paused || !inView) {
			videoRefs.current.forEach((video) => video?.pause());
			return;
		}

		// Get the current slide's video duration
		const timeout = hightlightsSlides[currentIndex]?.videoDuration * 1000 || 3000;

		// Play only the current slide's video
		const currentVideo = videoRefs.current[currentIndex];
		if (currentVideo) {
			currentVideo.play();
		}

		// Pause and reset other videos
		videoRefs.current.forEach((video, index) => {
			if (video && index !== currentIndex) {
				video.pause();
				video.currentTime = 0;
			}
		});

		const timer = setTimeout(() => {
			if (inView) {
                if(currentIndex === hightlightsSlides.length - 1){
                    setPaused(true);
                }
				nextSlide();
			}
		}, timeout);

		return () => clearTimeout(timer);
	}, [currentIndex, paused, inView]);
    
    // useEffect(() => {               //for debugging purpose
	// 	console.log("Slider in view:", inView);
	// }, [inView]);

	return (
		<div ref={sectionRef} className='relative w-full z-100'>
			<div
				className='flex transition-transform duration-1000 ease-in-out '
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{hightlightsSlides.map((item, index) => (
					<div key={item.id} className='w-full flex-shrink-0 pl-8 md:pl-20 lg:pl-35 '>
						<div className='relative flex sm:w-[80vw] w-[80vw] md:h-[70vh] sm:h-[50vh] h-[35vh]'>
							<div className='w-full h-full flex rounded-3xl overflow-hidden bg-black'>
								<video
									ref={(el) => {
										videoRefs.current ? (videoRefs.current[index] = el) : null;
									}}
									className='w-full h-full object-cover'
									loop
									muted
									playsInline
								>
									<source src={item.video} type='video/mp4' />
								</video>
							</div>
							<div className='absolute top-12 left-[5%] z-10'>
								{item.textLists.map((text, index) => (
									<p key={index} className='text-white lg:text-3xl font-semibold mb-2'>
										{text}
									</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className='flex items-center justify-center mt-4 z-200'>
				{hightlightsSlides.map((_, index) => (
					<div
						key={index}
						className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
							currentIndex === index ? `bg-white ` : "bg-gray-500"
						}`}
						onClick={() => setCurrentIndex(index)}
					></div>
				))}
				<div
					className='w-14 h-12 bg-zinc-700 rounded-full flex items-center justify-center ml-4 cursor-pointer hover:bg-zinc-600 transition-colors duration-300'
					onClick={() => setPaused(!paused)}
				>
					<button>{paused ? <img src={playImg} alt='play icon' /> : <img src={pauseImg} alt='pause icon' />}</button>
				</div>
			</div>
		</div>
	);
};

export default Slider;
