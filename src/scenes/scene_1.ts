export default class scene_1 extends Phaser.Scene {
  constructor() {
    super("Scene1");
  }

  private amic!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private direction_right: boolean = true;

  preload() {
    //console.log('Preload: Ładowanie zasobów...');
    // Przykład: this.load.image('logo', 'assets/logo.png');
    this.load.image("background", "assets/background.png");
    this.load.image("amic", "assets/amic.png");
    this.load.spritesheet("running_amic", "assets/running_amic.png", {
      frameWidth: 35,
      frameHeight: 35,
    });
    this.load.spritesheet("running_left", "assets/running_left.png", {
      frameWidth: 35,
      frameHeight: 35,
    });
  }

  create() {
    this.add.image(400, 300, "background");
    this.add.text(10, 10, `Version: preview`, {
      fontSize: "14px",
      color: "#ffffff",
      fontFamily: "PressStart2P-Regular",
    });

    // -- Amic -- //

    this.amic = this.physics.add.sprite(100, 500, "amic");
    this.anims.create({
      key: "run_right",
      frames: this.anims.generateFrameNumbers("running_amic", {
        start: 0,
        end: 10,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: "run_left",
      frames: this.anims.generateFrameNumbers("running_left", {
        start: 0,
        end: 10,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: "stop_right",
      frames: [{ key: "running_amic", frame: 4 }],
      frameRate: 15,
    });
    this.anims.create({
      key: "stop_left",
      frames: [{ key: "running_left", frame: 0 }],
      frameRate: 15,
    });
    this.amic.setCollideWorldBounds(true);

    //* Camera Zoom *//

    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.amic, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(20, 20);

    //* Adding keyboard events *//

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    } else {
      throw new Error("Keyboard input is not available.");
    }
  }

  update(time: number, delta: number) {
    // - Controls - //

    if (this.cursors.left.isDown) {
      this.amic.setVelocityX(-100);
      this.direction_right = false;
      this.amic.play("run_left", true);
    } else if (this.cursors.right.isDown) {
      this.amic.setVelocityX(+100);
      this.direction_right = true;
      this.amic.play("run_right", true);
    } else {
      this.amic.setVelocityX(0);
      if (this.direction_right) {
        this.amic.play("stop_right");
      } else {
        this.amic.play("stop_left");
      }
    }
  }
}
