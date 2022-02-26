import React, { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
};

function App() {
  const [text, setText] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault();
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
    };

    setTodos([newTodo, ...todos]);

    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({...todo}));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({...todo}));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input type="text" value={text} onChange={handleOnChange}/>
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.checked} onChange={() => handleOnCheck(todo.id, todo.checked)} />
              <input type="text" disabled={todo.checked} value={todo.value} onChange={(e) => handleOnEdit(todo.id, e.target.value)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
