import Image from "next/image";
import NavBar from "./components/navbar";
import SaveEarth from "../public/image/SaveEarth.png";
import Nature from "../public/image/SaveEarth.png"
import AirQualityDashboard from "./components/ariquality";
import Footer from "./components/footer";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function HomePage() {
    return (
        <>
            <NavBar />

            {/* Hero Image */}
            <div className="w-full md:w-[980px] lg:w-[1200px] md:h-[400px] lg:h-[400px] m-auto lg:mt-14 py-8 px-4 shadow-lg">
                <Image 
                src={SaveEarth}
                width={0} 
                height={0} 
                alt="Hero Image" 
                className="w-full h-full object-cover"
                />
            </div>

            {/* Profile */}
            {/* <div className="lg:w-[1200px] m-auto mt-28 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-36 justify-between px-20 py-10 md:flex md:flex-row">               
                    <blockquote className="italic font-semibold text-gray-900 order-2 md:text-sm lg:text-xl md:order-2">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                        </svg>
                        <p>"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application,
                        Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application,
                        Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."
                        </p>
                    </blockquote>
                    <div className="avatar flex flex-col items-center order-1 md:order-1">
                        <div className="w-[300px] md:w-[300px] h-auto rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                        <h1 className="text-xl font-light mt-2 text-center">Dr. Nama depan nama belakang S.pd</h1>
                    </div>
                </div>
            </div> */}

            {/* Card */}
            {/* <div className="w-[1200px] m-auto mt-28 shadow-xl">
                <div className="grid grid-cols-3 gap-5 px-5 py-12">
                    <Card className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-center">
                                <Image
                                    src={Nature}
                                    alt="Card Image"
                                    width={300}
                                    height={300}
                                    className="rounded-md"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-semibold">Judul Card</h2>
                            <p className="text-gray-600">
                            Ini adalah contoh deskripsi card. Kamu bisa mengganti teks ini dengan
                            konten yang kamu inginkan.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <button className="btn">Klik di sini</button>
                        </CardFooter>
                    </Card>
                    <Card className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-center">
                                <Image
                                    src={Nature}
                                    alt="Card Image"
                                    width={300}
                                    height={300}
                                    className="rounded-md"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-semibold">Judul Card</h2>
                            <p className="text-gray-600">
                            Ini adalah contoh deskripsi card. Kamu bisa mengganti teks ini dengan
                            konten yang kamu inginkan.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <button className="btn">Klik di sini</button>
                        </CardFooter>
                    </Card>
                    <Card className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-center">
                            <Image
                                src={Nature}
                                alt="Card Image"
                                width={300}
                                height={300}
                                className="rounded-md"
                            />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-semibold">Judul Card</h2>
                            <p className="text-gray-600">
                            Ini adalah contoh deskripsi card. Kamu bisa mengganti teks ini dengan
                            konten yang kamu inginkan.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <button className="btn">Klik di sini</button>
                        </CardFooter>
                    </Card>
                    <Card className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-center">
                            <Image
                                src={Nature}
                                alt="Card Image"
                                width={300}
                                height={300}
                                className="rounded-md"
                            />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-semibold">Judul Card</h2>
                            <p className="text-gray-600">
                            Ini adalah contoh deskripsi card. Kamu bisa mengganti teks ini dengan
                            konten yang kamu inginkan.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <button className="btn">Klik di sini</button>
                        </CardFooter>
                    </Card>
                    <Card className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-center">
                            <Image
                                src={Nature}
                                alt="Card Image"
                                width={300}
                                height={300}
                                className="rounded-md"
                            />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-semibold">Judul Card</h2>
                            <p className="text-gray-600">
                            Ini adalah contoh deskripsi card. Kamu bisa mengganti teks ini dengan
                            konten yang kamu inginkan.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <button className="btn">Klik di sini</button>
                        </CardFooter>
                    </Card>
                    <Card className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-center">
                            <Image
                                src={Nature}
                                alt="Card Image"
                                width={300}
                                height={300}
                                className="rounded-md"
                            />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-semibold">Judul Card</h2>
                            <p className="text-gray-600">
                            Ini adalah contoh deskripsi card. Kamu bisa mengganti teks ini dengan
                            konten yang kamu inginkan.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <button className="btn">Klik di sini</button>
                        </CardFooter>
                    </Card>
                </div>
            </div> */}
            <AirQualityDashboard />
            <Footer />
        </>
        
    );
}