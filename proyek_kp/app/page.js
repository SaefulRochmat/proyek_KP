import Image from "next/image";
import Link from "next/link";

import NavBar from "./components/navbar";
import HeroImage from "./components/heroImage";
import AirQualityDashboard from "./components/quialityAir";
import EnvironmentalDashboard from "./components/EnvironmentalLingkungan";

export default function Home() {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <HeroImage/>
      <AirQualityDashboard/>
      <EnvironmentalDashboard/>
    </>
  );
}
