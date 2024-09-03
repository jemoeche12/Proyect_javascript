let tutorialPasos = [
    {
        title: "Paso 1: Completa el formulario",
        content: "Completa el formulario para que podamos ayudarte a clasificar tus gastos.",
        buttonText: "Siguiente",
        img: "../assets/img/florencia.webp",
    },
    {
        title: "Paso 2: Revisa los balances",
        content: "revisa el balance y el gasto que podes realizar, segun la informacion brindada",
        buttonText: "Siguiente",
        img: "../assets/img/brujas.webp",
    },
    
    {
        title: "Paso 3: Revisa y edita tus gastos",
        content: "Entra a la sección donde guardas tus viajes y edita los gastos.",
        buttonText: "Siguiente",
        img: "../assets/img/roma.webp",
    },
    {
        title: "Paso 4: Viaja con tranquilidad",
        content: "Disfruta de tus vacaciones, relajate que nosotros llevamos el control de todo",
        buttonText: "VAMOS!!!",
        img: "../assets/img/paris2.png",
    }
  
];

let contador = 0;

function crearPasos(indicePaso) {
    const divPasos = document.createElement("div");
    divPasos.className = "paso";

    if (indicePaso === contador) {
        divPasos.classList.add("active");
    }

    const titlePasos = document.createElement("h2");
    titlePasos.textContent = tutorialPasos[indicePaso].title;

    const contentPasos = document.createElement("p");
    contentPasos.textContent = tutorialPasos[indicePaso].content;

    const imgPasos = document.createElement("img");
    imgPasos.className = "img-pasoApaso";
    imgPasos.src = tutorialPasos[indicePaso].img;

    const buttonTextPasos = document.createElement("button");
    buttonTextPasos.className = "buttonSiguiente";
    buttonTextPasos.textContent = tutorialPasos[indicePaso].buttonText;
    buttonTextPasos.onclick = indicePaso === tutorialPasos.length - 1 ? terminarTutorial : siguientePaso;
    
    
    
    divPasos.appendChild(imgPasos);  
    divPasos.appendChild(titlePasos);
    divPasos.appendChild(contentPasos);
    divPasos.appendChild(buttonTextPasos);

    return divPasos;
}

function mostrarPaso() {
    const tutorialContainer = document.getElementById("tutorial-container");
    tutorialContainer.className = "tutorial-container";
    tutorialContainer.innerHTML = "";

    const pasoActual = crearPasos(contador);
    tutorialContainer.appendChild(pasoActual);
}

function siguientePaso() {
    if (contador < tutorialPasos.length - 1) {  
        contador++;
        mostrarPaso();
    }
}

function terminarTutorial() {
    setTimeout(() => {
        window.location.href = "/pages/agregar-viaje.html";
    }, 2000)
}

document.addEventListener('DOMContentLoaded', mostrarPaso);