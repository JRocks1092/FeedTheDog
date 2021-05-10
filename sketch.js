var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedTheDog;
var foodObj;
var feed, lastFed=0;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
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

  //write code to read fedtime value from the database 

  //console.log(foodStock);
  console.log(lastFed);

  stroke("red");  
  
  if(lastFed>12){

    text("Last Feed Time : "+lastFed-12+ "PM", 350, 30);

  }else if(lastFed === 12){
    
    text("Last Feed Time : "+lastFed+ "PM", 350, 30);

  }
  
  else if(lastFed===0){

    text("Last Feed Time : 12 AM", 350, 30);

  }else{

    text("Last Feed Time : "+lastFed+ "AM", 300, 30);

  }
   
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_Stock = foodObj.getFoodStock();

  if(food_Stock<=0){
    foodObj.updateFoodStock(food_Stock * 0);
  }else{

    foodObj.updateFoodStock(food_Stock -1);
  }
  var time = hour();
  database.ref('FeedTime').set(time);
  console.log(time);
  lastFed = database.ref('FeedTime');

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
