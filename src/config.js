const Config = {
	DOT_SIZE: 20,
	FIELD_WIDTH: 10,
	FIELD_HEIGHT: 20,
	BLOCK_SIZE: 4,
	INIT_X: 3,
	INIT_Y: 0,
};

Config.SCREEN_WIDTH = Config.FIELD_WIDTH * Config.DOT_SIZE;
Config.SCREEN_HEIGHT = Config.FIELD_HEIGHT * Config.DOT_SIZE;

export { Config };