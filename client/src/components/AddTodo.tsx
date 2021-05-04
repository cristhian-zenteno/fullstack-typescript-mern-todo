import React, { useState } from 'react'

type Props = { 
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' className="at-name"/>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input onChange={handleForm} type='text' id='description' className="at-description"/>
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} className="at-add-todo-button">Add Todo</button>
    </form>
  )
}

export default AddTodo
