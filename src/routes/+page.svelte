<script lang="ts">
  import { onMount } from 'svelte';

  import Header from '../lib/header.svelte';
  import Counter from '../lib/todos/counter.svelte';
  import EmptyList from '../lib/todos/emptyList.svelte';
  import type { TodoItem } from '../types/TodoItem';
  import AddTodo from '../lib/todos/addTodo.svelte';
    import TodosList from '$lib/todos/todosList.svelte';

  //const todos: TodoItem[] = [{name: 'hej', id:1, completed: false}, {name: 'hej2', id:3, completed: true}];
  let todos: TodoItem[] = [];

  const getInitialTodos = () => {
    const temp = localStorage.getItem('todos');
    return temp ? JSON.parse(temp) : [];
  };

  const handleNewTodo = (event: any) => {
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
      <TodosList todos={todos}/>
    </div>
  </div>
</div>
