import Link from "next/link";
import Image from "next/image";

export default function HeroImage() {
    return (
        <>
            <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZWUlMjBpbWFnZXMlMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      {/* Overlay untuk efek gelap */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Konten Hero */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-light mb-4">
          Selamat Datang di Website Resmi <br/>
          Dinas Lingkungan Hidup Majalengka
        </h1>
        <p className="text-lg font-light md:text-2xl mb-6">
          Temukan solusi terbaik untuk kebutuhan Anda
        </p>
        <Link href="/about" className="bg-slate-500 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            Pelajari Lebih Lanjut
        </Link>
      </div>
    </section>
        </>
    );
}