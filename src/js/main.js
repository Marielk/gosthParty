import { gameLoader } from './imageLoader.js';
import { elementCreator, flagFirstMouseDownUpdate } from './elementCreator.js';
import { 
  changeCharacterFrame, 
  moveBackgroundCharacters, 
  changeCharacterPosition, 
  onTargetCatch, 
  endGameUpdate,
  gameTimer,
  changeVolume
} from './updateGamer.js';

let soulCounter = 30;
let flagFirstMouseDown = false;

const GamePlayManager = {
    init: function() {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;        
    },
    preload: function() {
      gameLoader(game)
    },
    create: function() {
      elementCreator(game, soulCounter, flagFirstMouseDown)
      gameTimer(game)
      game.input.onDown.add(changeVolume, this);
    },
    update: function() {
        if(flagFirstMouseDownUpdate && !endGameUpdate){
          changeCharacterFrame()
          moveBackgroundCharacters()
          changeCharacterPosition(game)  
          onTargetCatch(game, soulCounter)          
        }
        
    }
}

var game = new Phaser.Game(1136, 640, Phaser.CANVAS);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");