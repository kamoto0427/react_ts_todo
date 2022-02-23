import React, { useState } from 'react';

type Todo = {
  value: string;
};

function App() {
  const [text, setText] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
    };

    setTodos([newTodo, ...todos]);

    setText('');
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
    </div>
  );
}

export default App;
