<template>
  <div id="donelist-container" v-show="isOpen">
    <div id="donelist-title">끝난 일 ({{ countDone }})</div>
    <div :key="todo.id" v-for="todo in doneList">
      <Todo :todo="todo" :isDone="isDone" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Todo from "@/components/Todo.vue";
import { Todos } from "@/types";

@Component({
  components: {
    Todo,
  },
  props: ["todos", "fullName"],
})
export default class DoneList extends Vue {
  @Prop() readonly todos!: Todos;
  @Prop() readonly fullName!: string;

  isDone = true;

  get doneList() {
    return this.todos
      ? this.todos
          .filter(
            ({ completed, date }) => !!completed && date === this.fullName
          )
          .sort(
            (a, b) =>
              new Date(b.completedTime).getTime() -
              new Date(a.completedTime).getTime()
          )
      : [];
  }
  get countDone() {
    return this.doneList.length;
  }
  get isOpen() {
    return this.countDone > 0;
  }
}
</script>

<style scoped lang="scss">
#donelist-container {
  margin: 60px 16px 32px;
}
#donelist-title {
  font-size: $todo-font-size;
  margin-bottom: 16px;
}
</style>
