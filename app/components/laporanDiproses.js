// app/laporan-masuk/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LaporanMasuk() {
  const [laporanMasuk, setLaporanMasuk] = useState([]);

  const fetchLaporanMasuk = async () => {
    const res = await fetch('/api/laporan-masuk', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Token untuk otorisasi
      },
    });
    const data = await res.json();
    setLaporanMasuk(data);
  };

  useEffect(() => {
    fetchLaporanMasuk();
  }, []);

  return (
    <>
      {/* navbar */}
      <div className="navbar bg-slate-600 mb-10">
        <div className="flex-1">
          <Link href="#" className="btn btn-ghost text-2xl text-white">Dashboard</Link>
        </div>
        <ul className='justify-end menu menu-horizontal mx-8'>
          <li className='mx-2 hover:bg-slate-400 rounded-box'><Link href="/dashboard" className='text-white'>Laporan Masuk</Link></li>
          <li><Link href="" className='text-white hover:bg-slate-400 rounded-box'>Statistik Laporan</Link></li>
          <div className='flex items-center mx-2 px-3 py-2 hover:bg-slate-400 rounded-box'>
            <button>
              <svg className="w-6 h-6 hover:animate-pulse text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
              </svg>
            </button>
          </div>
        </ul>
      </div>
      {/* Table */}
      <div className="overflow-x-auto mx-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className=' text-lg'>Judul Laporan</th>
              <th className=' text-lg'>Deskripsi</th>
              <th className=' text-lg'>Tanggal</th>
              <th className=' text-lg'>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Row untuk setiap laporan */}
            {laporanMasuk.map((item) => (
              <tr key={item.id} className='hover'>
                <td>{item.laporanMasyarakat.judulLaporan}</td>
                <td>{item.laporanMasyarakat.deskripsi}</td>
                <td>{item.createdAt}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}