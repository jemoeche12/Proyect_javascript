
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

function cargarTutorial() {
    try {
        fetch('/data/tutorialPasos.json')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('Error al cargar el JSON');
                }
                return respuesta.json();
            })
            .then(data => {
                tutorialPasos = data.tutorialPasos;
                mostrarPaso();
            })

    } catch {
        (error => console.error('Error al cargar el JSON:', error));
    }

}

document.addEventListener('DOMContentLoaded', cargarTutorial());