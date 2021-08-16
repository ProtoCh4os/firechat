<template>
  <div> </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  beforeCreate() {
    this.$router.replace(this.$store.state?.session?.state ? '/app' : '/login');
  },
})
export default class PageIndex extends Vue {}
</script>
