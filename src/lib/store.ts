import { writable } from 'svelte/store';
import type { TodoItem } from '../types/TodoItem';
export const storedTodos = writable<TodoItem[]>([]);
if (typeof localStorage !== 'undefined') {
  const temp = localStorage.getItem('todos');
  const savedTodos = temp ? JSON.parse(temp) : [];
  storedTodos.set(savedTodos);
  storedTodos.subscribe((value) => {
    const temp = JSON.stringify(value);
    localStorage.setItem('todos', temp ? temp : '');
  });
}
