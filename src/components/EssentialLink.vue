<template>
  <q-item clickable @click="goto">
    <q-item-section v-if="icon" avatar class="relative-position">
      <q-icon :name="icon" class="absolute-center" />
    </q-item-section>

    <q-item-section class="relative-position">
      <div style="vertical-align: center">
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption v-if="caption">
          {{ caption }}
        </q-item-label>
      </div>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string;

  @Prop({ type: String, default: '' }) readonly caption!: string;

  @Prop({ type: String, default: '#' }) readonly link!: string;

  @Prop({ type: String, default: '' }) readonly icon!: string;

  goto() {
    this.$router.push(this.link);
  }
}
</script>
