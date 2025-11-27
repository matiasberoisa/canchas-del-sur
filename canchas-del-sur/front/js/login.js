document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("user").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("loginError");

    const respuesta = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    });
    const data= await respuesta.json();
    if(data.success) {
         localStorage.setItem("userId", data.userId);
         localStorage.setItem("username", username);
         window.location.replace("http://localhost:3030/vistas/turnos.html");
    }else{
        error.textContent = data.message;
    }

});
