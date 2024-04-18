import http from "node:http";
import fs from "node:fs/promises"; // Użycie promisów dla lepszej obsługi asynchroniczności
import path from "node:path";

const guestbookFile = path.resolve("src/guestbook.txt");

async function readGuestbook() {
  try {
    return (await fs.readFile(guestbookFile, { encoding: "utf-8" })) || "";
  } catch (err) {
    console.log("File not found. Creating a new one.");
    await fs.writeFile(guestbookFile, ""); // Tworzenie pliku, jeśli nie istnieje
    return "";
  }
}

async function addEntryToGuestbook(name, content) {
  const sanitizedContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Podstawowe sanitowanie
  const entry = `<h1>${name}</h1><p>${sanitizedContent}</p>\n`;
  try {
    await fs.appendFile(guestbookFile, entry);
    console.log("Entry added successfully.");
  } catch (err) {
    console.error("Failed to save entry:", err);
    throw new Error("Failed to save the entry.");
  }
}

async function serveForm(request, response, data) {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Księga gości</title>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="p-4">
        `);
  if (data) {
    response.write(`<div class="bg-light p-3 rounded mb-3">${data}</div>`);
  }
  response.write(`
            <form action="/" method="POST" class="p-4 bg-white shadow rounded">
                <h1 class="h3 mb-3 font-weight-normal">Nowy wpis:</h1>
                <div class="form-group">
                    <label for="name">Twoje imię i nazwisko</label>
                    <input type="text" id="name" name="name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="content">Treść wpisu</label>
                    <textarea id="content" name="content" class="form-control" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Dodaj wpis</button>
            </form>
        </body>
        </html>
        `);
  response.end();
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/") {
      const entries = await readGuestbook();
      await serveForm(request, response, entries);
    } else if (request.method === "POST" && request.url === "/") {
      let body = "";
      request.on("data", (chunk) => (body += chunk.toString()));
      request.on("end", async () => {
        const params = new URLSearchParams(body);
        const name = params.get("name");
        const content = params.get("content");
        try {
          await addEntryToGuestbook(name, content);
          response.writeHead(303, { Location: "/" });
          response.end();
        } catch (error) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Failed to add the entry.");
        }
      });
    } else {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("404 Not Found");
      response.end();
    }
  } catch (err) {
    console.error("Unexpected server error:", err);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Internal Server Error");
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
