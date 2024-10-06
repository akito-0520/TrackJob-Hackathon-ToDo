"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import api from "../../api/api";
import PushNotificationManager from "@/components/notification/push";
// import InstallPrompt from "@/components/notification/install";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodo = async() => {
    const result = await api.fetchTodo()
    if (result) {
      setTodos(result);
    }
  }

  useEffect(()=>{
    fetchTodo()
  },[]);

  const addTodo = () => {
    const addTodo = async () => {
      await api.registerTodo(newTodo)
      fetchTodo()
    }

    if (newTodo.trim() !== "") {
      addTodo()
      // setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    const toggleTodo = async () => {
      await api.patchTodo(id)
      fetchTodo()
    }

    toggleTodo()
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
    //   )
    // );
  };

  const deleteTodo = (id: number) => {
    const deleteTodo = async () => {
      await api.deleteTodo(id)
      fetchTodo()
    }

    deleteTodo()
    // setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* debugging */}
      <PushNotificationManager />
      {/* debugging */}
      <h1 className="text-2xl font-bold mb-4 text-center">TODOアプリ</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいタスクを入力"
          className="flex-grow mr-2"
          onKeyUp={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo}>追加</Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              aria-label="タスクを削除"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-gray-500">
        {todos.length === 0 ? (
          <p>タスクがありません。新しいタスクを追加してください。</p>
        ) : (
          <p>{`${todos.length} 個のタスク`}</p>
        )}
      </div>
    </div>
  );
}
