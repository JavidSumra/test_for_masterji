import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
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

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <form onSubmit={addTodo}>
          <div className="flex mb-4">
            <input
              type="text"
              className="border rounded-l-lg p-2 flex-grow"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-lg"
            >
              Add
            </button>
          </div>
        </form>
        <div className="mb-4">
          {todos.length > 0 ? (
            <input
              type="text"
              className="border p-2 rounded-lg w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
            />
          ) : (
            <></>
          )}
        </div>
        <ul>
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 mb-2 rounded-lg shadow-sm ${
                todo.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className="mr-2"
                />
                <span
                  className={`flex-grow ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
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
