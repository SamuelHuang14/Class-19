var gameState="play";

var door, doorImage, ghost, ghostImage, tower, towerImage, climber, climberImage;
var spooky;
var doorGroup, climberGroup, invisibleBlockGroup;

function preload(){
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas (600, 600);
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 3;
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  spooky.loop();
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  
  
}

function draw(){
  background("black");
  if (gameState === "play"){
    if(tower.y>=400){
      tower.y=300;
    }
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    if(keyDown("space")){
      ghost.velocityY=-3;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    spawnDoors();
    if(climberGroup.isTouching(ghost)){
       ghost.velocityY=0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
       ghost.destroy();
      gameState="end";
    }
    drawSprites();
  }
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER", 200, 250)
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200, -50);
    door.addImage(doorImage);
    door.velocityY=3;
    door.x=Math.round(random(140, 400));
    door.lifetime=300;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    doorGroup.add(door);
    climber = createSprite(200, 15);
    climber.addImage(climberImage)
    climber.velocityY=3;
    climber.x=door.x;
    climber.lifetime=300;
    climberGroup.add(climber);
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=door.velocityY;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}