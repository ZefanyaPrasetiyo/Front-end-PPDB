import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function PUT(req, context) {
  try {
    const { id } = await context.params; // ← WAJIB pakai await

    const { metode_pembayaran } = await req.json();

    const db = await getConnection();

    const query = `
      UPDATE ppdb
      SET metode_pembayaran = ?
      WHERE id = ?
    `;

    await db.query(query, [metode_pembayaran, id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
