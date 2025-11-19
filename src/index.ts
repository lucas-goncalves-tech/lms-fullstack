import { createServer } from "http";

const PORT = process.env.PORT || 3333;

const app = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
