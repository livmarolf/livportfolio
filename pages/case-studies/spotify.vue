<template>
  <main>
    <section class="intro">
      <div class="card" style="--accent: var(--spotify-green)">
        <span class="card--label">case study</span>
        <h2 class="card--title"><span class="accent">spotify</span> wrapped</h2>

        <p class="card--text">
          How does a simple year-end recap become a viral sensation? This case study explores the design choices behind
          one of Spotify's most engaging features.
        </p>
      </div>
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="spotify" />
          <p>intro</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/spotify-1.png" />
        <Tooltip width="var(--tooltip-1-width)">
          <template #top-text>So it's time to pick a movie...</template>
          <template #bottom-text>Let's dive into <strong>Disney Plus</strong> and see what movies they have to
            offer</template>
        </Tooltip>

      </div>
    </section>
  </main>
</template>


<style lang="scss" scoped>
$colors: (
  green: #2DD867,
  yellow: #CFF469,
  pink: #F36EBD,
  violet: #6E67FF,
  light-green: #94FEAD,
  red: #F55969,
  orange: #FA9A58,
);

main {
  @each $name, $color in $colors {
    --spotify-#{"" + $name}: #{$color};
  }

  @each $name, $color in $colors {
    .spotify-#{"" + $name} {
      color: var(--spotify-#{$name});
    }
  }

}

section {
  height: max(70vh, rem(500));
}

.intro {
  display: grid;
  grid-template: 1fr / 1fr 2fr;
  gap: var(--common-gap);

  .display-image {
    max-width: 70%;
    max-height: 70%;
    position: absolute;
    bottom: rem(64);
    right: rem(64);
  }

  :deep(.tooltip) {
    --tooltip-width: #{rem(350)};
    bottom: rem(64);
    left: rem(64);
    position: absolute;
  }
}
</style>