
//const Phaser = require('phaser');

let ejecution = false;
// let terminar = false;
const moves = [{
    id: 0,
    move: 'avanzar'
},
{
    id: 1,
    move: 'avanzar'
},
{
    id: 2,
    move: 'arriba'
},
{
    id: 3,
    move: 'arriba'
},
{
    id: 4,
    move: 'avanzar'
},
{
    id: 5,
    move: 'arriba'
},
{
    id: 6,
    move: 'avanzar'
},
{
    id: 7,
    move: 'abajo'
},
{
    id: 8,
    move: 'abajo'
},
{
    id: 9,
    move: 'atras'
},
{
    id: 10,
    move: 'arriba'
}
];
// obtenemos último id del array de movimientos
const finalizarId = moves[moves.length - 1].id;
let contMoves = 0;  //contamos la cantidad de movimeintos realizados
// console.log(finalizarId);
const velX = 60;
const velY = 60;
// let anims = '';

const config = {
    type: Phaser.AUTO, //intenta utilizar WebGL automáticamente
    width: 800,
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
const lineSprite = 13;

function preload() {
    // this.load.setBaseURL('https://labs.phaser.io');
    this.load.setBaseURL('https://localhost:8080');
    this.load.image('fondo', 'assets/space3.png');
    this.load.spritesheet('red', 'assets/spritesheets/peloRojo.png', { frameWidth: 63, frameHeight: 64.5 });


    //this.load.image('cesped', './assets/grass/Pictures/Props/cutted grass.png');
}

function create() {
    this.add.image(400, 300, 'fondo');

    // create player
    player = this.physics.add.sprite(100, 450, 'red');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    let start = lineSprite * 8;
    let end = (lineSprite * 9) - 4;
    const duration = 1000;
    const repeat = 10;
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('red', { start, end }),
        duration,
        repeat
    });

    start = lineSprite * 9;
    end = (lineSprite * 10) - 4;
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('red', { start, end }),
        duration,
        repeat
    });
    start = lineSprite * 10;
    end = (lineSprite * 11) - 4;
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('red', { start, end }),
        duration,
        repeat
    });
    start = lineSprite * 11;
    end = (lineSprite * 12) - 4;
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('red', { start, end }),
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
// async function update2() {
//     const cursors = this.input.keyboard.createCursorKeys();
//     if (cursors.right.isDown) {
//         ejecution = true;

//     }
//     if (ejecution) {
//         ejecution = false;
//         if (contMoves >= moves.length) {
//             console.log("JUEGO TERMINADO!!!", contMoves, moves.length);
//             terminar = true;
//             // player.anims.stop();
//             player.setVelocityX(0);
//             player.setVelocityY(0);
//         }
//         else {
//             let resp;
//             moves.forEach(async (mov, index) => {
//                 console.log(mov.id, mov.move);
//                 contMoves++;
//                 if (mov.move === 'atras') {
//                     // player.setVelocityX(-30);
//                     // player.setVelocityY(0);
//                     // player.anims.play('left', true);
//                     //setTimeout(async () => {
//                     resp = await moveEjecution(-120, 0, 'left')
//                     //}, 3000);
//                 }
//                 if (mov.move === 'avanzar') {
//                     player.body.gravity.y = 0;
//                     // player.setVelocityX(30);
//                     // player.setVelocityY(0);
//                     // player.anims.play('right', true);
//                     //setTimeout(async () => {
//                     resp = await moveEjecution(120, 0, 'right');
//                     //}, 3000);
//                 }
//                 if (mov.move === 'arriba') {
//                     //player.body.gravity(0);
//                     // player.setVelocityY(-30);
//                     // player.setVelocityX(0);
//                     // player.anims.play('up', true);
//                     //setTimeout(async () => {
//                     resp = await moveEjecution(0, -120, 'up');
//                     // }, 3000);
//                 }
//                 if (mov.move === 'abajo') {
//                     // player.body.gravity(0);
//                     // player.setVelocityY(30);
//                     // player.setVelocityX(0);
//                     // player.anims.play('down', true);
//                     // setTimeout(async () => {
//                     resp = await moveEjecution(0, 120, 'down');
//                     //}, 3000);
//                 }
//                 console.log("resp:", await resp);
//                 //}, 2000);
//             });
//         }
//     }

// }

async function updateMove(moves, contMoves) {
    // console.log("contMoves", contMoves);
    // revisar si se quita el update y todo el case se ejecuta en el moveEjecution o método 
    // que seallamado desde el timedEvent, ya no existe update
    // si no otro tema puede ser sacar todo al otro método pero que la animacion vaya en el update (revisar)
    // pasa que se queda con la ultima animación solamente
    // const promise = new Promise(function (resolve, reject) {
    // if (!terminar) {
    // if (contMoves >= moves.length) {
    //     console.log("JUEGO TERMINADO!!!", contMoves, moves.length);
    //     terminar = true;
    //     dirX = 0;
    //     dirY = 0;
    //     anims = '';
    // }
    // else {
    // if (!moves[contMoves]['ejecuted']) {
    //     console.log("update move = ", moves[contMoves]);
    //     return await selectMove(moves, contMoves);


    // }
    // if (moves[contMoves] && !moves[contMoves]['ejecuted']) { console.log("no ejecuted") }
    // }
    //resolve({ dirX, dirY, anims });
    // }
    return null;
    //});
}

async function selectMove(moves, contMoves) {
    let newMove;
    switch (moves[contMoves]['move']) {
        case 'atras':
            newMove = await setAnimsMove(-velX, 0, 'left');
            break;
        case 'avanzar':
            newMove = await setAnimsMove(velX, 0, 'right');
            break;

        case 'arriba':
            newMove = await setAnimsMove(0, -velY, 'up');
            break;
        case 'abajo':
            newMove = await setAnimsMove(0, velY, 'down');
            break;
        default:
            newMove = await setAnimsMove();
    };
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

export async function moveExecution() {
    if (ejecution) {
        // const moveUpdate = await updateMove(moves, contMoves);
        const moveUpdated = await selectMove(moves, contMoves);

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