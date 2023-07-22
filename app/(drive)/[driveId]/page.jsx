"use client";

import React, { useState, useEffect } from "react";

import Drives from "@/config/drives";
import Loading from "@/components/common/loading";
import FilesTable from "@/components/common/filesTable";

export default function Drive({ params }) {
  const [loading, setLoading] = useState(true);
  const [isDriveExists, setIsDriveExists] = useState(false);

  useEffect(() => {
    setIsDriveExists(!!Drives.find((drive) => drive.id === params.driveId));
    setLoading(false);
  }, [params.driveId]);

  const [data, setData] = useState(null);

  return (
    <>
      {loading ? (
        <>
          <Loading />{" "}
        </>
      ) : (
        <div className="container mt-[100px]">
          {isDriveExists ? (
            <>
              <FilesTable data={data} />
            </>
          ) : (
            <>
              <h1>Drive not found</h1>
            </>
          )}
        </div>
      )}
    </>
  );
}
