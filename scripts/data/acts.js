//* This class build an activity with his own functions inside, just they can use these fucntions.
class CreateActivity {
    constructor(name, date, finished, id) {
        this.name = name;
        this.date = date;
        this.finished = finished;
        this.id = id
    }

    Create(){
        let a = `
        <div class="act ${this.id}">
            <div class="act-part chechbox">
                <input type="checkbox" class="act-chechbox ${this.id}">
            </div>
            <div class="act-part title">
                <span class="act-title">${this.name}</span>
            </div>
            <div class="act-part date">
                <span class="act-date">vence: ${this.date}</span>
            </div>
        </div>
        `;
        if(this.finished){
            finishedSpace.insertAdjacentHTML("beforeend", a)
        } else{
            currentSpace.insertAdjacentHTML("beforeend", a);
        }
    }

    ChangeState(){
        if(this.finished){
            this.finished = false;
        } else {
            this.finished = true;
        }
    }

    set Id(newId){
        this.id = newId;
    }

    get GetDate(){
        return [this.name, this.date, this.id]
    }
}
// * if you don't call the function the acts won't be able to show.
refreshDeleteEvents();

var allActs = [];
var allActsD = [];
const addAct = document.querySelector(".add-act");
const createAct = document.getElementById("create-act-window");
const formDataCA = document.querySelector(".create-act__form-data");
const finishedSpace = document.querySelector(".finished-acts");
const currentSpace = document.querySelector(".current-acts");
const completeCurrentSpace = document.querySelector(".finished-acts");
const dateOff =  document.getElementById("date-off");
const actName = document.getElementById("act-name");
var actsFilterByDate = document.getElementById("acts-filter");
var listsOptions = document.querySelectorAll(".select-list");
var checkboxChangeStateActs = document.querySelectorAll(".act-chechbox");

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
    checkboxChangeStateActs = document.querySelectorAll(".act-chechbox");
    checkboxChangeStateActs.forEach(checkbox => AssignEventOfCompleteAct(checkbox));
    allLists[(allActs[0])]["acts"] = allActs;
    localStorage.setItem('lists', (JSON.stringify(allLists)));
    
    actsFilterByDate = document.getElementById("acts-filter");
    if(actsFilterByDate.value == "date"){
        OrderActsByDate();
    }
}

// * ReLoadActs pero por fecha en vez de hacerlo por orden de creacion
// ! No se identifican --> no tienen id. Por lo cual no se pueden checkear. No se actualiza de forma correcta el evento de completar las actividades.
function OrderActsByDate() {
    finishedSpace.innerHTML = "";
    currentSpace.innerHTML = "";

    let makingNewOrder = new Promise((resolve, reject) => {
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
            checkboxChangeStateActs = document.querySelectorAll(".act-chechbox");
            checkboxChangeStateActs.forEach(checkbox => AssignEventOfCompleteAct(checkbox));
        })
        .catch(err => console.error(err));
}

//* Show the addAct-modal
addAct.addEventListener("click", () => {
    createAct.showModal();
})

//* add the act to the list
formDataCA.addEventListener("submit", (e) => {
    e.preventDefault();
    var a = {};

    let formDataAct = new FormData(formDataCA);

    formDataAct.forEach((value,key) => {
        a[key] = value; 
    });

    a["finished"] = false; 

    let actividad = new CreateActivity(a["name"], a["date"], a["finished"]);

    let f = allActs.slice(0, 1); //* <-- take the value for add it after. It keep the id first. 

    allActs.shift();

    allActs.unshift(actividad);

    allActs.unshift(f[0]);

    createAct.close();

    dateOff.value = "";
    actName.value = "";
    
    ReLoadActs(); //* <-- It show again all the acts. 
});

// * filtro de actividades --> por fecha

actsFilterByDate.addEventListener("change", () => {
    ReLoadActs();
})