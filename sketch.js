var helicopterImg, bgImg, packageImg;
var helicopterImage
var helicopterSprite, packageSprite;
var packageBody,boxBottomBody, boxLeftBody, boxRightBody;
var star, starImg, cloud, cloudImg, bat, batImg
var cat, catImg, catSleep, dog, dogImg, dog2Img, bg2Img, bg2
var bushes2 , bushes2Img, bushes3 , bushes3Img, bushes4 , bushes4Img
var raccoon, raccoon1Img, raccoon2Img,bin, bin2 ,binImg, bin2Img

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;


function preload()
{
	helicopterImg=loadImage("images/helicopter1.png")
	helicopterImage = loadAnimation("images/helicopter1.png","images/helicopter2.png")
	bgImg=loadImage("images/bg.png")
	bg2Img = loadImage("images/bg2.png")
	packageImg = loadImage("images/package.png")
	starImg = loadImage("images/stars.png")
	cloudImg = loadImage("images/clouds.png")
	batImg = loadAnimation("images/bat/1.png","images/bat/2.png","images/bat/3.png")
	dog2Img = loadAnimation("images/dog/0.png")
	dogImg = loadAnimation("images/dog/1.png","images/dog/2.png","images/dog/3.png","images/dog/4.png")
	catSleep = loadAnimation("images/cat/0.png")
	catImg = loadAnimation("images/cat/1.png","images/cat/2.png","images/cat/3.png","images/cat/4.png")
	bushes1Img = loadAnimation("images/bushes/1.png")
	bushes2Img = loadAnimation("images/bushes/2.png")
	bushes3Img = loadAnimation("images/bushes/3.png")
	bushes4Img = loadAnimation("images/bushes/4.png")
	raccoon1Img = loadAnimation("images/raccoon/1.png")
	raccoon2Img = loadAnimation("images/raccoon/2.png")
	binImg = loadAnimation("images/bin.png")
	bin2Img = loadAnimation("images/bin2.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	engine = Engine.create();
	world = engine.world;

	raccoon = createSprite(540,550,50,50)
	raccoon.addAnimation("eating", raccoon1Img)
	raccoon.addAnimation("scared", raccoon2Img)
	raccoon.scale = 0.4

	bin = createSprite(585,550,50,50)
	bin.addAnimation("dusty", binImg)
	bin.scale = 1.7

	bin2 = createSprite(770,550,50,50)
	bin2.addAnimation("rusty", bin2Img)
	bin2.scale = 1.8

	star = createSprite(400,20)
	star.addImage(starImg)
	star.scale = 0.8

	bg2 = createSprite(400,610,200,20)
	bg2.visible = false

	bat = createSprite(800,50)
	bat.addAnimation("flying",batImg)
	bat.scale = 0.5
	bat.velocityX = -3

	cloud = createSprite(0,100)
	cloud.addImage(cloudImg)
	cloud.velocityX = 0.5

	cat = createSprite(-20,470,20,20)
	cat.addAnimation("kitten",catImg)
	cat.scale = 0.4

	bushes2 = createSprite(390,450)
	bushes2.addAnimation("tree2", bushes2Img)
	bushes2.scale = 1.7

	bushes3 = createSprite(600,440)
	bushes3.addAnimation("tree3", bushes3Img)
	bushes3.scale = 1.7

	bushes4 = createSprite(800,470)
	bushes4.addAnimation("tree4", bushes4Img)
	bushes4.scale = 1.7

	dog = createSprite(490,490,20,20)
	dog.addAnimation("sleeping", dog2Img)
	dog.addAnimation("running", dogImg)
	dog.scale = 0.1

	packageSprite=createSprite(width/2, 50,200,200);
	packageSprite.addImage(packageImg)
	packageSprite.shapeColor = "yellow"
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 100, 10,10);
	helicopterSprite.addAnimation("flying",helicopterImage)
	helicopterSprite.scale=0.6

	engine = Engine.create();
	world = engine.world;
	
	boxBottomBody = new Box(400, 610, 200,20);
 	boxLeftBody = new Box(310, 570, 20,100);
 	boxRightBody = new Box(490, 570, 20,100);

	packageBody = Bodies.circle(width/2 , 100 , 20 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);

}


function draw() {
	Engine.update(engine);
	background(bgImg);
	
	packageSprite.x= packageBody.position.x 
	packageSprite.y= packageBody.position.y 

	if(packageSprite.x - bg2.x < bg2.width/2 + packageSprite.width/2
		&& bg2.x - packageSprite.x < bg2.width/2 + packageSprite.width/2
		&& packageSprite.y - bg2.y < bg2.height/2 + packageSprite.height/2
		&& bg2.y - packageSprite.y < bg2.height/2 + packageSprite.height/2
		){
		background(bg2Img)
		dog.changeAnimation("running")
		dog.scale = 0.5
		dog.velocityX = -4
		cat.changeAnimation("kitten", catImg)
		cat.velocityX = 4
		raccoon.changeAnimation("scared", raccoon2Img)
		raccoon.y = 555
		raccoon.velocityX = 4
	}

	boxRightBody.display();
	boxLeftBody.display();
	boxBottomBody.display();

	drawSprites(); 
}

function keyPressed() {
	
	if (keyCode === LEFT_ARROW) {

		helicopterSprite.x=helicopterSprite.x-20;    
		translation={x:-20,y:0}
		Matter.Body.translate(packageBody, translation)

	  } else if (keyCode === RIGHT_ARROW) {

		helicopterSprite.x=helicopterSprite.x+20;
		translation={x:20,y:0}
		Matter.Body.translate(packageBody, translation)
		
	  }
	  
	if (keyCode === DOWN_ARROW) {
	   
		Matter.Body.setStatic(packageBody, false)

	}
}
  
