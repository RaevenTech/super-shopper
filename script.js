import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://budgetshopper-d2bab-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const datatbase = getDatabase(app)
const shoppingListInDB= ref(datatbase, "shoppingList")

const inputFieldEL = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-button")

addButtonEL.addEventListener("click",function () {
  let inputValue = inputFieldEL.value
  push(shoppingListInDB, inputValue)
  console.log(inputValue)
  console.log("clicked")
})