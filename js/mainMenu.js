var MainMenu = function (game) { };

MainMenu.prototype = {
    create: function () {
        this.click = game.add.audio('click');
        this.open = game.add.audio('open');
        this.bgm = game.add.audio('bgm');
        this.bgm.volume = 0.7; 
        this.game.stage.backgroundColor = 'ffe8a3';
        this.game.stage.backgroundColor = '000000';

        this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // Handle audio context resume on user interaction
        this.game.input.onDown.add(function() {
            if (this.game.sound.context.state === 'suspended') {
                this.game.sound.context.resume();
            }
        }, this);

        game.add.image(0, 0, 'menu').scale.setTo(1.02, 1.02);
        /*game.add.image(0, 0, 'points-style').scale.setTo(1.02, 1.02);*/

        /*var sun = game.add.sprite(this.game.world.width - 300, -20, 'sun');
        sun.animations.add('shine', [0, 1, 2, 3], 2, true);
        sun.play('shine');
        sun.scale.setTo(0.6, 0.6);

        var bird = game.add.sprite(-15, -20, 'bird');
        bird.animations.add('crow', [0, 1, 2, 3], 3, true);
        bird.play('crow');*/

        /*game.add.image(0, 0, 'menu-fix').scale.setTo(1.02, 1.02);
        game.add.image(this.game.world.centerX - 150, 70, 'logo').scale.setTo(0.7, 0.7);*/

        this.showMenu();
        this.addButtons();

        this.game.time.events.loop(38000, this.bgms, this);
        this.bgms();
    },

    showMenu: function () {
        this.open.play();

        var scoreFont = "25px Mali";

        this.game.add.text(this.game.world.centerX - 165, this.game.world.height - 70, 
            "Powered by Reflect Total Solutions", { font: "20px Mali", fill: "#000" });

        this.scoreLabel = this.game.add.text(this.game.world.centerX, this.game.world.height / 2.355, 
            "", { font: scoreFont, fill: "#4f3e00" });
        this.scoreLabel.anchor.setTo(0.5, 0.5);
        this.scoreLabel.align = 'center';
        this.game.world.bringToTop(this.scoreLabel);
         
        /*this.greetText = this.game.add.text(this.game.world.centerX, this.game.world.height / 2.9, 
            "සුභ අලුත් අවුරුද්දක් වේවා!", { font: scoreFont, fill: "#000" });
        this.greetText.anchor.setTo(0.5, 0.5);
        this.greetText.align = 'center';
        this.game.world.bringToTop(this.greetText);*/

        // Add game buttons
       // Add game buttons with increased scale and proper spacing
        var buttonYStart = this.game.world.height / 2.75;
        var buttonSpacing = 300; // Increased spacing between buttons


        game.add.button(
            game.world.centerX - 490, 
            buttonYStart - 250 + buttonSpacing, // Add consistent spacing
            'btn_elephant', 
            this.startGame2, 
            this, 
            1, 0, 0
        ).scale.setTo(3);

        game.add.button(
            game.world.centerX - 490, 
            buttonYStart - 190 + (buttonSpacing * 2), // Double spacing for third button
            'btn_grease', 
            this.startGame3, 
            this, 
            1, 0, 0
        ).scale.setTo(3);

        this.scoreLabel.bringToTop();
        this.alive = true;
    },

    bgms: function () {
        if (this.sound.visible && this.alive)
            this.bgm.play();
        else
            this.bgm.pause();
    },

    addButtons: function () {
        game.add.button(13, 275, 'btn_exit', this.exit, this, 1, 0);

        this.mute = game.add.button(10, 175, 'btn_mute', this.soundIt, this, 1, 0);
        this.mute.visible = false;
        this.sound = game.add.button(10, 175, 'btn_sound', this.muteIt, this, 1, 0);
    },

    exit: function () {
        window.location.reload();
    },

    muteIt: function () {
        this.mute.visible = true;
        this.sound.visible = false;
        this.bgm.pause();
    },

    soundIt: function () {
        this.sound.visible = true;
        this.mute.visible = false;
        this.bgm.play();
        this.click.play();
    },

    cxx: function () {
        this.alive = false;
        this.click.play();
        this.bgm.pause();
    },

    startGame2: function () { this.cxx(); this.game.state.start("StartGame2"); },
    startGame3: function () { this.cxx(); this.game.state.start("StartGame3"); }
};