var Game2 = function (game) { };

var tries = 3;
var score = 0;

Game2.prototype = {
    create: function () {
        this.alive = true;
        this.perc = 900;
        this.percx = 60;
        this.game.stage.backgroundColor = 'ffe8a3';
        this.game.add.image(0, 0, 'bg-aliya');
        tries = 3;
        score = 0;
        this.scoreDiv = 1;
        
        // Sound for the buttons
        this.click = game.add.audio('click');
        this.mark = game.add.audio('mark');
        this.bgm = game.add.audio('bgm');
        this.switch = game.add.audio('switch');
        this.whisile = game.add.audio('whisile');
        this.bgm.volume = 0.5;

        var bg_t = game.add.image(0, 0, "timeline-bg");
        this.progress = game.add.image(0, 0, "timeline");
        this.progress.x = (this.game.world.width - bg_t.width) / 2;
        bg_t.x = (this.game.world.width - bg_t.width) / 2;
        bg_t.y = 1035;
        this.progress.y = 1035;

        this.chalks = this.game.add.group();
        this.chalks.createMultiple(3, 'chalk');

        this.chalks.children[0].reset(this.game.world.centerX - 100, bg_t.position.y - 900);
        this.chalks.children[1].reset(this.game.world.centerX, bg_t.position.y - 900);
        this.chalks.children[2].reset(this.game.world.centerX + 100, bg_t.position.y - 900);

        // Board 
        this.createBoard();
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.addButtons();

        this.game.time.events.loop(10, this.decrementerScore, this);
        this.game.time.events.loop(38000, this.bgms, this);

        this.bgm.play();
    },

    addButtons: function () {
        game.add.button(20, 1000, 'btn_home',
            () => {
                this.stopSounds(); 
                this.click.play(); 
                this.game.state.start('MainMenu');
            }, this, 1, 2);

        this.mute = game.add.button(20, 1100, 'btn_mute', this.soundIt, this, 1, 0);
        this.mute.visible = false;
        this.sound = game.add.button(20, 1100, 'btn_sound', this.muteIt, this, 1, 0);
    },

    bgms: function () {
        if (this.sound.visible)
            this.bgm.play();
        else
            this.bgm.pause();
    },

    soundIt: function () {
        this.mute.visible = false;
        this.sound.visible = true;
        this.click.play();
        this.bgm.play();
    },

    muteIt: function () {
        this.sound.visible = false;
        this.mute.visible = true;
        this.bgm.pause();
    },

    stopSounds: function () {
        this.click.pause();
        this.mark.pause();
        this.bgm.pause();
    },

    createBoard: function () {
        this.board = game.add.sprite(Math.floor(Math.random() * (50 - 1 + 1) + 0), 200, 'board');
        this.board.scale.setTo(1.5);
        
        // Simplified board behavior without score-based conditions
        this.board.x = (this.game.world.width / 10);
        this.boardShake_x = game.add.tween(this.board).to(
            { x: (this.game.world.width / 6 * 2) }, 945, "Sine.easeInOut", true, 0, -1, true);
        this.boardShake_y = game.add.tween(this.board).to(
            { y: this.board.y + 30 }, 617, "Sine.easeInOut", true, 0, -1, true);

        this.board.inputEnabled = true;
        this.board.input.pixelPerfectOver = true;
        this.board.input.useHandCursor = true;
        this.board.events.onInputDown.add(this.setEyeMark, this);

        this.createBlinder();
        this.blinder.play('initiate');
        this.whisile.play();
    },

    setEyeMark: function (board, pointer) {
        // Get the local position of the click within the board sprite
        const localPosition = {
            x: pointer.x - board.x,
            y: pointer.y - board.y
        };

        // Define the target area (eye area) relative to the board
        const e_x_1 = (board.width / 4.3333);
        const e_x_2 = (board.width / 3.5777);
        const e_y_1 = (board.height / 3.5094);
        const e_y_2 = (board.height / 2.8181);

        // Check if click is within target area
        if ((localPosition.x > e_x_1 && localPosition.x < e_x_2) && 
            (localPosition.y > e_y_1 && localPosition.y < e_y_2) && this.alive) {
            // Correct hit
            this.mark.play();
            this.boardShake_y.pause();
            this.boardShake_x.pause();
            this.blinder.play('shrink');

            // Add eye mark at the exact clicked position
            const eyeMark = this.game.add.sprite(
                pointer.x - (29 / 2),  // Center the eye mark horizontally
                pointer.y - (17 / 2),  // Center the eye mark vertically
                "eye"
            );
            eyeMark.anchor.set(0.5);

            setTimeout(() => {
                this.blinder.visible = false;
                score = this.perc;
                this.gameWon();
            }, 200);
        }
        else {
            // Missed the target
            if (this.alive) {
                this.mark.play();
                this.boardShake_y.resume();
                this.boardShake_x.resume();
                
                // Add cross at the clicked position
                const cross = this.game.add.sprite(
                    pointer.x - 15, 
                    pointer.y - 15, 
                    'cross'
                );
                cross.scale.setTo(2);
                cross.animations.add('initiate', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, false);
                cross.play('initiate');
            }
            
            tries--;
            if (!(tries < 0) && this.alive) {
                this.chalks.children[tries].alpha = 0.40;
            }

            if (tries == 0) {
                this.alive = false;
                this.blinder.play('shrink');
                this.boardShake_x.pause();
                this.boardShake_y.pause();
                setTimeout(() => {
                    this.blinder.visible = false;
                    this.gameOver();
                }, 240);
            }
        }
    },

    createBlinder: function () {
        this.blinder = this.game.add.sprite(-(this.game.world.centerX / 2), this.game.world.centerY / 4, 'blind_fold');
        this.blinder.scale.setTo(1.9, 2);
        this.blinder.animations.add('initiate', [0, 1, 2, 3, 4, 5, 6], 19, false);
        this.blinder.animations.add('shrink', [6, 5, 4, 3, 2, 1, 0], 26, false);
    },

    decrementerScore: function () {
        if (this.alive) {
            this.perc -= 0.5;
            this.percx += 0.03
            this.progress.width = this.perc;
            this.progress.x = this.percx;

            if (this.perc <= 0) {
                this.gameOver();
            }
        }
    },

    gameOver: function () {
        this.alive = false;
        this.stopSounds();
        setTimeout(() => {
            this.game.state.start('GameOver2');
        }, 1500);
    },

    gameWon: function () {
        this.alive = false;
        this.stopSounds();
        setTimeout(() => {
            this.game.state.start('GameWon');
        }, 1500);
    }
};