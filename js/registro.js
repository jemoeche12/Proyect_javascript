const registro = document.querySelector("#registroForm");
registro.addEventListener("submit", (e) =>{
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    
    const Users = JSON.parse(localStorage.getItem("users")) || [];
    const usuariosRegistrados = Users.find(user => user.email === email);
    if(usuariosRegistrados){
        alert("el usuario esta registrado")
        return;
    }

    const newUsers = {
        name: name, 
        email: email,
        password: password
    }
        Users.push(newUsers)
        localStorage.setItem("users", JSON.stringify(Users))
        alert("registro exitoso");
        window.location.href = "./pages/login.html"
            
})