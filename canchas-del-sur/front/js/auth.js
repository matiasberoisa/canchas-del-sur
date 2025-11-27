
function estaLogueado() {
    return localStorage.getItem("userId") !== null;
}
function agregarLi(){
    const contenedor = document.querySelector("header");
    const nav = contenedor.querySelector("nav");
    const ul = nav.querySelector("ul");          

    const li = document.createElement("li");   
    const a = document.createElement("a");
    // Configurar el enlace
    a.href = "/vistas/login.html"; 
    if(estaLogueado()){ 
    a.textContent = "Salir";
    a.setAttribute("onclick", "logout()");
  }else{
    a.textContent = "Logueate";
    }         
    li.appendChild(a);
    ul.appendChild(li); 
}

function requiereLogin() {
    if (!estaLogueado()) {

        const paginaActual = encodeURIComponent(window.location.pathname + window.location.search);
        //Nota para cami: aca hay algo raro que me tiro charly pero me parece que no se hace asi. Como funciona no lo toco
        window.location.href = `/vistas/login.html?redirect=${paginaActual}`;
        return false;
    }
    return true;
}
function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.href = "http://localhost:3030/index.html";
}
//Para agregar paginas que quiero que arranquen solo si estas logueado
document.addEventListener("DOMContentLoaded", function () {
    const paginasProtegidas = [
        "/turnos.html"
    ];

    const pathname = window.location.pathname;

    if (paginasProtegidas.some(p => pathname.endsWith(p) || pathname === p)) {
        requiereLogin();
    }
});