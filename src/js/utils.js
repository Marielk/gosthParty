

  const getBoundsSoul = (currentSoul) => {
    return new Phaser.Rectangle(currentSoul.left, currentSoul.top, currentSoul.width, currentSoul.height);
  }

  const isRectanglesOverlapping = (rect1, rect2) =>  {
      if(rect1.x> rect2.x+rect2.width || rect2.x> rect1.x+rect1.width){
          return false;
      }
      if(rect1.y> rect2.y+rect2.height || rect2.y> rect1.y+rect1.height){
          return false;
      }
      return true;
  }

  const isOverlapingOtherSoul = (index, rect2, souls) => {
    for(let i=0; i<index; i++){
        let rect1 = getBoundsSoul(souls[i]);
        if(isRectanglesOverlapping(rect1, rect2)){
            return true;
        }
    }
    return false;
  }

  const getBoundsGhost = (ghost) => {
    const x0 = ghost.x - Math.abs(ghost.width)/4;
    const width = Math.abs(ghost.width)/2;
    const y0 = ghost.y - ghost.height/2;
    const height = ghost.height;
      
    return new Phaser.Rectangle(x0, y0,width,height);
  }

const showFinalMessage = (game, msg ) => {
    const bgAlpha = game.add.bitmapData(game.width, game.height);
    bgAlpha.ctx.fillStyle = '#000000';
    bgAlpha.ctx.fillRect(0,0,game.width, game.height);
    
    const bg = game.add.sprite(0,0,bgAlpha);
    bg.alpha = 0.5;
    
    const style = {
        font: 'bold 60pt Arial',
        fill: '#FFFFFF',
        align: 'center'
      }
    
    const textFieldFinalMsg = game.add.text(game.width/2, game.height/2, msg, style);
    textFieldFinalMsg.anchor.setTo(0.5);
}

export { 
  getBoundsSoul, 
  isRectanglesOverlapping, 
  isOverlapingOtherSoul, 
  getBoundsGhost,
  showFinalMessage
}