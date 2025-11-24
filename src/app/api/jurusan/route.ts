import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = getConnection()
    const [result] = await conn.query("SELECT * FROM jurusan");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal ambil data", error },
      { status: 500 }
    );
  }
}
