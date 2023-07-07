<script lang="ts">
  import { onMount } from 'svelte';

  import Header from '../lib/header.svelte';
  import Counter from '../lib/todos/counter.svelte';
  import EmptyList from '../lib/todos/emptyList.svelte';
  import type { TodoItem } from '../types/TodoItem';
  import AddTodo from '../lib/todos/addTodo.svelte';
  import TodosList from '$lib/todos/todosList.svelte';

  //let todos: TodoItem[] = [{name: 'hej', id:1, completed: false}, {name: 'hej2', id:3, completed: true}];
  let todos: TodoItem[] = [];

  const getInitialTodos = () => {
    const temp = localStorage.getItem('todos');
    return temp ? JSON.parse(temp) : [];
  };

  const handleNewTodo = (event: CustomEvent) => {
    addNewTodoItem(event.detail.title);
  };

  const addNewTodoItem = (title: string) => {
    const newTodo: TodoItem = {
      id: Date.now(),
      name: title,
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
  };

  const editingTodo = (event: CustomEvent) => {
    todos = todos.map((todo) => {
      if (todo.id === event.detail.id) {
        todo.name = event.detail.newTitle;
        todo.updated = true;
        todo.day = getCurrentDay();
        todo.time = getCurrentTime();
      }
      return todo;
    });
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
    todos = [...todos, newTodo];
  };

  onMount(() => {
    todos = getInitialTodos();
  });
</script>

<div class="container">
  <div class="inner">
    <div class="inner-top">
      <Header />
      <Counter {todos} />
      {#if todos.length === 0}
        <EmptyList />
      {/if}
      <AddTodo on:addTodo={handleNewTodo} hasTodos={todos.length > 0} />
      <TodosList
        {todos}
        on:completeTodo={completingTodo}
        on:editTodo={editingTodo}
        on:deleteTodo={deletingTodo}
      />
    </div>
  </div>
</div>
