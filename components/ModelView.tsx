"use client";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import React, { RefObject, Suspense } from "react";
import Iphone from "./Iphone";
import Lights from "./Lights";
import Loader from "./Loader";

const ModelView = ({ index, controlRef, gsapType }: { index: number; controlRef: RefObject<OrbitControlsImpl | null> | undefined; gsapType: string }) => {
	return (
		<View id={gsapType} index={index} className={`w-full h-full absolute z-100 ${index === 2 ? "right-[-100%]" : ""} px-30`}>
			<ambientLight intensity={0.5} />
			<PerspectiveCamera makeDefault position={[0, 0, 4]} />
			<Lights />
			<group position={[0, 0, 0]} name={index === 1 ? "small" : "large"} >
				<OrbitControls
					ref={controlRef}
					enableZoom={false}
					makeDefault
					enablePan={false}
					rotateSpeed={0.4}
					target={new THREE.Vector3(0, 0, 0)}
				/>
				<Suspense fallback={<Loader />}>
					<Iphone scale={index === 1 ? [15, 15, 15] : [18, 18, 18]} />
				</Suspense>
			</group>
		</View>
	);
};

export default ModelView;
