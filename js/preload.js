var Preload = function (game) { };

Preload.prototype = {

	preload: function () {

		// Audio
		this.game.load.audio('click', '/assets/audio/click.mp3');
		this.game.load.audio('open', '/assets/audio/open_page.mp3');
		this.game.load.audio('jump', '/assets/audio/jump.mp3');
		this.game.load.audio('hurt', '/assets/audio/hurt.mp3');
		this.game.load.audio('slip', '/assets/audio/slip.mp3');
		this.game.load.audio('switch', '/assets/audio/switch.mp3');
		this.game.load.audio('cheer', '/assets/audio/cheer.m4a');
		this.game.load.audio('count', '/assets/audio/count.m4a');
		this.game.load.audio('whisile', '/assets/audio/whisile.m4a');
		this.game.load.audio('mark', '/assets/audio/mark.mp3');
		this.game.load.audio('bgm', '/assets/audio/bgm.mp3');

		// // buttons 
		this.game.load.spritesheet('btn_elephant', '/assets/components/btn-aliya.png',313,132);
		this.game.load.spritesheet('btn_grease', '/assets/components/btn-grease.png', 313,132);
		this.game.load.spritesheet('btn_leader_board', '/assets/components/btn-leader.png', 303,152);

		this.game.load.spritesheet('logo', '/assets/components/logo.png', 360, 360);
		this.game.load.spritesheet('btn_sound', '/assets/components/sound_100x100.png', 105, 105);
		this.game.load.spritesheet('btn_mute', '/assets/components/mute100x100.png', 105, 105);
		this.game.load.spritesheet('btn_home', '/assets/components/home.png', 105, 105);
		this.game.load.spritesheet('btn_play', '/assets/components/btn-play.png', 105, 105);
		this.game.load.spritesheet('btn_exit', '/assets/components/btn-exit.png', 107.5, 104);

		this.game.load.image('menu', '/assets/images/bg/menu-screen.png');
	

		this.game.load.image('top-score-panel', 'assets/components/top-score-panel.png');

		this.game.load.image('tree', 'assets/components/grease_tree.png');
		


		// Game Start 
		this.game.load.image('gs-bg-2', '/assets/images/bg/elephant.png');
		this.game.load.image('gs-bg-3', '/assets/images/bg/grease.png');

		// Game 2 
		this.game.load.image('board', 'assets/components/board.png', 193, 71);
		this.game.load.image('chalk', '/assets/components/chalk.png');
		this.game.load.image('bg-aliya', '/assets/images/bg/aliya-back-ground.png');
		this.game.load.image('timeline', '/assets/components/timeline.png');
		this.game.load.image('timeline-bg', '/assets/components/timeline-bg.png');
		this.game.load.image('eye', '/assets/components/eye.png',);
		this.game.load.spritesheet('blind_fold', 'assets/components/blind_fold.png', 800, 235);
		this.game.load.spritesheet('cross', '/assets/components/cross.png', 18, 19);

		// Game 3
		this.game.load.spritesheet('player_climber', 'assets/components/player-climber.png', 200, 330);
		this.game.load.image('bg-3', 'assets/images/bg/bg-3.png');
		this.game.load.spritesheet('grease-pit', 'assets/components/grease-pit.png', 70, 157);

		// Game Over

		this.game.load.image('game-over', '/assets/images/bg/Game-over-screen.png');
		this.game.load.image('game-won2', '/assets/images/bg/game-win2.png');

	},

	create: function () {
		// Refresh input again after loading completes
		this.game.state.start("MainMenu");
	}
}