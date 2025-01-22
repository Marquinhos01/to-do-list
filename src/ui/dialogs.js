// * --> open dialog, create list
let buttonClose = document.getElementById('close_list-window');
let dialog = document.querySelector('.create-list-window');
let buttonOpen= document.getElementById('add-list-button');
let buttonDeleteList = document.querySelector('.delete-list-accept');
let buttonKeepList = document.querySelector('.delete-list-rejact');
let buttonOpenDeleteList = document.querySelectorAll('.delete-list');
let buttonOpenDeleteAct = document.querySelectorAll('.delete-act');
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

// * Agrega el evento que muestra el modal para eliminar una lista
buttonOpenDeleteList.forEach(a => {a.addEventListener('click', () => {
    dialogDeleteList.showModal();
    listNameId.innerText = a.name;
    refreshDeleteEvents()
    })
});

buttonOpenDeleteAct.forEach(a => {a.addEventListener('click', () => {
    dialogDeleteList.showModal();
    listNameId.innerText = a.name;
    refreshDeleteEvents()
    })
});

// * evento que elimina la lista 
buttonDeleteList.addEventListener('click', () => {
    const a = listNameId.textContent.split(':');
    
    switch (a[0]) {
        case 'list':
            allLists.splice(a[1], 1);
            if(allActs.length > 1 && allActs[0] != a[1]){
                allActs[0]--;
            } else {
                allActs = [];
                ReLoadActs();
            }
            break;
        
        case 'act':
            allActs.splice(a[1],1);
            ReLoadActs();
            break
        default:
            break;
    }

    localStorage.setItem('lists', (JSON.stringify(allLists)));
    dialogDeleteList.close();
    listContent.innerHTML = "";
    for (let i = 0; i < allLists.length; i++) {
        const element = allLists[i];
        CreateList(i, element.listName)
    }
    refreshDeleteEvents();
});