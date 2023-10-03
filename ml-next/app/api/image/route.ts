import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${data.graphTypes}`
    );

    return NextResponse.json(
      {
        image_url: res.data.image_url,
        
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
