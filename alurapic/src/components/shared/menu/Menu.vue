<template>
    <nav>
      <ul>
        <li v-for="router of routes">
          <router-link :to="router.path ? router.path : '/'">
            {{ router.titulo }}
          </router-link>
        </li>
      </ul>
    </nav>
</template>
<script>
import { routes } from '../../../routes';
export default {
  data () {
    return {
      routes : routes.filter(route => route.menu)
    }
  }
  
}
</script>
<style scoped>
</style>