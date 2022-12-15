const form = document.forms['todo-list-form']
const input = form.content
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.todo-list-container');
const list = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false
let editId = ''

// Submit form 
form.addEventListener('submit', addItem)
// Clear List
clearBtn.addEventListener('click', clearItems);
document.addEventListener('DOMContentLoaded', initList)
const createdAt= (getCurrentTime())
console.log(getCurrentTime())
//functions
function addItem(e){
    e.preventDefault()
    const value = input.value;
    const id = new Date().getTime().toString()
    // hide and button
    // if(list.children.length >= 10){
    //     alert('too much')
    //     setBackToDefault()
    //     return
    // }

    if(value && !editFlag){
        //create element
        createListItem (id, value, createdAt)
       // 
       addToLocalStorage(id, value, createdAt)

       //set back to default
       setBackToDefault()
    } else if(value && editFlag){
        editElement.querySelector('span').innerText = value;
        editLocalStorage(editId, value)
        setBackToDefault()
    } else {
        console.log('please enter value')
    }
}

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
    setBackToDefault()
    console.log('deleteBtn')
    // set form value
    removeFromLocalStorage(id)
}
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement= e.currentTarget.parentElement.previousElementSibling
    // set form value
    input.value = editElement.querySelector('span').innerText
    editFlag = true
    editId = element.dataset.id
    submitBtn.textContent = 'edit'
    console.log(element)
}
 function clearItems(){
    const items = document.querySelectorAll('.todo-list__item')
    if(items.length > 0){
        items.forEach(item => {
            list.removeChild(item)
        })
    }
    setBackToDefault()
    localStorage.removeItem('list')
 }
function setBackToDefault(){
    input.value = ''
    editFlag = false
    editId = ''
    submitBtn.textContent = "add"
    submitBtn.hidden = list.children.length >= 10
}
function getCurrentTime(){
    const currentDate = new Date()
    return currentDate.toLocaleTimeString()
}
// need to save the time somewhere
 function addToLocalStorage(id, value, createdAt){
    let item ={id, value, createdAt}
    let items = getLocalStorage()
    items.push(item)
    localStorage.setItem('list', JSON.stringify(items))
 }

 function getLocalStorage(){
    return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list')):[]
 }
 function removeFromLocalStorage(id){
    const items = getLocalStorage()
    const updatedList = items.filter((item)=>
    {
        return item.id !== id
    })
    localStorage.setItem('list', JSON.stringify(updatedList))
 }
function editLocalStorage(id, value, createdAt){
    const items = getLocalStorage()
    const updatedList = items.map((item)=>{
        if(item.id === id){
            item.value = value
        }
        return item
    })
    localStorage.setItem('list',JSON.stringify(updatedList))
}

// Init List
function initList(){
    const items = getLocalStorage()
    if(items.length > 0){
        items.forEach(item =>{
            createListItem(item.id, item.value, item.createdAt)
        })
    }
}

function createListItem(id, value, createdAt){
 const element = document.createElement('div')
 const attrTime = document.createAttribute('data-time')
 attrTime.value = createdAt
 element.setAttributeNode(attrTime)
 const attr = document.createAttribute('data-id')
 attr.value = id
 element.setAttributeNode(attr)
 element.classList.add('todo-list__item')
 element.innerHTML = `
 <p class = 'title'>
     <span>${value}</span> - ${createdAt}
 </p>
 <div class = 'btn-container'>
     <button type='button' class='edit-btn'>edit</button>
     <button type='button' class='delete-btn'>delete</button>
 </div>`

// add event to both delete and edit 
const deleteBtn = element.querySelector('.delete-btn');
deleteBtn.addEventListener('click', deleteItem)
const editBtn = element.querySelector('.edit-btn');
editBtn.addEventListener('click', editItem)

// appen child
list.appendChild(element)
}