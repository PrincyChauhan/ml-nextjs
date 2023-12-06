import { currentProfilePages } from "@/hooks/current-profile";
import axios from "axios";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfilePages(req as unknown as NextApiRequest);

    const data = await req.json();

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${data.graphTypes}`
    );

    const userHistories = await db.userHistory.create({
      data: {
        accuracy: res.data.accuracy,
        userId: profile?.id!,
        graphType: data.graphTypes,
      },
    });
    return NextResponse.json(
      {
        image_url: res.data.image_url,
        accuracy: res.data.accuracy
          ? parseFloat(res.data.accuracy).toFixed(2)
          : 0,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (e) {
    console.log(`[IMAGE_ERROR] ${e}`);
    return new NextResponse("Internal error", { status: 500 });
  }
}
