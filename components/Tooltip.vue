<template>
  <div class="tooltip">
    <div class="pfp">
      <NuxtImg width="128" height="128" src="/images/olivia-marolf.png" />
    </div>
    <p>
      <slot name="top-text" />
    </p>
    <p>
      <slot name="bottom-text" />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  padding: rem(18);
  border: 1px solid #606060;
  border-radius: rem(8);
  background: rgba(var(--color-background-card-light_rgb), 0.7);
  backdrop-filter: blur(12px);

  display: grid;
  grid-template: 1fr / auto 1fr;
  grid-template-areas: "pfp top" "pfp bottom";
  gap: rem(32) rem(18);
  width: var(--tooltip-width, max-content);
}

p {
  font-size: rem(14);
}


.pfp {

  width: rem(38);
  height: rem(38);
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  grid-area: pfp;

  >img {
    position: absolute;
    top: 0;
    left: rem(-20);
    width: rem(80);
    height: auto;
  }
}
</style>