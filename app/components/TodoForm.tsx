"use client";

import React, { ChangeEvent, FormEvent, InputEvent, useState } from "react";
import { createTodo } from "../actions/todo";

const TodoForm = () => {
  //   const [todo, setTodo] = useState("");
  //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     createTodo(todo);
  //     setTodo("");
  //   };

  return (
    <form action={createTodo} className="flex gap-2">
      <input
        name="title"
        type="text"
        placeholder="新しい Todo"
        className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
      />
      <button className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300">
        送信
      </button>
    </form>
  );
};

export default TodoForm;
