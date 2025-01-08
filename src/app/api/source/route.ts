import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json(
      { error: "No file path provided" },
      { status: 400 }
    );
  }

  try {
    // Remove leading slash and convert to absolute path
    const absolutePath = path.join(process.cwd(), filePath.replace(/^\//, ""));
    const content = await fs.readFile(absolutePath, "utf-8");
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error reading component source:", error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
