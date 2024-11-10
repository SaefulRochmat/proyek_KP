'use client';
import { useState } from 'react';

export default function InputLaporan() {
  const [formData, setFormData] = useState({
    judulLaporan: '',
    nama: '',
    deskripsi: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/laporan-masyarakat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Laporan berhasil dikirim!');
        setFormData({ nama: '', judulLaporan: '', deskripsi: '' });
      } else {
        alert('Gagal mengirim laporan.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan.');
    }
  };

  return (
    <>
      <div className='fixed inset-0 flex justify-center items-center'> 
        <div className='w-[500px] p-10 rounded-md'>
        <h2 className="text-lg font-bold mb-4">Form Pelaporan</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <input
                type="text"
                name="nama"
                placeholder="Nama"
                value={formData.nama}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className='mb-4'>
              <input 
                type="text"
                name="judulLaporan"
                placeholder="Judul Laporan"
                value={formData.judulLaporan}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className='mb-4'>
              <textarea
                name="deskripsi"
                placeholder="Deskripsi Laporan"
                value={formData.deskripsi}
                onChange={handleChange}
                className="mt-1 block w-full h-[200px] border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className='flex justify-center'>
              <button type="submit" className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded">Kirim Laporan</button>
            </div>
          </form>
        </div>
      </div>    
    </>
  );
}
