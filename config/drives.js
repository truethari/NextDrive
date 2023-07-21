const Drives = [
  {
    id: "1",
    name: "Google Drive 1",
    service: "google",
    parent_folder_id: "", // leave blank to use root folder
    password: "", // leave blank if no password
    env: {
      client_id: "GOOGLE_CLIENT_ID",
      client_secret: "GOOGLE_CLIENT_SECRET",
      refresh_token: "GOOGLE_REFRESH_TOKEN",
    },
  },
];

export default Drives;
