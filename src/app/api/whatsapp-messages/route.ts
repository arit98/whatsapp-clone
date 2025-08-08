import dbConnect from "@/config/db";
import { WhatsappMessage } from "@/models/whatsapp";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const messages = await WhatsappMessage.find();

  console.log(messages);

  return NextResponse.json({ result: messages });
}