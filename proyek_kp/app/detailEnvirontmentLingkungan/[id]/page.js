'use client';
import React from 'react';
import { TreePine, Droplets, Trash2, FileCheck, Mountain, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const getIconForCategory = (category) => {
  switch (category) {
    case 'PERSENTASE PENANGANAN SAMPAH':
      return <Trash2 className="w-8 h-8" />;
    case 'PERSENTASE PENCEMARAN STATUS MUTU AIR':
      return <Droplets className="w-8 h-8" />;
    case 'CAKUPAN PENGHIJAUAN WILAYAH RAWAN LONGSOR DAN SUMBER MATA AIR':
      return <Mountain className="w-8 h-8" />;
    case 'CAKUPAN PENGAWASAN TERHADAP PELAKSANAAN UKL-UPL':
      return <FileCheck className="w-8 h-8" />;
    default:
      return <TreePine className="w-8 h-8" />;
  }
};

const DetailPage = ({ params }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [historicalData, setHistoricalData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opendata.majalengkakab.go.id/api/bigdata/dlh/192-kondisi-lingkungan-hidup-di-kabupaten-majalengka-2');
        const result = await response.json();
        
        // Find the specific data point
        const currentData = result.data.find(item => item.id.toString() === params.id);
        
        // Get historical data for the same category
        const categoryHistory = result.data.filter(
          item => item.capaian_pembangunan === currentData.capaian_pembangunan
        ).sort((a, b) => b.tahun - a.tahun);

        setData(currentData);
        setHistoricalData(categoryHistory);
        setLoading(false);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data');
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || 'Data tidak ditemukan'}
      </div>
    );
  }

  const calculateTrend = (current, previous) => {
    if (!previous) return null;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Dashboard
        </Link>

        <Card className="mb-8">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <div className="flex items-center space-x-4">
              <div className="text-green-600">
                {getIconForCategory(data.capaian_pembangunan)}
              </div>
              <div>
                <CardTitle className="text-2xl text-green-800">
                  {data.capaian_pembangunan}
                </CardTitle>
                <p className="text-sm text-green-600 mt-1">
                  Data Tahun {data.tahun}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Nilai Saat Ini
                </h3>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-green-700">
                    {data.nilai_kondisi_lingkungan.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {data.satuan}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Tren Perubahan
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  {historicalData.length > 1 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-2">
                        Dibandingkan tahun sebelumnya
                      </div>
                      {calculateTrend(
                        data.nilai_kondisi_lingkungan,
                        historicalData[1]?.nilai_kondisi_lingkungan
                      ) !== null && (
                        <div className={`text-2xl font-bold ${
                          calculateTrend(
                            data.nilai_kondisi_lingkungan,
                            historicalData[1]?.nilai_kondisi_lingkungan
                          ) > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {calculateTrend(
                            data.nilai_kondisi_lingkungan,
                            historicalData[1]?.nilai_kondisi_lingkungan
                          ).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historical Data */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historicalData.map((item, index) => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-lg ${
                    index === 0 ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Tahun {item.tahun}</div>
                      <div className="text-sm text-gray-600">{item.satuan}</div>
                    </div>
                    <div className="text-lg font-bold text-green-700">
                      {item.nilai_kondisi_lingkungan.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailPage;