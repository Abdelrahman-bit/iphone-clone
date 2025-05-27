"use client";
import React, { useEffect, useRef, useState } from "react";
import ModelView from "./ModelView";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import gsap from "gsap";

const Model = () => {
	const controlSmall = useRef<OrbitControlsImpl | null>(null);
	const controlLarge = useRef<OrbitControlsImpl | null>(null);
	const [active, setActive] = useState({ small: true, large: false });
	const animation = (smallActive: boolean) => {
		gsap.to("#view1", {
			x: smallActive ? "0%" : "-100%",
			duration: 1,
			ease: "power2.inOut",
		});
		gsap.to("#view2", {
			x: smallActive ? "0%" : "-100%",
			duration: 1,
			ease: "power2.inOut",
		});
	};
	useEffect(() => {
		animation(active.small);
	}, [active]);
	
	return (
		<section className='w-full h-[90dvh] flex justify-center items-center'>
			<div className='flex flex-col items-center mt-5 w-screen h-screen'>
				<div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
					<ModelView gsapType='view1' index={1} controlRef={controlSmall} />
					<ModelView gsapType='view2' index={2} controlRef={controlLarge} />
					<Canvas
						className='w-full h-full'
						style={{
							position: "fixed",
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							overflow: "hidden",
							// border: "2px solid red",
						}}
					>
						<View.Port />
					</Canvas>
				</div>
				<h1 className='text-gray-200 text-xl md:text-2xl mt-10'>iPhone 15 Pro in Natural Titanium</h1>
				<div className='flex gap-4 px-10 mt-5 text-white text-sm md:text-base z-50'>
					<div
						className={`${
							active.small ? "bg-gray-200 text-black" : "bg-zinc-900 text-gray-200"
						} rounded-xl cursor-pointer  p-3`}
						onClick={() => setActive({ small: true, large: false })}
					>
						6.1'
					</div>
					<div
						className={`${
							active.large ? "bg-gray-200 text-black" : "bg-zinc-900 text-gray-200"
						} rounded-xl cursor-pointer  p-3`}
						onClick={() => setActive({ small: false, large: true })}
					>
						6.7'
					</div>
				</div>
				<h1 className='text-gray-300 text-xl md:text-2xl mt-3'>Choose your iPhone</h1>
			</div>
		</section>
	);
};

export default Model;
