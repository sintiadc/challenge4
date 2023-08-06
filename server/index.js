/**
 * Impor HTTP Standar Library dari Node.js
 * Hal ini nantinya akan digunakan untuk membuat
 * HTTP Server
 */
const http = require('http');
const { PORT = 8000 } = process.env; // Ambil port dari environment variable

const fs = require('fs');
const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, '..', 'public');

function getHTML(htmlFileName) {
  const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
  return fs.readFileSync(htmlFilePath, 'utf-8');
}

function akses(req, res) {
  const filePath = path.join(PUBLIC_DIRECTORY, req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(getHTML('404.html'));
    } else {
      const extension = path.extname(filePath);
      let contentType = 'text/plain';
      if (extension === '.html') {
        contentType = 'text/html';
      } else if (extension === '.jpg' || extension === '.jpeg') {
        contentType = 'image/jpeg';
      } else if (extension === '.png') {
        contentType = 'image/png';
      } else if (extension === '.css') {
        contentType = 'text/css';
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

function onRequest(req, res) {
  switch (req.url) {
    case '/':
      res.writeHead(200);
      res.end(getHTML('landingPage.html'));
      return;
    case '/cars':
      res.writeHead(200);
      res.end(getHTML('cariMobil.html'));
      return;
    default:
      //  (gambar, CSS, notfound)
      akses(req, res);
      return;
  }
}

const server = http.createServer(onRequest);

// Jalankan server
server.listen(PORT, '127.0.0.1', () => {
  console.log('Server sudah berjalan, silahkan buka http://127.0.0.1:%d', PORT);
});
