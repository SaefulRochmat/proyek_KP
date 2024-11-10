"use client"

import Link from "next/link";
import Logo from "../../public/logo/logo.jpg"
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
        const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      
        const toggleDrawer = () => {
          setIsDrawerOpen(!isDrawerOpen);
        };
        // Handler untuk menutup drawer ketika link di klik
        const handleLinkClick = (e) => {
            e.preventDefault(); // Prevent default hanya untuk demo
            toggleDrawer();
        };
        return (
        <>
        {isDrawerOpen && (
            <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={toggleDrawer}
            />
        )}
            <div className="navbar bg-slate-50 shadow-sm shadow-green-600 px-6 sticky top-0 z-40">
                {/* Bagian Logo */}
                <div className="navbar-start">
                    <Link href="/">
                        <div className="border border-green-500 rounded-full max-w-20 max-h-20 lg:max-w-20 lg:max-h-20">
                            <Image 
                                src={Logo} 
                                width={0} 
                                height={0} 
                                alt="DLH Majalengka"    
                                className="" 
                            />
                        </div>
                    </Link>
                </div>

                {/* Bagian Menu Navigasi (di tengah untuk layar besar) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal text-lg font-light space-x-4">
                        <li className="hover:text-green-500"><Link href="/">BERANDA</Link></li>
                        <li>
                            <details>
                                <summary className="hover:text-green-500">PROFIL</summary>
                                <ul className="p-2 w-52">
                                    <li className="hover:text-green-500"><Link href="/">Submenu 1</Link></li>
                                    <li className="hover:text-green-500"><Link href="/">Submenu 2</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary className="hover:text-green-500">PUBLIKASI DATA</summary>
                                <ul className="p-2 w-52">
                                    <li className="hover:text-green-500"><Link href="/">Submenu 1</Link></li>
                                    <li className="hover:text-green-500"><Link href="/">Submenu 2</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary className="hover:text-green-500">LAYANAN KAMI</summary>
                                <ul className="p-2 w-52">
                                    <li className="hover:text-green-500"><Link href="/">Submenu 1</Link></li>
                                    <li className="hover:text-green-500"><Link href="/">Submenu 2</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li className="hover:text-green-500"><Link href="/">KONTAK</Link></li>
                    </ul>
                </div>

                {/* Tombol Login di ujung kanan */}
                <div className="navbar-end hidden lg:flex">
                    <Link href="/" className="btn btn-outline hover:text-green-500">LOGIN</Link>
                </div>

                {/* Hamburger Menu untuk Mobile */}
                <div className="navbar-end lg:hidden">
                <button className="btn btn-ghost" onClick={toggleDrawer}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </button>
                </div>
                
                {/* Overlay dan Drawer Container */}
                {isDrawerOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Overlay */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={toggleDrawer}
                    />
                    
                    {/* Drawer */}
                    <div className={`fixed top-0 left-0 right-0 bg-base-200 shadow-xl transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                        <div className="flex justify-between items-center p-4 border-b">
                        <span className="text-lg font-semibold">Menu</span>
                        <button 
                            className="btn btn-ghost btn-sm btn-circle"
                            onClick={toggleDrawer}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        
                        <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
                        <ul className="menu w-full p-4">
                            <li><a href="/" onClick={handleLinkClick}>BERANDA</a></li>
                            <li>
                            <details>
                                <summary>PROFIL</summary>
                                <ul className="pl-4">
                                <li><a href="/" onClick={handleLinkClick}>Submenu 1</a></li>
                                <li><a href="/" onClick={handleLinkClick}>Submenu 2</a></li>
                                </ul>
                            </details>
                            </li>
                            <li>
                            <details>
                                <summary>PUBLIKASI DATA</summary>
                                <ul className="pl-4">
                                <li><a href="/" onClick={handleLinkClick}>Submenu 1</a></li>
                                <li><a href="/" onClick={handleLinkClick}>Submenu 2</a></li>
                                </ul>
                            </details>
                            </li>
                            <li>
                            <details>
                                <summary>LAYANAN KAMI</summary>
                                <ul className="pl-4">
                                <li><a href="/" onClick={handleLinkClick}>Submenu 1</a></li>
                                <li><a href="/" onClick={handleLinkClick}>Submenu 2</a></li>
                                </ul>
                            </details>
                            </li>
                            <li><a href="/" onClick={handleLinkClick}>KONTAK</a></li>
                            <li className="mt-4">
                            <a href="/" className="btn btn-outline w-full" onClick={handleLinkClick}>LOGIN</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                )}
            </div>

        </>
    );
}