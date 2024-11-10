import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const laporan = await prisma.laporanMasyarakat.findMany();
  return new Response(JSON.stringify(laporan), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  const laporan = await prisma.laporanMasyarakat.create({ data });
  return new Response(JSON.stringify(laporan), { status: 201 });
}

// Tambahkan logika DELETE
export async function DELETE(request) {
  const { id } = await request.json(); // Ambil id dari body request

  try {
    const laporan = await prisma.laporanMasyarakat.delete({
      where: { id: parseInt(id) },
    });
    return new Response(JSON.stringify(laporan), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Laporan tidak ditemukan" }), { status: 404 });
  }
}