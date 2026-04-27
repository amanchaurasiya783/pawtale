export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const VIDEO_ID = new URL(req.url).searchParams.get("reelsId");
    if (!VIDEO_ID) throw new Error("Reels ID is required");
    const reels = await fetch(`https://www.youtube.com/watch?v=${VIDEO_ID}`);
    if (!reels.ok) {
      throw new Error("YouTube API failed");
    }
    const data = await reels.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("error : ", error);
    return NextResponse.json(
      { message: `Fetching Video Failed: ${error.message}` },
      { status: 500 },
    );
  }
}
