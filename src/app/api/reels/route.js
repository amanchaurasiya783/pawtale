export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

const apiKey = process.env.YOUTUBE_API_KEY;
const baseURL = process.env.YOUTUBE_BASE_URL;
const reelsResult = process.env.REELS_RESULT;
const reelsVideoDuration = process.env.REELS_VIDEO_DURATION;

// get Reels from Youtube
export async function GET(req, { params }) {
  try {
    const searchString =
      new URL(req.url).searchParams.get("searchString") || "petcaring";
    const response = await fetch(
      `${baseURL}?part=snippet&key=${apiKey}&q=${searchString}&maxResults=${reelsResult}&type=video&videoDuration=${reelsVideoDuration}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new Error("YouTube API failed");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("error : ", error);
    return NextResponse.json(
      { message: `Fetching Shorts Failed: ${error.message}` },
      { status: 500 },
    );
  }
}
