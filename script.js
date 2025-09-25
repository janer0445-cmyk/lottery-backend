const API = "https://lottery-backend-7ifr.onrender.com";

// Handle Buy Ticket
document.getElementById("ticketForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const numbers = document.getElementById("numbers").value;

  const res = await fetch(`${API}/buy-ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, numbers })
  });
  const data = await res.json();
  document.getElementById("status").innerText = data.message;

  loadTickets();
});

// Load Tickets
async function loadTickets() {
  const res = await fetch(`${API}/list-tickets`);
  const tickets = await res.json();
  const list = document.getElementById("ticketsList");
  list.innerHTML = "";
  tickets.forEach(t => {
    const li = document.createElement("li");
    li.innerText = `${t.name} → ${t.numbers}`;
    list.appendChild(li);
  });
}

// Draw Winner
document.getElementById("drawBtn").addEventListener("click", async () => {
  const res = await fetch(`${API}/draw`);
  const data = await res.json();
  document.getElementById("result").innerText =
    data.winner ? `🎉 Winner: ${data.winner.name} (${data.winner.numbers})` : data.message;
});

// Load tickets on page start
loadTickets();
