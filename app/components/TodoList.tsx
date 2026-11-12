"use client";

import { Todo } from "@/types/types";
import React, { ChangeEvent, startTransition, useEffect, useState } from "react";
import { deleteTodo, searchTodo } from "../actions/todo";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const [todolist, setTodoList] = useState<Todo[]>(todos);
  const [keyword, setKeyword] = useState("");
  const [synced, setSynced] = useState({ keyword, todos });

  if (synced.keyword !== keyword || synced.todos !== todos) {
    setSynced({ keyword, todos });
    if (!keyword.trim()) setTodoList(todos);
  }

  useEffect(() => {
    const query = keyword.trim();
    if (!query) return;

    let ignore = false;
    startTransition(async () => {
      const result = await searchTodo(query);
      if (!ignore) setTodoList(result);
    });

    return () => {
      ignore = true;
    };
  }, [keyword, todos]);

  const deleteAction = async (id: number) => {
    setTodoList((current) => current.filter((todo) => todo.id !== id));
    await deleteTodo(id);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={keyword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
        placeholder="検索"
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
      />
      {todolist.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-200 px-3 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          {keyword.trim() ? "一致する Todo がありません" : "Todo がありません"}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todolist.map((todo: Todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="min-w-0 flex-1 truncate text-sm text-zinc-900 dark:text-zinc-100">
                {todo.title}
              </p>
              <button
                onClick={() => deleteAction(todo.id)}
                className="shrink-0 rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
