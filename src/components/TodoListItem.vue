<template>
  <div class="todolist-container">
    <div class="todolist-title">할 일 ({{ countList }})</div>
    <div class="item add-item" @click="openOnClick">+</div>
    <div
      ref="dropZone"
      :key="todo.id"
      v-for="todo in todoList"
      @drop="compare($event)"
      @dragover.prevent="setDraggedOver($event, todo.id)"
    >
      <Todo :todo="todo" :fullName="fullName" v-on="$listeners" />
    </div>
    <AddItem
      :todos="todos"
      :isOpen="isOpen"
      :fullName="fullName"
      @openOnClick="openOnClick"
      v-on="$listeners"
    />
    <DoneList :todos="todos" :fullName="fullName" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AddItem from "@/components/AddItem.vue";
import Todo from "@/components/Todo.vue";
import DoneList from "@/components/DoneList.vue";
import { Todos } from "@/types";

@Component({
  components: {
    AddItem,
    Todo,
    DoneList,
  },
  props: ["todos", "fullName"],
})
export default class TodoListItem extends Vue {
  @Prop() readonly todos!: Todos;
  @Prop() readonly fullName!: string;

  isOpen = false;

  openOnClick() {
    this.isOpen = !this.isOpen;
  }
  compare(evt: DragEvent) {
    this.$emit("compare", evt);
  }
  setDraggedOver(evt: DragEvent, id: string) {
    this.$emit("setDraggedOver", evt, id);
  }

  get todoList() {
    return this.todos.filter(
      ({ completed, date }) => !completed && date === this.fullName
    );
  }
  get countList() {
    return this.todoList.length;
  }
}
</script>

<style scoped lang="scss">
.add-item {
  border: 1px solid $default-color;
  margin-bottom: 8px;
  cursor: pointer;
}
.todolist-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
