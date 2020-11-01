/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

//require('aframe');
// prints "hi" in the browser's dev tools console
var fs = require('fs');
var moves = new Array();
function generarMovimiento(dato) {
    debugger;
    console.log("generarMovimiento: ", dato);
    if (dato) {
        switch (dato) {
            case 'marker_abajo': moves.push("abajo");

                break;
            case 'marker_arriba': moves.push('arriba');

                break;
            case 'marker_atras': moves.push('atras');

                break;
            case 'marker_adelante': moves.push('avanzar');

                break;
            default: moves.push('defaut');
                break;
        }
    } else {
        console.log("dato vacío");
    }
    console.log("generarMovimiento: ", moves);
    var json = [];
    moves.forEach((mov, index, moves) => {
        console.log(mov, index);
        json.push({
            id: index,
            move: mov
        });
    });
    var str = JSON.stringify(json);
    writeToFile(str);
    console.log("json return: ", json, str);
}
function writeToFile(json) {

    fs.writeFile('./movimientos.json', json, function (err) {
        if (err) { console.log(' Error al escribir el archivo ', err) }
        else {
            console.log(' El archivo se escribió correctamente ')
        }
    });
    fs.writeFile('./newCustomer.json ', jsonString, err => {
        if (err) {
            console.log(' Error al escribir el archivo ', err)
        } else {
            console.log(' El archivo se escribió correctamente ')
        }
    })
}