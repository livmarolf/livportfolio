<script setup lang="ts">
definePageMeta({
  layout: false,
})

import { Display } from "~/lib/display";

const width = ref(51)
const height = ref(13)
const text = ref("")
const justification = ref<'left' | 'center' | 'right'>('center')

const matrixDisplayEl = useTemplateRef("footer-matrix-display");
let display: Display;

const initDisplay = () => {
  if (!matrixDisplayEl.value) return;
  if (display) display.destroy();

  display = new Display(matrixDisplayEl.value, [], {
    width: width.value,
    height: height.value
  });

  display.edit()
}

watch([width, height], () => {
  if (!display) return;
  initDisplay()
})

onMounted(() => {
  initDisplay()
});

const activeColor = ref("#fff")

const setColor = (color: string) => {
  display.brushColor = color
  activeColor.value = color
}


const colors = reactive<string[]>([])

const setText = () => {
  display.text.box(...display.lastPoint, [text.value], activeColor.value, [justification.value, "center"])
  // @ts-ignore
  display.flushBuffer()
}

</script>

<template>
  <main>
    <canvas class="dot-matrix-display" ref="footer-matrix-display" />
    <div class="colors">
      <div class="color" :class="{ active: color === activeColor }" v-for="color in colors" @click="setColor(color)"
        :style="{ background: color }"></div>
      <input type="color" @change="colors.push(($event.target as any).value); setColor(($event.target as any).value)" />
      <form @submit.prevent="setText()">
        <input type="text" v-model="text" />
        <select v-model="justification">
          <option value="left">left</option>
          <option value="center">center</option>
          <option value="right">right</option>
        </select>
        <button>add</button>
      </form>
    </div>
    <div class="danger">
      <h4>DANGER</h4>
      <input tabindex="-1" type="number" step="1" v-model.number="width" />
      <input tabindex="-1" type="number" step="1" v-model.number="height" />
    </div>
  </main>

</template>

<style lang="scss" scoped>
main {
  padding: 0 var(--common-gap);
  margin: 0;

}

input:not([type="color"]),
button,
select {
  width: 200px;
  height: 40px;
  background: #333;
  border: none;
  border-radius: 20px;
  text-align: center;
  color: #fff;
}

.danger {
  margin-top: 400px;
  border: 3px solid #f00;
  width: min-content;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: red;

}

.colors {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 30px;
}

.color {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: transform 0.2s ease-out;

  &.active {
    border: 4px solid #fff;
    transform: scale(1.2);
  }
}

.dot-matrix-display {
  --pixel-gap: 4px;
  --pixel-border-radius: 4px;
  --border-width: 2px;

  width: 100%;
  margin: var(--common-gap) auto;


  @media (max-width: 800px) {
    --pixel-gap: 3px;
    --pixel-border-radius: 3px;
  }

  @media (max-width: 600px) {
    --pixel-gap: 1px;
    --pixel-border-radius: 3px;
    --border-width: 1.5px;
  }

}
</style>