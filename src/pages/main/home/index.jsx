import React from "react";
import RenderCarItem from "../../../components/RenderCarItem";
// import Airport from "./airport";
import BannerHome from "./bannerHome";
import City from "./city";
import Features from "./features";
import Owner from "./owner";
import Tutorial from "./tutorial";

function Home() {
  return (
    <section className="body">
      <BannerHome />
      <Features />
      <Tutorial />
      <City />
      {/* <Airport /> */}
      <Owner />
      <RenderCarItem />
    </section>
  );
}

export default Home;
