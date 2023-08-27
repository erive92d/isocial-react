# iSocial README

Welcome to the iSocial project! This is a social media web application built using the MERN (MongoDB, Express, React, Node.js) stack along with Vite as the build tool. iSocial allows users to create accounts, make posts, and interact through comments, providing a platform for social interaction.

![Screen Shot 2023-08-26 at 8 33 17 PM](https://github.com/erive92d/isocial-react/assets/110507887/4c3b6649-16a5-49a4-9fa3-9b200dcf38e1)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

iSocial is a full-stack web application that focuses on creating a social media experience. Users can sign up, log in, share posts, and engage with others by adding comments to posts. The application utilizes the MERN stack for its robustness and real-time capabilities, while Vite is used for efficient module-based development.

## Features

- User Authentication: Users can create accounts and log in securely.
- Post Creation: Authenticated users can create new posts to share with the community.
- Commenting: Users can comment on posts to express their thoughts and opinions.
- Real-time Updates: Real-time capabilities enhance user experience when new comments or posts are added.
- User Profiles: Users have profiles displaying their posts and other relevant information.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed.
- MongoDB instance up and running.

### Installation

1. Clone the repository: `git clone https://github.com/erive92d/isocial-react.git`
2. Navigate to the project directory: `cd isocial-react`
3. Install dependencies: `npm install`


## Usage

1. Start the server: In the project directory, run `npm start`.
2. Start the client: Navigate to the client directory (`cd client`) and run `npm run dev`.

## Folder Structure

```
isocial-react/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── ...
│
├── .gitignore
├── package.json
└── README.md
```

## Technologies Used

- MongoDB: Database for storing user data, posts, and comments.
- Express: Backend framework for handling HTTP requests and routes.
- React: Frontend library for building user interfaces.
- Node.js: Runtime environment for executing JavaScript on the server.
- Vite: Build tool for fast and efficient development.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding! If you have any questions or need further assistance, please don't hesitate to reach out.
