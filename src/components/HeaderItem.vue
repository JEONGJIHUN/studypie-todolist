<template>
  <div>
    <p>{{ year(date) }}</p>
    <p>{{ monthDateDay(date) }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  props: ["date"],
})
export default class HeaderItem extends Vue {
  @Prop() readonly date!: Date;
  year(d: Date) {
    return d.getFullYear();
  }
  monthDateDay(d: Date) {
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const day = d.getDay();
    return `${month}월 ${date}일 (${this.getDay(day)})`;
  }
  getDay(day: number) {
    switch (day) {
      case 0:
        return "일";
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";
      default:
        break;
    }
  }
}
</script>

<style scoped lang="scss">
p {
  margin: 0;
  padding: 0;
  &:first-child {
    font-size: $year-font-size;
  }
  &:last-child {
    font-size: $month-date-font-size;
  }
}
</style>
