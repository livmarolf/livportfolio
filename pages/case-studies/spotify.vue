<template>
  <main>
    <section class="intro">
      <Card accent="var(--spotify-green)" label="case study" border>

        <h2><span class="spotify-green">spotify</span> wrapped</h2>

        <p class="text-secondary">
          How does a simple year-end recap become a viral sensation? This case study explores the design choices behind
          one of Spotify's most engaging features.
        </p>

      </Card>
      <DisplayCard>
        <template #label>
          <Icon name="spotify" />
          <p>intro</p>
        </template>
        <template #default>
          <NuxtImg class="display-image" src="/images/case-studies/spotify-1.png" />
          <Tooltip width="var(--tooltip-1-width)">
            <template #top-text>So it's time to pick a movie...</template>
            <template #bottom-text>Let's dive into <strong>Disney Plus</strong> and see what movies they have to
              offer</template>
          </Tooltip>
        </template>
      </DisplayCard>
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
    position: absolute;
  }
}
</style>