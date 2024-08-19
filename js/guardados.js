function cargarTarjetas() {
  const tarjetaViaje = obtenerTarjetasDesdeLocalStorage();
  const cardsContainer = document.getElementById("cards");
  tarjetaViaje.forEach((nuevoDestino) => {
   
      const tarjetaHTML = generarHTMLTarjeta(nuevoDestino);
      cardsContainer.innerHTML += tarjetaHTML;
  });

  actualizarColoresBalance();
}

function obtenerTarjetasDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem("tarjetaViaje")) || [];
}

function generarHTMLTarjeta({ destiny, budget, days, balance, promedioDiarioDespuesGastos }) {
  return `
  <section class="card-container">
      <h2>Ciudad: ${destiny}</h2><br>
      <article class="list-item-card">
          <div class="item-card cartel1">
              <h3>Presupuesto:</h3> <span>$${budget}</span>
          </div>
          <div class="item-card">
              <h3>Días de Viaje:</h3> <span>${days}</span>
          </div>
          <div class="item-card">
              <h3>Balance:</h3> <strong>$<span class="balanc">${balance}</span></strong>
          </div>
          <div class="item-card">
              <h3>Disponible diario después de gastos:</h3> <strong>$<span class="balanc">${promedioDiarioDespuesGastos}</span></strong>
          </div>
      </article>
      <button type="button" class="button-card" id="editar">EDITAR</button>
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

cargarTarjetas();

const editarTarjeta = document.getElementById("editar");
editarTarjeta.addEventListener("click", direccionarCardViaje)

function direccionarCardViaje(){
  location.href = "./card-viaje.html"
}

