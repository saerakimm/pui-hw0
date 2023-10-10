// for calculating final price

const keepOriginal = {glazeType:"Original", price:0};
const sugarMilk = {glazeType:"Sugar Milk", price:0};
const vanillaMilk = {glazeType:"Vanilla Milk", price:0.50};
const doubleChocolate = {glazeType:"Double Chocolate", price:1.50};

// an array with glaze objects 
let allGlazes = [keepOriginal, vanillaMilk, sugarMilk, doubleChocolate];

const one = {size:"1", price:1};
const three = {size:"3", price:3};
const six = {size:"6", price:5};
const twelve = {size:"12", price:10};

// an array with pack objects
let allPacks = [one, three, six, twelve];

/* -------------------add items in cart (hw5)------------------- */

const shoppingCart = new Set();

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

// creating four new rolls
let roll1 = new Roll("Original", "Sugar Milk", 1, 2.49); // total $2.49
let roll2 = new Roll("Walnut", "Vanilla Milk", 12, 3.49); // total $39.90 
let roll3 = new Roll("Raisin", "Sugar Milk", 3, 2.99); // total $8.49
let roll4 = new Roll("Apple", "Original", 3, 3.49); // total $10.47

// add rolls to shoppingCart (hard coded for hw5)
shoppingCart.add(roll1);
shoppingCart.add(roll2);
shoppingCart.add(roll3);
shoppingCart.add(roll4);

// populate cart page dynamically by accessing each item in shoppingCart set
for (const roll of shoppingCart) {
    createCartItem(roll);
}

// takes in a roll object then creates a clone of the item template and appends to DOM
// calls the updateCartItem() function to update the clone element content according to roll object passed in
function createCartItem(roll){
    // create clone of template
    const template = document.querySelector("#cart-item-template");
    const clone = template.content.cloneNode(true);

    // connect clone box to roll.element;
    roll.element = clone.querySelector(".cart-item");

    // the container that holds all the cart items
    const cartPageContainer = document.querySelector(".cart-container");

    // add the cloned cart item to the container
    cartPageContainer.prepend(roll.element);

    // for deleting an item in the cart
    const removeButton = document.querySelector("#remove-text");
    removeButton.addEventListener("click", () => {
        deleteItem(roll);
    });

    // update roll content
    updateCartItem(roll)
}


// updates the content of the item template according to roll object passed in
function updateCartItem(roll){
  // updating template clone's img
  let itemImg = document.querySelector(".cart-product-img"); 
  // create new img src string based on roll variable passed into this function
  let newImgSrcString = "../assets/products/" + roll.type + "-cinnamon-roll.jpg";
  // update src attribute
  itemImg.setAttribute("src", newImgSrcString);
  
  // updating template clone's alt text
  // create new img alt text based on roll variable passed into this function
  let newImgAltString = roll.type + "-cinnamon-roll";
  // update alt attribute
  itemImg.setAttribute("alt", newImgAltString);

  // updating item name
  let name = document.querySelector("#item-name");
  let itemNameStr = roll.type + " Cinnamon Roll";
  name.textContent = itemNameStr;

  // updating item glaze
  let glaze = document.querySelector("#item-glaze");
  glaze.textContent = roll.glazing;

  // updating item pack size
  let size = document.querySelector("#item-pack-size");
  size.textContent = "Pack Size: " + roll.size;

  // update item prices
  let calculated = calculatePrice(roll) // get calculated price from calculatePrice ()
  let calcPrice = document.querySelector("#calculated-price");
  calcPrice.textContent = "$" + calculated;
}

function calculatePrice(roll){
    let glazePrice;
    let packPrice;
    for (let i = 0; i < allGlazes.length; i++){
        if (allGlazes[i]["glazeType"] == roll.glazing){
            glazePrice = allGlazes[i]["price"];
        }
    }

    for (let j = 0; j < allPacks.length; j++){
        if (allPacks[j]["size"] == roll.size){
            packPrice = allPacks[j]["price"];
        }
    }
    let calculatedPrice = ((roll.basePrice + glazePrice) * packPrice).toFixed(2);
    return calculatedPrice
}


/* -------------------remove items in cart (hw5)------------------- */

function deleteItem(roll){
    // remove cart item from DOM in UI
    roll.element.remove();
    // remove cart item object from shoppingCart set
    shoppingCart.delete(roll);
    // calculate new total 
    calculateTotal();
}

/* -------------------updating total price(hw5)------------------- */

function calculateTotal(){
    let totalPrice = 0;
    for (const item of shoppingCart){
        totalPrice += Number(calculatePrice(item));
    }
    let total = document.querySelector("#grand-total");
    total.textContent = "$" + totalPrice.toFixed(2);
}

// only calculate total price if cart isn't empty
if (shoppingCart.size !== 0){
    calculateTotal();
}