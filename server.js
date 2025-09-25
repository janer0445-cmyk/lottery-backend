const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tickets = [];

// Home route
app.get("/", (req, res) => {
  res.send("🎉 Lottery Backend is running!");
});

// Buy a ticket
app.post("/buy-ticket", (req, res) => {
  const { name, numbers } = req.body;
  const ticket = { id: tickets.length + 1, name, numbers };
  tickets.push(ticket);
  res.json({ message: "✅ Ticket purchased!", ticket });
});

// List all tickets
app.get("/list-tickets", (req, res) => {
  res.json(tickets);
});

// Draw a winner
app.get("/draw", (req, res) => {
  if (tickets.length === 0) {
    return res.json({ message: "❌ No tickets available." });
  }
  const winner = tickets[Math.floor(Math.random() * tickets.length)];
  res.json({ message: "🎉 Winner selected!", winner });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
