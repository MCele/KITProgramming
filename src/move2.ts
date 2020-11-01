// require('aframe');

import { JsonGenerator } from './json-generator';

let JG = new JsonGenerator({});
const imgNotFound = "./assets/img/imagen_no_disponible.jpeg";

let moves: string[] = [];

export const getMoves = () => {
  return moves;
}

export function generarMovimiento(dato: any) {
  //por cada marcador que es capturado ingresa
  // revisar si no conviene hacerlo en conjunto con el otro método o seguir dejandolo por separado
  //revisar en ambos casos cómo se está obteniendo el nombre del marcador, si es igual o no
  // al final se convierte todo el array en un json (eso se está haciendo por cada vez que se entra acá)
  // conveiene separar el generar el json y pasarlo aun método que se ejecute sólo cuando se presione le boton ejecutar
  console.log("generarMovimiento: ", dato);
  if (dato) {
    switch (dato) {
      case "marker_abajo":
        moves.push("abajo");
        break;
      case "marker_arriba":
        moves.push("arriba");

        break;
      case "marker_atras":
        moves.push("atras");

        break;
      case "marker_adelante":
        moves.push("avanzar");

        break;
      default:
        moves.push("defaut");
        break;
    }
  } else {
    console.log("dato vacío");
  }
  console.log("generarMovimiento: ", moves);
  var json: { id: number; move: string }[] = [];
  moves.forEach((mov, index, moves) => {
    //  console.log(mov, index);
    json.push({
      id: index,
      move: mov,
    });
  });
  let str = JSON.stringify(json);
  console.log("json return: ", str);
  JG.writeToFile(json, 'movimientos.json');
}

export function createViewImages(markerId: any) {
  var see = [];
  let active = Array.prototype.slice
    .call(document.getElementsByClassName("marcador"))
    .filter((x: any) => x.object3D.visible);
  if (active.length !== 0) {
    let marc =
      active[0].id === "marker_atras"
        ? "./assets/pattern/pattern-flecha_atras.png"
        : active[0].id === "marker_adelante"
          ? "./assets/pattern/pattern-flecha_adelante.png"
          : active[0].id === "marker_abajo"
            ? "./assets/pattern/pattern-flecha_abajo.png"
            : active[0].id === "marker_arriba"
              ? "./assets/pattern/pattern-flecha_arriba.png"
              : imgNotFound;
    /* 
        if (active[0].id === "marker_atras") {
             marc = './assets/pattern/pattern-flecha_atras.png';
             //   marc = active[0].object3D.el.attributes[3].value.substring(1, marc.indexOf(".") + 1) + ".png";
         }
         if (active[0].id === "marker_adelante") {
             marc = './assets/pattern/pattern-flecha_adelante.png';
             //   marc = active[0].object3D.el.attributes[3].value.substring(1, marc.indexOf(".") + 1) + ".png";
             // arrayImagesElement.appendChild(createImageNode(marc));
             // see.push(marc);
         }
         if (active.length != 0 && active[0].id === "marker_abajo") {
             marc = './assets/pattern/pattern-flecha_abajo.png';
             //   marc = active[0].object3D.el.attributes[3].value.substring(1, marc.indexOf(".") + 1) + ".png";
             // arrayImagesElement.appendChild(createImageNode(marc));
             // see.push(marc);
         }
         if (active.length != 0 && active[0].id === "marker_arriba") {
             marc = './assets/pattern/pattern-flecha_arriba.png';
             //   marc = active[0].object3D.el.attributes[3].value.substring(1, marc.indexOf(".") + 1) + ".png";
             // arrayImagesElement.appendChild(createImageNode(marc));
             // see.push(marc);
         } */

    let arrayImage = document.getElementById("arrayImagesElement");
    if (arrayImage) {
      let img = createImageNode(marc);
      arrayImage.appendChild(img);
    }

    //  see.push(marc);
  }
}

function createImageNode(fileName: string) {
  const img = new Image();
  img.src = fileName; // ver de poner una imagen con X por si no se encuentra la pedida
  img.alt = "Imagen Fallida";
  img.height = 100;
  img.width = 100;
  img.hspace = 8;
  img.id = "1";
  return img;
}

function cleanViewImages() {
  let arrayImage = document.getElementById("arrayImagesElement");

  if (
    arrayImage &&
    arrayImage.hasChildNodes() &&
    arrayImage.childElementCount
  ) {
    //borramos el contenido
    let cant_img = arrayImage.childElementCount;
    for (let i = 0; i < cant_img; i++) {
      let image = arrayImage.firstElementChild;
      if (image) arrayImage.removeChild(image);
    }
    moves = [];
    console.log("arrayImage: ", arrayImage, moves);
    //ver  de deshabilitar el boton cuando se borren todas las imágenes o al inicio
    //borrar el contenido del arrray de movimientos
  } else {
    console.log("no hay imagenes");
  }
}

export function playProgramContext() {
  alert("Programa Generado correctamente");
  console.log("Programa leído correctamente");
}
/*
function crearDin() {
//aquí instanciamos al componente padre
var componentePadre = document.getElementById("padre");
//aquí agregamos el componente de tipo input
var img = document.createElement("h2");
//aquí indicamos que es un input de tipo
var t = document.createTextNode("Hello World");
if (componentePadre) {
    img.appendChild(t);
    componentePadre.appendChild(img);
}
console.log(img.getAttribute);
console.log(img.getAttributeNS);
console.log(img.getElementsByClassName);
console.log(img.getElementsByTagName);
console.log(img.getElementsByTagNameNS); //type = 'text';

    // y por ultimo agreamos el componente creado al padre
    // padre.appendChild(input);
} */
