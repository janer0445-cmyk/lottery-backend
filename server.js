const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("🎉 Lottery Backend is running!");
});

// Example: Draw endpoint
app.get("/draw", (req, res) => {
  const winner = Math.floor(Math.random() * 1000);
  res.json({ winner });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
