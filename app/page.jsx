import Feeds from "@components/Feeds";
import React from "react";

function HomePage() {
  return (
    <section className="w-full  flex-center flex-col">
      <h1 className="head_text text-center">
        Discover Prompts
        <hr className="max-md:hidden" />
        <span className="orange_gradient text-center">AI PROMPTS</span>
      </h1>
      <p className="desc text-center">
        Lets promote Ai using open source contribution
      </p>
      <Feeds />
    </section>
  );
}

export default HomePage;
