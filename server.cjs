const http = require("http");
const port = Number(process.env.PORT || 5173);
http.createServer((request, response) => {
  response.writeHead(200, {"content-type": "text/plain"});
  response.end("AI_STUDIO_LIFECYCLE_PROBE_20261014\n");
}).listen(port, "0.0.0.0");
