// create glaze objects
// TO-DO: create glaze object constructor
const keepOriginal = {glazeType:"Keep Original", price:"+0.00"};
const vanillaMilk = {glazeType:"Vanilla Milk", price:"+0.00"};
const strawberryMilk = {glazeType:"Strawberry Milk", price:"+0.50"};
const doubleChocolate = {glazeType:"Double Chocolate", price:"+1.50"};

// an array with glaze objects for looping to populate options
let allGlazes = [keepOriginal, vanillaMilk, strawberryMilk, doubleChocolate];

// loop to populate drop down options dynamically
for (let i = 0; i < allGlazes.length; i++){
    let glaze = allGlazes[i];
    // creates a new 'option' HTML element, set its attributes, and adds it to the <select> element
    var option = document.createElement("option");
    var menu = document.querySelector("#glazeOptions");
    option.value = glaze.price;
    option.text = glaze.glazeType;
    menu.add(option);
}

// create pack objects
// TO-DO: create pack object constructor
const one = {size:"1", price:"*1"};
const three = {size:"3", price:"*3"};
const six = {size:"6", price:"*6"};
const twelve = {size:"12", price:"*12"};

// an array with pack objects for looping to populate options
let allPacks = [one, three, six, twelve];

// loop to populate drop down options dynamically
for (let i = 0; i < allPacks.length; i++){
    let pack = allPacks[i];
    // creates a new 'option' HTML element, set its attributes, and adds it to the <select> element
    var option = document.createElement("option");
    var menu = document.querySelector("#packOptions");
    option.text = pack.size;
    option.value = pack.price;
    menu.add(option);
}

// set basePrice and basePackMultipier
var basePrice = 2.49;
var basePackMultiplier = 1;
// set (global?) variables
var glazePrice = 0; 
var packMultiplier = 1;

// a function that will run when the glaze option changes
// updates the glazePrice variable value
function onGlazeChange() {
    glazePrice = Number(this.value);
    // console.log("the glaze price selected is " + glazePrice);
    updateFinalPrice();
  }

// glaze menu event listener
let selectGlaze = document.querySelector('#glazeOptions');
selectGlaze.addEventListener('change', onGlazeChange);


// a function that will run when the pack number changes
// updates thhe packMultiplier variable value
function onPackChange() {
    packMultiplier = this.value; 
    // clean data 
    packMultiplier = packMultiplier.replace("*", ""); 
    packMultiplier = Number(packMultiplier); 
    // console.log("the pack multiplier selected is " + packMultiplier);
    updateFinalPrice();
  }

// pack menu event listener
let selectPack = document.querySelector("#packOptions");
selectPack.addEventListener('change', onPackChange);

// a function that is called in onGlazeChange() and onPackChange() 
// updates the final price 
function updateFinalPrice() {
    console.log("updating final price");
    // updating final price calculations 
    newPrice = ((basePrice + glazePrice) * packMultiplier).toFixed(2);
    newPrice = "$" + newPrice; // add back "$" 
    document.querySelector("#price").innerHTML = newPrice; // update UI
}