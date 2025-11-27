import { createElement } from "react";

function estaLogueado() {
  return localStorage.getItem("userId") !== null;
}
function agregarLi() {
  const contenedor = document.querySelector("header");
  const nav = contenedor.querySelector("nav");
  const ul = nav.querySelector("ul");

  const li = document.createElement("li");
  const a = document.createElement("a");
  // Configurar el enlace
  a.href = "/vistas/login.html";
  if (estaLogueado()) {
    a.textContent = "Salir";
    a.setAttribute("onclick", "logout()");
  } else {
    a.textContent = "Logueate";
  }
  li.appendChild(a);
  ul.appendChild(li);
}

export function requiereLogin() {
  if (!estaLogueado()) {
    const main = document.querySelector("main");
    const divLoginContainer = document.createElement("div");
    divLoginContainer.className = "login-container";
    const h2 = document.createElement("h2");
    h2.textContent = "Debes iniciar sesión para acceder a esta página.";
    divLoginContainer.appendChild(h2);

    const loginForm = document.createElement("form");
    loginForm.id = "loginForm";

    const inputUser = document.createElement("input");
    inputUser.setAttribute("type", "text");
    inputUser.setAttribute("id", "user");
    inputUser.setAttribute("placeholder", "Usuario");
    loginForm.appendChild(inputUser);

    const inputPassword = document.createElement("input");
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("id", "password");
    inputPassword.setAttribute("placeholder", "Contraseña");
    loginForm.appendChild(inputPassword);

    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.textContent = "Iniciar Sesión";
    loginForm.appendChild(button);
    const p = document.createElement("p");
    p.setAttribute("id", "loginError");
    p.setAttribute("class", "error");
    loginForm.appendChild(p);

    divLoginContainer.appendChild(loginForm);
    main.innerHTML = "";
    main.appendChild(divLoginContainer);

    // Agregar event listener después de que el formulario esté en el DOM
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("user").value.trim();
      const password = document.getElementById("password").value.trim();

      const respuesta = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await respuesta.json();
      if (data.success) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", username);
        // Recargar la página actual para mostrar el contenido protegido
        window.location.reload();
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    });
    return false;
  }
  return true;
}
export function logout() {
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  window.location.href = "http://localhost:3030/index.html";
}
