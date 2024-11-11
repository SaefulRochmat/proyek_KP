'use client';
import React, { useState, useEffect } from 'react';
import { TreePine, Droplets, Trash2, FileCheck, Mountain } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

const getIconForCategory = (category) => {
  switch (category) {
    case 'PERSENTASE PENANGANAN SAMPAH':
      return <Trash2 className="w-6 h-6" />;
    case 'PERSENTASE PENCEMARAN STATUS MUTU AIR':
      return <Droplets className="w-6 h-6" />;
    case 'CAKUPAN PENGHIJAUAN WILAYAH RAWAN LONGSOR DAN SUMBER MATA AIR':
      return <Mountain className="w-6 h-6" />;
    case 'CAKUPAN PENGAWASAN TERHADAP PELAKSANAAN UKL-UPL':
      return <FileCheck className="w-6 h-6" />;
    default:
      return <TreePine className="w-6 h-6" />;
  }
};

const CategoryCard = ({ data }) => {
  const trendIndicator = (current, previous) => {
    if (current === 0 || previous === 0) return null;
    const diff = ((current - previous) / previous) * 100;
    return (
      <span className={`text-sm ${diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {diff > 0 ? '↑' : '↓'} {Math.abs(diff).toFixed(1)}%
      </span>
    );
  };

  return (
    <Link href={`/detailEnvirontmentLingkungan/${data.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-green-100 cursor-pointer">
        <div className="bg-green-50 p-4 border-b border-green-100">
          <div className="flex items-center space-x-3">
            <div className="text-green-600">
              {getIconForCategory(data.capaian_pembangunan)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 line-clamp-2">
                {data.capaian_pembangunan}
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-baseline">
            <div className="text-2xl font-bold text-green-700">
              {data.nilai_kondisi_lingkungan.toFixed(1)}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{data.satuan}</span>
              {data.previousValue && trendIndicator(data.nilai_kondisi_lingkungan, data.previousValue)}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Tahun {data.tahun}
          </div>
        </div>
      </div>
    </Link>
  );
};

const EnvironmentalDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState('all');
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opendata.majalengkakab.go.id/api/bigdata/dlh/192-kondisi-lingkungan-hidup-di-kabupaten-majalengka-2');
        const result = await response.json();
        
        // Process data to add previous year values for trend indicators
        const processedData = result.data.map(item => {
          const previousYearData = result.data.find(d => 
            d.capaian_pembangunan === item.capaian_pembangunan && 
            d.tahun === item.tahun - 1
          );
          return {
            ...item,
            previousValue: previousYearData?.nilai_kondisi_lingkungan
          };
        });
        
        // Get unique years for filter
        const years = [...new Set(processedData.map(item => item.tahun))].sort((a, b) => b - a);
        setAvailableYears(years);
        setSelectedYear(years[0].toString()); // Set most recent year as default
        
        setData(processedData);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // Filter data based on selected year
  const filteredData = selectedYear === 'all' 
    ? data 
    : data.filter(item => item.tahun.toString() === selectedYear);

  // Group filtered data by year
  const groupedByYear = filteredData.reduce((acc, item) => {
    if (!acc[item.tahun]) {
      acc[item.tahun] = [];
    }
    acc[item.tahun].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light text-green-800 mb-8 text-center">
          Kondisi Lingkungan Hidup Kabupaten Majalengka
        </h1>

        {/* Year Filter */}
        <div className="mb-8 flex justify-end">
          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tahun</SelectItem>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  Tahun {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {Object.entries(groupedByYear)
          .sort(([yearA], [yearB]) => yearB - yearA)
          .map(([year, yearData]) => (
            <div key={year} className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-semibold text-green-700">
                  Tahun {year}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {yearData.map((item) => (
                  <CategoryCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EnvironmentalDashboard;