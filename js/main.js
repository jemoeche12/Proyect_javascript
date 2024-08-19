const user = JSON.parse(localStorage.getItem("login-exitoso")) || false;
const salir = document.querySelector("#salir");
if(!user){
    window.location.href= "../pages/registro.html"
}

salir.addEventListener("click", () => {
    alert("hasta pronto")
    localStorage.removeItem("login-exitoso");
    window.location.href = "../pages/login.html"
})