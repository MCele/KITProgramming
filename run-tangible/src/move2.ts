
import { IMove } from './IMove';


const imgNotFound = "./assets/img/imagen_no_disponible.jpeg";
let jsonMoves: IMove[] = [];
let URLWord = 'https://localhost:8080';
let nameWord = '1';

let moves: string[] = [];
let movesJson: IMove[] = []; //despues definir array de IMove
// let JG = new JsonGenerator();
export const getMoves = async () => {
  return moves;
}

const forward = 'forward';
const backward = 'backward';
const turnRight = 'turn-right';
const turnLeft = 'turn-left';

// prbando contenido camera
// let elem: any = document.querySelector('a-entity[camera]');
// var camera = elem ? elem.components.camera.camera : null;
// console.log("Camera => ", elem, camera);

export async function generarMovimiento(dato: string) {
  //por cada marcador que es capturado ingresa
  // revisar si no conviene hacerlo en conjunto con el otro método o seguir dejandolo por separado
  //revisar en ambos casos cómo se está obteniendo el nombre del marcador, si es igual o no
  // al final se convierte todo el array en un json (eso se está haciendo por cada vez que se entra acá)
  // conveiene separar el generar el json y pasarlo aun método que se ejecute sólo cuando se presione le boton ejecutar
  try {
    let moves = await getMoves() || [];
    console.log("generarMovimiento: ", dato);
    if (dato) {
      switch (dato) {
        case turnRight:
          moves.push(turnRight);
          break;
        case forward:
          moves.push(forward);

          break;
        case backward:
          moves.push(backward);

          break;
        case turnLeft:
          moves.push(turnLeft);
          break;
        default:
          moves.push("defaut");
          break;
      }
    } else {
      console.log("dato vacío");
    }
    console.log("generarMovimiento: ", moves);
  } catch (error) {
    console.log(moves, error);
  }
}

export function createViewImages(markerId: any) {
  var see = [];
  let active = Array.prototype.slice
    .call(document.getElementsByClassName("marcador"))
    .filter((x: any) => x.object3D.visible);
  if (active.length !== 0) {
    let marc =
      active[0].id === backward
        ? "./assets/pattern/pattern-flecha_abajo.png"
        : active[0].id === turnLeft
          ? "./assets/pattern/pattern-giro_izquierda.png"
          : active[0].id === turnRight
            ? "./assets/pattern/pattern-giro_derecha.png"
            : active[0].id === forward
              ? "./assets/pattern/pattern-flecha_arriba.png"
              : imgNotFound;
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
  img.src = fileName; // se pone una imagen con X por si no se encuentra la pedida
  img.alt = "Imagen Fallida";
  img.height = 100;
  img.width = 100;
  img.hspace = 8;
  img.id = "1";
  return img;
}

export function cleanViewImages() {
  let arrayImage = document.getElementById("arrayImagesElement");

  if (arrayImage && arrayImage.hasChildNodes() && arrayImage.childElementCount) {
    // borramos el contenido
    let cant_img = arrayImage.childElementCount;
    for (let i = 0; i < cant_img; i++) {
      let image = arrayImage.firstElementChild;
      if (image) arrayImage.removeChild(image);
    }
    moves = [];
    console.log("arrayImage: ", arrayImage, moves);
    // ver  de deshabilitar el boton cuando se borren todas las imágenes o al inicio
    // borrar el contenido del array de movimientos
  } else {
    console.log("no hay imagenes");
  }
}

async function createJson() {
  moves.forEach((mov, index, moves) => {
    jsonMoves.push({
      id: index,
      move: mov,
    });
  });
  const strJson = JSON.stringify(jsonMoves);
  console.log("json return: ", strJson);
}

export async function playProgramContext() {
  if (nameWord) {
    alert("Programa Generado correctamente");
    await createJson()
    const url = `${URLWord}?moves=${JSON.stringify(jsonMoves)}&mundo=word${nameWord}`;
    location.href = url;
  }
}
export function selectWord() {
  nameWord = (document.getElementById("selectWord") as any).value;

}
