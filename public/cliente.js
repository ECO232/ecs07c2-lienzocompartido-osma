const socket = io();

let size = 0;

let r = 0 ;
let g = 0;
let b = 0;
let identificador = 0;

let elementos = [ ] ;
let cursores =  [ ];

function setup (){
    createCanvas(400,400);
    r = int(Math.random()*225)
    g = int(Math.random()*225)
    b = int(Math.random()*225)
    identificador = int(random()*1000)
    console.log("identificador:", identificador)

}

function draw() {
    background (220) ;
    // pintamos los items dentro de la lista de elementos.
    elementos.forEach((elemento)=>{
    fill (elemento.r, elemento.g, elemento.b);
    ellipse (elemento.x, elemento.y, elemento.size, elemento.size);
    });

    // pintamos los items dentro de la lista de cursores.
    cursores.forEach((elemento)=>{
    fill(0, 0, 0);
    ellipse (elemento.x, elemento.y, elemento.size, elemento.size);
    
    })
}

function configurartamano(){
    if(document.getElementById("tamanoBola").value === 0 || "")
    {size =  Math.floor(Math.random() * (55 - 15 + 1)) + 15; } 
        else { size = document.getElementById("tamanoBola").value}
}
function configurarcolor(){
    if(document.getElementById("color").value === 0 || "")
    {r =  Math.floor(Math.random() * (250 - 15 + 1)) + 15; } 
        else { r = document.getElementById("color").value}
}
function configurarcolorg(){
    if(document.getElementById("color2").value === 0 || "")
    {g =  Math.floor(Math.random() * (250 - 15 + 1)) + 15; } 
        else { g = document.getElementById("color2").value}
}
function configurarcolorb(){
    if(document.getElementById("color3").value === 0 || "")
    {b =  Math.floor(Math.random() * (250 - 15 + 1)) + 15; } 
        else { b = document.getElementById("color3").value}
}



function mousePressed (){
  configurartamano()
  configurarcolor()
  configurarcolorb()
  configurarcolorg()
    const elemento = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
       size
    };
    socket.emit ('enviar-elemento', elemento);
}

function mouseDragged(){
    const elemento = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size,
        id :identificador
    };
    socket.emit ('enviar-cursor', elemento);
}

socket.on('elemento-recibido',(elemento)=>{
    // Dibujar el elemento recibido en el otro cliente.
    console.log ("recibiendo-elemento:", elemento)
    elementos.push (elemento)
});

socket.on('cursor-recibido', (elemento) => {
    // Dibujar el elemento recibido en el otro cliente.
    console. log ("recibiendo-cursor:", elemento)
    // Seleccionamos el elemento quie tiene el identificador
    let cursorIndex = cursores.findIndex((item) => elemento.id == item.id)
    // Si existe ya ese cursos con el identificador
    if(cursorIndex!=-1){
    // Reemplazamos el cursor con el nuevo (nueva posición)
    cursores [cursorIndex] = elemento;
    } else {
    // Si no existe, se agrega a la lista

    cursores.push(elemento)
    }
    });