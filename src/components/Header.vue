<template>
  <header>
    <div class="desktop">
      <HeaderItem :date="before" />
    </div>
    <div>
      <HeaderItem :date="now" />
    </div>
    <div class="desktop">
      <HeaderItem :date="after" />
    </div>
    <button @click="lastOnClick">←</button>
    <button @click="nextOnClick">→</button>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HeaderItem from "@/components/HeaderItem.vue";

@Component({
  components: {
    HeaderItem,
  },
  props: ["now", "before", "after"],
})
export default class Header extends Vue {
  @Prop() readonly before!: Date;
  @Prop() readonly now!: Date;
  @Prop() readonly after!: Date;

  lastOnClick() {
    this.$emit("lastOnClick");
  }
  nextOnClick() {
    this.$emit("nextOnClick");
  }
}
</script>

<style scoped lang="scss">
header {
  height: 60px;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

button {
  position: absolute;
  top: 15px;
  left: 15px;
  border: none;
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: $arrow-icon-font-size;
  color: #aaa;
  cursor: pointer;
  &:last-child {
    left: auto;
    right: 15px;
  }
}
.desktop {
  display: none;
}
@media screen and (min-width: 1200px) {
  button {
    left: 0;
    margin-top: 50vh;
    transform: translateY(-100%);
    border: none;
    background-color: $default-color;
    color: $font-color;
    padding: 30px 8px;
    &:last-child {
      left: auto;
      right: 0;
    }
  }
  .desktop {
    display: block;
  }
}
</style>
