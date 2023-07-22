const { google } = require("googleapis");

import Drives from "@/config/drives";

function Drive(driveId) {
  const foundDrive = Drives.find((drive) => drive.id === driveId);
  const credentials = {
    type: "authorized_user",
    client_id: process.env[foundDrive.env.client_id],
    client_secret: process.env[foundDrive.env.client_secret],
    refresh_token: process.env[foundDrive.env.refresh_token],
  };

  const googleClient = google.auth.fromJSON(credentials);

  return google.drive({ version: "v3", auth: googleClient });
}

module.exports = Drive;
