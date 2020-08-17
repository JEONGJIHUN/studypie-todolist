<template>
  <div id="app">
    <Header
      :now="now"
      :before="before"
      :after="after"
      @lastOnClick="lastOnClick"
      @nextOnClick="nextOnClick"
    />
    <TodoList
      :todos="todos"
      :fullName="fullName"
      :beforeFullName="beforeFullName"
      :afterFullName="afterFullName"
      @add="add"
      @fix="fix"
      @remove="remove"
      @complete="complete"
      @setDraggedOver="setDraggedOver"
      @compare="compare"
      @setLocalStorage="setLocalStorage"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import TodoList from "@/components/TodoList.vue";
import { Todos } from "@/types";

@Component({
  components: {
    Header,
    TodoList,
  },
})
export default class App extends Vue {
  constructor() {
    super();
    this.now = new Date();
    const yesterDay = new Date(this.now);
    yesterDay.setDate(this.now.getDate() - 1);
    const afterDay = new Date(this.now);
    afterDay.setDate(this.now.getDate() + 1);
    this.before = yesterDay;
    this.after = afterDay;
    const parsedData = JSON.parse(localStorage.getItem("store") || "");
    const parsedId = JSON.parse(localStorage.getItem("id") || "");
    this.todos = parsedData || [];
    this.id = parsedId || 0;
  }

  todos: Todos;
  id: number;
  now: Date;
  before: Date;
  after: Date;
  draggedOver = "";

  get fullName(): string {
    return this.yearMonthDate(this.now);
  }
  get beforeFullName(): string {
    return this.yearMonthDate(this.before);
  }
  get afterFullName(): string {
    return this.yearMonthDate(this.after);
  }
  setLocalStorage(itemName = "store", item: number | Todos = this.todos) {
    localStorage.setItem(itemName, JSON.stringify(item));
  }
  compare(evt: DragEvent) {
    evt.preventDefault();
    if (!evt.dataTransfer) return;
    const overId = evt.dataTransfer.getData("overId");
    if (!overId) return;
    const overIdItem = this.todos.find(({ id }) => id === overId);
    if (!overIdItem) return;
    let overIdIndex = null;
    let underIdIndex = null;
    for (const [index, { id }] of this.todos.entries()) {
      if (id === overId) {
        overIdIndex = index;
      }
      if (id === this.draggedOver) {
        underIdIndex = index;
      }
    }
    const rearrangedList = this.todos;
    if (overIdIndex === null || underIdIndex === null) return;
    rearrangedList.splice(overIdIndex, 1);
    rearrangedList.splice(underIdIndex, 0, overIdItem);
    this.todos = rearrangedList;
    this.setLocalStorage();
  }
  setDraggedOver(evt: DragEvent, id: string) {
    evt.preventDefault();
    if (!evt.dataTransfer) return;
    evt.dataTransfer.effectAllowed = "move";
    this.draggedOver = id;
  }
  yearMonthDate(d: Date) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    return `${year}.${month}.${date}`;
  }
  lastOnClick() {
    const { now, after, before } = this.moveDate(this.now, false);
    this.now = now;
    this.after = after;
    this.before = before;
  }
  nextOnClick() {
    const { now, after, before } = this.moveDate(this.now, true);
    this.now = now;
    this.after = after;
    this.before = before;
  }
  moveDate(d: Date, forward: boolean) {
    const oneDay = new Date(d);
    oneDay.setDate(d.getDate() + (forward ? 1 : -1));
    const twoDay = new Date(d);
    twoDay.setDate(d.getDate() + (forward ? 2 : -2));
    const now = new Date(d);
    return {
      now: oneDay,
      after: forward ? twoDay : now,
      before: forward ? now : twoDay,
    };
  }
  fix(title: string, id: string) {
    for (const item of this.todos) {
      if (item.id === id) {
        item.title = title;
      }
    }
    this.setLocalStorage();
  }
  add(title: string, date: string) {
    const todo = {
      date,
      title,
      id: `${date}.${this.id++}`,
      completed: false,
      completedTime: new Date(),
    };
    this.todos = [...this.todos, todo];
    this.setLocalStorage("id", this.id);
    this.setLocalStorage();
  }
  remove(id: string) {
    this.todos = this.todos.filter((item) => item.id !== id);
    this.setLocalStorage();
  }
  complete(id: string) {
    for (const item of this.todos) {
      if (item.id === id) {
        item.completed = !item.completed;
        item.completedTime = new Date();
      }
    }
    this.setLocalStorage();
  }
}
</script>

<style lang="scss">
#app {
  font-family: NotoSansCJK kr-Regular, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
