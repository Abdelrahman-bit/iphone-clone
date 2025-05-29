"use client"
import { rightImg, watchImg } from "@/utils"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Slider from "./Slidpar"

const Highlight = () => {
  useGSAP(()=>{
    gsap.to('#highlights', {
      scrollTrigger: 'highlights',
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: 'power2.out'
    })
    gsap.to("#link p", {
		scrollTrigger: "highlights",
		y: 0,
		opacity: 1,
		duration: 1,
		delay: 1,
		stagger: 0.25,
	});
  })
  return (
    <section className="flex flex-col items-center w-full h-screen bg-zinc-900 p-4 pt-20">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between items-center w-full p-3 ">
            <p id="highlights" className="text-gray-400 text-3xl translate-y-20 opacity-0">Get the highlights</p>
            <div id="link" className="flex gap-8">
                <p className="flex gap-3 text-blue-400 text-sm lg:text-xl opacity-0 translate-y-20 ">Watch the film <img src={watchImg} alt="Film Highlight" /> </p>
                <p className="flex gap-3 text-blue-400 text-sm lg:text-xl opacity-0 translate-y-20 ">Watch the event <img src={rightImg} alt="Event Highlight" /> </p>
            </div>
        </div>
        <Slider />
    </section>
  )
}

export default Highlight