import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    const newText = prompt("Edit your task", todos[index].text);
    if (newText !== null && newText.trim() !== "") {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, text: newText.trim() } : todo
      );
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <form>
          <div className="flex mb-4">
            <input
              type="text"
              className="border rounded-l-lg p-2 flex-grow"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
            />
            <button
              onClick={addTodo}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-lg"
            >
              Add
            </button>
          </div>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded-lg shadow-sm"
            >
              <span>{todo.text}</span>
              <div>
                <button
                  onClick={() => editTodo(index)}
                  className="text-blue-500 mr-2"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
