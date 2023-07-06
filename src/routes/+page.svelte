<script lang="ts">
    import Header from "../lib/header.svelte";
    import Counter from "../lib/todos/counter.svelte";
	import type { TodoItem } from "../types/TodoItem";

    const array: TodoItem[] = [{name: 'hej', id:1, completed: false}, {name: 'hej2', id:3, completed: true}]
</script>
<div class="container">
    <div class="inner">
      <div class="inner-top">
        <Header />
        <Counter todos={array} />
      </div>
    </div>
</div>
