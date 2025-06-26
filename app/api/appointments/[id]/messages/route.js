import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // adjust path if needed
import { getToken } from "next-auth/jwt";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const messages = await prisma.message.findMany({
      where: { appointmentId: id },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const token = await getToken({ req });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const body = await req.json();
  const { type, text, url, name } = body;  // use url and name to align with frontend

  try {
    const newMessage = await prisma.message.create({
      data: {
        appointmentId: id,
        fromClient: token.role === "CLIENT",
        type,
        text: text ?? null,    // if text not present, store null
        url: url ?? null,      // if file url not present, store null
        name: name ?? null,    // if file name not present, store null
      },
    });
    return NextResponse.json(newMessage);
  } catch (err) {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
