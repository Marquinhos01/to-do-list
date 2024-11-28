//* This class build an activity with his own functions inside, just they can use these fucntions.
class CreateActivity {
    constructor(name, date) {
        this.name = name;
        this.date = date;
        this.finished = false;
    }

    Create(id){
        let a = `
        <div class="act" name="act-${id}">
            <div class="act-part chechbox">
                <input type="checkbox" class="act-chechbox">
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
}
// ! if you don't call the function the acts won't be able to show.
refreshDeleteEvents();

var allActs = [];
const addAct = document.querySelector(".add-act");
const createAct = document.getElementById("create-act-window");
const formDataCA = document.querySelector(".create-act__form-data");
const finishedSpace = document.querySelector(".finished-acts");
const currentSpace = document.querySelector(".current-acts");
const dateOff =  document.getElementById("date-off");
const actName = document.getElementById("act-name");
const actsFilterByDate = document.getElementById("acts-filter");
var listsOptions = document.querySelectorAll(".select-list");


function ReLoadActs(){
    finishedSpace.innerHTML = "";
    currentSpace.innerHTML = "";
    if (allActs.length > 1){ //? are activities inside  ? 
        // for (let i = 1; i < allActs.length; i++) {
        // allActs[i] = new CreateActivity(allActs[i]["name"], allActs[i]["date"]);
        // allActs[i].Create(i);
        // }
        let f = allActs.map((e) => new CreateActivity(e.name, e.date)) //* <-- Assign the class for each activity.
        for (let i = 1; i < f.length; i++) {
            f[i].Create(i)
        }
    }
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

    let actividad = new CreateActivity(a["name"], a["date"]);

    let f = allActs.slice(0, 1); //! <-- take the value for add it after. It keep the id first. 

    allActs.shift();

    allActs.unshift(actividad);

    allActs.unshift(f[0]);

    allLists[(allActs[0])]["acts"] = allActs;

    localStorage.setItem('lists', (JSON.stringify(allLists))); //* <-- Store in the localStorage.

    createAct.close();

    dateOff.value = "";
    actName.value = "";
    
    ReLoadActs(); //* <-- It show again all the acts. 
});

// * filtro de actividades --> por fecha

actsFilterByDate.addEventListener("change", () => {
    if(actsFilterByDate.value == "date"){
        
    }
})