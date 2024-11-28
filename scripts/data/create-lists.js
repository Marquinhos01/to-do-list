let allLists =  JSON.parse(localStorage.getItem('lists')) || [];
let formList = document.getElementById('create-activity-form');
let listContent = document.querySelector('.secundary-nav__lists-part');
var pageWidth = window.innerWidth; //* <-- Page's widht

function assignDeleteListEvent(button) {
    button.addEventListener('click', () => {
        dialogDeleteList.showModal();
        listNameId.innerText = button.name;
    });
}
// * This function assign for each list an event --> Show his acts 
function assignSelectListActs(list) {
    // console.log("evento agregado");
    var listNameN = list.className.split(" ") // ? <-- separa las clases para luego seleccionar solo la que necesita (la última)
    list.addEventListener("click", () => {
        for (let i = 0; i < allLists.length; i++) {
            if(listNameN[3] == i){
                // console.log(listNameN[3])
                allActs = allLists[i]["acts"];
                // console.log(allActs[0])
                if(allActs[0] == i){
                    ReLoadActs();
                    pageWidth = window.innerWidth;
                    if(pageWidth <= 1160){
                        secondNav.classList.remove("active");
                    }
                    // console.log("mostrando actividades...");
                    break
                } else{
                    allActs.shift();
                    allActs.unshift(i)
                    ReLoadActs();
                    pageWidth = window.innerWidth;
                    if(pageWidth <= 1160){
                        secondNav.classList.remove("active");
                    }
                    // console.log("mostrando actividades...");
                    break
                }
            } else{
                // console.error("no se encontro la lista");
                continue};
        }
    })
}
// * Reune las dos funciones para asignar eventos (deletelist, listoptions)
function refreshDeleteEvents() {
    buttonOpenDeleteList = document.querySelectorAll('.delete-list');
    buttonOpenDeleteList.forEach(button => assignDeleteListEvent(button));
    
    listsOptions = document.querySelectorAll(".select-list");
    listsOptions.forEach(list => assignSelectListActs(list));
}

refreshDeleteEvents();

const ListStructure =  (id, name) => {
    return `
                    <div class="list-container" name="${id}">
                        <div class="list-container__parts icon">
                            <span class="material-symbols-outlined">
                            filter_alt
                            </span>
                        </div>
                        <div class="list-container__parts title select-list ${id}">
                            <p><span>${name}<span></p>
                            <!-- max = 33unidades -->
                        </div>
                        <div class="list-container__parts delete">
                            <button class="delete-list" name="${id}">
                                <span class="material-symbols-outlined">
                                delete
                                </span>
                            </button>
                            <button class="edit-list" name="${id}">
                                <span class="material-symbols-outlined">
                                    tune
                                    </span>
                            </button>
                        </div>
                    </div>
`
}

function CreateList(id, name) {
    listContent.insertAdjacentHTML('beforeend',ListStructure(id, name))
};
// * It creates the list store in the local storage
for (let i = 0; i < allLists.length; i++) {
    const element = allLists[i];
    CreateList(i, element.listName)
}

//* create list

formList.addEventListener('submit', (event) => {
    event.preventDefault();
    let formContent = new FormData(formList);
    let list = {
        "acts" : [],
    };
    formContent.forEach((value,key)=>{
            list[key] = value;
    })

    allLists.unshift(list);

    listContent.innerHTML = "";
    for (let i = 0; i < allLists.length; i++) {
        const element = allLists[i];
        CreateList(i, element.listName)
    }

    localStorage.setItem('lists', (JSON.stringify(allLists)));

    let b = document.getElementById('submit-listName');
    b.value = "";

    dialog.close();

    refreshDeleteEvents();
})


//* searsh list

const searchContent = document.getElementById('list-search');

searchContent.addEventListener('keyup', () => {
    let v = searchContent.value;
    listContent.innerHTML = ""; 

    for (let i = 0; i < allLists.length; i++){
        if((allLists[i].listName).includes(v)){ //? <-- Find the list?
            CreateList(i, allLists[i].listName)
        }else{
            continue
        }
    }
    refreshDeleteEvents();
});