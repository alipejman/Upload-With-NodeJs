const { createWriteStream, existsSync, mkdirSync } = require("fs");
const http = require("http");
const multiparty = require("multiparty");
const PORT = 3000;

// اطمینان از وجود دایرکتوری stream
const uploadDir = `${process.cwd()}/stream`;
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/" && method === "POST") {
    let form = new multiparty.Form();
    form.parse(req);

    form.on("part", (part) => {
      const writeStream = createWriteStream(`${uploadDir}/${part.filename}`);
      part.pipe(writeStream);

      writeStream.on("close", () => {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Upload NodeJs</title>
          </head>
          <body>
              <h1> File Uploaded Successfully: ${part.filename} </h1>
          </body>
          </html>
        `);
      });

      writeStream.on("error", (err) => {
        res.writeHead(500, { "content-type": "text/html" });
        res.end(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Upload NodeJs</title>
          </head>
          <body>
              <h1> Error Uploading File: ${err.message} </h1>
          </body>
          </html>
        `);
      });
    });
  } else {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Upload NodeJs</title>
      </head>
      <body>
          <form enctype="multipart/form-data" method="POST" action="/">
              <input type="file" name="upload-file" required>
              <button>Upload File</button>
          </form>
      </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}: http://localhost:${PORT}`);
});
