// open dialog, create list

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

// delete list


buttonKeepList.addEventListener('click', () => {
    dialogDeleteList.close();
});


buttonOpenDeleteList.forEach(a => {a.addEventListener('click', () => {
    dialogDeleteList.showModal();
    listNameId.innerText = a.name;
    // console.log('d')
    })
    buttonDeleteList.addEventListener('click', () => {
        for(let i = 0; i < allLists.length; i++){
            if(allLists[i].listName == listNameId.textContent){
                allLists.splice(i, 1);
                localStorage.setItem('lists', (JSON.stringify(allLists)));
                dialogDeleteList.close();
                listContent.innerHTML = ""; 
                for(i of allLists){
                    let name = i.listName;
                    CreateList(name);
                }
                refreshDeleteEvents();
                // location.reload();
                break
            } else{
                continue
            }
        }
    });
});

