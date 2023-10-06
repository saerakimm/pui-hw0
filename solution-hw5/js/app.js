/* -------------------add & delete items in cart------------------- */
const shoppingCart = [];

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
      this.element = null; // for addToShoppingCart function
  }
}

// creating four new rolls
let roll1 = new Roll("Original", "Sugar Milk", 1, 2.49); // total $2.49
let roll2 = new Roll("Walnut", "Vanilla Milk", 12, 2.49); // total $39.90
let roll3 = new Roll("Raisin", "Sugar Milk", 3, 2.49); // total $8.49
let roll4 = new Roll("Apple", "Original", 3, 2.49); // total $10.47


function addToShoppingCart(roll){
  // structure from puinote-lab05
  // create clone of template
  const template = document.querySelector("cart-item-template");
  const clone = template.content.cloneNode(true);
  
  // connect this clone to our roll.element
  // from this point we only need to refer to roll.element
  roll.element = clone.querySelector('.roll');

  // const btnDelete = notecard.element.querySelector('.icon-delete');
  // console.log(btnDelete);
  // btnDelete.addEventListener('click', () => {
  //   deleteNote(notecard);
  // });

}


/* ----------parsing URL parameter (for product page)------------ */
const cart = [];

// set basePrice and packPrice and glazePrice
var basePrice = 2.49;
var packPrice = 1;
var glazePrice = 0; 
var rollGlaze = "Keep original";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

let selectedRoll = rolls[rollType]
basePrice = selectedRoll["basePrice"]; // update global var of basePrice
let rollImgStr = selectedRoll["imageFile"];

// update the header text
const headerElement = document.querySelector("#header-title");
headerElement.innerText = rollType + " cinnamon roll";

// update the base roll price
const priceElement = document.querySelector("#base-price");
priceElement.innerText = "$" + basePrice;
// update global var of basePrice

// update the image
const rollImage = document.querySelector("#product-detail-img");

rollImage.src = "../assets/products/" + rollImgStr;
rollImage.width = 400;

/* ---------------preparing to update cart (hw4)------------------- */

// a function that will run when the "add to cart" button is pressed
// add instance of Roll object to the cart array 
function onAddToCart() {
  const rollToAdd = new Roll(rollType, rollGlaze, packPrice, basePrice)
  cart.push(rollToAdd);
  console.log(cart);
}

// add to cart button event listener
let addToCart = document.querySelector('#add-to-cart');
addToCart.addEventListener("click", onAddToCart);


/* -----------------------updating price-------------------------- */
// create glaze objects
// TO-DO: create Glaze class and constructor
const keepOriginal = {glazeType:"Keep Original", price:0};
const vanillaMilk = {glazeType:"Vanilla Milk", price:0};
const strawberryMilk = {glazeType:"Strawberry Milk", price:0.50};
const doubleChocolate = {glazeType:"Double Chocolate", price:1.50};

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
// TO-DO: create Pack class and constructor
const one = {size:"1", price:1};
const three = {size:"3", price:3};
const six = {size:"6", price:6};
const twelve = {size:"12", price:12};

// an array with pack objects for looping to populate options
let allPacks = [one, three, six, twelve];

// loop to populate drop down options dynamically
for (let i = 0; i < allPacks.length; i++){
    let pack = allPacks[i];
    // creates a new 'option' HTML element, set its attributes, and adds it to the <select> element
    var option = document.createElement("option");
    var menu = document.querySelector("#packOptions");
    option.text = pack.size;
;   option.value = pack.price;
    menu.add(option);
}

// a function that will run when the glaze option changes
// updates the glazePrice variable value
function onGlazeChange(eventObj) {
    glazePrice = Number(this.value);
    // obtain the whole glaze menu
    tempMenuObj = eventObj.target.options;
    // index the menu to obtain just the glaze name text
    rollGlaze = tempMenuObj[eventObj.target.selectedIndex].text;
    updateFinalPrice();
  }

// glaze menu event listener
let selectGlaze = document.querySelector('#glazeOptions');
selectGlaze.addEventListener('change', onGlazeChange);


// a function that will run when the pack number changes
// updates the packPrice
function onPackChange() {
    packPrice = Number(this.value); 
    updateFinalPrice();
  }

// pack menu event listener
let selectPack = document.querySelector("#packOptions");
selectPack.addEventListener('change', onPackChange);

// a function that is called in onGlazeChange() and onPackChange() 
// updates the final price 
function updateFinalPrice() {
    // updating final price calculations 
    newPrice = ((basePrice + glazePrice) * packPrice).toFixed(2);
    newPrice = "$" + newPrice; // add back "$" 
    document.querySelector("#base-price").innerHTML = newPrice; // update UI
}






