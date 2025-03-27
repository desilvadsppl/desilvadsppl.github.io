var Boot = function(game) {};

Boot.prototype = {
    preload: function() {
        // Show loading text
        var loadingText = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY - 50,
            "Loading...",
            { font: '40px Arial', fill: "#ffffff" }
        );
        loadingText.anchor.setTo(0.5, 0.5);

        // Load loading animation
        this.game.load.spritesheet('loading', 'assets/components/loading.png', 199, 199);
    },

    create: function() {
        // Initialize loading animation
        this.loading = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loading'
        );
        this.loading.anchor.setTo(0.5, 0.5);
        
        this.loading.animations.add('initiate', 
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            18,
            true
        );
        this.loading.play('initiate');

        // Set up game scaling
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Start preload state
        this.game.state.start("Preload");
    }
};