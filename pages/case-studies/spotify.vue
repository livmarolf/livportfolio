<template>
  <main>
    <section class="intro">
      <div class="card" style="--accent: var(--spotify-green)">
        <span class="card--label">case study</span>
        <h2 class="card--title"><span class="accent">spotify</span> wrapped</h2>

        <p class="card--text">
          How does a simple year-end recap become a viral sensation? This case
          study explores the design choices behind one of Spotify's most
          engaging features.
        </p>
      </div>
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="spotify" />
          <p>intro</p>
        </span>

        <NuxtImg
          class="display-image"
          src="/images/case-studies/spotify-1.png"
        />
        <Tooltip width="var(--tooltip-1-width)">
          <template #top-text>So it's time to pick a movie...</template>
          <template #bottom-text>
            Let's dive into <strong>Disney Plus</strong> and see what movies
            they have to offer
          </template>
        </Tooltip>
      </div>
    </section>

    <section class="card-group">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="spotify" />
          <p>intro</p>
        </span>

        <NuxtImg
          class="display-image"
          src="/images/case-studies/spotify-1.png"
        />
        <Tooltip width="var(--tooltip-1-width)">
          <template #top-text>
            People get so excited about it throughout the year
          </template>
          <template #bottom-text>
            When it finally arrives ... it's an event
          </template>
        </Tooltip>
      </div>
      <div class="card" style="--accent: var(--spotify-yellow)">
        <span class="card--label">UX INSIGHT</span>
        <h3 class="card--topic">anticipation</h3>
        <p class="card--title">
          Each December, Spotify users
          <span class="accent">eagerly await</span> the release of their Spotify
          Wrapped
        </p>
        <p class="card--text">
          The sense of excitement Wrapped creates stems from its ability to
          transform data into an anticipated experience, tapping into users'
          mental models about year-end summaries and self-reflection.
        </p>
      </div>
      <div class="card" style="--accent: var(--spotify-orange)">
        <span class="card--label">UX THEORY</span>
        <h3 class="card--topic">variable reward</h3>
        <p class="card--title">
          People especially enjoy <span class="accent">unexpected rewards</span>
        </p>
        <p class="card--text">
          Not knowing who your top artists and songs are, is one of the key
          ingredients in Spotify Wrapped's success.
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
$colors: (
  green: #2dd867,
  yellow: #cff469,
  pink: #f36ebd,
  violet: #6e67ff,
  light-green: #94fead,
  red: #f55969,
  orange: #fa9a58,
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
  height: clamp(rem(600), 75vh, rem(750));
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

.card-group {
  display: grid;
  grid-template: 1fr 1fr / 2fr 1fr;

  margin-bottom: var(--common-gap);

  gap: var(--common-gap);
  height: clamp(rem(600), 75vh, rem(750));
  .card.borderless {
    grid-row: span 2;
  }
}
</style>
