const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const contraseña = document.querySelector("#password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usuarioCorrecto = users.find(user => user.email === email && user.contraseña === contraseña)
    if(!usuarioCorrecto){
        alertarErrorUsuario()
        return ;
        
    }
    window.location.href = "../index.html"
    localStorage.setItem("login-exitoso", JSON.stringify(usuarioCorrecto));

})


function alertarErrorUsuario() {
    Swal.fire({
        title: " Usuario o contraseña incorrectos",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
    });
}