import React from 'react'

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ''
  return (
    <div className='Card at-todo-item'>
      <div className='Card--text'>
        <h1 className={[checkTodo,"at-todo-item-name"].join(" ")}>{todo.name}</h1>
        <span className={[checkTodo, "at-todo-item-description"].join(" ")}>{todo.description}</span>
      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateTodo(todo)}
          className={(todo.status ? `hide-button` : 'Card--button__done') + " at-todo-item-done"}
        >
          Complete
        </button>
      </div>
    </div>
  )
}

export default Todo
