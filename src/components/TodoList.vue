<template>
  <div class="total-container">
    <div
      :key="index"
      v-for="(prop, index) in $props"
      v-show="index !== 'todos'"
    >
      <div :class="{ desktop: index !== 'fullName' }">
        <TodoListItem :todos="todos" :fullName="prop" v-on="$listeners" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import TodoListItem from "@/components/TodoListItem.vue";
import { Todos } from "@/types";

@Component({
  components: {
    TodoListItem,
  },
  props: ["todos", "afterFullName", "fullName", "beforeFullName"],
})
export default class TodoList extends Vue {
  @Prop() readonly todos!: Todos;
  @Prop() readonly fullName!: string;
  @Prop() readonly beforeFullName!: string;
  @Prop() readonly afterFullName!: string;
}
</script>

<style scoped lang="scss">
.total-container {
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
}
.desktop {
  display: none;
}

@media screen and (min-width: 1200px) {
  .total-container {
    & > * {
      width: 33.333%;
    }
    & > * ~ * {
      border-left: 1px solid $default-color;
    }
  }
  .desktop {
    display: block;
  }
}
</style>
