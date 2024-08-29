const registro = document.querySelector("#registroForm");
registro.addEventListener("submit", (e) =>{
    e.preventDefault();
    const nombre = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const contraseña = document.querySelector("#password").value;
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usuariosRegistrados = users.find(user => user.email === email);
    if(usuariosRegistrados){
        alert("el usuario esta registrado")
        return;
    }

    class User {
        constructor(nombre, email, contraseña){
            this.nombre = nombre;
            this.email = email;
            this.contraseña = contraseña;
        }
        
    }
    const nuevoUsuario = new User(nombre, email, contraseña);
    users.push(nuevoUsuario);
        localStorage.setItem("users", JSON.stringify(users))
        alert("registro exitoso");
        window.location.href = "./login.html"
            
})



