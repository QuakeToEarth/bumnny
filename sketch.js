const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var backgroundImage;
var rabbitBlink;
var water;
var rabbitSprite;
var rabbitSad;
var rabbitEat;
var cutButton;

function preload() {
  backgroundImage = loadImage("background.png");
  water = loadImage("melon.png");
  rabbitBlink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  rabbitSad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  rabbitEat = loadAnimation(
    "eat_0.png",
    "eat_1.png",
    "eat_2.png",
    "eat_3.png",
    "eat_4.png"
  );
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, 680, 600, 20);
  rope = new Rope(7, { x: 245, y: 30 });
  fruit = Bodies.circle(100, 100, 20);
  rabbitSprite = createSprite(250, 550, 50, 50);
  rabbitSprite.addAnimation("rabbitthing", rabbitBlink);
  rabbitSprite.addAnimation("eating", rabbitEat);
  rabbitSprite.addAnimation("sad", rabbitSad);
  rabbitSprite.changeAnimation("rabbitthing")
  rabbitSprite.scale = 0.3;
  rabbitSprite.frameDelay = 20;
  connection = new Connection(rope.body, fruit);
  Matter.Composite.add(rope.body, fruit);
  cutButton = createImg("cut_button.png");
  cutButton.position(215, 30);
  cutButton.size(50, 50);
  cutButton.mouseClicked(dropFruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(backgroundImage);
  ground.show();
  rope.show();
  if (fruit != null) image(water, fruit.position.x, fruit.position.y, 100, 100);
  Engine.update(engine);
  if (collide(fruit, rabbitSprite)){
    rabbitSprite.changeAnimation("eating")
  }
  if (collide(fruit, ground)){
    rabbitSprite.changeAnimation("sad")
  }
  drawSprites();
}

function dropFruit() {
  rope.break();
  connection.breakConnection();
  fruit = null; 
}

function collide(bodyA, bodyB) {
  if (fruit != null) {
    var d = dist(
      bodyA.position.x,
      bodyA.position.y,
      bodyB.position.x,
      bodyB.position.y
    );
    if (d <= 80) {
      World.remove(world, fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}
