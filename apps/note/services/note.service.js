import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"


const NOTE_KEY = 'noteDB'
const TRASH_NOTE_KEY = 'trashNoteDB'
_createNotes()

export const noteService = {
    query,
    sortNotes,
    get,
    remove,
    save,
    createNote,
    saveToTrash,
    loadFromTrash,
    removeFromTrash,
    getFilterFromSearchParams
}

window.ns = noteService

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')

                notes = notes.filter(note => regExp.test(note.info.title) || regExp.test(note.info.txt))

            }

            notes = sortNotes(notes)

            return notes
        })
}

function sortNotes(notesArr) {
    const pinnedNotes = notesArr.filter(note => note.isPinned === true)
    pinnedNotes.sort((note2, note1) => note1.pinTime - note2.pinTime)
    const unpinnedNotes = notesArr.filter(note => note.isPinned === false)
    unpinnedNotes.sort((note1, note2) => note1.time - note2.time)

    return [...pinnedNotes, ...unpinnedNotes]
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length) {
        notes = []

        // Helper function to create notes
        const createAndPushNote = (type, isPinned, style, info, timestamp) => {
            const note = createNote(type, isPinned, style, info, timestamp)
            note.id = utilService.makeId()
            notes.push(note)
        }

        // Text Notes
        createAndPushNote('NoteTxt', false, { 'backgroundColor': '#efeff1' },
            { 'title': 'Important', 'txt': 'Number 1 rule: when something is working well, do NOT mess it up!!!' }, Date.now() + 1)

        createAndPushNote('NoteTxt', true, { 'backgroundColor': '#fefbd8' },
            { 'title': 'Reminder', 'txt': 'Call the plumber at 4PM!' }, Date.now() + 6)

        createAndPushNote('NoteTxt', false, { 'backgroundColor': '#ffd6d9' },
            { 'title': 'Groceries', 'txt': 'Buy: Milk, Bread, Eggs, Bananas' }, Date.now() + 7)

        // Image Notes
        createAndPushNote('NoteImg', true, { 'backgroundColor': '#aeccdc' },
            { 'url': 'assets/img/sweet_noga.png', 'title': 'My Sweet Noga', 'txt': 'Birthday party on June 7' }, Date.now() + 2)

        createAndPushNote('NoteImg', false, { 'backgroundColor': '#b4ddd3' },
            { 'url': 'https://i.pinimg.com/originals/12/0b/ce/120bce4262601e926378c1a4d02b47e8.jpg', 'title': 'Scorpion Handstand' }, Date.now() + 3)


        // Video Notes
        createAndPushNote('NoteVideo', false, { 'backgroundColor': '#e9e3d4' },
            { 'url': 'https://www.youtube.com/embed/aUgtMaAZzW0', 'title': 'Ashtanga Primary Series' }, Date.now() + 4)

        createAndPushNote('NoteVideo', true, { 'backgroundColor': '#d3bfdb' },
            { 'url': 'https://www.youtube.com/embed/8gECJx6YWCI', 'title': 'Ashtanga Intermediate Series' }, Date.now() + 5)


        // Todo Notes
        createAndPushNote('NoteTodo', true, { 'backgroundColor': '#fff8b8' },
            { 'title': 'Things to do', 'todos': { 'todo1': 'Make this work', 'todo2': 'Eat', 'todo3': 'Sleep', 'todo4': 'Workout', 'doneAt4': Date.now() } }, Date.now() + 10)

        createAndPushNote('NoteTodo', false, { 'backgroundColor': '#fbe7c6' },
            { 'title': 'Weekend Tasks', 'todos': { 'todo1': 'Clean the house', 'todo2': 'Laundry', 'todo3': 'Yoga session', 'todo4': 'Read a book' } }, Date.now() + 11)

        // Save to local storage
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}



function createNote(type, isPinned, style, info, time = Date.now()) {
    const note = {
        // id:  utilService.makeId(),        
        type,
        isPinned,
        pinTime: (isPinned) ? Date.now() : '',
        style,
        info,
        time,
        updatedAt: time
    }
    return note
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            // note = _setNextPrevCarId(note)
            return note
        })

}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {

        return storageService.post(NOTE_KEY, note)
    }
}

function saveToTrash(note) {
    let notes = utilService.loadFromStorage(TRASH_NOTE_KEY)
    if (!notes) notes = []
    notes.unshift(note)
    utilService.saveToStorage(TRASH_NOTE_KEY, notes)
}

function loadFromTrash() {
    return storageService.query(TRASH_NOTE_KEY)
}

function removeFromTrash(noteId) {
    return storageService.remove(TRASH_NOTE_KEY, noteId)
}

function getFilterFromSearchParams(searchParams) {
    return {
        // title: searchParams.get('title') || '',
        txt: searchParams.get('txt') || '',
    }
}


