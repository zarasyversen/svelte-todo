<script lang="ts">
  export let hasTodos: boolean;
  let inputText = '';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const handleSubmit = () => {
    if (inputText.trim()) {
      dispatch('addTodo', {
        title: inputText
      });
      inputText = '';
    } else {
      alert('Please write item');
    }
  };
</script>

<div class="addTodo" class:addTodoEmpty={!hasTodos}>
  <form on:submit|preventDefault={handleSubmit} class="addTodoForm">
    <label for="new-todo" class="addTodoForm__label">Add a new task</label>
    <input
      type="text"
      name="title"
      id="new-todo"
      placeholder="What do you need to do?"
      class="input-text"
      bind:value={inputText}
    />
    <button class="button addTodoForm__button"> Add </button>
  </form>
</div>

<style>
  .addTodo {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .addTodoEmpty {
    justify-content: center;
  }

  .addTodoForm {
    flex-basis: 100%;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: white;
    padding: 16px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .addTodoForm__label {
    flex-basis: 100%;
    display: block;
    margin-bottom: 5px;
  }

  .addTodoForm__button {
    width: 100%;
    flex-basis: 100%;
    margin: 10px 0;
  }
</style>
