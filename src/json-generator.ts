/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

import fs from 'fs';

const nameDefault = './movimientos.json';

export class JsonGenerator {
    movesJson: {};

    constructor(moves = {}) {
        this.movesJson = moves;
    }

    writeToFile(txtJson: any[], nameFile: string = '') {
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
            fs.writeFile('./' + name, this.movesJson, function (err: any) {
                if (err) { console.log(' Error al escribir el archivo ', err) }
                else {
                    console.log(' El archivo se escribió correctamente ')
                }
            });
        } catch (err) {
            console.log(' El archivo no se escribió correctamente ', err);
        }

        // fs.writeFile('./newCustomer.json ', json, err => {
        //     if (err) {
        //         console.log(' Error al escribir el archivo ', err)
        //     } else {
        //         console.log(' El archivo se escribió correctamente ')
        //     }
        // });
    }

}