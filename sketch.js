var path, boy, coin, leftBoundary, rightBoundary;
var pathImg, boyImg;
var i;
var score = 0;

function preload(){
  coinImg = loadImage("coin.png"); 
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-1.png", "Runner-2.png", "Runner-2.png");
}

function setup(){
  
  createCanvas(400, 400);

  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.scale = 1.2;
  //path.velocityY = 4;
  //path.visible=false;

  //creating boy running
  boy = createSprite(180, 340, 30, 30);
  boy.scale = 0.08;
  boy.addAnimation("JakeRunning", boyImg);
  
  //create coin
  coin = createSprite(78, 0);
  coin.scale = 0.25;
  coin.addImage(coinImg);
  coin.velocityY = 5;

  // create left Boundary
  leftBoundary = createSprite(0, 0, 100, 800);
  leftBoundary.visible = false;

  //create right Boundary
  rightBoundary = createSprite(400, 0, 100, 800);
  rightBoundary.visible = false;
}

function draw() {
  
  background(0);

  edges = createEdgeSprites();

  textSize(18);
  fill("red");
  text(""+ score, 0, 200);
  
  path.velocityY = 4;
  
  if (coin.collide(boy)) {
    score++;
    generateCoin();

    console.log(score)
  }

  if (coin.collide(edges[3])) {
    generateCoin();
  }

  // boy moving on Xaxis with mouse
  if (World.mouseX > 0 && World.mouseX < 400) {
    boy.x = World.mouseX;
  }
  
  //boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  //code to reset the background
  if(path.y > 400){
    path.y = height / 2;
  } 
  
  drawSprites();
}

function getRandom(min, max) {
  //return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.round(random(min, max));
}

function generateCoin() {
  coin.x = getRandom(80, 320);
  coin.y = getRandom(-400, 0);
  coin.velocityY = 5; 
}