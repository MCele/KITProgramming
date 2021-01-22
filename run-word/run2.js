
//const Phaser = require('phaser');

let ejecution = false;

const moves = [{
    id: 0,
    move: 'abajo'
},
{
    id: 1,
    move: 'abajo'
},
{
    id: 2,
    move: 'abajo'
},
{
    id: 3,
    move: 'abajo'
},
{
    id: 4,
    move: 'abajo'
},
{
    id: 5,
    move: 'avanzar'
},
{
    id: 6,
    move: 'avanzar'
},
{
    id: 7,
    move: 'avanzar'
},
{
    id: 8,
    move: 'abajo'
},
{
    id: 9,
    move: 'abajo'
},
{
    id: 10,
    move: 'abajo'
},
{
    id: 11,
    move: 'atras'
},
{
    id: 12,
    move: 'atras'
},
{
    id: 13,
    move: 'atras'
},
];


let contMoves = 0;  //contamos la cantidad de movimeintos realizados

const velX = 70;
const velY = 70;

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
    this.load.setBaseURL('https://localhost:8080');
    this.load.image('fondo', 'assets/space3.png');
    this.load.spritesheet('red', 'assets/spritesheets/peloRosado.png', { frameWidth: 63, frameHeight: 64.5 });

    //this.load.image('cesped', './assets/grass/Pictures/Props/cutted grass.png');
}

const framesCyclic = async (start, medium) => {
    let frames = [];
    for (let i = start; i < medium; i++) { frames.push(i) }
    for (let i = medium; start <= i; i--) { frames.push(i) }
    return frames;
}

async function create() {
    this.add.image(400, 300, 'fondo');

    // create player
    player = this.physics.add.sprite(100, 450, 'red');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    // cantidad de imagenes en lineSprite para movimiento 'walk'
    const cantWalk = 9;

    let start = lineSprite * 8;
    let end = start + cantWalk - 1;
    const duration = 700;

    let frames = await framesCyclic(start, end - 1);
    let repeat = -1;
    console.log(frames);
    // const frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('red', { frames }),
        duration,
        repeat
    });

    start = lineSprite * 9;
    end = start + cantWalk - 1;
    frames = await framesCyclic(start, end);
    console.log(frames);
    // repeat = frames.length;
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('red', { frames }),
        duration,
        repeat
    });
    start = lineSprite * 10;
    end = start + cantWalk - 1;
    frames = await framesCyclic(start, end);
    console.log(frames);
    // repeat = frames.length;
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('red', { frames }),
        duration,
        repeat
    });
    start = lineSprite * 11;
    end = start + cantWalk - 1;
    frames = await framesCyclic(start, end);
    console.log(frames);
    //repeat = frames.length;
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('red', { frames }),
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

async function moveExecution() {
    if (ejecution) {
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