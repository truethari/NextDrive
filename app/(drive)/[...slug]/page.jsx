"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Drives from "@/config/drives";
import Loading from "@/components/common/loading";
import FilesTable from "@/components/common/filesTable";

export default function Drive({ params }) {
  const [slug, setSlug] = useState([]);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(true);
  const [drive, setDrive] = useState(null);
  const [isDriveExists, setIsDriveExists] = useState(false);

  useEffect(() => {
    setSlug(params.slug);
  }, [params]);

  useEffect(() => {
    if (slug && slug.length > 1) {
      const path = slug.slice(1);
      const newPath = path.join("/");
      setPath(newPath);
    }

    const drive = Drives.find((drive) => drive.id === slug[0]);
    if (drive) {
      setDrive(drive);
      setIsDriveExists(true);
    }
  }, [slug]);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (isDriveExists) {
      if (!path) {
        axios
          .get(`/api/services/${drive.service}?driveId=${slug[0]}`)
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(`/api/services/${drive.service}?driveId=${slug[0]}&path=${path}`)
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [isDriveExists, slug, drive, path]);

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
              <FilesTable data={data} path={`${slug[0] && slug[0]}/${path && path}`} slug={slug} />
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
