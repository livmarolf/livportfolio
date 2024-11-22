<script lang="ts" setup>
const showOriginal = ref(false);
</script>

<template>

  <Head>
    <Title>Disney Plus Movie Filter Case Study | Olivia Marolf's UI/UX Portfolio</Title>
  </Head>
  <main>
    <!-- INTRO -->
    <section class="intro">
      <div class="card" style="--accent: var(--disney-blue)">
        <span class="card--label">case study</span>
        <h1 class="card--title">
          <span class="accent">disney plus</span> movies filter
        </h1>

        <p class="card--text">
          Disney Plus' "Movies" page has a usability issue: the filter
          disappears when scrolling, forcing users to scroll back up to use it.
          This is especially frustrating on TVs, where navigation takes several
          clicks.
        </p>
      </div>

      <NuxtImg class="card" src="/images/home/disney-plus.svg" />
    </section>
    <!-- SOLUTION PREVIEW -->
    <section class="solution-preview card borderless dark">
      <span class="card--label">
        <Icon name="disney" />
        <p>solution preview</p>
      </span>

      <div class="img-swapper">
        <div @click="showOriginal = !showOriginal" class="button-group">
          <button :class="{ active: !showOriginal }">improved</button>
          <button :class="{ active: showOriginal }">original</button>
        </div>

        <NuxtImg v-show="!showOriginal" src="/images/case-studies/disney-plus/improved.png" />
        <NuxtImg v-show="showOriginal" src="/images/case-studies/disney-plus/original.png" />
      </div>
    </section>
    <!-- ORIGINAL DESIGN -->
    <section class="original-design">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="disney" />
          <p>original design</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/disney-plus/original.png" />
        <Tooltip width="var(--tooltip-width)">
          <template #top-text>
            Ooh there's so many choices! I wonder if there's a way to see only
            <strong>animated movies</strong>...
          </template>
          <template #bottom-text> Wait, where did the filter go? </template>
        </Tooltip>
      </div>
      <div class="card" style="--accent: var(--disney-blue)">
        <span class="card--label">problem statement</span>
        <h3 class="card--topic">inaccessible filtering</h3>
        <p class="card--title">
          While the movies filter is visible initially, once the user scrolls
          <span class="accent">the filter disappears</span>
        </p>
        <p class="card--text">
          The disappearing filter creates friction for users. Filters are
          essential tools for refining searches, and losing access while
          scrolling makes the browsing experience frustrating and inefficient.
        </p>
      </div>
      <div class="card" style="--accent: var(--disney-purple)">
        <span class="card--label">ux theory</span>
        <h3 class="card--topic">friction</h3>
        <p class="card--title">
          The disappearing filter
          <span class="accent">disrupts the flow</span> of interaction
        </p>
        <p class="card--text">
          Users are forced to take extra steps, such as scrolling back up, to
          access the filter again. This slows down the user and can cause them
          to disengage.
        </p>
      </div>
    </section>
    <!-- RESULTS FILTER -->
    <section class="results-filter">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="disney" />
          <p>results filter</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/disney-plus/filter-closeup.png" />
        <Tooltip width="var(--tooltip-width)">
          <template #top-text>
            If only the filter stayed accessible while browsing
          </template>
          <template #bottom-text>
            A <strong>sticky filter</strong> would allow filtering no matter how
            far down the page I scroll!
          </template>
        </Tooltip>
      </div>

      <div class="card" style="--accent: var(--disney-blue)">
        <span class="card--label">web solution</span>
        <h3 class="card--topic">the sticky filter</h3>
        <p class="card--title">
          A sticky filter ensures users
          <span class="accent">always have access to filtering</span> options
          while browsing
        </p>
        <p class="card--text">
          Having access to the filtering options while browsing, creates a
          smoother, more intuitive experience. It reduces interruptions and
          allows users to navigate content more efficiently.
        </p>
      </div>
    </section>
    <!-- TV VERSION -->
    <section class="tv-version-one">
      <div class="card" style="--accent: var(--disney-purple)">
        <span class="card--label">edge case</span>
        <h3 class="card--topic">using a remote</h3>
        <p class="card--title">
          A sticky filter won't work on the Disney Plus TV app due to
          <span class="accent">remote navigation limitation</span>
        </p>
        <p class="card--text">
          On the Disney Plus movies page, remote navigation only moves up, down,
          left, or right, so a sticky filter at the top can't be accessed until
          users scroll back up, defeating its purpose.
        </p>
      </div>
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="disney" />
          <p>tv version</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/disney-plus/tv-version.png" />
        <Tooltip width="var(--tooltip-width)">
          <template #top-text>
            On a TV, the focus doesn't reach the sticky filter until scrolling
            to the top of the page... <strong>defeating it's purpose</strong>
          </template>
          <template #bottom-text>
            How else could this problem be solved?
          </template>
        </Tooltip>
      </div>
    </section>
    <!-- TV VERSION -->
    <section class="tv-version-two">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="disney" />
          <p>tv version</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/disney-plus/remote.png" />
        <Tooltip width="var(--tooltip-width)">
          <template #top-text>
            The remote's <strong>back button</strong> can be used to navigate:
          </template>
          <template #bottom-text>
            One press scrolls to the top where the filter is, and a second press
            takes the user to the previous page</template>
        </Tooltip>
      </div>
      <div class="card" style="--accent: var(--disney-blue)">
        <span class="card--label">remote navigation</span>
        <h3 class="card--topic">contextual action</h3>
        <p class="card--title">
          The <span class="accent">back button</span> on the remote can function
          differently depending on the context of use
        </p>
        <p class="card--text">
          If the user is further down the page, pressing the back button scrolls
          them to the top. If they're already at the top, it navigates back.
        </p>
      </div>
      <div class="card" style="--accent: var(--disney-purple)">
        <span class="card--label">ux theory</span>
        <h3 class="card--topic">efficiency of use</h3>
        <p class="card--title">
          Allowing users to access filters anytime lets them adjust content
          <span class="accent">without scrolling</span>, boosting efficiency
        </p>
        <p class="card--text">
          Persistent filters allow both novice and advanced users to quickly
          refine searches or make changes on the fly, saving time and effort.
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
$colors: (
  blue: #00b5da,
  purple: #6e67ff,
);

