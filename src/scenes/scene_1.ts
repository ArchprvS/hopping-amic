export default class scene_1 extends Phaser.Scene {
  constructor() {
    super("Scene1");
  }

  private amic!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private direction_right: boolean = true;
  private ground!: Phaser.GameObjects.TileSprite;
  private physicsGround!: Phaser.GameObjects.Rectangle;

  preload() {
    //console.log('Preload: Ładowanie zasobów...');
    // Przykład: this.load.image('logo', 'assets/logo.png');
    this.load.image("background", "assets/background.png");
    this.load.image("amic", "assets/amic.png");
    this.load.image("ground", "assets/ground.png");
    this.load.spritesheet("running_amic", "assets/running_amic.png", {
      frameWidth: 35,
      frameHeight: 35,
    });
    this.load.spritesheet("running_left", "assets/running_left.png", {
      frameWidth: 35,
      frameHeight: 35,
    });
    this.load.spritesheet("jump_right", "assets/jump_right.png", {
      frameWidth: 35,
      frameHeight: 35,
    });
    this.load.spritesheet("jump_left", "assets/jump_left.png", {
      frameWidth: 35,
      frameHeight: 35,
    });
    this.load.spritesheet("fall_right", "assets/falling_right.png", {
      frameWidth: 35,
      frameHeight: 35,
    });
    this.load.spritesheet("fall_left", "assets/falling_left.png", {
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
        end: 9,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: "run_left",
      frames: this.anims.generateFrameNumbers("running_left", {
        start: 0,
        end: 9,
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
    this.anims.create({
      key: "jump_right",
      frames: [{ key: "jump_right", frame: 0 }],
      frameRate: 15,
    });
    this.anims.create({
      key: "jump_left",
      frames: [{ key: "jump_left", frame: 0 }],
      frameRate: 15,
    });
    this.anims.create({
      key: "fall_right",
      frames: [{ key: "fall_right", frame: 0 }],
      frameRate: 15,
    });
    this.anims.create({
      key: "fall_left",
      frames: [{ key: "fall_left", frame: 0 }],
      frameRate: 15,
    });

    // -- Ground -- //

    this.ground = this.add.tileSprite(0, 590, 800, 10, "ground");
    this.ground.setOrigin(0, 0);
    this.physicsGround = this.add.rectangle(400, 600, 800, 10, 0x000000, 0);
    this.physics.add.existing(this.physicsGround, true);

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

    //* Collider *//

    this.amic.setCollideWorldBounds(true);
    this.physics.add.collider(this.amic, this.physicsGround);
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
    if (
      this.cursors.up.isDown && (this.amic.body as Phaser.Physics.Arcade.Body).blocked.down) {
      this.amic.setVelocityY(-150);
    }
    if (!(this.amic.body as Phaser.Physics.Arcade.Body).blocked.down) {
      if (this.direction_right) {
        if ((this.amic.body as Phaser.Physics.Arcade.Body).velocity.y > 0) {
          this.amic.play("fall_right");
        }
        else {
          this.amic.play("jump_right");
        }
      }
      else {
        if ((this.amic.body as Phaser.Physics.Arcade.Body).velocity.y > 0) {
          this.amic.play("fall_left");
        }
        else {
          this.amic.play("jump_left");
        }
      }
    }
  }
}
