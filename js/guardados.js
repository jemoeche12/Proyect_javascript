function cargarTarjetas() {
  const tarjetaViaje = obtenerTarjetasDesdeLocalStorage();
  const contenerdorTarjetas = document.getElementById("cards");
  contenerdorTarjetas.innerHTML = ''; 
  
  tarjetaViaje.forEach((nuevoDestino, index) => {
    const tarjetaHTML = generarHTMLTarjeta(nuevoDestino, index);
    contenerdorTarjetas.innerHTML += tarjetaHTML;
  });

  const botonesEditar = document.querySelectorAll(".button-card");
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", direccionarCardViaje);
  });

  actualizarColoresBalance();
}

function obtenerTarjetasDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem("tarjetaViaje")) || [];
}

function generarHTMLTarjeta({ destino, presupuesto, dias, balance, promedioDiarioDespuesGastos }, index) {
  return `
  <section class="card-container" id="tarjeta-${index}">
      <h2>Ciudad: ${destino}</h2><br>
      <article class="list-item-card">
          <div class="item-card cartel1">
              <h3>Presupuesto:</h3> <span>$${presupuesto}</span>
          </div>
          <div class="item-card">
              <h3>Días de Viaje:</h3> <span>${dias}</span>
          </div>
          <div class="item-card">
              <h3>Balance:</h3> <strong>$<span class="balanc">${balance}</span></strong>
          </div>
          <div class="item-card">
              <h3>Disponible diario después de gastos:</h3> <strong>$<span class="balanc">${promedioDiarioDespuesGastos}</span></strong>
          </div>
      </article>
      <button type="button" class="button-card" data-index="${index}">EDITAR</button>
  </section>
  `;
}

function actualizarColoresBalance() {
  const balances = document.querySelectorAll(".balanc");

  balances.forEach((balance) => {
    const balanceValue = parseInt(balance.textContent);
    balance.style.color = balanceValue < 0 ? "red" : "green";
  });
}

function direccionarCardViaje(event) {
  const index = event.target.getAttribute('data-index');
  
  localStorage.setItem("tarjetaSeleccionada", index);
  
  location.href = "./card-viaje.html";
}

cargarTarjetas();

