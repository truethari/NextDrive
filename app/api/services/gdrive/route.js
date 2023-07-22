import { NextResponse } from "next/server";

import Drives from "@/config/drives";
import Drive from "@/lib/gdriveClient";

async function getDriveFiles(AuthDrive, query) {
  return await AuthDrive.files.list({
    q: query,
    fields: "files(id, name, mimeType, size, modifiedTime)",
  });
}

async function getFilesInRoot(AuthDrive) {
  const res = await getDriveFiles(AuthDrive, "'root' in parents");
  const data = res.data.files;

  let files;
  let folders;

  folders = data.filter((file) => file.mimeType === "application/vnd.google-apps.folder");
  files = data.filter((file) => file.mimeType !== "application/vnd.google-apps.folder");

  return NextResponse.json({ folders, files });
}

async function getFilesInFolderPath(AuthDrive, path) {
  const pathArray = path.split("/");

  const root = await getDriveFiles(AuthDrive, `'root' in parents and name = '${pathArray[0]}'`);

  if (!root.data.files[0]) {
    return NextResponse.json({ message: "folder not found" }, { status: 404 });
  }

  if (root.data.files[0].mimeType !== "application/vnd.google-apps.folder") {
    return NextResponse.json({ message: "folder not found" }, { status: 404 });
  }

  let folderId = root.data.files[0].id;

  for (let i = 1; i < pathArray.length; i++) {
    const res = await getDriveFiles(
      AuthDrive,
      `'${folderId}' in parents and name = '${pathArray[i]}'`,
    );
    try {
      if (res.data.files[0].mimeType !== "application/vnd.google-apps.folder") {
        return NextResponse.json({ message: "folder not found" }, { status: 404 });
      }
      folderId = res.data.files[0].id;
    } catch (e) {
      return NextResponse.json({ message: "folder not found" }, { status: 404 });
    }
  }

  const res = await getDriveFiles(AuthDrive, `'${folderId}' in parents`);
  const data = res.data.files;

  let files;
  let folders;

  folders = data.filter((file) => file.mimeType === "application/vnd.google-apps.folder");
  files = data.filter((file) => file.mimeType !== "application/vnd.google-apps.folder");

  return NextResponse.json({ folders, files });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { driveId, path } = Object.fromEntries(searchParams.entries());

  if (!driveId) return NextResponse.json({ message: "driveId is required" }, { status: 400 });

  const drive = Drives.find((drive) => drive.id === driveId);
  if (!drive) return NextResponse.json({ message: "drive not found" }, { status: 404 });

  const AuthDrive = Drive(driveId);

  if (!path) {
    try {
      return await getFilesInRoot(AuthDrive);
    } catch (e) {
      return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
  } else {
    let correctPath = path;
    if (correctPath[0] === "/") correctPath = path.slice(1);

    try {
      return await getFilesInFolderPath(AuthDrive, correctPath);
    } catch (e) {
      return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
  }
}
