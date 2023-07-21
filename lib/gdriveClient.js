const { google } = require("googleapis");

const credentials = {
  type: "authorized_user",
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
};

const googleClient = google.auth.fromJSON(credentials);

const Drive = google.drive({ version: "v3", auth: googleClient });

module.exports = Drive;
