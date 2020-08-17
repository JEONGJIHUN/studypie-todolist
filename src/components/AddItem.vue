<template>
  <div class="add-item-container">
    <div class="item-container" v-show="isOpen">
      <input
        class="item"
        :class="{ warning }"
        v-model="value"
        v-on:keyup.enter="add(value, fullName)"
      />
      <div class="button-wrapper">
        <Button text="취소" @onClick="cancel" />
        <Button text="완료" @onClick="add(value, fullName)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { Todos } from "@/types";

@Component({
  components: {
    Button,
  },
  props: ["todos", "isOpen", "fullName"],
})
export default class AddItem extends Vue {
  @Prop() readonly todos!: Todos;
  @Prop() readonly isOpen!: boolean;
  @Prop() readonly fullName!: string;

  warning = false;
  value = "";

  @Watch("value")
  function(val: string) {
    if (val.length >= 20) {
      this.value = val.substring(0, 20);
      this.warning = true;
    } else {
      this.warning = false;
    }
  }

  add(value: string, fullName: string) {
    if (value.length > 0) {
      this.$emit("add", value, fullName);
      this.$emit("openOnClick");
      this.value = "";
    } else {
      alert("할 일을 채워주세요.!");
    }
  }
  cancel() {
    this.$emit("openOnClick");
    this.value = "";
  }
}
</script>

<style scoped lang="scss">
.add-item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
}
.item-container {
  cursor: pointer;
}
input {
  background-color: $input-bgcolor;
  color: $font-color;
}
</style>