main {
  @each $name, $color in $colors {
    --disney-#{"" + $name}: #{$color};
  }
}

section {
  min-height: rem(850);
  margin-bottom: var(--common-gap);

  .card.borderless {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: width(1060)) {
      flex-direction: column;
      gap: rem(64);
      padding-top: rem(128);

      :deep(.tooltip) {
        bottom: 0;
        left: 0;
        position: relative;
      }
    }
  }

  .display-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
  }
}

.intro {
  display: grid;
  grid-template: 1fr / 5fr 7fr;
  gap: var(--common-gap);

  @media (max-width: width(1060)) {
    grid-template: auto auto / 1fr;
    height: auto;
  }
}

.solution-preview {
  position: relative;
  min-height: initial;
  display: block;

  .img-swapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(32);
    padding-top: rem(64);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      height: rem(80);
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom,
          transparent,
          var(--color-background-card-dark));
    }

    img {
      width: 100%;
      aspect-ratio: 920/444;
      object-fit: cover;
      object-position: top;
    }

    .button-group {
      display: flex;
      gap: rem(4);
      border: rem(4) solid var(--color-background-card);
      border-radius: rem(12);
      padding: rem(4);
      cursor: pointer;

      button {
        background-color: transparent;
        padding: rem(8) rem(12);
        border-radius: rem(5);
        border: none;
        text-transform: uppercase;
        cursor: pointer;

        &.active {
          background-color: var(--color-background-card);
        }
      }
    }
  }
}

.original-design {
  display: grid;
  grid-template: 1fr 1fr / 5fr 7fr;
  gap: var(--common-gap);
  grid-template-areas:
    "insight image"
    "theory image";

  @media (max-width: width(1060)) {
    grid-template: auto auto / 1fr 1fr;
    grid-template-areas:
      "insight theory"
      "image image";
    height: auto;
  }

  @media (max-width: width(960)) {
    grid-template: auto auto auto / 1fr;
    grid-template-areas:
      "insight"
      "theory"
      "image";
  }

  :deep(.tooltip) {
    --tooltip-width: #{rem(350)};
    bottom: rem(64);
    left: rem(64);
    position: absolute;
  }

  .card.borderless {
    grid-area: image;
  }

  .card:nth-of-type(2) {
    grid-area: insight;
  }

  .card:nth-of-type(3) {
    grid-area: theory;
  }
}

.results-filter {
  min-height: rem(536);
  display: grid;
  grid-template: 1fr / 7fr 5fr;
  grid-template-areas: "image card";
  gap: var(--common-gap);

  @media (max-width: width(1060)) {
    grid-template: auto auto / 1fr;
    grid-template-areas:
      "card"
      "image";
  }

  :deep(.tooltip) {
    --tooltip-width: #{rem(350)};
    bottom: rem(64);
    right: rem(64);
    position: absolute;
  }

  .card {
    grid-area: card;
  }

  .card.borderless {
    grid-area: image;
  }
}

.tv-version-one {
  min-height: rem(536);
  display: grid;
  gap: var(--common-gap);
  grid-template: 1fr / 5fr 7fr;

  @media (max-width: width(1060)) {
    grid-template: auto auto / 1fr;
  }

  :deep(.tooltip) {
    --tooltip-width: #{rem(350)};
    bottom: rem(64);
    left: rem(64);
    position: absolute;
  }
}

.tv-version-two {
  display: grid;
  grid-template: 1fr 1fr / 7fr 5fr;
  gap: var(--common-gap);
  grid-template-areas:
    "image insight"
    "image theory";

  @media (max-width: width(1060)) {
    grid-template: auto auto / 1fr 1fr;
    grid-template-areas:
      "insight theory"
      "image image";
    height: auto;
  }

  @media (max-width: width(960)) {
    grid-template: auto auto auto / 1fr;
    grid-template-areas:
      "insight"
      "theory"
      "image";
  }

  :deep(.tooltip) {
    --tooltip-width: #{rem(350)};
    bottom: rem(64);
    right: rem(64);
    position: absolute;
  }

  .card.borderless {
    grid-area: image;
  }

  .card:nth-of-type(2) {
    grid-area: insight;
  }

  .card:nth-of-type(3) {
    grid-area: theory;
  }
}
</style>
