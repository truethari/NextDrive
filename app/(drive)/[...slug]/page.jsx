"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Drives, { Main } from "@/config/drives";
import Loading from "@/components/common/loading";
import FilesTable from "@/components/common/filesTable";
import Login from "@/components/common/login";
import NotFound from "@/components/common/notFound";

export default function Drive({ params }) {
  const [slug, setSlug] = useState([]);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(true);
  const [drive, setDrive] = useState(null);
  const [isDriveExists, setIsDriveExists] = useState(false);
  const [auth, setAuth] = useState(false);

  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const [folderNotExists, setFolderNotExists] = useState(false);

  const onPasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = () => {
    async function login() {
      try {
        const response = await axios.post("/api/auth", {
          password,
        });

        if (response.data.token) {
          sessionStorage.setItem("token", response.data.token);
          setOpen(false);
          setAuth(true);
        } else {
          alert("Invalid Password");
        }
      } catch (error) {
        console.log(error);
        alert("Invalid Password");
      }
    }

    login();
  };

  useEffect(() => {
    async function checkAuth() {
      const token = sessionStorage.getItem("token");

      if (token) {
        const res = await axios.get("/api/auth", {
          headers: {
            "x-auth-token": token,
          },
        });
        if (res.data.success) setAuth(true);
        else sessionStorage.removeItem("token");
      } else {
        setOpen(true);
      }
    }

    const realPath = params.slug.join("/");
    const isProtected = Main.protected_routes.find((route) => route === realPath);
    if (!isProtected) setAuth(true);
    else checkAuth();

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
            if (err.response.status === 404) {
              setFolderNotExists(true);
              setLoading(false);
            }
          });
      }
    }
  }, [isDriveExists, slug, drive, path]);

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {!auth ? (
            <>
              <div className="flex justify-center items-center h-screen mt-[-35px]">
                <h1>Not Authenticated</h1>
              </div>
            </>
          ) : (
            <div className="container mt-[100px]">
              {isDriveExists ? (
                <>
                  {!folderNotExists ? (
                    <>
                      <FilesTable
                        data={data}
                        path={`${slug[0] && slug[0]}/${path && path}`}
                        slug={slug}
                        service={drive.service}
                      />
                    </>
                  ) : (
                    <NotFound />
                  )}
                </>
              ) : (
                <>
                  <h1>Drive not found</h1>
                </>
              )}
            </div>
          )}
        </>
      )}
      <Login
        open={open}
        setOpen={setOpen}
        password={password}
        onPasswordChange={onPasswordChange}
        onLogin={handleLogin}
      />
    </>
  );
}
