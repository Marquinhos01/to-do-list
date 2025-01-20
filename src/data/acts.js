// * if you don't call the function the acts won't be able to show.
refreshDeleteEvents();

let allActs = [];
let allActsD = [];
const addAct = document.querySelector(".add-act");
const createAct = document.getElementById("create-act-window");
const formDataCA = document.querySelector(".create-act__form-data");
const finishedSpace = document.querySelector(".finished-acts");
const currentSpace = document.querySelector(".current-acts");
const completeCurrentSpace = document.querySelector(".finished-acts");
const dateOff =  document.getElementById("date-off");
const actName = document.getElementById("act-name");
let actsFilterByDate = document.getElementById("acts-filter");
let listsOptions = document.querySelectorAll(".select-list");
let checkboxChangeStateActs = document.querySelectorAll(".act-chechbox");

const closeBtn = document.querySelector(".arrow-back-btn");
const aside = document.querySelector(".modify-act-space");
const nameSpace = document.getElementById("modify-act-name");
const dateSpace = document.getElementById("modify-act-date");
const detailsSpace = document.getElementById("modify-act-details");
const newDataSubmit = document.getElementById("modify-act-submit");
let actSelectedMD;


addAct.addEventListener("click", () => {
    createAct.showModal();
})

//* add the act to the list
formDataCA.addEventListener("submit", (e) => {
    e.preventDefault();
    let a = {};

    let formDataAct = new FormData(formDataCA);

    formDataAct.forEach((value,key) => {
        a[key] = value; 
    });

    a["finished"] = false; 

    let actividad = new Activity(a["name"], a["date"], a["finished"]);

    allActs.splice(1,0,actividad);

    createAct.close();

    dateOff.value = "";
    actName.value = "";
    
    ReLoadActs(); //* <-- It show again all the acts. 
    refreshDeleteEvents();
});

actsFilterByDate.addEventListener("change", () => {
    ReLoadActs();
    refreshDeleteEvents();
})



closeBtn.addEventListener("click", ()=>{
    aside.style.display = "none";
})

newDataSubmit.addEventListener("click", ()=>{
    actSelectedMD.Name = nameSpace.value;
    actSelectedMD.Date = dateSpace.value;
    actSelectedMD.Description = detailsSpace.value;

    nameSpace.vale = "";
    detailsSpace.textContent = "";
    dateSpace.value = "";
    aside.style.display = "none";

    allLists[(allActs[0])]["acts"] = allActs;
    localStorage.setItem('lists', (JSON.stringify(allLists)));

    ReLoadActs();
    refreshDeleteEvents();
})