// * ReLoadActs pero por fecha en vez de hacerlo por orden de creacion
// * setea todas las actividades como CreateActivity --> guarda esa info en allActs y las sube al local storage y a la lista.
function ReLoadActs(){
    finishedSpace.innerHTML = "";
    currentSpace.innerHTML = "";
    if (allActs.length > 1){ //? are activities inside  ? 
        let f = allActs.map((e) => new CreateActivity(e.name, e.date, e.finished)) //* <-- Assign the class for each activity.
        let g = allActs.slice(0, 1)
        
        allActs.splice(0, allActs.length)
        allActs = f.slice(1, f.length);
        allActs.unshift(g[0]);

        for (let i = 1; i < allActs.length; i++) {
            allActs[i].Id = i;
            allActs[i].Create();
        }
    }
    // * cada que se refresque la zona de actividades se verficara si esta o no el filtro por fecha
    const checkboxChangeStateActs = document.querySelectorAll(".act-chechbox");
    checkboxChangeStateActs.forEach(checkbox => AssignEventOfCompleteAct(checkbox));
    allLists[(allActs[0])]["acts"] = allActs;
    localStorage.setItem('lists', (JSON.stringify(allLists)));
    
    actsFilterByDate = document.getElementById("acts-filter");
    if(actsFilterByDate.value == "date"){
        OrderActsByDate();
    }
};

function OrderActsByDate() {
    finishedSpace.innerHTML = "";
    currentSpace.innerHTML = "";

    const makingNewOrder = new Promise((resolve, reject) => {
        try {
            actsOrder = allActs.filter(a => a.date !="");
            actsOrder.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            let actsWithoutDate = allActs.filter(a => a.date == "");

            actsOrder = actsOrder.concat(actsWithoutDate);

            resolve(actsOrder)
        } catch (error) {
            reject("Error al ordenar los actos: " + error.message);
        }
    });

    makingNewOrder
        .then(value => {
            for (let i = 1; i < value.length; i++) {
                value[i].Create();
            }
            refreshDeleteEvents();
        })
        .catch(err => console.error(err));
};

function assignDeleteListEvent(type, button) {
    const listNameId = document.querySelector('.list-name-id');
    button.addEventListener('click', () => {
        dialogDeleteList.showModal();
        listNameId.innerText = type + ':' + button.name;
    });
};

// * Assign the complete option to the acts
function AssignEventOfCompleteAct(checkbox) {
    let checkboxActId = checkbox.className.split(" ");
    checkbox.addEventListener("change", () => {
        for (let i = 0; i < allActs.length; i++) {
            if(i == checkboxActId[1]){
                allActs[i].ChangeState();
            }
        }
        ReLoadActs();
        const buttonOpenDeleteAct = document.querySelectorAll('.delete-act');
        buttonOpenDeleteAct.forEach(button => assignDeleteListEvent('act', button));
    })
};

// * This function assign for each list an event --> Show his acts 
function assignSelectListActs(list) {
    const listNameN = list.className.split(" "); // ? <-- separa las clases para luego seleccionar solo la que necesita (la última)
    list.addEventListener("click", () => {
        for (let i = 0; i < allLists.length; i++) {
            if(listNameN[3] == i){
                allActs = allLists[i]["acts"];
                if(allActs[0] == i){
                    ReLoadActs();
                    pageWidth = window.innerWidth;
                    if(pageWidth <= 1160){
                        secondNav.classList.remove("active");
                    }
                    refreshDeleteEvents();
                    break
                } else{
                    allActs.shift();
                    allActs.unshift(i)
                    ReLoadActs();
                    pageWidth = window.innerWidth;
                    if(pageWidth <= 1160){
                        secondNav.classList.remove("active");
                    }
                    break
                }
            } else{
                continue
            };
        }
    })
};

// * Reune las dos funciones para asignar eventos (deletelist, listoptions)
function refreshDeleteEvents() {
    const buttonOpenDeleteList = document.querySelectorAll('.delete-list');
    buttonOpenDeleteList.forEach(button => assignDeleteListEvent('list', button));
    
    const buttonOpenDeleteAct = document.querySelectorAll('.delete-act');
    buttonOpenDeleteAct.forEach(button => assignDeleteListEvent('act', button));

    const listsOptions = document.querySelectorAll(".select-list");
    listsOptions.forEach(list => assignSelectListActs(list));

    const checkboxChangeStateActs = document.querySelectorAll(".act-chechbox");
    checkboxChangeStateActs.forEach(checkbox => AssignEventOfCompleteAct(checkbox));
};

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
};

function CreateList(id, name) {
    listContent.insertAdjacentHTML('beforeend',ListStructure(id, name))
};