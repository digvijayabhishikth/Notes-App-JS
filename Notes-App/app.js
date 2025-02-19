export const renderNotes = (notes) => {
    let newNote = notes.map(({title,note,id,isPinned,isArchived,time:{year,month,date}}) => {
        return (
            `<div class="single-note">
                <div class="d-flex align-center title-container">
                    <span class="note-title">${title}</span>
                    <button class="delBtn button v-hidden" data-id=${id} data-type="del">
                        <span data-type="del" data-id=${id} class="material-icons-outlined">
                            delete
                        </span>
                    </button>
                </div>
                <span class="note-span">${note}</span>
                <div class="d-flex">
                    <div class="buttons-div">
                        <button class="pushBtn button v-hidden" data-id=${id} data-type="pin">
                            <span data-id=${id} data-type="pin" class="material-icons-outlined">
                                push_pin
                            </span>
                        </button>
                        <button class="archiveBtn button v-hidden" data-id=${id} data-type="archive">
                            <span data-id=${id} data-type="archive" class="material-icons-outlined">
                                archive
                            </span>
                        </button>
                    </div>
                    <div><span>${date} ${month} ${year}</span></div>
                </div>
            </div>`
        )
    });
    newNote = newNote.join("");
    return newNote;
};  