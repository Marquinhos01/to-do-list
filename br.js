// Variables y elementos
let buttonClose = document.getElementById('close_list-window');
let dialog = document.querySelector('.create-list-window');
let buttonOpen = document.getElementById('add-list-button');
let buttonDeleteList = document.querySelector('.delete-list-accept');
let buttonKeepList = document.querySelector('.delete-list-rejact');
var buttonOpenDeleteList = document.querySelectorAll('.delete-list');
let dialogDeleteList = document.getElementById('delete-list-window');
let listNameId = document.querySelector('.list-name-id');
let allLists = JSON.parse(localStorage.getItem('lists')) || [];
let formList = document.getElementById('create-activity-form');
let listContent = document.querySelector('.secundary-nav__lists-part');
const searchContent = document.getElementById('list-search');

// Abrir y cerrar dialog de crear lista
buttonOpen.addEventListener('click', () => {
    dialog.showModal();
});

buttonClose.addEventListener('click', () => {
    dialog.close();
});

// Cerrar dialog de eliminar lista
buttonKeepList.addEventListener('click', () => {
    dialogDeleteList.close();
});

// Estructura HTML de una lista
const ListStructure = (n) => {
    return `
        <div class="list-container" name="${n}">
            <div class="list-container__parts icon">
                <span class="material-symbols-outlined">filter_alt</span>
            </div>
            <div class="list-container__parts title">
                <p><span>${n}</span></p>
            </div>
            <div class="list-container__parts delete">
                <button class="delete-list" name="${n}">
                    <span class="material-symbols-outlined">delete</span>
                </button>
                <button class="edit-list" name="${n}">
                    <span class="material-symbols-outlined">tune</span>
                </button>
            </div>
        </div>
    `;
};

// Crear una lista en la interfaz
function CreateList(name) {
    listContent.insertAdjacentHTML('beforeend', ListStructure(name));
}

// Asignar evento de eliminar lista a cada botón
function assignDeleteListEvent(button) {
    button.addEventListener('click', () => {
        dialogDeleteList.showModal();
        listNameId.innerText = button.name;
    });
}

// Refrescar eventos de eliminación
function refreshDeleteEvents() {
    buttonOpenDeleteList = document.querySelectorAll('.delete-list');
    buttonOpenDeleteList.forEach(button => assignDeleteListEvent(button));
}

// Inicializar listas desde localStorage
for (let i of allLists) {
    let name = i.listName;
    CreateList(name);
}
refreshDeleteEvents();

// Crear nueva lista
formList.addEventListener('submit', (event) => {
    event.preventDefault();
    let formContent = new FormData(formList);
    let list = {};

    formContent.forEach((value, key) => {
        list[key] = value;
        CreateList(value);
    });

    allLists.unshift(list);
    localStorage.setItem('lists', JSON.stringify(allLists));

    document.getElementById('submit-listName').value = "";
    dialog.close();

    refreshDeleteEvents();
    // location.reload();
});

// Borrar lista
buttonDeleteList.addEventListener('click', () => {
    for (let i = 0; i < allLists.length; i++) {
        if (allLists[i].listName == listNameId.textContent) {
            allLists.splice(i, 1);
            localStorage.setItem('lists', JSON.stringify(allLists));
            dialogDeleteList.close();
            // location.reload();
            break;
        }
    }
});

// Buscar listas
searchContent.addEventListener('keyup', () => {
    let v = searchContent.value;
    listContent.innerHTML = "";

    for (let i = 0; i < allLists.length; i++) {
        if (allLists[i].listName.includes(v)) {
            CreateList(allLists[i].listName);
        }
    }

    refreshDeleteEvents();
});