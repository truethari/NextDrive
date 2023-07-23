import { NextResponse } from "next/server";
import fetch from "node-fetch";
import cache from "memory-cache";

import Drives from "@/config/drives";
import Drive from "@/lib/gdriveClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { driveId, fileId } = Object.fromEntries(searchParams.entries());

  if (!driveId) return NextResponse.json({ message: "driveId is required" }, { status: 400 });
  if (!fileId) return NextResponse.json({ message: "fileId is required" }, { status: 400 });

  const drive = Drives.find((drive) => drive.id === driveId);
  if (!drive) return NextResponse.json({ message: "drive not found" }, { status: 404 });

  const AuthDrive = Drive(driveId);

  let token;

  async function getToken() {
    const res = await AuthDrive.files.list({
      q: "'root' in parents",
    });

    return res.config.headers.Authorization;
  }

  if (cache.get(`gdrive-${driveId}-token`)) token = cache.get(`gdrive-${driveId}-token`);
  else token = await getToken();

  let response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: {
      Authorization: token,
    },
  });

  if (response.status === 401) {
    token = await getToken();

    response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 401) {
      return NextResponse.json({ message: "permission denied" }, { status: 401 });
    }
  }

  if (response.status === 403)
    return NextResponse.json({ message: "permission denied" }, { status: 403 });

  if (response.status === 404)
    return NextResponse.json({ message: "file not found" }, { status: 404 });

  const contentType = response.headers.get("content-type");
  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
    },
  });
}
