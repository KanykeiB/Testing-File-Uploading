const form = document.forms['form-id'];
const input = form.content;
const addBtn = document.getElementById('btnID');
const divParent = document.getElementById('cardDiv');

// Edit
let editEl;
let editFlag = false;
let editID = ''
// Под инпутом должен отображаться список добавленных элементов. 
// (при каждом добавлении нового элемента, предыдущие должны оставаться в списке)
// При клике на Add должен валидироваться инпут. 
// Т.е. если значения нет, то ничего не делать и показывать ошибку и если значение есть, 
// то добавлять в список
// После добавления очищать инпут.
// Элементы в списке должны содержать информацию о том, 
// когда был добавлен элемент "часы:минуты". 
// Например: "Задача 1 - 20:00"
// В элемент добавьте кнопку с иконкой "X" при клике на которую удаляется элемент из списка
// Start with making a function to add items by pressing to add
form.addEventListener('submit', addItem)

function addItem (e){
    e.preventDefault();
    if(input.value && input.value.match(/^\s+$/) == null && !editFlag){
        // make a div for list
        const id = new Date().getTime().toString()
        const divToDoListItem = document.createElement('div');
        const pChild = document.createElement('p');
        const pTime = document.createElement('p');
        const divBtn = document.createElement('div');
        const btnEdit = document.createElement('button');
        const btnDel = document.createElement('button');
        divToDoList.append(divToDoListItem);
        divToDoListItem.append(pChild);
        divToDoListItem.append(divBtn);
        divBtn.append(btnEdit);
        divBtn.append(btnDel);
        divBtn.prepend(pTime)
        pChild.innerText = `${input.value}`;
        pTime.innerText = `${getCurrentTime()}`;
        btnEdit.innerText = 'Edit'
        btnDel.innerText = 'Delete'
        // Add function to edit
        btnEdit.addEventListener('click', editItem);

        // Add function to delete
        btnDel.addEventListener('click', deleteItem);
        function deleteItem (){
            divToDoListItem.remove()
        }
        // Add function to clear
        btnClear.addEventListener('click', clearAll)
        function clearAll() {
            divToDoList.innerHTML = ''
            btnClear.style.display = 'none';
        }
        btnClear.style.display = 'block';
        btnEdit.style.marginRight = '10px'
        btnEdit.style.marginLeft = '10px'
        btnEdit.style.border = '1px #e2d5de solid'
        btnEdit.style.backgroundColor = '#e2d5de'
        btnEdit.style.color = '#0d6efd'
        btnEdit.style.borderRadius = '5px'
        btnDel.style.border = '1px #e2d5de solid'
        btnDel.style.backgroundColor = '#e2d5de'
        btnDel.style.color = 'brown'
        btnDel.style.borderRadius = '5px'
        pTime.style.marginBottom = 'unset'
        divBtn.style.display = 'flex'
        divBtn.style.alignItems = 'center'
        divToDoListItem.style.display = 'flex'
        divToDoListItem.style.justifyContent = 'space-between'
        setDefault ()
    } else if(input.value && editFlag){
        editEl.innerText = input.value;
        setDefault ()
    } else if(input.value =='' || input.value.match(/^\s+$/) !== null){
        alert('Add Item')
        setDefault ()
    } 
}
const divToDoList = document.createElement('div');
divParent.append(divToDoList)
const btnClear = document.createElement('button');
divParent.append(btnClear);
btnClear.innerText = 'Clear All'
btnClear.style.display = 'none';
btnClear.style.border = '1px #e2d5de solid'
btnClear.style.backgroundColor = '#e2d5de'
btnClear.style.borderRadius = '5px'


function setDefault () {
    input.value = '';
    editFlag = false;
    addBtn.textContent = 'Add'
}

function editItem(e){
    editEl = e.currentTarget.parentElement.previousSibling
    input.value = editEl.innerText;
    addBtn.textContent = 'edit'
    editFlag = true
    addBtn.style.display = 'block'
}

// Time 
function getCurrentTime(){
    const currentDate = new Date()
    return currentDate.toLocaleTimeString()
}










