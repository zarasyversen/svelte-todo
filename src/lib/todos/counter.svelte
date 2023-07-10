<script lang="ts">
  import type { TodoItem } from '../../types/TodoItem';

  export let todos: TodoItem[];

  $: completedTasks = todos.filter((todo) => todo.completed === true).length;
  $: noTasks = todos.length === 0;
</script>

{#if !noTasks}
  <p class="counter">
    Hey, you have completed {completedTasks} of {todos.length} tasks!
  </p>
{/if}

<style>
  .counter {
    margin: 10px 0;
    text-align: center;
  }
</style>
