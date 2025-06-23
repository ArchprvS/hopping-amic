import scene_1 from './scenes/scene_1.js';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    scene: [scene_1],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 200 },
            debug: false,
        },
    },
};
new Phaser.Game(config);
//# sourceMappingURL=main.js.map