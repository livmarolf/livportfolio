<template>
  <div class="phone-screen">
    <slot />
    <img class="frame" src="~/assets/iphone-frame.svg" alt="" />
  </div>
</template>

<style scoped>
.phone-screen {
  position: relative;
  aspect-ratio: 0.489;

  .frame {
    position: relative;
    height: 100%;
  }
}

.phone-screen :deep(img:not(.frame)) {
  position: absolute;
  --inset-left: 5%;
  --inset-right: 5%;
  --inset-top: 2%;
  --inset-bottom: 2%;
  top: var(--inset-top);
  left: var(--inset-left);
  width: calc(100% - (var(--inset-right) + var(--inset-left)));
  height: calc(100% - (var(--inset-top) + var(--inset-bottom)));
  object-fit: cover;
  mask-image: url('~/assets/iphone-screen-mask.png');
  mask-size: contain;
  mask-repeat: no-repeat;
}
</style>
