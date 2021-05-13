var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedTheDog;
var foodObj;
var feed, lastFed=0;
var food_Stock;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  food_Stock=database.ref('Food');
  food_Stock.on("value",readStock);

  lastFed=database.ref('FeedTime');
  lastFed.on("value",readFeedTime); 
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(690,95);
  feedTheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  stroke("red");  
  
  console.log(lastFed);  

  if(lastFed>12){

    text("Last Feed Time : "+Math.round(lastFed-12)+ "PM", 350, 30);
    console.log("Last Feed Time : "+Math.round(lastFed-12)+ "PM")

  }else if(lastFed === 12){
    
    text("Last Feed Time : "+lastFed+ "PM", 350, 30);

  }
  
  else if(lastFed===0){

    text("Last Feed Time : 12 AM", 350, 30);

  }else{

    text("Last Feed Time : "+lastFed+ "AM", 300, 30);

  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readFeedTime(data){

  lastFed=data.val();

}


function feedDog(){
  
  dog.addImage(happyDog);
  
  //write code here to update food stock and last fed time
  food_Stock = foodObj.getFoodStock();

  if(food_Stock<=0){
    food_Stock = food_Stock*0;
  }else{

    food_Stock -=1
  }
  lastFed = hour();
  database.ref('FeedTime').set(lastFed);
  //console.log(time);
  database.ref('/').update({
    Food:food_Stock
  })

}

//function to add food in stock
function addFoods(){
  food_Stock++;
  database.ref('/').update({
    Food:food_Stock
  })
}
