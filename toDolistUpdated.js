const form = document.forms['form-id'];
const input = form.content;
const addBtn = document.getElementById('btnID');
const divParent = document.getElementById('cardDiv');

// Edit
let editEl;
let editFlag = false;
let editID = ''
document.addEventListener('DOMContentLoaded', savedContent)


form.addEventListener('submit', addItem)
function addItem (e){
    e.preventDefault();
    const id = new Date().getTime().toString()
    const value = input.value
    let createdAt = getCurrentTime();
    if(value && value.match(/^\s+$/) == null && !editFlag){
        
        createListItem(id, value, createdAt)
        addToLocalStorage(id, value, createdAt)
        displayMessage('Item added successfully 😊', "success")

    } else if(value && editFlag){
        editEl.innerText = input.value;
        editValueOfLocalStorage(editID,value)
        displayMessage('Item has been edited ✔️', "success")
        setDefault ()
    } else if(input.value =='' || input.value.match(/^\s+$/) !== null){
        displayMessage('Oops, please add item 😌', "error")
        setDefault ()
    } 
}
// add to body
const divToDoList = document.createElement('div');
divParent.append(divToDoList)
const btnClear = document.createElement('button');
divParent.append(btnClear);
btnClear.innerText = 'Clear All'
btnClear.classList.add('clear')

// functions
function setDefault () {
    input.value = '';
    editFlag = false;
    addBtn.textContent = 'Add'
}

function editItem(e){
    editEl = e.currentTarget.parentElement.previousSibling
    const element = document.querySelector('.divItem')
    input.value = editEl.innerText;
    addBtn.textContent = 'edit'
    editFlag = true
    addBtn.style.display = 'block'
    editID = element.dataset.id
}
function deleteItem (){
    let deleteItem = document.querySelector('.divItem')
    const id = deleteItem.dataset.id
    deleteItem.remove()
    displayMessage('Item has been deleted ✔️', "error")
    removeFromLocalStorage(id)
     
}
function clearAll() {
    divToDoList.innerHTML = ''
    btnClear.style.display = 'none';
    displayMessage('All cleared ✔️', "success")
    localStorage.removeItem('list')
}

function getCurrentTime(){
    const currentDate = new Date()
    return currentDate.toLocaleTimeString()
}
function addToLocalStorage(id, value, createdAt){
    let item = {id, value, createdAt}
    let items = getItemFromLocalStorage();
    items.push(item)
    localStorage.setItem('list', JSON.stringify(items))
}
function getItemFromLocalStorage(){
    return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list')):[]
}
function removeFromLocalStorage(id){
    const items = getItemFromLocalStorage();
    const newList = items.filter((item)=>{
        return item.id !== id
    })
    localStorage.setItem('list', JSON.stringify(newList))
}
function editValueOfLocalStorage(id, value){
    const items = getItemFromLocalStorage();
    const editedList = items.map((item)=>{
        if(item.id === id){
            item.value = value
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(editedList))
}
function savedContent(){
    const items = getItemFromLocalStorage();
    if(items.length > 0){
        items.forEach(item =>{
            createListItem(item.id, item.value, item.createdAt)
        })
    }
}
function createListItem(id, value, createdAt){
    const divToDoListItem = document.createElement('div');
    divToDoListItem.classList.add('divItem')
    const divTime = document.createAttribute('data-time')
    divTime.value = createdAt
    divToDoListItem.setAttributeNode(divTime)
    const divId = document.createAttribute('data-id')
    divId.value = id
    divToDoListItem.setAttributeNode(divId)
    const pChild = document.createElement('p');
    const pTime = document.createElement('p');
    const divBtn = document.createElement('div');
    divBtn.classList.add('divBtn')
    const btnEdit = document.createElement('button');
    const btnDel = document.createElement('button');
    divToDoList.append(divToDoListItem);
    divToDoListItem.append(pChild);
    divToDoListItem.append(divBtn);
    divBtn.append(btnEdit);
    divBtn.append(btnDel);
    divBtn.prepend(pTime)
    pChild.innerText = `${value}`;
    pTime.innerText = `${createdAt}`;
    btnEdit.innerText = 'Edit'
    btnDel.innerText = 'Delete'
    btnEdit.classList.add('edit')
    btnDel.classList.add('delete')
    // Add function to edit
    btnEdit.addEventListener('click', editItem);
    // Add function to delete
    btnDel.addEventListener('click', deleteItem);
    // Add function to clear
    btnClear.addEventListener('click', clearAll)
    btnClear.style.display = 'block';
    pTime.style.marginBottom = 'unset'
    setDefault ()
    
}

function displayMessage(text, style){
    let element = document.querySelector('#alertMessage');
    let timerId = setInterval(() =>{
        element.innerText = text;
        element.classList.add(style)
        element.style.display = 'block'
    }, 0);

    setTimeout(() => { 
        clearInterval(timerId);
        element.style.display = 'none'
    }, 1500);}
