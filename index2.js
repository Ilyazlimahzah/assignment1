const http = require("http");
const url = require("url");
const querystring = require("querystring");
// Sample data
let books = [
  { id: 1, title: "Book 1", author: "Author A" },
  { id: 2, title: "Book 2", author: "Author B" },
  { id: 3, title: "Book 3", author: "Author A" },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;
  const queryParams = querystring.parse(parsedUrl.query);

  if (req.method === "GET") {
    if (path === "/books") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(books));
    } else if (path.startsWith("/books/author")) {
      const author = queryParams.author;
      console.log(author);
      const authorBooks = books.filter((book) => book.author === author);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(authorBooks));
    }
  } else if (req.method === "POST") {
    // Logic for handling PUT requests
    if (path === "/books") {
      let data = '';

      // Listen for the 'data' event
      req.on('data', (chunk) => {
          data += chunk;
      });
  
      // Listen for the 'end' event
      req.on('end', () => {
          // Parse the received data (assuming it's JSON)
          const parsedData = JSON.parse(data);
          const newBook = { id: books.length + 1, ...parsedData}
          books.push(newBook)
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(books));
      });
      // res.writeHead(200, { "Content-Type": "application/json" });
      // res.end(JSON.stringify(books));
    } else if (path.startsWith("/books/author")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end('Book author post');
    }
  } else if (req.method === "DELETE") {
    // Logic for handling DELETE requests
    if (path === "/books") {
          books = []
          res.writeHead(204, { "Content-Type": "application/json" });
          res.end(JSON.stringify(books));
    } else if (path.startsWith("/books/author")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end('Book/author deleted');
    }
  } else if (req.method === "PUT") {
    if (path === "/books") {
      let data = '';

      // Listen for the 'data' event
      req.on('data', (chunk) => {
          data += chunk;
      });
  
      // Listen for the 'end' event
      req.on('end', () => {
          // Parse the received data (assuming it's JSON)
          const parsedData = JSON.parse(data);
          const newBook = { id: books.length + 1, ...parsedData}
          books.splice(Number(parsedData.id) - 1, 1, newBook);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(books));
      });
      // res.writeHead(200, { "Content-Type": "application/json" });
      // res.end(JSON.stringify(books));
    } else if (path.startsWith("/books/author")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end('Book put');
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
