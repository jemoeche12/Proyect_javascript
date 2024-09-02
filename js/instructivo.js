let imagenes = [
    "../assets/img/brujas.webp",
    "../assets/img/florencia.webp",
    "../assets/img/roma.webp"

]

let contador = 0;

setInterval(() =>{
    contador++;
    
    if(contador > imagenes.length - 1){
        contador = 0;
    }
    document.Imagen.src = imagenes[contador];
},3000)