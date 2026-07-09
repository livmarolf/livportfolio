<script setup lang="ts">
import frameUrl from '~/assets/iphone-frame.svg?url'
import screenMaskUrl from '~/assets/iphone-screen-mask.png?url'

const id = useId()

const props = withDefaults(
  defineProps<{
    src?: string
    fit?: 'cover' | 'contain'
  }>(),
  {
    src: '',
    fit: 'cover',
  }
)

const preserveAspectRatio = computed(() =>
  props.fit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'
)

const screenMaskId = `phone-screen-mask-${id ?? '0'}`
</script>

<template>
  <div class="phone-screen">
    <svg
      class="phone-svg"
      viewBox="0 0 224 458"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet">
      <defs>
        <mask
          :id="screenMaskId"
          maskUnits="userSpaceOnUse"
          x="11.2"
          y="9.16"
          width="201.6"
          height="439.68">
          <image
            :href="screenMaskUrl"
            x="11.2"
            y="9.16"
            width="201.6"
            height="439.68"
            preserveAspectRatio="none" />
        </mask>
      </defs>
      <image
        :href="src"
        x="11.2"
        y="9.16"
        width="201.6"
        height="439.68"
        :preserveAspectRatio="preserveAspectRatio"
        :mask="`url(#${screenMaskId})`" />
      <image :href="frameUrl" x="0" y="0" width="224" height="458" />
    </svg>
  </div>
</template>

<style scoped>
.phone-screen {
  position: relative;
  aspect-ratio: 224 / 458;
  width: 100%;
  min-height: 0;
}

.phone-svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
