"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "@/types/types";
import prisma from "../lib/prisma";

export const createTodo = async (formData: FormData) => {
  const title = formData.get("title") as string;

  console.log("title:", title);

  if (typeof title !== "string" || !title.trim()) {
    return;
  }
  await prisma.todo.create({
    data: { title: title.trim() },
  });
  revalidatePath("/");
};

export const updateTodo = async () => {};

export const deleteTodo = async (id: number) => {
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
};

export const searchTodo = async (keyword: string): Promise<Todo[]> => {
  return prisma.todo.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
    },
  });
};
