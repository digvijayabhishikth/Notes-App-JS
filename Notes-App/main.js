import { renderNotes } from "./app.js";

let note = document.querySelector(".notes");
let title = document.querySelector(".title");
let addButton = document.querySelector(".addBtn");
let notesDisplay = document.querySelector(".notes-display");
let notesContainer = document.querySelector(".all-notes-container");
let pinnedNotesContainer = document.querySelector(".pinned-notes-container");

let notestitle = document.querySelector(".allNotes");
let pinnedNotes = document.querySelector(".pinnedNotes");

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

if(arrayOfNotes.length > 0){
    notestitle.classList.toggle("hidden");
    pinnedNotes.classList.toggle("hidden");
}

notesDisplay.addEventListener("click",(event)=> {
    let type = event.target.dataset.type;
    let note_id = event.target.dataset.id;

    switch(type){
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({id})=>id.toString() !== note_id);
            notesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned,isArchived})=>!isPinned&&!isArchived));
            pinnedNotesContainer.innerHTML =renderNotes(arrayOfNotes.filter(({isPinned})=>isPinned));
            localStorage.setItem("notes",JSON.stringify(arrayOfNotes));
            break;
        case "pin":
            arrayOfNotes = arrayOfNotes.map((note) => note.id.toString() === note_id ? {...note,isPinned : !note.isPinned}:note);
            notesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned,isArchived})=>!isPinned&&!isArchived));
            pinnedNotesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned})=>isPinned));
            localStorage.setItem("notes",JSON.stringify(arrayOfNotes));
            break;
        case "archive":
            arrayOfNotes = arrayOfNotes.map((note) => note.id.toString() === note_id ? {...note,isArchived:!note.isArchived}:note);
            notesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned,isArchived})=>!isPinned&&!isArchived));
            localStorage.setItem("notes",JSON.stringify(arrayOfNotes));
            break;
    }
});

addButton.addEventListener("click",()=>{
    if(note.value.trim().length === 0 || title.value.trim().length === 0){
        alert("Enter title and note to add notes");
    }
    else if(note.value.trim().length > 0 && title.value.trim().length>0){
        let date = new Date();
        let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let created_time = {
            year : date.getFullYear(),
            month: months[date.getMonth()],
            date: date.getDate(),
            hours : date.getHours(),
            minutes : date.getMinutes(),
            seconds : date.getSeconds()
        }
        arrayOfNotes = [...arrayOfNotes,{title:title.value.trim(),note:note.value.trim(),id:Date.now(),time:created_time,isPinned:false,isArchived:false}]
        title.value = note.value = "";
        notesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned,isArchived})=> !isPinned && !isArchived ));
        localStorage.setItem("notes",JSON.stringify(arrayOfNotes));
    }
});

notesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned,isArchived})=> !isPinned && !isArchived ));
pinnedNotesContainer.innerHTML =renderNotes(arrayOfNotes.filter(({isPinned})=>isPinned));