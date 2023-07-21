import { NextResponse } from "next/server";

import Drive from "@/lib/gdriveClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { folderId } = Object.fromEntries(searchParams.entries());

  let res;
  let files;
  let folders;

  if (!folderId) {
    try {
      res = await Drive.files.list({
        q: "'root' in parents",
        fields: "files(id, name, mimeType, size, modifiedTime)",
      });
    } catch (e) {
      return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
  } else {
    try {
      res = await Drive.files.list({
        q: `'${folderId}' in parents`,
        fields: "files(id, name, mimeType, size, modifiedTime)",
      });
    } catch (e) {
      if (e.response.status === 404) {
        return NextResponse.json({ message: "folder not found" }, { status: 404 });
      } else {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
      }
    }
  }

  const data = res.data.files;
  folders = data.filter((file) => file.mimeType === "application/vnd.google-apps.folder");
  files = data.filter((file) => file.mimeType !== "application/vnd.google-apps.folder");

  return NextResponse.json({ folders, files });
}
