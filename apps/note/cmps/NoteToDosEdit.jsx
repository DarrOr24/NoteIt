const { useState } = React;

export function NoteToDosEdit({ note, onHandleTodos }) {
    const noteToEdit = note;

    if (noteToEdit) {
        const todoValArr = Object.values(noteToEdit.info.todos);
        const todosArr = todoValArr.filter(todo => typeof todo === 'string');
        var todosLength = todosArr.length;
    } else {
        todosLength = 0;
    }

    const { info } = noteToEdit;
    const { todos } = info;

    const [todosObj, setTodosObj] = useState(todos);
    const [infoObj, setInfoObj] = useState(info);

    const [listItem1, setListItem1] = useState(todosLength >= 1);
    const [listItem2, setListItem2] = useState(todosLength >= 2);
    const [listItem3, setListItem3] = useState(todosLength >= 3);
    const [listItem4, setListItem4] = useState(todosLength >= 4);
    const [listItem5, setListItem5] = useState(todosLength >= 5);

    function openListItem() {
        setListItem1(true);
        if (listItem1) setListItem2(true);
        if (listItem2) setListItem3(true);
        if (listItem3) setListItem4(true);
        if (listItem4) setListItem5(true);
    }

    function onSave(ev) {
        ev.preventDefault();
        onHandleTodos(infoObj); // Call the parent function with updated infoObj
    }

    function handleChangeTodo({ target }) {
        const { name: prop, checked } = target;

        setTodosObj(prevTodosObj => {
            const updatedTodos = { ...prevTodosObj };
            if (checked) {
                updatedTodos[prop] = Date.now();
            } else {
                delete updatedTodos[prop];
            }

            setInfoObj(prevInfoObj => ({
                ...prevInfoObj,
                todos: updatedTodos // Update todos inside infoObj
            }));
            return updatedTodos;
        });
    }

    function handleChangeInfo({ target }) {
        const { name: prop, value } = target;
        setInfoObj(prevInfoObj => ({
            ...prevInfoObj,
            [prop]: value
        }));
    }

    return (
        <section className="note-form note-todos-edit">
            <form onSubmit={onSave}>
                <input
                    className="title"
                    onChange={handleChangeInfo}
                    id="title"
                    name="title"
                    type="text"
                    placeholder={noteToEdit.info.title ? noteToEdit.info.title : "Title"}
                />

                {listItem1 && (
                    <div>
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={!!todosObj.doneAt1} // Check if the key exists
                            onChange={handleChangeTodo}
                            id="doneAt1"
                            name="doneAt1"
                        />
                        <input
                            className="todo"
                            onChange={handleChangeTodo}
                            id="todo1"
                            name="todo1"
                            type="text"
                            placeholder={todosLength >= 1 ? note.info.todos.todo1 : "List item"}
                        />
                    </div>
                )}

                {listItem2 && (
                    <div>
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={!!todosObj.doneAt2}
                            onChange={handleChangeTodo}
                            id="doneAt2"
                            name="doneAt2"
                        />
                        <input
                            className="todo"
                            onChange={handleChangeTodo}
                            id="todo2"
                            name="todo2"
                            type="text"
                            placeholder={todosLength >= 2 ? note.info.todos.todo2 : "List item"}
                        />
                    </div>
                )}

                {listItem3 && (
                    <div>
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={!!todosObj.doneAt3}
                            onChange={handleChangeTodo}
                            id="doneAt3"
                            name="doneAt3"
                        />
                        <input
                            className="todo"
                            onChange={handleChangeTodo}
                            id="todo3"
                            name="todo3"
                            type="text"
                            placeholder={todosLength >= 3 ? note.info.todos.todo3 : "List item"}
                        />
                    </div>
                )}

                {listItem4 && (
                    <div>
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={!!todosObj.doneAt4}
                            onChange={handleChangeTodo}
                            id="doneAt4"
                            name="doneAt4"
                        />
                        <input
                            className="todo"
                            onChange={handleChangeTodo}
                            id="todo4"
                            name="todo4"
                            type="text"
                            placeholder={todosLength >= 4 ? note.info.todos.todo4 : "List item"}
                        />
                    </div>
                )}

                {listItem5 && (
                    <div>
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={!!todosObj.doneAt5}
                            onChange={handleChangeTodo}
                            id="doneAt5"
                            name="doneAt5"
                        />
                        <input
                            className="todo"
                            onChange={handleChangeTodo}
                            id="todo5"
                            name="todo5"
                            type="text"
                            placeholder={todosLength >= 5 ? note.info.todos.todo5 : "List item"}
                        />
                    </div>
                )}

                <div className="add-list-item" onClick={openListItem}>+</div>

                <button>Close</button>
            </form>
        </section>
    )
}
