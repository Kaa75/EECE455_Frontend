# How to Run
- Either download or clone the repository before opening it in an IDE of choice
- Make sure node.js and npm are installed (``npm install -g npm``)
- Run the front-end using ``npm start`` or ``npm run dev`` in the terminal
- You should get a link that when clicked displays the front-end page
- To get the full functionalities of each cipher, make sure you run the back-end according to its Read Me file
# Cryptography Project

This repository contains the **frontend** implementation of a cryptography project built using React. It provides a user-friendly interface for encrypting and decrypting messages using classical encryption techniques.

## Features

- Classical encryption algorithms such as Caesar Cipher, Vigenère Cipher, and others.
- User-friendly interface for inputting and visualizing encryption/decryption.
- Interactive functionality with real-time updates.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Kaa75/EECE455_Frontend.git
cd EECE455_Frontend
```

### Install Dependencies

Use npm or yarn to install the required dependencies:

```bash
npm install
# or
yarn install
```

### Start the Development Server

Run the following command to start the React development server:

```bash
npm start
# or
yarn start
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Backend Integration

To enable the cryptographic functionality, ensure the backend server is running. The backend for this project can be found in the following repository:
[Backend Repository](https://github.com/Kaa75/EECE455_Backend)

## Build for Production

To create a production build, run:

```bash
npm run build
# or
yarn build
```

The build files will be available in the `build/` directory. You can deploy these files to any static hosting service.

## Contributing

Feel free to fork the repository and submit pull requests for improvements or bug fixes. Contributions are always welcome!

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

If you encounter any issues or have questions, feel free to open an issue in this repository.

