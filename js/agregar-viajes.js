


      const formulario = document.getElementById('tarjetaDestino');


      formulario.addEventListener('submit', crearTarjeta)
      
      function crearTarjeta(e) {
          e.preventDefault(); 
      
          const destiny = formulario.destiny.value;
          const budget = formulario.budget.value;
          const days = formulario.days.value;
          const acomodation = formulario.acomodation.value;
          const otros = formulario.otros.value;
          const food = formulario.food.value;
          let expenses = parseInt(otros) + parseInt(acomodation) + parseInt(food);
          let balance = parseInt(budget) - expenses;
          let promedioDiario = Math.round(parseInt(budget) / parseInt(days));
          let promedioDiarioDespuesGastos = Math.round(parseInt(balance) / parseInt(days));
          
          class NuevoDestino{   
            constructor(destiny, budget, days, acomodation, otros, food,expenses, balance,  promedioDiario, promedioDiarioDespuesGastos){
                this.destiny = destiny,
                this.budget = budget,
                this.days = days,
                this.acomodation = acomodation,
                this.otros = otros,
                this.food = food,
                this.expenses = expenses,
                this.balance = balance,
                this.promedioDiario = promedioDiario,
                this.promedioDiarioDespuesGastos = promedioDiarioDespuesGastos
            }
          
          }         

          const nuevoDestino = new NuevoDestino(destiny, budget, days, acomodation, otros, food, expenses, balance, promedioDiario, promedioDiarioDespuesGastos);
      
          
          let tarjetaViaje = JSON.parse(localStorage.getItem('tarjetaViaje')) || []; 
          tarjetaViaje.push(nuevoDestino);
      
          localStorage.setItem('tarjetaViaje', JSON.stringify(tarjetaViaje));
      
          
          UI (destiny,budget,days, balance, promedioDiario, promedioDiarioDespuesGastos)
          
      };
      
      function UI (destiny,budget,days, balance, promedioDiario, promedioDiarioDespuesGastos){
          let result = document.getElementById("result");
          let dataPrint = document.createElement("div")
          
          dataPrint.innerHTML = `
          
          <div class="container-data">
              <div class="title-expens">
                  <span>${destiny}</span>
              </div>
              <div class="title-expens">
                  <span>${budget}</span>
              </div>
              <div class="title-expens balance">
                  <span>${balance}</span>
              </div>
          </div>
          <h1 class="promedio">El dinero diario es: $${promedioDiario}</h1>
          <h2 class="promedio">Los dias de viaje planificados son: ${days}</h2>
          <h2 class="disponible">El dinero diario disponible despues de gastos es: $${promedioDiarioDespuesGastos}</h2>
          
          `
          if(balance <= 0){
              
              alert(`necesitas conseguir aun $${balance} para pagar las vacaciones que te mandaste`)
              
          }else{
              
              alert("todavia podes darte un gusto")
              
          }
          result.appendChild(dataPrint);
      }
      