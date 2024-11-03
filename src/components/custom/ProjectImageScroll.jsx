import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    (<div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl max-sm:text-lg font-semibold text-black dark:text-white">
            EVAGUY (AI Trip Planner) Desigin by Group Number 345 Under the Guidance of<br />
              <span className="text-4xl max-sm:text-xl md:text-[2rem] font-bold mt-1 mb-2 leading-[80px] max-sm:leading-none">
            ASSISTANT.PROFESSOR GAURAV VARSHENEY
              </span>
            </h1>
          </>
        }>
        <img
          src={`/Full-Size-Screeshot.png`}
          alt="Project Eaxmple Image"
          height={720}
          width={1400}
          className="rounded-2xl object-cover max-xl:object-fill h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>)
  );
}