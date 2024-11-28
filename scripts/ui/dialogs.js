// * --> open dialog, create list
let buttonClose = document.getElementById('close_list-window');
let dialog = document.querySelector('.create-list-window');
let buttonOpen= document.getElementById('add-list-button');
let buttonDeleteList = document.querySelector('.delete-list-accept');
let buttonKeepList = document.querySelector('.delete-list-rejact');
var buttonOpenDeleteList = document.querySelectorAll('.delete-list');
let dialogDeleteList = document.getElementById('delete-list-window');
let listNameId = document.querySelector('.list-name-id');

buttonOpen.addEventListener('click', () => {
    dialog.showModal();
});

buttonClose.addEventListener('click', () => {
    dialog.close();
});

//* delete list
buttonKeepList.addEventListener('click', () => {
    dialogDeleteList.close();
});

// * Agrega el evento que muestra el modal para eliminar una actividad
buttonOpenDeleteList.forEach(a => {a.addEventListener('click', () => {
    dialogDeleteList.showModal();
    listNameId.innerText = a.name;
    console.log(a.name);
    refreshDeleteEvents()
    })
});

// * evento que elimina la lista 
buttonDeleteList.addEventListener('click', () => {
    let a = parseInt(listNameId.textContent);
    console.log(a);
    
    allLists.splice(a, 1);
    localStorage.setItem('lists', (JSON.stringify(allLists)));
    dialogDeleteList.close();
    listContent.innerHTML = "";
    for (let i = 0; i < allLists.length; i++) {
        const element = allLists[i];
        CreateList(i, element.listName)
    }
    console.log(parseInt(listNameId.textContent));
    refreshDeleteEvents();
});