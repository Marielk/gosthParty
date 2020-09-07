import { 
  getBoundsSoul, 
  isRectanglesOverlapping, 
  isOverlapingOtherSoul, 
  getBoundsGhost
} from './utils.js';
import { gameTimer, totalTime, scoreText } from './updateGamer.js';
import { frames } from '../assets/animations/bat_animation.js';

let ghost;
let spider;
let spiderLeft;
let fogBack;
let fogFront;
let souls = [];
let soul;
let explosionGroup;
let flagFirstMouseDownUpdate = false;
let tweenSpider;
let tweenSpiderLeft;
let bat_animation;
let bat_animation2;
let timerTextAdd;
let scoreTextAdd;
let music;

const elementCreator = (game, soulCounter, flagFirstMouseDown) => {
  const background = game.add.sprite(0, 0, 'background');
  background.scale.setTo(0.6, 0.6)
  // personajes secundarios      
  createSpider(game)
  createFog(game)
  createBatAnimation(game);
  // personaje principal
  createGhost(game)
  // inicia animación de los personajes de fondo
  game.input.onDown.add(function (){onTap(game, spider, flagFirstMouseDown)} , this);
 // crea las almas y detecta cuando el personaje los atrapa
  createSouls(game, soulCounter)
// crea las explosiones cuando el personaje atrapa las almas
  handleExplosions(game)
  // muestra el puntaje y el tiempo 
  addTextToScreen(game)
  music = game.add.audio('boden');
  music.play();
}

const createGhost = (game) => {
  ghost = game.add.sprite(0,0,'ghost');
  ghost.frame = 0;
  ghost.x = game.width/2;
  ghost.y = game.height/2;
  ghost.anchor.setTo(0.5);
}

const createSpider = (game) => {
  spider = game.add.sprite(100, 0, 'spider');
  spiderLeft = game.add.sprite(1000, -30, 'spider');
  spider.scale.setTo(0.2, 0.2)
  spiderLeft.scale.setTo(0.2, 0.2)
}

const createFog = (game) => {
  fogBack = game.add.sprite(500,200,'fogBack');
  fogBack.scale.setTo(1.2, 1.2)
  fogFront = game.add.sprite(100, 550, 'fogFront');
  fogFront.scale.setTo(2, 2)
}

const createBatAnimation = (game) => {
  bat_animation = game.add.sprite(1500, 200, 'batAnimation');
  bat_animation.scale.setTo(0.5, 0.5);
  bat_animation.frame = 0;
  bat_animation.animations.add('fly', frames, 24, true);
  // bat_animation.animations.add('fly');
  bat_animation2 = game.add.sprite(-250, 200, 'batAnimation');
  bat_animation2.scale.setTo(0.5, 0.5);
  bat_animation2.angle = 90;
  bat_animation2.frame = 0;
  bat_animation2.animations.add('fly', frames, 24, true);
  
  
}

const addTextToScreen = (game) => {
  const style = {
    font: 'bold 30pt Arial',
    fill: '#FFFFFF',
    align: 'center'
  }
  timerTextAdd = game.add.text(1000, 40, totalTime+'', style);
  timerTextAdd.anchor.setTo(0.5);

  scoreTextAdd = game.add.text(game.width/2, 40, scoreText+'', style);
  scoreTextAdd.anchor.setTo(0.5);
}

const createSouls = (game, soulCounter) => {
  for(var i=0; i< soulCounter; i++){
    soul = game.add.sprite(100,100,'souls');
    soul.frame = game.rnd.integerInRange(0,3);
    soul.scale.setTo( 0.30 + game.rnd.frac());
    soul.anchor.setTo(0.5);
    soul.x = game.rnd.integerInRange(50, 1050);
    soul.y = game.rnd.integerInRange(50, 600);
    
    souls[i] = soul;
    let rectCurrenSoul = getBoundsSoul(soul);
    const rectGhost = getBoundsSoul(ghost);
    while( isOverlapingOtherSoul(i, rectCurrenSoul, souls) || isRectanglesOverlapping(rectGhost, rectCurrenSoul) ){
        soul.x = game.rnd.integerInRange(50, 1050);
        soul.y = game.rnd.integerInRange(50, 600);
        rectCurrenSoul = getBoundsSoul(soul);
    }
  }
}

const handleExplosions = (game) => {
  explosionGroup = game.add.group();
  
  for(let i=0; i < 10; i++){
      let explosion = explosionGroup.create(100,100,'explosion');
      explosion.tweenScale = game.add.tween(explosion.scale).to({
                      x: [0.4, 0.8, 0.4],
                      y: [0.4, 0.8, 0.4]
          }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);

      explosion.tweenAlpha = game.add.tween(explosion).to({
                      alpha: [1, 0.6, 0]
          }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);

      explosion.anchor.setTo(0.5);
      explosion.kill();
  }
  
}

const onTap = (game, spider, flagFirstMouseDown) => {
  if(!flagFirstMouseDown){
    tweenSpider = game.add.tween(spider.position).to( {y: -50}, 5800, Phaser.Easing.Cubic.InOut, true, 0, 1000, true).loop(true);
    tweenSpiderLeft = game.add.tween(spiderLeft.position).to( {y: -100}, 7000, Phaser.Easing.Cubic.InOut, true, 0, 1000, true).loop(true);
    bat_animation.animations.play('fly');
    const tweenBat = game.add.tween(bat_animation.position).to( {x: 600 ,y: -150}, 10000, Phaser.Easing.Exponential.Out, true, 0, 0, false).loop(false);
    setTimeout(() => {
      bat_animation2.animations.play('fly');
      const tweenBat2 = game.add.tween(bat_animation2.position).to( {x: 800 ,y: -150}, 10000, Phaser.Easing.Exponential.Out, true, 0, 0, false).loop(false);
    }, 6000)
    // console.log(spider)
  }
  flagFirstMouseDownUpdate = true;
}


export { 
  elementCreator,
  flagFirstMouseDownUpdate,
  music,
  ghost,
  spider,
  spiderLeft,
  fogBack,
  fogFront,
  souls,
  soul,
  explosionGroup,
  tweenSpider,
  bat_animation,
  bat_animation2,
  timerTextAdd,
  scoreTextAdd,
  tweenSpiderLeft,
}