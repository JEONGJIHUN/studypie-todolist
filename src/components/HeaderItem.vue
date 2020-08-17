<template>
  <div>
    <p>{{ year(date) }}</p>
    <p>{{ monthDateDay(date) }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getDay } from "@/utils";

@Component({
  props: ["date"],
})
export default class HeaderItem extends Vue {
  @Prop() readonly date!: Date;

  year(d: Date): number {
    return d.getFullYear();
  }
  monthDateDay(d: Date) {
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const day = d.getDay();
    return `${month}월 ${date}일 (${getDay(day)})`;
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
