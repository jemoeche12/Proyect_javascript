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
    window.location.href = "../index.html"
    localStorage.setItem("login-exitoso", JSON.stringify(usuarioCorrecto));

})