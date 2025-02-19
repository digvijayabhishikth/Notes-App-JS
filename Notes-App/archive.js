import { renderNotes } from "./app.js";

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];
let archiceContainer = document.querySelector(".archivecontainer")
let archivedNotesContainer = document.querySelector(".archived-notes-container");

archiceContainer.addEventListener("click",(event)=>{
    let type = event.target.dataset.type;
    let note_id = event.target.dataset.id;
    switch(type){
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({id})=> id.toString() !== note_id);
            archivedNotesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived})=>isArchived));
            localStorage.setItem("notes",JSON.stringify(arrayOfNotes));
            break;
        case "pin":
            arrayOfNotes = arrayOfNotes.map((note)=> note.id.toString() === note_id ? {...note, isPinned : !note.isPinned}:note);
            localStorage.setItem("notes",JSON.stringify(arrayOfNotes));
            break;
        case "archive":
            arrayOfNotes = arrayOfNotes.map((note)=> note.id.toString() === note_id ? {...note, isArchived : !note.isArchived}:note);
            archivedNotesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived})=>isArchived));
            localStorage.setItem("notes",JSON.stringify(arrayOfNotes));
            break;
    }
})

archivedNotesContainer.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived})=>isArchived));