import { NextResponse } from "next/server";

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";
const REPO_OWNER = "Imgkl";
const REPO_NAME = "0xff";
const BRANCH = "main";

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
    // Remove leading slash and format path for GitHub
    const githubPath = filePath.replace(/^\//, "");
    const url = `${GITHUB_RAW_BASE}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${githubPath}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: `File not found: ${filePath}` },
          { status: 404 }
        );
      }
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const content = await response.text();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error fetching component source from GitHub:", error);
    return NextResponse.json(
      { error: `Failed to fetch file: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
