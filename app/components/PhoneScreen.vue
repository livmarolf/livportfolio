<template>
  <div class="phone-screen">
    <slot />
    <!-- <img src="~/assets/iphone-frame.svg" alt="" /> -->
  </div>
</template>

<style scoped>
.phone-screen {
  position: relative;

  /* height: 100%; */
  /* &::before {
    content: '';
    display: block;
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 20px;
    background-color: #000;
    z-index: 1;
    border-radius: 40px;
  } */
}

:deep(video) {
  position: relative;
  /* border-radius: 50px; */
  /* 
  corner-shape: superellipse(1.2);
   */
  display: block;
  /* height: 500px; */
  /* box-shadow:
    0 0 0 9px var(--item-background),
    0 0 0 10px var(--stroke); */
}
</style>
