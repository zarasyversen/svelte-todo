<script lang="ts">
  import { page } from '$app/stores';
  const links = [
    {
      id: 1,
      path: '/',
      name: 'Home'
    },
    {
      id: 2,
      path: '/about',
      name: 'About'
    }
  ];
</script>

<nav class="nav">
  <ul class="nav__list">
    {#each links as link}
      <li>
        <a href={link.path} class="nav__link" class:is-active={$page.url.pathname === link.path}>
          {link.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .nav {
    width: 100%;
    background: var(--white);
    padding: 20px;
  }

  .nav__list {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
  }

  .nav__link {
    color: var(--black);
    text-decoration: none;
    padding: 0 20px;
  }

  .nav__link.is-active {
    text-decoration: underline;
    font-weight: 600;
  }
</style>
