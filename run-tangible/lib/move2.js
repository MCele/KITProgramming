"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectWord = exports.playProgramContext = exports.cleanViewImages = exports.createViewImages = exports.resetScale = exports.moveAgenteAR = exports.getObjectOfParent = exports.generarMovimiento = exports.getMoves = void 0;
var imgNotFound = "./assets/img/imagen_no_disponible.jpeg";
var jsonMoves = [];
var URLWord = 'https://localhost:8080';
var nameWord = '1';
var moves = [];
var movesJson = []; //despues definir array de IMove
// let JG = new JsonGenerator();
exports.getMoves = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, moves];
    });
}); };
var forward = 'forward';
var backward = 'backward';
var turnRight = 'turn-right';
var turnLeft = 'turn-left';
var scaleInit = [
    { name: backward, valor: { x: 0.6, y: 0.6, z: 0.6 } },
    { name: forward, valor: { x: 2, y: 2, z: 2 } }
];
// const positionInit = { x: 0.1, y: -1, z: 1.5 };
//{ name: forward, valor: { x: 2, y: 2, z: 2 } }
// prbando contenido camera
// let elem: any = document.querySelector('a-entity[camera]');
// var camera = elem ? elem.components.camera.camera : null;
// console.log("Camera => ", elem, camera);
function generarMovimiento(markerId, marker) {
    return __awaiter(this, void 0, void 0, function () {
        var moves_1, entityAR, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.getMoves()];
                case 1:
                    moves_1 = (_a.sent()) || [];
                    entityAR = getObjectOfParent(marker, 'a-entity');
                    if (markerId && [turnLeft, turnRight, forward, backward].includes(markerId)) {
                        moveAgenteAR(entityAR, markerId);
                        // moves.push(markerId); // reemplaza prox switch
                    }
                    if (markerId) {
                        switch (markerId) {
                            case turnRight:
                                moves_1.push(turnRight);
                                break;
                            case forward:
                                moves_1.push(forward);
                                break;
                            case backward:
                                moves_1.push(backward);
                                break;
                            case turnLeft:
                                moves_1.push(turnLeft);
                                break;
                            default:
                                moves_1.push("defaut");
                                break;
                        }
                    }
                    else {
                        console.log("markerId vacío");
                    }
                    console.log("generarMovimiento: ", moves_1);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(moves, markerId, error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.generarMovimiento = generarMovimiento;
function getObjectOfParent(parent, nameObj) {
    //obtenemos un objeto hijo de parent con nombre 'nameObj'
    return Array.prototype.slice
        .call(parent.childNodes)
        .find(function (h) { return h.nodeName.toLowerCase() === nameObj; });
}
exports.getObjectOfParent = getObjectOfParent;
function moveAgenteAR(entityAR, nameMove) {
    var scale = entityAR.getAttribute('scale');
    //let position = entityAR.getAttribute('position');
    console.log('scale => ', scale);
    // console.log('rotation => ', entityAR.getAttribute('rotation'));
    // console.log('position => ', entityAR.getAttribute('position'));
    // if ([forward].includes(nameMove)) {
    //   let cantPasos = 0;
    //   let time = 300;
    //   let interval = setInterval(() => {
    //     let valor = (nameMove === forward) ? - 0.3 : 0.1;
    //     entityAR.setAttribute('position', { x: position.x, y: position.y + valor, z: position.z + valor });
    //     console.log('position => ', entityAR.getAttribute('position'))
    //     // console.log('set scale 2 => ', entityAR.getAttribute('scale'));
    //     cantPasos++;
    //     // console.log("cantPasos: ", cantPasos);
    //     if (cantPasos > 4000 / time) {
    //       clearInterval(interval);
    //     }
    //   }, time);
    // }
    // if ([backward].includes(nameMove)) {
    //   let cantPasos = 0;
    //   let time = 300;
    //   let interval = setInterval(() => {
    //     let valor = (nameMove === forward) ? - 0.1 : 0.1;
    //     entityAR.setAttribute('scale', { x: scale.x + valor, y: scale.y + valor, z: scale.z + valor });
    //     console.log('set scale 2 => ', entityAR.getAttribute('scale'));
    //     cantPasos++;
    //     // console.log("cantPasos: ", cantPasos);
    //     if (cantPasos > 4000 / time) {
    //       clearInterval(interval);
    //     }
    //   }, time);
    // }
    if ([forward, backward].includes(nameMove)) {
        var cantPasos_1 = 0;
        var time_1 = 300;
        var interval_1 = setInterval(function () {
            var valor = (nameMove === forward) ? -0.08 : 0.08;
            entityAR.setAttribute('scale', { x: scale.x + valor, y: scale.y + valor, z: scale.z + valor });
            // console.log('set scale 2 => ', entityAR.getAttribute('scale'));
            cantPasos_1++;
            // console.log("cantPasos: ", cantPasos);
            if (cantPasos_1 > 4000 / time_1) {
                clearInterval(interval_1);
            }
        }, time_1);
    }
}
exports.moveAgenteAR = moveAgenteAR;
function resetScale(nameMove, marker) {
    return __awaiter(this, void 0, void 0, function () {
        var scale, entityAR;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (![backward, forward].includes(nameMove)) return [3 /*break*/, 2];
                    scale = scaleInit.find(function (s) { return s.name === nameMove; });
                    return [4 /*yield*/, getObjectOfParent(marker, 'a-entity')];
                case 1:
                    entityAR = _a.sent();
                    if (scale) {
                        entityAR.setAttribute('scale', scale.valor);
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.resetScale = resetScale;
function createViewImages(markerId) {
    var active = Array.prototype.slice
        .call(document.getElementsByClassName("marcador"))
        .filter(function (x) { return x.object3D.visible; });
    if (active.length !== 0) {
        var marc = active[0].id === backward
            ? "./assets/pattern/pattern-flecha_abajo.png"
            : active[0].id === turnLeft
                ? "./assets/pattern/pattern-giro_izquierda.png"
                : active[0].id === turnRight
                    ? "./assets/pattern/pattern-giro_derecha.png"
                    : active[0].id === forward
                        ? "./assets/pattern/pattern-flecha_arriba.png"
                        : imgNotFound;
        var arrayImage = document.getElementById("arrayImagesElement");
        if (arrayImage) {
            var img = createImageNode(marc);
            arrayImage.appendChild(img);
        }
    }
}
exports.createViewImages = createViewImages;
function createImageNode(fileName) {
    var img = new Image();
    img.src = fileName; // se pone una imagen con X por si no se encuentra la pedida
    img.alt = "Imagen Fallida";
    img.height = 100;
    img.width = 100;
    img.hspace = 8;
    img.id = "1";
    return img;
}
function cleanViewImages() {
    var arrayImage = document.getElementById("arrayImagesElement");
    if (arrayImage && arrayImage.hasChildNodes() && arrayImage.childElementCount) {
        // borramos el contenido
        var cant_img = arrayImage.childElementCount;
        for (var i = 0; i < cant_img; i++) {
            var image = arrayImage.firstElementChild;
            if (image)
                arrayImage.removeChild(image);
        }
        moves = [];
        console.log("arrayImage: ", arrayImage, moves);
        // ver  de deshabilitar el boton cuando se borren todas las imágenes o al inicio
        // borrar el contenido del array de movimientos
    }
    else {
        console.log("no hay imagenes");
    }
}
exports.cleanViewImages = cleanViewImages;
function createJson() {
    return __awaiter(this, void 0, void 0, function () {
        var strJson;
        return __generator(this, function (_a) {
            moves.forEach(function (mov, index, moves) {
                jsonMoves.push({
                    id: index,
                    move: mov,
                });
            });
            strJson = JSON.stringify(jsonMoves);
            console.log("json return: ", strJson);
            return [2 /*return*/];
        });
    });
}
function playProgramContext() {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!nameWord) return [3 /*break*/, 2];
                    alert("Programa Generado correctamente");
                    return [4 /*yield*/, createJson()];
                case 1:
                    _a.sent();
                    url = URLWord + "?moves=" + JSON.stringify(jsonMoves) + "&mundo=word" + nameWord;
                    location.href = url;
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.playProgramContext = playProgramContext;
function selectWord() {
    nameWord = document.getElementById("selectWord").value;
}
exports.selectWord = selectWord;
//# sourceMappingURL=move2.js.map