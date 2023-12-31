import React from "react";
import Link from "next/link";

import SelectIcon, { HomeIcon, DownloadIcon } from "@/components/icons";

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function formatDateTime(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString();
}

function checkFileType(filename) {
  const extension = filename.split(".").pop();
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg"];
  const audioExtensions = ["mp3", "wav", "ogg"];
  const videoExtensions = ["mp4", "mkv", "avi", "webm"];
  const pdfExtensions = ["pdf"];
  const zipExtensions = ["zip", "rar", "7z", "tar", "gz", "bz2"];

  if (imageExtensions.includes(extension)) return "image";
  else if (audioExtensions.includes(extension)) return "audio";
  else if (videoExtensions.includes(extension)) return "video";
  else if (pdfExtensions.includes(extension)) return "pdf";
  else if (zipExtensions.includes(extension)) return "zip";
  else return "file";
}

export default function FilesTable({ data, path, slug, service }) {
  return (
    <>
      <div className="flex pb-5 pl-6">
        <Link href={`/${slug[0]}`} className="flex">
          <HomeIcon />
          <div className="flex items-center bg-gray-200 dark:bg-gray-600 pl-2 pr-2 rounded-lg font-semibold text-sm text-gray-700 dark:text-gray-100">
            Home
          </div>
        </Link>
        {slug.map((folder, index) =>
          index === 0 ? null : (
            <React.Fragment key={folder.id}>
              <span className="mx-2">/</span>
              <div className="flex items-center bg-gray-200 dark:bg-gray-600 pl-2 pr-2 rounded-lg font-semibold text-sm text-gray-700 dark:text-gray-100">
                <Link href={`/${slug[0]}/${slug.slice(1, index + 1).join("/")}`}>
                  {decodeURIComponent(folder)}
                </Link>
              </div>
            </React.Fragment>
          ),
        )}
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs border-b border-gray-700 dark:border-gray-600 text-gray-700 bg-gray-50 dark:bg-zinc-900 dark:text-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 w-[50%]">
                Name
              </th>
              <th scope="col" className="px-6 py-3 w-[10%]">
                Size
              </th>
              <th scope="col" className="px-6 py-3 w-[30%]">
                Last Modified
              </th>
              <th scope="col" className="px-6 py-3 w-[10%]"></th>
            </tr>
          </thead>

          <tbody>
            {data.folders.map((folder) => (
              <tr
                key={folder.id}
                className="bg-white border-b dark:bg-zinc-900 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700"
              >
                <td scope="row" className="px-6 py-2 font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <SelectIcon type="folder" />
                    <Link href={`/${path}/${folder.name}`}>{folder.name}</Link>
                  </div>
                </td>
                <td className="px-6 py-2">-</td>
                <td className="px-6 py-2">{formatDateTime(folder.modifiedTime)}</td>
                <td className="px-6 py-2"></td>
              </tr>
            ))}

            {data.files.map((file) => (
              <tr
                key={file.id}
                className="bg-white border-b dark:bg-zinc-900 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700"
              >
                <td scope="row" className="px-6 py-2 font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <SelectIcon type={checkFileType(file.name)} />
                    <a
                      href={
                        service === "gdrive"
                          ? `/api/services/gdrive/download?driveId=${slug[0]}&fileId=${file.id}`
                          : "#"
                      }
                      download
                    >
                      {file.name}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-2">{formatBytes(file.size)}</td>
                <td className="px-6 py-2">{formatDateTime(file.modifiedTime)}</td>
                <td className="px-6 py-2">
                  <a
                    href={
                      service === "gdrive"
                        ? `/api/services/gdrive/download?driveId=${slug[0]}&fileId=${file.id}`
                        : "#"
                    }
                    download
                  >
                    <DownloadIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
