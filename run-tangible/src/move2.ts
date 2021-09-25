
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

const scaleInit = [
  { name: backward, valor: { x: 0.6, y: 0.6, z: 0.6 } },
  { name: forward, valor: { x: 2, y: 2, z: 2 } }
]

// probando contenido camera
// let elem: any = document.querySelector('a-entity[camera]');
// var camera = elem ? elem.components.camera.camera : null;
// console.log("Camera => ", elem, camera);

export async function generarMovimiento(markerId: string, marker: any) {
  //por cada marcador que es capturado ingresa
  // revisar si no conviene hacerlo en conjunto con el otro método o seguir dejandolo por separado
  //revisar en ambos casos cómo se está obteniendo el nombre del marcador, si es igual o no
  // al final se convierte todo el array en un json (eso se está haciendo por cada vez que se entra acá)
  try {
    let moves = await getMoves() || [];
    //console.log("generarMovimiento: ", markerId, marker);

    // obtenemos la entity del objeto 3D
    let entityAR = getObjectOfParent(marker, 'a-entity');
    if (markerId && [turnLeft, turnRight, forward, backward].includes(markerId)) {
      moveAgenteAR(entityAR, markerId);
      // moves.push(markerId); // reemplaza prox switch
    }
    if (markerId) {
      switch (markerId) {
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
      console.log("markerId vacío");
    }
    console.log("generarMovimiento: ", moves);
  } catch (error) {
    console.log(moves, markerId, error);
  }
}


export function getObjectOfParent(parent: any, nameObj: string) {
  //obtenemos un objeto hijo de parent con nombre 'nameObj'
  return Array.prototype.slice
    .call(parent.childNodes)
    .find((h: any) => h.nodeName.toLowerCase() === nameObj);

}

export function moveAgenteAR(entityAR: any, nameMove: string) {
  let scale = entityAR.getAttribute('scale');
  // console.log('scale => ', scale);
  // console.log('rotation => ', entityAR.getAttribute('rotation'));
  // console.log('position => ', entityAR.getAttribute('position'));

  if ([backward].includes(nameMove)) {
    let cantPasos = 0;
    let time = 300;
    let interval = setInterval(() => {
      let valor = (nameMove === forward) ? - 0.1 : 0.1;
      entityAR.setAttribute('scale', { x: scale.x + valor, y: scale.y + valor, z: scale.z + valor });
      // console.log('set scale 2 => ', entityAR.getAttribute('scale'));
      cantPasos++;
      // console.log("cantPasos: ", cantPasos);
      if (cantPasos > 4000 / time) {
        clearInterval(interval);
      }
    }, time);
  }
  if ([forward].includes(nameMove)) {
    let cantPasos = 0;
    let time = 300;
    let interval = setInterval(() => {
      let valor = (nameMove === forward) ? - 0.1 : 0.1;
      entityAR.setAttribute('scale', { x: scale.x + valor, y: scale.y + valor, z: scale.z + valor });
      // console.log('set scale 2 => ', entityAR.getAttribute('scale'));
      cantPasos++;
      // console.log("cantPasos: ", cantPasos);
      if (cantPasos > 4000 / time) {
        clearInterval(interval);
      }
    }, time);
  }

}

export async function resetScale(nameMove: string, marker: any) {
  // una vez que el marcador fue perdido
  // seteamos la escala original del objeto
  if ([backward, forward].includes(nameMove)) {
    let scale = scaleInit.find(s => s.name === nameMove);
    let entityAR = await getObjectOfParent(marker, 'a-entity');
    if (scale) {
      entityAR.setAttribute('scale', scale.valor);
    }
  }
}

export function createViewImages(markerId: any) {
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
  moves.forEach((move, index, moves) => {
    jsonMoves.push({
      id: index,
      move
    });
  });
  const strJson = JSON.stringify(jsonMoves);
  console.log("json return: ", strJson);
}

export async function playProgramContext() {
  if (nameWord) {
    alert("Programa Generado correctamente para ejecutarse en el Mundo " + nameWord);
    await createJson();
    const programLI = {
      moves: jsonMoves,
      mundo: `word${nameWord}`
    };
    const url = `${URLWord}?moves=${JSON.stringify(jsonMoves)}&mundo=word${nameWord}`;
    const url2 = `${URLWord}?programLI=${JSON.stringify(programLI)}`;
    location.href = url2;
  }
}
export function selectWord() {
  nameWord = (document.getElementById("selectWord") as any).value;

}
