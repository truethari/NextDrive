# NextDrive 🦊: Your Gateway to Public Cloud Drives

---

![NextDrive Logo](/public/images/nextdrive-cover.png)

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#-features)
- [Prerequisites](#prerequisites)
- [Configuration](#-configuration)
- [Installation](#installation)
  - [Development Server](#-development-server)
  - [Production Build](#-production-build)
- [License](#-license)
- [Contributing](#-contributing)

## Introduction

NextDrive is a web application built using NextJS, designed to provide seamless access and management of public cloud drives over the internet. With NextDrive, users can effortlessly connect and interact with various cloud storage services, making data management and collaboration more efficient and convenient.

## 📚 Features

- **Cloud Storage Integration**: NextDrive supports multiple cloud storage services, including Google Drive. Users can connect to their cloud storage accounts and manage their files and folders directly from the NextDrive web application.
- **Public Access**: NextDrive allows share their files and folders with others by generating public links.
- **User Management**: NextDrive supports user authentication. Users can create their own accounts and manage their files and folders privately.
- **Responsive Design:** NextDrive adapts perfectly to various devices for a seamless user experience.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [NPM](https://www.npmjs.com/) (v8 or higher)

## ⚙️ Configuration

Navigate to the project directory and go to the `config` folder. Open file named `drives.js` and you will see the following:

```js
const Drives = [
    {
        id: "1",
        name: "Google Drive 1",
        service: "gdrive",
        root: "", // leave blank to use root folder
        env: {
            client_id: "GOOGLE_CLIENT_ID_1",
            client_secret: "GOOGLE_CLIENT_SECRET_1",
            refresh_token: "GOOGLE_REFRESH_TOKEN_1",
        },
    },
    {
        id: "2",
        name: "Google Drive 2",
        service: "gdrive",
        root: "", // leave blank to use root folder
        env: {
            client_id: "GOOGLE_CLIENT_ID_2",
            client_secret: "GOOGLE_CLIENT_SECRET_2",
            refresh_token: "GOOGLE_REFRESH_TOKEN_2",
        },
    },
];

const Main = {
    password: "$2a$10$FMw1yXJ3udd9WIOxVQU0IO4bozqDkbcwvG680.heIZt5TzPvjdGae",
    protected_routes: ["1/Protected%20Folder"],
};
```

### Drives

The `Drives` array contains the list of cloud storage services that NextDrive supports. Each drive object has the following properties:

- `id`: The unique identifier of the drive.
- `name`: The name of the drive.
- `service`: The name of the cloud storage service. Currently, NextDrive only supports Google Drive.
- `root`: The root folder of the drive. Leave this blank to use the root folder.
- `env`: The environment variables required to connect to the drive. For this, you have to add the environment variables names.
  - `client_id`: The client ID of the Google Drive API.
  - `client_secret`: The client secret of the Google Drive API.
  - `refresh_token`: The refresh token of the Google Drive API.

### Main

The `Main` object contains the following properties:

- `password`: The password to access the protected routes. This is a hashed password. To generate a hashed password, you can use [bcrypt](https://www.npmjs.com/package/bcrypt).
- `protected_routes`: The list of protected routes. These routes are only accessible after entering the password.

### Environment Variables

NextDrive uses environment variables to connect to the cloud storage services. To add environment variables, create a `.env.local` file in the project directory and add the following:

```env
# GOOGLE DRIVE 1
GOOGLE_CLIENT_ID_1=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET_1=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN_1=YOUR_GOOGLE_REFRESH_TOKEN

# GOOGLE DRIVE 2
GOOGLE_CLIENT_ID_2=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET_2=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN_2=YOUR_GOOGLE_REFRESH_TOKEN

# JWT
JWT_SECRET=secret
```

## Installation

1. Clone the repository: `git clone https://github.com/truethari/NextDrive.git`
2. Navigate to the project directory: `cd NextDrive`
3. Install dependencies: `npm install`

### 🛠 Development Server

To run NextDrive on your local machine:

```bash
npm run dev
```

### 🚀 Production Build

To build NextDrive for production:

```bash
npm run build
```

To run NextDrive in production mode:

```bash
npm run start
```

## 📄 License

This project is licensed under the [MIT](https://github.com/truethari/NextDrive/blob/master/LICENSE) License.


## 🌱 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
