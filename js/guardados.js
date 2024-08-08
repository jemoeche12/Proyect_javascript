

let vacationCalc = document.getElementById("vacationCalc")


vacationCalc.addEventListener("submit", calcExpens)



function calcExpens(e){
    e.preventDefault();
    let destiny = document.getElementById("destiny").value;
    let budget = document.getElementById("budget").value;
    let acomodation = document.getElementById("acomodation").value;
    let transport = document.getElementById("transport").value;
    let food = document.getElementById("food").value;

    let expenses = parseInt(acomodation) + parseInt(transport) + parseInt(food);
    let balance = parseInt(budget) - expenses;

    if(balance < 0){
        alert("estas gastando mucho, no te alcanza")
    }else{
        alert("todavia podes gastar un poco mas, para eso trabajaste")
    };

    UI(destiny,budget, balance);
}

function UI (destiny,budget, balance){
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
    `
    
    result.appendChild(dataPrint);
}


