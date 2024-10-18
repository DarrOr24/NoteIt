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
                    <Route path="/note" element={<NoteIndex />}>
                        <Route path="/note" element={<NoteList />} >
                            <Route path="/note/add" element={<AddNote />} />
                            <Route path="/note/edit/:noteId" element={<NoteEdit2 />} />
                        </Route>
                        <Route path="/note/soon" element={<UnderConstruction />} />
                        <Route path="/note/trash" element={<TrashNoteIndex />} />
                    </Route>

                </Routes>
                <UserMsg />
            </section>
        </Router>
    )
}
