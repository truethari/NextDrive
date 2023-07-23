const Drives = [
  {
    id: "1",
    name: "Google Drive 1",
    service: "gdrive",
    root: "", // leave blank to use root folder
    env: {
      client_id: "GOOGLE_CLIENT_ID",
      client_secret: "GOOGLE_CLIENT_SECRET",
      refresh_token: "GOOGLE_REFRESH_TOKEN",
    },
  },
];

const Main = {
  password: "$2a$10$FMw1yXJ3udd9WIOxVQU0IO4bozqDkbcwvG680.heIZt5TzPvjdGae",
  protected_routes: ["1/Test"],
};

export default Drives;
export { Main };
