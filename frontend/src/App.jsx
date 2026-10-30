import { useEffect, useState } from "react";
import axios from "axios";

// icons
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      // console.log("Fetched todos:", response.data);
      setAllTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setAllTodos((prev) => [...prev, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setAllTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editingTodo.text,
      });
      setAllTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data : todo)),
      );
      setEditingTodo(null);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = allTodos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setAllTodos((prev) =>
        prev.map((t) => (t._id === id ? response.data : t)),
      );
    } catch (error) {
      console.log("Error toggling todo:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200">
      <div className="mx-auto p-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Todo Manager
        </h1>

        <div className="w-full bg-white rounded-2xl shadow-xl p-8">
          <form
            className="w-full flex flex-col items-center gap-2 rounded-lg sm:flex-row"
            onSubmit={addTodo}
          >
            <input
              className="rounded-lg w-full outline-none px-3 py-2 shadow-sm border border-gray-200  text-gray-700 placeholder-gray-400"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
            <button
              className="w-full sm:w-40 text-nowrap bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium cursor-pointer"
              type="submit"
            >
              Add Task
            </button>
          </form>

          <div className="mt-4">
            {!!allTodos.length && (
              <div className="flex flex-col gap-4">
                {allTodos.map((todo) => (
                  <div key={todo._id}>
                    {editingTodo?._id === todo._id ? (
                      <div className="w-full flex flex-col sm:flex-row items-center gap-2 ">
                        <input
                          className="w-full px-4 py-2 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                          type="text"
                          value={editingTodo.text}
                          onChange={(e) =>
                            setEditingTodo({
                              ...editingTodo,
                              text: e.target.value,
                            })
                          }
                        />
                        <div className="flex w-full sm:w-40">
                          <button
                            className="h-10 w-full flex justify-center items-center  bg-green-500 text-white rounded-l-lg hover:bg-green-600 cursor-pointer"
                            type="button"
                            onClick={() => saveEdit(todo._id)}
                          >
                            <MdOutlineDone />
                          </button>
                          <button
                            className="h-10 w-full flex justify-center items-center  bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 cursor-pointer"
                            type="button"
                            onClick={() => setEditingTodo(null)}
                          >
                            <IoClose />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-x-4 overflow-hidden">
                            <button
                              className={`shrink-0 h-6 w-6 border-2 rounded-full flex items-center justify-center transition-colors duration-300 
                                ${
                                  todo.completed
                                    ? "bg-green-500 border-green-500 text-white"
                                    : "border-gray-300 hover:border-blue-400"
                                }`}
                              onClick={() => toggleTodo(todo._id)}
                            >
                              {todo.completed && <MdOutlineDone />}
                            </button>
                            <span className="text-gray-800 truncate font-medium">
                              {todo.text}
                            </span>
                          </div>
                          <div className="flex gap-x-2">
                            <button
                              className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                              onClick={() => setEditingTodo({ ...todo })}
                            >
                              <MdModeEditOutline />
                            </button>
                            <button
                              onClick={() => deleteTodo(todo._id)}
                              className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
