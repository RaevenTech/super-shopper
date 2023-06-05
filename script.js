import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://budgetshopper-d2bab-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB= ref(database, "shoppingList")

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
  let itemsArray = Object.entries(snapshot.val()) // convert DB object into array

  shoppingListEl.innerHTML = "" // clear old list to display updated list

  for(let i = 0; i < itemsArray.length; i++){ // loop through DB to display items on the app
    let currentItem = itemsArray[i]
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    appendItemToShoppingListEL(currentItem)

  }
})

//================================================================

function clearInputFieldEl(){
  inputFieldEL.value =""
}

function appendItemToShoppingListEL(item){
  let itemID = item[0]
  let itemValue = item[1]
  // append new Element to the list and BD
  let newListEL = document.createElement("li")
  newListEL.textContent = itemValue

// remove and Element ot Item from the list and DB
  newListEL.addEventListener("click",function(){
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)
  })

  shoppingListEl.append(newListEL)
}