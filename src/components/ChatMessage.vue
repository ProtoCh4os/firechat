<template>
  <q-chat-message :sent="isAuthor" :text="[text]" :stamp="stampData" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop({ required: true, type: String })
  readonly text!: string;

  @Prop({ required: true, type: Boolean })
  readonly isAuthor!: boolean;

  @Prop({ required: false, type: String })
  readonly authorName!: string;

  @Prop({ required: true, type: Date })
  readonly stamp!: Date;

  get stampData(): string {
    let stamp = '';

    if (!this.isAuthor) stamp += `${this.authorName}, `;
    stamp += this.stamp.toLocaleString();
    return stamp;
  }
}
</script>

<style></style>
