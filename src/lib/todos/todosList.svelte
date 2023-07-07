<script lang="ts">
  import type { TodoItem } from '../../types/TodoItem';
  import { SearchIcon, XIcon } from 'svelte-feather-icons';
  import TodoListItem from './todoListItem.svelte';

  export let todos: TodoItem[];
  $: filteredTodos = todos;
  let isSearching = false;
  let searchTerm = '';
  let noResults = false;

  const toggleSearch = () => {
    isSearching = !isSearching;
    searchTerm = '';
    filteredTodos = todos;
    noResults = false;
  };

  const searchTodos = () => {
    if (searchTerm) {
      const matchedTodos = todos.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });

      if (matchedTodos.length > 0) {
        filteredTodos = matchedTodos;
        noResults = false;
      } else {
        noResults = true;
        filteredTodos = [];
      }
    } else {
      filteredTodos = todos;
      noResults = false;
    }
  };

  function searchInit(el: HTMLInputElement){
    el.focus()
  }
</script>

<div>
  <div class="topContainer">
    <h2>Tasks</h2>
    <button
      type="button"
      class="button icon-button"
      class:cancelSearch={isSearching}
      on:click={toggleSearch}
    >
      {isSearching ? 'Cancel Search' : 'Find'}
      {#if isSearching}
        <XIcon strokeWidth={3} size="1.5x" />
      {:else}
        <SearchIcon strokeWidth={3} size="1.5x" />
      {/if}
    </button>
    {#if isSearching}
      <form class="todoSearch" on:submit|preventDefault={searchTodos}>
        <label for="todoSearch" class="sr-only" />
        <SearchIcon strokeWidth={3} size="1.5x" />
        <input
          type="text"
          class="input-text todoSearchInput"
          id="todoSearch"
          use:searchInit
          bind:value={searchTerm}
          on:input={searchTodos}
          placeholder="Search for task..."
        />
        {#if noResults}
          <p>Sorry, no results. Maybe add a new item?</p>
        {/if}
      </form>
    {/if}
  </div>
  <ul>
    {#each filteredTodos as todo (todo.id)}
      <TodoListItem {todo} on:completeTodo on:editTodo on:deleteTodo />
    {/each}
  </ul>
</div>

<style>
  .topContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 60px 1fr;
    align-items: center;
  }

  .topContainer h2 {
    grid-column: span 2;
  }

  .todoSearch {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 16px;
    position: relative;
    margin-bottom: 20px;
    grid-row: 2;
    grid-column: 1 / -1;
  }

  .todoSearch :global(svg) {
    position: absolute;
    top: 27px;
    left: 25px;
    stroke: var(--blue);
  }

  .todoSearch p {
    margin-top: 10px;
  }

  input.todoSearchInput {
    padding-left: 35px;
  }
</style>
