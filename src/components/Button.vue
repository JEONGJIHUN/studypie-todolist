<template>
  <button @click="onClick">{{ text }}</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  props: ["text"],
})
export default class Button extends Vue {
  @Prop() readonly text!: string;
  onClick() {
    this.$emit("onClick");
  }
}
</script>

<style scoped lang="scss">
button {
  text-align: center;
  width: 100px;
  height: 44px;
  border-radius: 8px;
  font-size: $button-font-size;
  color: $button-color;
  background-color: $button-bgcolor;
  border: none;
}
</style>
