const registro = document.querySelector("#registroForm");
registro.addEventListener("submit", (e) =>{
    e.preventDefault();
    const nombre = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const contraseña = document.querySelector("#password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usuariosRegistrados = users.find(user => user.email === email);
    let mensaje = document.getElementById("mensaje");
    if(usuariosRegistrados){
        mensaje.innerHTML = "usuario ya registrado";
        mensaje.style.color = "red";
        mensaje.style.marginTop = "50px";
        mensaje.style.textTransform = "uppercase";
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
        mensaje.innerHTML = "registro exitoso";
        mensaje.style.color = "green";
        mensaje.style.marginTop = "50px";
        mensaje.style.textTransform = "uppercase";
        setTimeout (() => {
            window.location.href = "./login.html"
        },2000)
            
})



