import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    if (!file) throw new Error("No file uploaded");
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./Public/uploads/${file.name}`;
    await writeFile(path, buffer, (err) => {
      throw new Error(err);
    });
    return NextResponse.json(
      { message: "File uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error : ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
