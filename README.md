# File Upload Example in Node.js

## Overview

This project is a Node.js application that demonstrates how to upload files using the built-in `http` module and the `multiparty` middleware. The application allows users to upload files to a designated directory on the server, providing a simple interface for file uploads.

## Features

- Supports file uploads via a web form.
- Automatically creates a directory for uploaded files if it does not exist.
- Provides feedback to the user upon successful upload or error.

## How File Upload Works

The application is structured as follows:

1. **Server Setup**: The application creates an HTTP server that listens for incoming requests on a specified port (3000).

2. **Directory Management**: Before handling uploads, the application checks for the existence of a directory named `stream` in the current working directory. If the directory does not exist, it is created using `mkdirSync`.

3. **Handling Requests**:
   - When a POST request is made to the root URL (`/`), the server uses the `multiparty` library to parse the incoming form data.
   - The `part` event is triggered for each file part in the form. A writable stream is created for each file, and the file data is piped into this stream.
   - Upon successful completion of the file write operation, the server responds with a success message, including the name of the uploaded file.
   - If an error occurs during the file upload, the server responds with an error message.

4. **HTML Form**: For GET requests to the root URL, the server responds with an HTML form that allows users to select a file for upload. The form uses `multipart/form-data` encoding to support file uploads.

### Example Code Explanation

- **File System Operations**: The application uses `fs` to manage file system operations, ensuring that the upload directory exists.
- **HTTP Server**: The server is created using the `http` module, which handles incoming requests and sends appropriate responses.
- **File Upload Handling**: The `multiparty` library is used to parse the incoming form data, allowing for easy handling of
