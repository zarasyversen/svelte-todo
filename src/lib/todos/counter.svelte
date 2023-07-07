<script lang="ts">
  import type { TodoItem } from '../../types/TodoItem';

  export let todos: TodoItem[];

  $: totalCount = todos.length;
  $: completedTasks = todos.filter((todo) => todo.completed === true).length;
  const noTasks = totalCount === 0;
</script>

{#if !noTasks}
  <p class="taskCounter">
    Hey, you have completed {completedTasks} of {totalCount} tasks!
  </p>
{/if}

<style>
  .taskCounter {
    margin: 10px 0;
    text-align: center;
  }
</style>
