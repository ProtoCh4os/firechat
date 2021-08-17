<template>
  <div>
    <q-item v-if="skeleton">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-else :clickable="clickable" @click="click">
      <q-item-section avatar>
        <q-avatar
          :style="{
            ...(!avatar
              ? {
                  background: color,
                  color: subtractColor(color),
                }
              : {}),
          }"
        >
          <q-img v-if="avatar" :src="avatar" />
          <span v-else> {{ getTitleShort }} </span>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          {{ title }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <hr style="margin: 0" v-if="dividerBelow" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { randomColor, subtractColor } from 'src/utils/functions';

@Component
export default class extends Vue {
  @Prop({ type: Boolean, required: false, default: false })
  readonly skeleton!: boolean;

  @Prop({ type: Boolean, required: false, default: false })
  readonly dividerBelow!: boolean;

  @Prop({ type: String, required: false, default: '' })
  readonly title!: string;

  @Prop({ type: String || null, required: false, default: '' })
  readonly chatId!: string;

  @Prop({ type: String || null, required: false, default: '' })
  readonly avatar!: string | null;

  @Prop({ type: Boolean, required: false, default: false })
  readonly clickable!: boolean;

  color = (() => randomColor())();

  @Emit()
  click() {
    return this.chatId;
  }

  subtractColor(color: string) {
    return subtractColor(color);
  }

  get getTitleShort(): string {
    const [l1, l2] = this.title.split(' ');
    let response = l1.slice(0, 1).toUpperCase();
    if (l2) response += l2.slice(0, 1).toUpperCase();
    else response += l1.slice(1, 2).toUpperCase();

    return response;
  }
}
</script>

<style></style>
