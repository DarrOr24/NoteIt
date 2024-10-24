const { useState } = React

export function NoteTodos({ note, onUpdateTodos }) {
    const { info } = note
    const { todos } = info

    const [todosState, setTodosState] = useState(todos);

    function getDoneAtDate(key) {
        if (typeof todosState[key] === 'number') {
            return new Date(todosState[key]).toDateString()
        } else {
            return ''
        }
    }

    // Handle checkbox change to update the doneAt value
    function handleCheckboxChange(key) {
        setTodosState(prevTodos => {
            const updatedTodos = { ...prevTodos }
            updatedTodos[key] = updatedTodos[key] ? null : Date.now()// Toggle between null (unchecked) and current timestamp (checked)

            // Call parent function to update the todos outside this component
            if (onUpdateTodos) {
                onUpdateTodos(updatedTodos)
            }

            return updatedTodos
        })
    }

    return (
        <section className="note-todos">
            <h2>{info.title}</h2>
            <ul className="to-do-list">

                {(todosState.todo1) && (
                    <li>
                        <input
                            type="checkbox"
                            checked={!!todosState.doneAt1}
                            onChange={() => handleCheckboxChange('doneAt1')}
                        />
                        {todosState.todo1}
                        <span className="done-at">{getDoneAtDate('doneAt1')}</span>
                    </li>
                )}

                {(todosState.todo2) && (
                    <li>
                        <input
                            type="checkbox"
                            checked={!!todosState.doneAt2}
                            onChange={() => handleCheckboxChange('doneAt2')}
                        />
                        {todosState.todo2}
                        <span className="done-at">{getDoneAtDate('doneAt2')}</span>
                    </li>
                )}

                {(todosState.todo3) && (
                    <li>
                        <input
                            type="checkbox"
                            checked={!!todosState.doneAt3}
                            onChange={() => handleCheckboxChange('doneAt3')}
                        />
                        {todosState.todo3}
                        <span className="done-at">{getDoneAtDate('doneAt3')}</span>
                    </li>
                )}

                {(todosState.todo4) && (
                    <li>
                        <input
                            type="checkbox"
                            checked={!!todosState.doneAt4}
                            onChange={() => handleCheckboxChange('doneAt4')}
                        />
                        {todosState.todo4}
                        <span className="done-at">{getDoneAtDate('doneAt4')}</span>
                    </li>
                )}

                {(todosState.todo5) && (
                    <li>
                        <input
                            type="checkbox"
                            checked={!!todosState.doneAt5}
                            onChange={() => handleCheckboxChange('doneAt5')}
                        />
                        {todosState.todo5}
                        <span className="done-at">{getDoneAtDate('doneAt5')}</span>
                    </li>
                )}
            </ul>
        </section>
    )
}
