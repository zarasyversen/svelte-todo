<script lang="ts">
  import Header from '../lib/layout/header.svelte';
  import Counter from '../lib/todos/counter.svelte';
  import EmptyList from '../lib/todos/emptyList.svelte';
  import type { TodoItem } from '../types/TodoItem';
  import AddTodo from '../lib/todos/addTodo.svelte';
  import TodosList from '$lib/todos/todosList.svelte';

  import { storedTodos, todosLoaded } from '../lib/store';
  let todos = $storedTodos ? $storedTodos.sort((a, b) => b.id - a.id) : [];

  const handleNewTodo = (event: CustomEvent) => {
    addNewTodoItem(event.detail.title);
  };

  const addNewTodoItem = (title: string) => {
    const newTodo: TodoItem = {
      id: Date.now(),
      title: title,
      completed: false,
      updated: false,
      day: getCurrentDay(),
      time: getCurrentTime()
    };
    setTodos(newTodo);
  };

  const completingTodo = (event: CustomEvent) => {
    todos = todos.map((todo) => {
      if (todo.id === event.detail.id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
  };

  const deletingTodo = (event: CustomEvent) => {
    todos = todos.filter((todo) => todo.id !== event.detail.id);
    storedTodos.set(todos);
  };

  const editingTodo = (event: CustomEvent) => {
    todos = todos.map((todo) => {
      if (todo.id === event.detail.id) {
        todo.title = event.detail.newTitle;
        todo.updated = true;
        todo.day = getCurrentDay();
        todo.time = getCurrentTime();
      }
      return todo;
    });
    storedTodos.set(todos);
  };

  const getCurrentDay = () => {
    const date = new Date();
    const currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const currentDay = date.toLocaleString('en-GB', { weekday: 'long' });
    return `${currentDay} (${currentDate})`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const currentHours = now.getHours();
    let currentMinutes = now.getMinutes();

    return `${currentHours}:${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}`;
  };

  const setTodos = (newTodo: TodoItem) => {
    todos = [newTodo, ...todos];
    storedTodos.set(todos);
  };
</script>

<div class="container">
  <div class="inner">
    <div class="inner-top">
      <Header />
      {#if $todosLoaded}
        <Counter {todos} />
        {#if todos.length === 0}
          <EmptyList />
        {/if}
        <AddTodo on:addTodo={handleNewTodo} hasTodos={todos.length > 0} />
        {#if todos.length > 0}
          <TodosList
            {todos}
            on:completeTodo={completingTodo}
            on:editTodo={editingTodo}
            on:deleteTodo={deletingTodo}
          />
        {/if}
      {:else}
          <p class="empty">Loading...</p>
      {/if}
    </div>
  </div>
</div>
