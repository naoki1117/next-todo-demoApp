export const instant = false;

import prisma from "./lib/prisma";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default async function Home() {
  const todos = await prisma.todo.findMany();
  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-md flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Todo
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            やることを追加して管理します
          </p>
        </header>
        <TodoForm />
        <TodoList todos={todos} />
      </main>
    </div>
  );
}
