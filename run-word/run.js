
//const Phaser = require('phaser');
// import Phaser from 'phaser';

let ejecution = false;

const avanzar = 'forward';
const retroceder = 'backward';
const giro_derecha = 'turn-right';
const giro_izquierda = 'turn-left';


var params = new URLSearchParams(location.search);
const moves = JSON.parse(params.get('moves')) || [];
console.log(moves);
// const moves = [
//     {
//         id: 0,
//         move: avanzar
//     },
//     {
//         id: 1,
//         move: giro_derecha

//     },
//     {
//         id: 2,
//         move: retroceder
//     },
//     {
//         id: 3,
//         move: avanzar
//     },
//     {
//         id: 4,
//         move: giro_izquierda
//     },
//     {
//         id: 5,
//         move: avanzar
//     },
//     {
//         id: 6,
//         move: giro_izquierda
//     },
//     {
//         id: 7,
//         move: retroceder
//     },
//     {
//         id: 8,
//         move: retroceder
//     },
//     {
//         id: 9,
//         move: giro_derecha
//     },
//     {
//         id: 10,
//         move: avanzar
//     },
//     {
//         id: 11,
//         move: avanzar
//     },
//     {
//         id: 12,
//         move: giro_izquierda
//     },
//     {
//         id: 13,
//         move: retroceder
//     },
// ];


let contMoves = 0;  //contamos la cantidad de movimientos realizados

const velX = 97;
const velY = 97;

