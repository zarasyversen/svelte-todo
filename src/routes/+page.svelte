<script lang="ts">
    import Header from "../lib/header.svelte";
    import Counter from "../lib/todos/counter.svelte";
	import EmptyList from "../lib/todos/emptyList.svelte";
	import type { TodoItem } from "../types/TodoItem";

    //const todos: TodoItem[] = [{name: 'hej', id:1, completed: false}, {name: 'hej2', id:3, completed: true}];
    const todos: TodoItem[] = [];
</script>
<div class="container">
    <div class="inner">
      <div class="inner-top">
        <Header />
        <Counter todos={todos} />
        {#if todos.length === 0}
            <EmptyList />
        {/if}
      </div>
    </div>
</div>
