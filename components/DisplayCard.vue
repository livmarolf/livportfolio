<template>
  <div class="display-card">
    <span class="label">
      <slot name="label" />
    </span>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.display-card {
  position: relative;
  padding: rem(64);
  background: var(--color-background-card-dark);
  border-radius: rem(8);
}

.label {
  position: absolute;
  display: flex;
  align-items: center;
  gap: rem(12);
  color: var(--color-text-secondary);

  :deep(.nuxt-icon) {
    font-size: rem(28);
  }

  :deep(p) {
    font-size: rem(16);
  }
}
</style>