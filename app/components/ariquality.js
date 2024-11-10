'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Wind, AlertCircle, Calendar } from 'lucide-react';

const AirQualityDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opendata.majalengkakab.go.id/api/bigdata/dlh/jmlh-dt-pmntn-klts-dr-brdsrkn-prmtr-klts-dr-d-kbptn-mjlngk');
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <AlertCircle className="mr-2" />
        {error}
      </div>
    );
  }

  // Group data by year
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.tahun]) {
      acc[item.tahun] = [];
    }
    acc[item.tahun].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1200px] shadow-lg mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-3xl font-light transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-green-800 mb-20 text-center">
          Monitoring Kualitas Udara Kabupaten Majalengka
        </h1>
        
        {Object.entries(groupedData).map(([year, yearData]) => (
          <div key={year} className="mb-12">
                <div className="flex items-center mb-6">
                <Calendar className="text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-green-700">Tahun {year}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {yearData.map((item) => (
                    <div 
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl border border-green-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-x-100 duration-300"
                    >
                    <div className="bg-green-50 p-4 border-b border-green-100">
                        <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-green-800">
                            {item.indikator_parameter}
                        </h3>
                        {item.indikator_parameter === 'SO2' ? (
                            <Wind className="text-green-600" />
                        ) : (
                            <Leaf className="text-green-600" />
                        )}
                        </div>
                        <p className="text-sm text-green-600">{item.bps_nama_kabupaten_kota}</p>
                    </div>
                    
                    <div className="p-4">
                        <div className="flex justify-between items-baseline mb-2">
                        <span className="text-2xl font-bold text-green-700">{item.jumlah}</span>
                        <span className="text-sm text-gray-600">{item.satuan}</span>
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-600">
                        <p>Parameter Kualitas Udara</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirQualityDashboard;