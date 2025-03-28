const GameConfig = {
    // Core Game Settings
    type: Phaser.AUTO,  // Automatically chooses WEBGL or CANVAS
    parent: 'game-container', // DOM element to contain the game
    width: 1080,       // Design width
    height: 1920,      // Design height
    backgroundColor: '#000000', // Default background color
    
    // Render Settings
    render: {
        antialias: false,     // Better performance
        pixelArt: false,      // Set true if using pixel art
        roundPixels: true,    // Reduces texture shimmer
        transparent: false,
        powerPreference: "high-performance"
    },
    
    // Scale Manager Configuration (Critical for mobile)
    scale: {
        mode: Phaser.Scale.FIT,       // FIT, SHOW_ALL, or RESIZE
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: 'game-container',
        expandParent: false,
        min: {
            width: 540,    // Minimum width
            height: 960   // Minimum height
        },
        max: {
            width: 2160,  // Maximum width
            height: 3840   // Maximum height
        },
        resizeInterval: 100 // ms
    },
    
    // Input Configuration (Touch optimization)
    input: {
        activePointers: 3,       // Allow multi-touch
        touch: {
            capture: true,       // Prevents browser touch events
            preventDefault: true,
            disableContextMenu: true
        },
        smoothFactor: 0,          // No pointer smoothing
        gamepad: false            // Disable if not using gamepads
    },
    
    // Physics Configuration
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },    // No default gravity
            debug: false,         // Set true to show hitboxes
            fps: 60,              // Physics update rate
            fixedStep: true       // Consistent physics steps
        }
    },
    
    // Audio Configuration
    audio: {
        disableWebAudio: false,
        noAudio: false,
        context: 'webgl'
    },
    
    // Loader Configuration
    loader: {
        baseURL: 'assets/',
        crossOrigin: 'anonymous',
        maxParallelDownloads: 4,
        timeout: 0
    },
    
    // DOM Container Settings
    dom: {
        createContainer: true,
        behindCanvas: false
    },
    
    // FPS Control
    fps: {
        min: 30,
        target: 60,
        forceSetTimeOut: true,
        deltaHistory: 10,
        panicMax: 120
    },
    
    // Callbacks
    callbacks: {
        postBoot: function(game) {
            // Called after the game boots
            game.scale.refresh();
        }
    }
};

// Initialize the game with this configuration
const game = new Phaser.Game(GameConfig);