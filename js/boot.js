var Boot = function(game) {};

Boot.prototype = {
    preload: function() {
        // 1. Show loading indicator (no external assets needed)
        this.loadingText = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY,
            'Loading...', 
            {
                font: '30px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        );
        this.loadingText.anchor.set(0.5);
        
        // 2. Critical scaling setup
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();
    },

    create: function() {
        // 3. Force input reset
        this.game.input.touch.preventDefault = true;
        this.game.input.maxPointers = 1;
        this.game.input.addPointer();
        
        // 4. Double-check device orientation
        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false); // Force portrait
            this.scale.enterIncorrectOrientation.add(this.orientationWarning, this);
        }
        
        // 5. Start next state with safety delay
        this.game.time.events.add(500, function() {
            this.game.state.start('Preload');
        }, this);
    },
    
    orientationWarning: function() {
        // Handle landscape mode on phones
        alert('Please rotate your device to portrait mode');
    }
};