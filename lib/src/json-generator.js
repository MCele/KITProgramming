"use strict";
/* If you're feeling fancy you can add interactivity
    to your site with Javascript */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var nameDefault = './movimientos.json';
var JsonGenerator = /** @class */ (function () {
    function JsonGenerator(moves) {
        if (moves === void 0) { moves = {}; }
        this.movesJson = moves;
    }
    JsonGenerator.prototype.writeToFile = function (txtJson, nameFile) {
        if (nameFile === void 0) { nameFile = ''; }
        this.movesJson = JSON.stringify(txtJson);
        var name = '';
        if (nameFile && nameFile != '') {
            name = nameFile;
            if (!name.toLowerCase().includes('.json')) {
                name = name + '.json';
            }
        }
        else {
            name = nameDefault;
        }
        try {
            fs_1.default.writeFile('./' + name, this.movesJson, function (err) {
                if (err) {
                    console.log(' Error al escribir el archivo ', err);
                }
                else {
                    console.log(' El archivo se escribió correctamente ');
                }
            });
        }
        catch (err) {
            console.log(' El archivo no se escribió correctamente ', err);
        }
        // fs.writeFile('./newCustomer.json ', json, err => {
        //     if (err) {
        //         console.log(' Error al escribir el archivo ', err)
        //     } else {
        //         console.log(' El archivo se escribió correctamente ')
        //     }
        // });
    };
    return JsonGenerator;
}());
exports.JsonGenerator = JsonGenerator;
