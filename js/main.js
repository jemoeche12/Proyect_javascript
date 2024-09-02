const user = JSON.parse(localStorage.getItem("login-exitoso")) || false;
const salir = document.querySelector("#salir");
const homeParrafo = document.querySelector(".home-parrafo");

if (!user) {
    window.location.href = "/pages/registro.html";
} else {
    const titleHome = document.querySelector(".title-home");
    if (titleHome) {
        titleHome.innerHTML = `Hola ${user.nombre}`;
    }
}

salir.addEventListener("click", () => {
    alert("hasta pronto")
    localStorage.removeItem("login-exitoso");
    window.location.href = "/pages/login.html"
})

let texto = "Bienvenido a Bonne Voyage, la aplicacion que te ayuda a organizar tu viaje. Sigue el instructivo y veras que nunca fue tan facil tener el control de tu viaje";

function cargarParrafoHome(elemento, texto, index = 0){
    elemento.textContent += texto[index];

    if(index === texto.length -1) return;
    
    setTimeout(() => cargarParrafoHome(homeParrafo, texto, index +1), 30);

    
}

cargarParrafoHome(homeParrafo, texto);

function crearViaje() {
    window.location.href = "/pages/agregar-viaje.html";
}

const crear = document.getElementById("crear");
if (crear) {
    crear.addEventListener("click", crearViaje);
}


