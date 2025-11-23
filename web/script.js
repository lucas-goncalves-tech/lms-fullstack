const form = document.querySelector("#login");
const result = document.querySelector("#result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  try {
    const response = await fetch("http://localhost:3333/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(data)),
      credentials: "include",
    });

    let body;
    try {
      body = await response.json();
    } catch {
      body = { status: response.status, statusText: response.statusText };
    }

    result.innerText = JSON.stringify(body, null, 2);
    if (response.ok) {
      // window.location.reload(); // Comentado para ver o resultado
    }
  } catch (err) {
    result.innerText = "Erro: " + err.message;
  }
});

async function autenticado() {
  try {
    const response = await fetch("http://localhost:3333/api/v1/auth/me", {
      credentials: "include",
    });
    const body = await response.json();
    result.innerText += "\n\nAutenticado: " + JSON.stringify(body, null, 2);
  } catch (err) {
    // result.innerText += "\n\nNão autenticado";
  }
}

// autenticado();
