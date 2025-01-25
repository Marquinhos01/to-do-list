class Activity {
    name;
    date;
    finished;
    id;
    description;

    constructor(name, date, finished, id, description) {
        this.name = name;
        this.date = date;
        this.finished = finished;
        this.id = id;
        this.description = description;
    }

    
    set Name(newName){
        this.name = newName;
    }
    
    set Date(newDate){
        this.date = newDate;
    }
    
    set Id(newId){
        this.id = newId;
    }

    set Description(newDescription){
        this.description = newDescription;
    }

    get Name(){
        return this.name;
    }

    get Date(){
        return this.date;
    }

    get Description(){
        return this.description;
    }

    get Data(){
        return [this.id ,this.name, this.date]
    }
    
    Create(){
        const a = `
        <div class="act ${this.id}">
            <div class= "act-part fst" >
                <div class="act-part chechbox">
                    ${this.finished == false
                        ? `<button class="act-checkbox ${this.id}"><span class="material-symbols-outlined">check_box_outline_blank</span></button>`
                        :`<button class="act-checkbox ${this.id}"><span class="material-symbols-outlined">select_check_box</span></button>`}
                </div>
                <div class="act-part title ${this.id}">
                    <p class="act-title" ${this.finished == true
                    ? 'style="text-decoration: line-through;"'
                    : 'style="text-decoration: none;"'}>${this.name}</p>
                </div>
                <div class="act-part date">
                    <span class="act-date">${this.date != ""? `vence: ${this.date}` : ""}</span>
                </div>
            </div>
            <div class= "act-part scd">
                <button class="open-modify-act-space" name="${this.id}">
                    <span class="material-symbols-outlined">
                        contract_edit
                    </span>
                </button>
                <button class="delete-act" name="${this.id}">
                    <span class="material-symbols-outlined">
                    delete
                    </span>
                </button>
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