const config = {
    type: Phaser.AUTO, //intenta utilizar WebGL automáticamente
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let timedEvent;
let game = new Phaser.Game(config);
let player;


const mov_down = 'rana_mov_down';
const mov_left = 'rana_mov_left';
const mov_up = 'rana_mov_up';
const mov_right = 'rana_mov_right';
const turn_down_left = 'rana_turn_down_left';
const turn_up_right = 'rana_turn_up_right';
const turn_down_right = 'rana_turn_down_right';
const turn_up_left = 'rana_turn_up_left';

let dirAgente = {
    orientacion: '',
    velX: 0,
    velY: 0
};

function preload() {
    this.load.setBaseURL('https://localhost:8081');
    // cargamos fondo
    this.load.image('fondo', 'assets/fondo/fondoCuadricula2.png');
    // cargamos sprite rana para giros
    this.load.spritesheet(turn_down_left, 'assets/spritesheets/rana/giro_abajo_izquierda.png', { frameWidth: 85, frameHeight: 79 });
    this.load.spritesheet(turn_up_right, 'assets/spritesheets/rana/giro_arriba_derecha.png', { frameWidth: 85, frameHeight: 79 });
    this.load.spritesheet(turn_down_right, 'assets/spritesheets/rana/giro_abajo_derecha.png', { frameWidth: 85, frameHeight: 79 });
    this.load.spritesheet(turn_up_left, 'assets/spritesheets/rana/giro_arriba_izquierda.png', { frameWidth: 85, frameHeight: 79 });
    // cargamos sprite rana para movimientos de avanzar
    this.load.spritesheet(mov_up, 'assets/spritesheets/rana/mov_arriba.png', { frameWidth: 85, frameHeight: 79 });
    this.load.spritesheet(mov_down, 'assets/spritesheets/rana/mov_abajo.png', { frameWidth: 85, frameHeight: 79 });
    this.load.spritesheet(mov_right, 'assets/spritesheets/rana/mov_derecha.png', { frameWidth: 85, frameHeight: 79 });
    this.load.spritesheet(mov_left, 'assets/spritesheets/rana/mov_izquierda.png', { frameWidth: 85, frameHeight: 79 });

}

const framesCyclic = async (start, medium) => {
    let frames = [];
    for (let i = start; i < medium; i++) { frames.push(i) }
    for (let i = medium; start <= i; i--) { frames.push(i) }
    return frames;
}

const setDireccion = async function (x = 0, y = 0, mov = '') {
    if (mov) {
        // si no viene direccion se usa la que tenía, si no tenía alguna se asigna una
        dirAgente.orientacion = mov || dirAgente.orientacion || mov_left;
        dirAgente.velX = x;
        dirAgente.velY = y;
    }
}
const setOrientacion = async function (newMov) {
    // seteamos la direccion a la que apunta el sprite en base a su nueva orientacion
    (newMov === mov_right) ? setDireccion(velX, 0, mov_right) :
        (newMov === mov_left) ? setDireccion(-velX, 0, mov_left) :
            (newMov === mov_down) ? setDireccion(0, velY, mov_down) :
                (newMov === mov_up) ? setDireccion(0, -velY, mov_up) :
                    setDireccion(0, 0, '');
}

async function create() {
    this.add.image(600, 300, 'fondo');
    // create player
    player = this.physics.add.sprite(60, 500, mov_up);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    setOrientacion(mov_up);
    // player.direccion = direccion;
    // cantidad de imagenes en lineSprite para movimiento 'walk'

    const duration = 1000;

    // CREAMOS ANIMACIONES
    const repeat = -1;
    let frames = [0, 1, 2, 3, 4, 5, 6];
    //console.log(frames);

    // ANIMACIONES DE MOVIMIENTOS AVANZAR
    this.anims.create({
        key: mov_up,
        frames: this.anims.generateFrameNumbers(mov_up, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: mov_left,
        frames: this.anims.generateFrameNumbers(mov_left, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: mov_down,
        frames: this.anims.generateFrameNumbers(mov_down, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: mov_right,
        frames: this.anims.generateFrameNumbers(mov_right, { frames }),
        duration,
        repeat
    });
    // ANIMACIONES DE MOVIMIENTOS CON GIRO
    this.anims.create({
        key: turn_down_left,
        frames: this.anims.generateFrameNumbers(turn_down_left, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: turn_up_right,
        frames: this.anims.generateFrameNumbers(turn_up_right, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: turn_down_right,
        frames: this.anims.generateFrameNumbers(turn_down_right, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: turn_up_left,
        frames: this.anims.generateFrameNumbers(turn_up_left, { frames }),
        duration,
        repeat
    });
    // ANIMACIONES DE MOVIMIENTOS CON GIRO INVERTIDO
    frames = [6, 5, 4, 3, 2, 1, 0];
    this.anims.create({
        key: 'invert_' + turn_down_left,
        frames: this.anims.generateFrameNumbers(turn_down_left, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: 'invert_' + turn_up_right,
        frames: this.anims.generateFrameNumbers(turn_up_right, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: 'invert_' + turn_down_right,
        frames: this.anims.generateFrameNumbers(turn_down_right, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: 'invert_' + turn_up_left,
        frames: this.anims.generateFrameNumbers(turn_up_left, { frames }),
        duration,
        repeat
    });

    // ANIMACIONES DE MOVIMIENTOS RETROCEDER
    this.anims.create({
        key: 'back_' + mov_up,
        frames: this.anims.generateFrameNumbers(mov_up, { frames }),
        duration,
        repeat
    });

    this.anims.create({
        key: 'back_' + mov_left,
        frames: this.anims.generateFrameNumbers(mov_left, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: 'back_' + mov_down,
        frames: this.anims.generateFrameNumbers(mov_down, { frames }),
        duration,
        repeat
    });
    this.anims.create({
        key: 'back_' + mov_right,
        frames: this.anims.generateFrameNumbers(mov_right, { frames }),
        duration,
        repeat
    });


    timedEvent = this.time.addEvent({ delay: 1000, callback: moveExecution, callbackScope: this, loop: true });
}

async function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.right.isDown) {
        ejecution = true;

    }
}

async function selectMove(moves, contMoves) {
    let newMove;
    let anims = '';
    // solo al girar cambia la orientacion del agente
    console.log("EJECUTANDO: ", moves[contMoves]['move']);
    switch (moves[contMoves]['move']) {
        case retroceder: {
            let dirX = dirAgente.velX ? -dirAgente.velX : 0;
            let dirY = dirAgente.velY ? -dirAgente.velY : 0;
            newMove = await setAnimsMove(dirX, dirY, 'back_' + dirAgente.orientacion);
        }
            break;
        case avanzar:
            newMove = await setAnimsMove(dirAgente.velX, dirAgente.velY, dirAgente.orientacion);
            break;

        case giro_izquierda:
            // sentido inverso a las agujas del reloj

            if (dirAgente.orientacion === mov_left) {
                anims = 'invert_' + turn_down_left;
                //direccion.orientacion = mov_down;
                await setOrientacion(mov_down);
            } else if (dirAgente.orientacion === mov_down) {
                anims = turn_down_right;
                await setOrientacion(mov_right);
            } else if (dirAgente.orientacion === mov_right) {
                anims = 'invert_' + turn_up_right;
                await setOrientacion(mov_up);
            } else if (dirAgente.orientacion === mov_up) {
                anims = turn_up_left;
                await setOrientacion(mov_left);
            }
            console.log(dirAgente);
            console.log("anims:", anims);
            newMove = await setAnimsMove(0, 0, anims);
            break;
        case giro_derecha:
            // sentido de las agujas del reloj
            if (dirAgente.orientacion === mov_left) {
                anims = 'invert_' + turn_up_left;
                await setOrientacion(mov_up);
            } else if (dirAgente.orientacion === mov_up) {
                anims = turn_up_right;
                await setOrientacion(mov_right);
            } else if (dirAgente.orientacion === mov_right) {
                anims = 'invert_' + turn_down_right;
                await setOrientacion(mov_down);
            } else if (dirAgente.orientacion === mov_down) {
                await setOrientacion(mov_left);
                anims = turn_down_left;
            }
            newMove = await setAnimsMove(0, 0, anims);
            break;
        default:
            newMove = await setAnimsMove(0, 0, '');
    };
    console.log("sprite: ", dirAgente, 'newMove: ', newMove);
    return newMove;
}

async function setAnimsMove(dirX = 0, dirY = 0, anims = '') {
    const animsMove = {
        dirX,
        dirY,
        anims
    };
    return animsMove;
}

async function moveExecution() {
    if (ejecution) {
        const moveUpdated = await selectMove(moves, contMoves); // corregir se podría enviar moves[contMoves]['move'] (1 param)
        console.log("move => ", moveUpdated.dirX, moveUpdated.dirY, moveUpdated.anims);
        if (moves[contMoves] && !moves[contMoves]['ejecuted']) {
            player.setVelocityX(moveUpdated.dirX);
            player.setVelocityY(moveUpdated.dirY);
            player.anims.play(moveUpdated.anims, true);
            moves[contMoves]['ejecuted'] = true;
            contMoves++;
        }
        ejecution = (contMoves < moves.length);
    } else {
        // si se ejecutaron todos los movimientos, se detiene el agente
        if (contMoves >= moves.length) {
            console.log("JUEGO TERMINADO!!!", contMoves, moves.length);
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.stop();
            ejecution = false;
            timedEvent.remove(false);
        }
    }
}
