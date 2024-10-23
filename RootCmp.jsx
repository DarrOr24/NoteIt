const { Routes, Route } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { UserMsg } from "./cmps/UserMsg.jsx"
import { eventBusService } from "./services/event-bus.service.js"

import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { AddNote } from "./apps/note/cmps/AddNote.jsx"
import { NoteEdit2 } from "./apps/note/cmps/NoteEdit2.jsx"
import { TrashNoteIndex } from "./apps/note/cmps/TrashNoteIndex.jsx"
import { UnderConstruction } from "./apps/note/cmps/UnderConstruction.jsx"
import { NoteList } from "./apps/note/cmps/NoteList.jsx"



export function App() {

    return (
        <Router>
            <section className="app">
                <Routes>
                    <Route path="/" element={<NoteIndex />}>
                        <Route path="/" element={<NoteList />} >
                            <Route path="/add" element={<AddNote />} />
                            <Route path="/edit/:noteId" element={<NoteEdit2 />} />
                        </Route>
                        <Route path="/soon" element={<UnderConstruction />} />
                        <Route path="/trash" element={<TrashNoteIndex />} />
                    </Route>

                </Routes>
                <UserMsg />
            </section>
        </Router>
    )
}
