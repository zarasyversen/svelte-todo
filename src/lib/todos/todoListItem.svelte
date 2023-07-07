<script lang="ts">
  import { CheckIcon, EditIcon, TrashIcon } from 'svelte-feather-icons';
  import type { TodoItem } from '../../types/TodoItem';
  import { createEventDispatcher } from 'svelte';
  export let todo: TodoItem;
  let isEditing = false;
  let editInput = todo.name;

  const dispatch = createEventDispatcher();

  const handleCheck = (id: number) => {
    dispatch('completeTodo', {
      id: id
    });
  };

  const handleEdit = (id: number) => {
    dispatch('editTodo', {
      id: id,
      newTitle: editInput
    });
  };

  const updateEdit = (e: any) => {
    if (e.keyCode === 13) {
      isEditing = !isEditing;
    }
  };

  const handleDelete = (id: number) => {
    dispatch('deleteTodo', {
      id: id
    });
  };
</script>

<li class="item" class:is-complete={todo.completed}>
  <div class="item__inner" style:display={isEditing ? 'none' : 'flex'}>
    <label class="checkboxLabel">
      <span class="sr-only">Task completed</span>
      {#if todo.completed}
        <CheckIcon />
      {/if}
      <input
        type="checkbox"
        id={`todo_${todo.id}`}
        class="checkbox"
        checked={todo.completed}
        on:change={() => handleCheck(todo.id)}
      />
    </label>
    <div class="details">
      <p>{todo.name}</p>
      <small>
        {#if todo.updated}
          Updated
        {:else}
          Created
        {/if}
        {todo.time}
        {todo.day}
      </small>
    </div>
    <div class="actions">
      <button
        type="button"
        class="button actions__button"
        aria-label="Edit this todo"
        on:click={() => (isEditing = !isEditing)}
      >
        <EditIcon />
      </button>
      <button
        type="button"
        class="button actions__button"
        aria-label="Delete this todo"
        on:click={() => handleDelete(todo.id)}
      >
        <TrashIcon />
      </button>
    </div>
  </div>
  <div style:display={isEditing ? 'block' : 'none'}>
    <label for={`edit-${todo.id}`}> Edit your task, press enter when done </label>
    <input
      type="text"
      id={`edit-${todo.id}`}
      class="textInput"
      bind:value={editInput}
      on:change={() => handleEdit(todo.id)}
      on:keydown={(e) => updateEdit(e)}
    />
  </div>
</li>

<style>
  .item {
    list-style-type: none;
    padding: 17px 10px 0;
    background-color: var(--white);
    border-radius: var(--border-radius);
    margin-bottom: 10px;
    box-shadow: var(--box-shadow);
  }

  .is-complete {
    font-style: italic;
    opacity: 0.7;
    text-decoration: line-through;
  }

  .item__inner {
    display: flex;
    flex-wrap: wrap;
    color: var(--black);
  }

  .checkbox {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .checkboxLabel {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border: var(--border);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .details {
    flex-basis: 80%;
    font-size: 1.2rem;
  }

  .actions {
    flex-basis: 100%;
    text-align: right;
  }

  .actions__button {
    background: transparent;
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }

  .actions__button:hover,
  .actions__button:focus {
    background: transparent;
  }

  .actions__button :global(svg) {
    stroke: var(--blue);
  }

  .textInput {
    width: 100%;
    padding: 10px;
    border: var(--border);
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
</style>
