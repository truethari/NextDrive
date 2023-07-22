import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import Drives from "@/config/drives";

export default function DriveSelector() {
  return (
    <>
      {Drives.map((drive, index) => (
        <Link href={`/${drive.id}`} key={index}>
          <Card className="w-[100%] mb-5">
            <CardContent className="p-5">
              <div className="flex items-center">
                {drive.service === "gdrive" && (
                  <>
                    <Image
                      src="/images/services/google-drive.png"
                      alt="Google Drive"
                      width={50}
                      height={50}
                    />
                    <div className="ml-[30px] font-semibold text-xl dark:text-gray-100">
                      {drive.name}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
