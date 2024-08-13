let tarjetaViaje = JSON.parse(localStorage.getItem("tarjetaViaje")) || [];
const cards = document.getElementById("cards");

tarjetaViaje.forEach((nuevoDestino) => {
  cards.innerHTML += `
    <section class="card-container">
        <h2>Ciudad:  ${nuevoDestino.destiny}</h2><br>
        <article class="list-item-card">
            <div class="item-card cartel1">
                <h3> Presupuesto:</h3> <span>$${nuevoDestino.budget}</span>
            </div>
            <div class="item-card">
                <h3> Dias de Viaje:</h3> <span>${nuevoDestino.days}</span>
            </div>
            <div class="item-card">
                <h3>Balance:</h3> <strong>$<span class="balanc">${
              nuevoDestino.balance
            }   </strong></span>
            </div>
            <div class="item-card">
                <h3>Disponible diario despues de gastos:</h3> <strong>$<span class="balanc">${
              nuevoDestino.disponible
            }   </strong></span>
            </div>
        </article>
        <button class="button-card">EDITAR</button>
    </section>
    `;
});

cambiarColor();

function cambiarColor() {
  let balances = document.querySelectorAll(".balanc");
    
  balances.forEach((balance) => {
    let balanceValue = parseInt(balance.textContent);

    if (balanceValue < 0) {
      balance.style.color = "red";
    } else {
      balance.style.color = "green";
    }
  });
}
