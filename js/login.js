const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usuarioCorrecto = users.find(user => user.email === email && user.password === password)
    if(!usuarioCorrecto){
        return alert("contraseña/email incorrectos");
        
    }
    alert(`Bienvenida/o ${usuarioCorrecto.name}` )
    window.location.href = "perfil.html"
    localStorage.setItem("login-exitoso", JSON.stringify(usuarioCorrecto));

})