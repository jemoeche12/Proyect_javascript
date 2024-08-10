let tarjetaViaje = JSON.parse(localStorage.getItem('tarjetaViaje')) || [];


function agregarTarjeta(tarjetaViaje){
    let guardadas = document.getElementById("guardadas");
    tarjetaViaje = document.createElement("div")
    
    tarjetaViaje.innerHTML = `
    
    <div class="container-data">
        <div class="title-expens">
            <span>${img}</span>
        </div>
        <div class="title-expens">
            <span>${budget}</span>
        </div>
        <div class="title-expens balance">
            <span>${balance}</span>
        </div>
    </div>
    `
    
    guardadas.appendChild(tarjetaViaje);
}
