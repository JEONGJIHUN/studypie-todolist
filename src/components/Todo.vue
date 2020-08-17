<template>
  <div
    class="item-container"
    ref="dragItem"
    :id="todo.id"
    :draggable="!isDone"
    @dragstart="startDrag($event, todo.id)"
    @dragend.prevent="endDrag($event, swipeOnHandle)"
    @drag.prevent="moveDrag($event)"
  >
    <div
      class="item"
      :class="{ done: isDone, todo: !isDone, clicked: isClicked, edit: isEdit }"
      v-if="!isEdit"
      @click="openEdit"
    >
      {{ todo.title }}
    </div>
    <input
      class="item edit"
      :class="{ warning }"
      v-model="value"
      v-on:keyup.enter="fix(value, todo.id)"
      v-else-if="isEdit"
    />
    <div v-show="isClicked && !isDone">
      <div class="button-wrapper" v-if="!isEdit">
        <Button text="삭제" @onClick="remove(todo.id)" />
        <Button text="수정" @onClick="cancel" />
        <Button text="완료" @onClick="complete(todo.id)" />
      </div>
      <div class="button-wrapper" v-else>
        <Button text="취소" @onClick="cancel" />
        <Button text="완료" @onClick="fix(value, todo.id)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { DIRECTION, LIMIT_BOUNDARY } from "@/utils";
import { Todo as ITodo } from "@/types";

@Component({
  components: {
    Button,
  },
  props: ["todo", "isDone", "fullName"],
})
export default class Todo extends Vue {
  @Prop() readonly todo!: ITodo;
  @Prop() readonly isDone!: boolean;
  @Prop() readonly fullName!: string;
  value = "";
  isClicked = false;
  isEdit = false;
  warning = false;
  swipe = {
    pos: {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    },
    swipeDirection: "",
  };

  @Watch("value")
  function(val: string) {
    if (val.length >= 20) {
      this.value = val.substring(0, 20);
      this.warning = true;
    } else {
      this.warning = false;
    }
  }
  swipeOnHandle(id: string, swipeDirection: string) {
    const { LEFT, RIGHT } = DIRECTION;
    if (swipeDirection === LEFT) {
      this.remove(id);
    } else if (swipeDirection === RIGHT) {
      this.complete(id);
    }
    //   else if (swipeDirection === "up" || swipeDirection === "down") {
    //     console.log("up_down");
    //   }
    this.setLocalStorage();
  }
  startDrag(evt: DragEvent, id: string) {
    const { pos } = this.swipe;
    if (!evt.dataTransfer) return;
    evt.dataTransfer.setData("overId", id);
    pos.startX = evt.offsetX;
    pos.startY = evt.offsetY;
  }
  moveDrag(evt: DragEvent) {
    const { pos } = this.swipe;
    const item = this.$refs.dragItem as HTMLDivElement;
    const conditionSize = item.clientWidth / 2;
    pos.endX = evt.offsetX;
    pos.endY = evt.offsetY;
    const movementPercent = Math.abs(pos.endX - pos.startX) / conditionSize;
    requestAnimationFrame(() => {
      item.style.opacity = `${0.8 - movementPercent}`;
    });
  }
  endDrag(evt: DragEvent, func?: Function) {
    const { pos } = this.swipe;
    console.log(pos); // TODO: 왜 값이 할당되지 않지?
    const { LEFT, RIGHT } = DIRECTION;
    const { MAX_Y } = LIMIT_BOUNDARY;
    pos.endX = evt.offsetX;
    pos.endY = evt.offsetY;
    const item = this.$refs.dragItem as HTMLDivElement;
    const conditionSize = item.clientWidth / 2;
    const movementPercent = Math.abs(pos.endX - pos.startX) / conditionSize;
    if (0.8 > movementPercent) {
      requestAnimationFrame(() => {
        item.style.opacity = "1";
      });
    } else {
      if (pos.endY - pos.startY < MAX_Y) {
        this.swipe.swipeDirection = pos.endX < pos.startX ? LEFT : RIGHT;
      }
      //   else if (
      //     (pos.endY - pos.startY > MIN_Y || pos.endY + pos.startY < -MIN_Y) &&
      //     pos.endX - pos.startX < MAX_X
      //   ) {
      //     this.swipe.swipeDirection = pos.endY > pos.startY ? DOWN : UP;
      //   }
    }

    if (this.swipe.swipeDirection !== "" && typeof func === "function") {
      func(item.id, this.swipe.swipeDirection);
    }

    this.resetPosAndSwipeDirection(this.swipe.swipeDirection, pos);
  }
  resetPosAndSwipeDirection(
    swipeDirection: string,
    pos: { [key: string]: number }
  ) {
    swipeDirection = "";
    for (const key in pos) {
      pos[key] = 0;
    }
  }
  setLocalStorage() {
    this.$emit("setLocalStorage");
  }
  openEdit() {
    this.isClicked = !this.isClicked;
  }
  resetValue() {
    this.value = "";
  }
  toggleEdit() {
    this.isEdit = !this.isEdit;
  }
  complete(id: string) {
    this.$emit("complete", id);
    this.openEdit();
  }
  remove(id: string) {
    this.$emit("remove", id);
  }
  fix(value: string, id: string) {
    if (value.length > 0) {
      this.$emit("fix", value, id);
      this.toggleEdit();
      this.openEdit();
      this.resetValue();
    } else {
      alert("할 일을 채워주세요.!");
    }
  }
  cancel() {
    this.toggleEdit();
    this.resetValue();
  }
}
</script>

<style scoped lang="scss">
.item {
  cursor: pointer;
}
.todo {
  background-color: $todo-default-bgcolor;
  text-decoration: none;
  color: $font-color;
}
.clicked {
  background-color: $todo-clicked-bgcolor;
}
.done {
  background-color: $todo-done-bgcolor;
  text-decoration: line-through;
  color: $font-color;
  cursor: default;
}
.edit {
  background-color: $input-bgcolor;
  color: $font-color;
}
.warning {
  color: $warning;
}
</style>
