const notesIds = ["E1", "F1", "Fs1", "G1"]
let noteObjects = []

notesIds.forEach((noteId) => {
    let element = document.getElementById(noteId)

    let noteObj = {
        note: noteId,
        element: element,
        active: false
    };

    noteObjects.push(noteObj)

    element.addEventListener("click", () => {
        noteObj.active = !noteObj.active
        element.classList.toggle("bg-success", noteObj.active)
    })
})