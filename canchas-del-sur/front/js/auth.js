export function estaLogueado() {
  return localStorage.getItem("idUsuario") !== null;
}
export function logout() {
  localStorage.removeItem("idUsuario");
  localStorage.removeItem("username");
  window.location.href = "http://localhost:3030/index.html";
}

export function login() {
  //creo el estilo de login asi no lo agrego a todas las pag css
  const style = document.createElement("style");
  style.innerHTML = `
    .login-container {

        width: 300px;
        margin: 40px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        text-align: center;
    }

    .login-container input {
        width: 90%;
        margin: 10px 0;
        padding: 10px;
    }

    .login-container button {
        width: 100%;
        padding: 10px;
        background: #3b82f6;
        color: white;
        border: none;
        cursor: pointer;
    }

    .login-container button:hover {
        background: #1d4ed8;
    }

    .error {
        color: red;
        margin-top: 10px;
    }
  `;

  document.head.appendChild(style);

  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main");
    document.body.appendChild(main);
  }

  main.innerHTML = `
    <div class="login-container">
      <h2>Iniciar sesión</h2>

      <form id="loginForm">
        <input type="text" id="user" placeholder="Usuario" required>
        <input type="password" id="password" placeholder="Contraseña" required>
        <button type="submit">Ingresar</button>
        <p id="loginError" class="error"></p>
      </form>
    </div>
  `;
  const loginForm = main.querySelector("#loginForm");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("user").value.trim();
    const password = document.getElementById("password").value.trim();

    const respuesta = await fetch(
      `/api/login?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
      {
        method: "GET",
      }
    );
    const data = await respuesta.json();
    if (data) {
      localStorage.setItem("idUsuario", data.id);
      localStorage.setItem("username", username);

      window.location.reload();
    } else {
      alert(data.message || "Error al iniciar sesión");
    }
  });
}
