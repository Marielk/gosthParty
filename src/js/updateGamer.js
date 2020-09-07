import { 
  ghost,
  music,
  fogBack,
  fogFront,
  souls,
  explosionGroup,
  tweenSpider,
  tweenSpiderLeft,
  flagFirstMouseDownUpdate,
  timerTextAdd,
  scoreTextAdd,
  bat_animation,
} from './elementCreator.js';

import {
  getBoundsGhost,
  getBoundsSoul,
  isRectanglesOverlapping,
  showFinalMessage,
} from './utils.js';


let countSmile = -1;
let currentScore = 0;
let amountSoulsCaught = 0;
let endGameUpdate = false
let totalTime = 30;
let scoreText = 0;
let timerGameOver;

const changeVolume = (pointer) => {

  if (pointer.y < 100)
  {
      music.mute = false;
  }
  else if (pointer.y < 300)
  {
      music.volume += 0.1;
  }
  else
  {
      music.volume -= 0.1;
  }

}

const gameTimer = (game) => {
  
  timerGameOver = game.time.events.loop(Phaser.Timer.SECOND, function(){
    if(flagFirstMouseDownUpdate){
        totalTime--;
        // timerText.text = totalTime+'';
        timerTextAdd.text = totalTime+'';
        if(totalTime === 0 ){
            // end game
          endGame(true, game)
        }
    }
  },this);
}


const increaseScore = (game, soulCounter) => {
  countSmile = 0;
  ghost.frame = 1;
  
  currentScore+=100;
  // scoreText.text = currentScore;
  scoreTextAdd.text = currentScore+'';
  amountSoulsCaught += 1;
  if(amountSoulsCaught >= soulCounter){
      // end gama
    endGame(false, game)  
  }
}

const endGame = (byTime, game) => {
  game.time.events.remove(timerGameOver);
  endGameUpdate = true;
  bat_animation.animations.stop(null, true);
  tweenSpider.stop();
  tweenSpiderLeft.stop();
  if (!byTime) {
    showFinalMessage(game, 'CONGRATULATIONS');
  } else {
    showFinalMessage(game, 'GAME OVER');
  }
}

const changeCharacterFrame = () => {
  if(countSmile >= 0){
    countSmile++;
    if(countSmile > 50){
        countSmile = -1;
        ghost.frame = 0;
    }
  }
}

const moveBackgroundCharacters = () => {
  fogBack.x--;
  if(fogBack.x <-300 ){
      fogBack.x = 1300;
  }
  
  fogFront.x+=0.3;
  if(fogFront.x>1300){
    fogFront.x = -300;
  }
}

const changeCharacterPosition = (game) => {
  let pointerX = game.input.x;
  let pointerY = game.input.y;

  let distX = pointerX - ghost.x;
  let distY = pointerY - ghost.y;

  if( distX > 0 ){
    ghost.scale.setTo(1,1);
  }else{
    ghost.scale.setTo(-1,1);
  }

  ghost.x += distX * 0.02;
  ghost.y += distY * 0.02;
}

const onTargetCatch = (game, soulCounter) => {
  for(var i=0; i< soulCounter; i++){
    var rectGhost = getBoundsGhost(ghost);
    var rectSoul = getBoundsSoul(souls[i]);
    
    
    if(souls[i].visible && isRectanglesOverlapping(rectGhost, rectSoul)){
        increaseScore(game, soulCounter);
        
        souls[i].visible = false;
        
        let explosion = explosionGroup.getFirstDead();
        if(explosion!=null){
            explosion.reset(souls[i].x, souls[i].y);
            explosion.tweenScale.start();
            explosion.tweenAlpha.start();
            
            explosion.tweenAlpha.onComplete.add(function (currentTarget, currentTween) {
                currentTarget.kill();
            }, this);
        }
        
    }
}
}

export {
  changeCharacterFrame,
  moveBackgroundCharacters,
  changeCharacterPosition,
  onTargetCatch,
  increaseScore,
  endGameUpdate,
  gameTimer,
  totalTime,
  scoreText,
  changeVolume
}