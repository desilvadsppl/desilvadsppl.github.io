var StartGame2 = function (game) { };

StartGame2.prototype = {

	create: function () {

		this.game.stage.backgroundColor = '479cde';

		game.add.image(0, 0, "gs-bg-2");

		this.click = game.add.audio('click');
		game.sound.setDecodedCallback([this.click], this.showButtons, this);

		this.showButtons();
	},

	showButtons: function () {

		game.add.button(game.world.centerX - 120, 1400, 'btn_home', function () {
			this.click.play();
			this.game.state.start('MainMenu');
		}, this, 1, 0);
		game.add.button(game.world.centerX + 20, 1400, 'btn_play', function () {
			this.click.play();
			this.restartGame();
		}, this, 1, 0);

	},

	restartGame: function () {
		this.game.state.start("Game2");
	}

}