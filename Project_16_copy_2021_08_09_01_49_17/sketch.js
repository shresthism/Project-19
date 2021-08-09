/*
A simple 
'Monkey Go Happy' Game
by
Mehraz Singh
*/

// variables declared
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage, obstacleGroup;
var FoodGroup;
var score;
var edges;


function preload() {
  
  // monkey running animation created
  monkey_running = loadAnimation (
    "sprite_0.png",                              
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",                                           "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  )
  
  // banana Image created
  bananaImage = loadImage("banana.png");
  
  // obstacle Image created
  obstaclesImage = loadImage("obstacle.png");
 
}


function setup() {

 var survivalTime = 0;
  
   //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1;
  
   // creating ground
   ground = createSprite(400,350,900,10);
   ground.velocityX=-4;
   ground.x=ground.width/2;
  
   edges = createEdgeSprites();

   // The groups
   FoodGroup = new Group();
   obstaclesGroup = new Group();

   score = 0;
}


function draw() {
  
  // background
  background(255);

  // made the ground infinite
  if(ground.x<0) {
     ground.x=ground.width/2;
  }
   
  // condition program for pressing space key
  if(keyDown("space") && monkey.x >= 10) {
     monkey.velocityY = -12;
  }
  
    // gravity for monkey created
    monkey.velocityY = monkey.velocityY + 0.8;
  
    // monkey going to collide with the ground
    monkey.collide(ground); 
  
    //collided monkey with edges
    monkey.collide(edges);
  
    // food function called
    spawnFood();
  
    // obstacle function called
    spawnObstacles();
 
    // srpites viewed on preview area
    drawSprites();

    // score viewed code
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " +score, 500,50);        
  
  // obstacle is Touching monkey? Monkey stop!
  if(obstaclesGroup.isTouching(monkey)) {
     ground.velocityX = 0;
     monkey.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
  }

    // Survival time shown 
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate()) 
    text("Survival Time: "+ survivalTime, 100,50);
}


function spawnFood() {
  
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
     banana = createSprite(600,250,40,10);
     banana.y = random(120,200);    
     banana.velocityX = -5;

    //assigned lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //added image of banana
    banana.addImage(bananaImage);
    // its scaling
    banana.scale=0.1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}


function spawnObstacles() {
  
  // spwaning of the obstacle
  if(frameCount % 300 === 0) {
     obstacle = createSprite(800,320,10,40);
     obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstaclesImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
    // stopped monkey from stopping before touching stone,     i.e, obstcale.
    obstacle.setCollider("rectangle", 0, 0, 300, 300);
  }
}