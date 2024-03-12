const http = require("http");

const hostname = "localhost";
const port = 8900;

const requestListener = function (request, response) {
  response.writeHead(200);
  response.write("Fawaz Agbaje");
  response.end();
};

const server = http.createServer(requestListener);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
