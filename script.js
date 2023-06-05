import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://budgetshopper-d2bab-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const datatbase = getDatabase(app)
const shoppingListInDB= ref(datatbase, "shoppingList")

const inputFieldEL = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

// =================================================================
// adding to the database
addButtonEL.addEventListener("click",function () {
  let inputValue = inputFieldEL.value

  push(shoppingListInDB, inputValue)  // add to the DB and shopping list

  clearInputFieldEl() //clear input filed after adding item to the list
  
})

// =================================================================
// Fetching item from the DB
onValue(shoppingListInDB, function(snapshot){
  let listItemsArray = Object.values(snapshot.val()) // convert DB object into array

  shoppingListEl.innerContent = "" // clear old list to display updated list

  for(let i =0; i < listItemsArray.length; i++){ // loop through DB to display items on the app
    let listItem = listItemsArray[i]
    appendItemToShoppingListEL(listItem)
    console.log(listItem)
  }
})

//================================================================
// functions
function clearInputFieldEl(){
  inputFieldEL.value =""
}

function appendItemToShoppingListEL(itemValue){
  shoppingListEl.innerHTML +=`<li class="list-item">${itemValue}</li>`
}