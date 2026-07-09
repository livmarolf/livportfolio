<script setup lang="ts">
const id = useId()
const color = useState(id, () => getNextColor())
</script>

<template>
  <li :style="{ '--marker-color': color }">
    <slot />
  </li>
</template>
