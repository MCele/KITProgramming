import { generarMovimiento, createViewImages } from './move2';
let AFRAME = require('aframe');
import 'aframe-extras';
window.addEventListener('camera-init', (data) => {
    // console.log('camera-init', data);
})
window.addEventListener('camera-error', (error) => {
    // console.log('camera-error', error);
})
var intra = 0;
AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;
        //console.log('marker: ', marker);
        marker.addEventListener('markerFound', function () { // marcador encontrado
            var markerId = marker.id;
            // console.log('Marcador encontrado', markerId)

            // Genera movimiento imagenes

            createViewImages(markerId);
            // genera movimiento(JSON)
            generarMovimiento(markerId, marker);
        });
        marker.addEventListener('markerLost', function () {
            var markerId = marker.id;
            //ver si colocar un temporizador para que no detecte movimientos por unos segundos
            // console.log('marcador perdido', markerId);
            // TODO: Add your own code here to react to the marker being lost.
            // marcador que dejó de ser capturarado
        });
    }
});