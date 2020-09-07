const gameLoader = (game) => {
  game.load.image('background', './src/assets/images/background.png');
  game.load.spritesheet('ghost', './src/assets/images/ghost_cat.png', 250, 300, 2);
  game.load.spritesheet('souls', './src/assets/images/souls.png', 81, 84, 4);
  
  game.load.image('explosion', './src/assets/images/explosion.png');
  
  game.load.image('fogBack', './src/assets/images/fog.png');
  game.load.image('fogFront', './src/assets/images/fog.png');
  game.load.image('spider', './src/assets/images/spider.png');

  // game.load.image('batGif', './src/assets/images/bat_gif.gif');
  game.load.spritesheet('batAnimation', './src/assets/images/bat_frames.png', 218, 300);
  game.load.audio('boden', './src/assets/music/sm2_golding.mp3');
}

export { gameLoader };