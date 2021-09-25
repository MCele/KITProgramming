"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var imgNotFound = "../../assets/img/imagen_no_disponible.jpeg";
var jsonMoves = [];
var URLWord = 'https://localhost:8080';
var nameWord = '1';
var moves = [];
var movesJson = []; //despues definir array de IMove
// let JG = new JsonGenerator();
exports.getMoves = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, moves];
    });
}); };
var forward = 'forward';
var backward = 'backward';
var turnRight = 'turn-right';
var turnLeft = 'turn-left';
// prbando contenido camera
// let elem: any = document.querySelector('a-entity[camera]');
// var camera = elem ? elem.components.camera.camera : null;
// console.log("Camera => ", elem, camera);
function generarMovimiento(dato) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var moves_1, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.getMoves()];
                case 1:
                    moves_1 = (_a.sent()) || [];
                    console.log("generarMovimiento: ", dato);
                    if (dato) {
                        switch (dato) {
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
                        console.log("dato vacío");
                    }
                    console.log("generarMovimiento: ", moves_1);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(moves, error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.generarMovimiento = generarMovimiento;
function createViewImages(markerId) {
    var see = [];
    var active = Array.prototype.slice
        .call(document.getElementsByClassName("marcador"))
        .filter(function (x) { return x.object3D.visible; });
    if (active.length !== 0) {
        var marc = active[0].id === backward
            ? "./../assets/pattern/pattern-flecha_abajo.png"
            : active[0].id === turnLeft
                ? "./../assets/pattern/pattern-giro_izquierda.png"
                : active[0].id === turnRight
                    ? "./../assets/pattern/pattern-giro_derecha.png"
                    : active[0].id === forward
                        ? "./../assets/pattern/pattern-flecha_arriba.png"
                        : imgNotFound;
        var arrayImage = document.getElementById("arrayImagesElement");
        if (arrayImage) {
            var img = createImageNode(marc);
            arrayImage.appendChild(img);
        }
        //  see.push(marc);
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
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var strJson;
        return tslib_1.__generator(this, function (_a) {
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
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var url;
        return tslib_1.__generator(this, function (_a) {
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
function addCamera() {
    var camera = document.createElement("iframe");
    camera.setAttribute("src", "/camera.html");
    camera.setAttribute("width", "500");
    camera.setAttribute("height", "200");
    //   scene.setAttribute("scrolling", "no");
    var scene = document.getElementById("a-scene");
    if (scene) {
        scene.appendChild(camera);
    }
}
exports.addCamera = addCamera;
addCamera();
