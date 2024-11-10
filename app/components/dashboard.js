// app/dashboard/page.js
'use client'; // Karena kita menggunakan state dan efek

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [laporan, setLaporan] = useState([]);

  const fetchLaporan = async () => {
    const res = await fetch('/api/laporan-masyarakat', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Token untuk otorisasi
      },
    });
    const data = await res.json();
    setLaporan(data);
  };

  const handleProses = async (laporanId) => {
    const laporanDiproses = laporan.find((item) => item.id === laporanId);
    
    const tindakan = 'Proses Laporan'; // Ganti sesuai kebutuhan
    const userId = 240302273;
  
    // Kirim data ke endpoint laporan-masuk
    const response = await fetch('/api/laporan-masuk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        laporanMasyarakatId: laporanDiproses.id,
        userId, // Ganti dengan ID pengguna yang sesuai
        tindakan, // Sertakan tindakan di sini
      }),
    });
  
    // Periksa apakah respon berhasil
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
      return;
    } else {
      alert("Laporan telah diproses...")
    }

    // Update state setelah pemindahan
    fetchLaporan();
  };
  

  useEffect(() => {
    fetchLaporan();
  }, []);

  return (
    <>
      {/* navbar */}
      <div className="navbar bg-slate-600 mb-10">
        <div className="flex-1">
          <Link href="#" className="btn btn-ghost text-2xl text-white">Dashboard</Link>
        </div>
        <ul className='justify-end menu menu-horizontal mx-8'>
          <li className='mx-2 hover:bg-slate-400 rounded-box'><Link href="/laporan-diproses" className='text-white'>Laporan Diproses</Link></li>
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
              <th></th>
              <th className=' text-lg'>Judul Laporan</th>
              <th className=' text-lg'>Deskripsi</th>
              <th className=' text-lg'>Tanggal</th>
              <th className=' text-lg'>Status</th>
              <th className=' text-lg'>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {laporan.map((item) => (
            <tr key={item.id} className='hover'>
              <th>{item.id}</th>
              <td>{item.judulLaporan}</td>
              <td>{item.deskripsi}</td>
              <td>{item.createdAt}</td>
              <td>{item.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-success w-16 mx-1 mb-1"
                  onClick={() => handleProses(item.id)}
                >
                  Proses
                </button>
                <button className="btn btn-sm btn-outline btn-error w-16 mx-1 mb-1">Batal</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
