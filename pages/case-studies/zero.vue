<script lang="ts" setup>
const images = [
  "/images/case-studies/zero/gallery/1.png",
  "/images/case-studies/zero/gallery/2.png",
  "/images/case-studies/zero/gallery/3.png",
  "/images/case-studies/zero/gallery/4.png",
];

const currentImage = ref(0);
</script>

<template>

  <Head>
    <Title>Zero Case Study | Olivia Marolf's UI/UX Portfolio</Title>
  </Head>
  <main>
    <!-- INTRO -->
    <section class="intro">
      <div class="card" style="--accent: var(--zero-green)">
        <span class="card--label">case study</span>
        <h1 class="card--title">
          designing
          <span class="accent">zero</span>
        </h1>

        <p class="card--text">
          A local cardboard recycling company hired us to design their first
          website to build brand awareness, promote sustainability, and
          streamline recycling pickup scheduling.
        </p>
      </div>

      <NuxtImg class="card" src="/images/home/zero.svg" />
    </section>

    <!-- GALLERY -->
    <section class="gallery">
      <NuxtImg v-for="(image, i) in images" v-show="currentImage === i" class="card" :src="image" :key="image" />
      <ul>
        <li v-for="(image, i) in images" :key="image">
          <button @click="currentImage = i" type="button">
            <NuxtImg class="card" :class="{ active: currentImage === i }" :src="image" />
          </button>
        </li>
      </ul>
    </section>

    <!-- EARLY IDEATION -->
    <section class="early-ideation">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="zero" />
          <p>early ideation</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/zero/early-ideation.png" />
        <Tooltip width="var(--tooltip-width)">
          <template #top-text>
            Taking notes and brainstorming is an important part of the process!
          </template>
          <template #bottom-text>
            Here is where I <strong>define the objectives</strong> for the
            project
          </template>
        </Tooltip>
      </div>
      <div class="card" style="--accent: var(--zero-cyan)">
        <span class="card--label">project overview</span>
        <h3 class="card--topic">solving recycling</h3>
        <p class="card--title">
          Zero aims to <span class="accent">make recycling accessible</span> and
          affordable for residential communities
        </p>
        <p class="card--text">
          Zero explained that the lack of an online presence was hindering their
          ability to reach their goals.
        </p>
      </div>
      <div class="card" style="--accent: var(--zero-green)">
        <span class="card--label">client's needs</span>
        <h3 class="card--topic">primary objectives</h3>

        <ul>
          <li>Payment support</li>
          <li>Brand awareness</li>
          <li>Educational content</li>
          <li>User-friendly design</li>
          <li>Advertising platform</li>
        </ul>
      </div>
    </section>

    <!-- DOCUMENTED RESEARCH -->
    <section class="documented-research">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="zero" />
          <p>documented research</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/zero/documented-research.png" />
        <Tooltip width="var(--tooltip-width)">
          <template #top-text>
            Now that objectives are defined, it’s time to
            <strong>conduct research</strong>
          </template>
          <template #bottom-text>
            The research findings will help guide further project decisions!
          </template>
        </Tooltip>
      </div>
      <div class="card" style="--accent: var(--zero-cyan)">
        <span class="card--label">research</span>
        <h3 class="card--topic">market research</h3>
        <p class="card--title">
          I analyzed the recycling industry and competitor websites to
          <span class="accent">identify trends</span>
        </p>
        <p class="card--text">
          Most competitor sites had cluttered designs and poor service booking,
          offering a chance to create a cleaner, more user-friendly site.
        </p>
      </div>
      <div class="card" style="--accent: var(--zero-green)">
        <span class="card--label">research</span>
        <h3 class="card--topic">user research</h3>
        <p class="card--title">
          User interviews revealed that they valued
          <span class="accent">sustainability</span> and
          <span class="accent">transparency</span>
        </p>
        <p class="card--text">
          Users wanted clear, easy-to-understand educational content, a simple
          way to view and choose a subscription, and transparent information
          about the company’s eco-friendly practices.
        </p>
      </div>
    </section>

    <!-- BRANDING -->
    <section class="branding">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="zero" />
          <p>branding</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/zero/branding.png" />
      </div>

      <div class="card" style="--accent: var(--zero-cyan)">
        <span class="card--label">develop</span>
        <h3 class="card--topic">brand identity</h3>
        <p class="card--title">
          Effectively
          <span class="accent">communicating Zero's brand</span> visually to
          users was essential
        </p>
        <p class="card--text">
          To convey an eco-friendly message, nature-inspired imagery was
          selected to emphasize the company’s commitment to sustainability.
        </p>
      </div>
    </section>

    <!-- EDUCATIONAL CONTENT -->
    <section class="educational-content">
      <div class="card" style="--accent: var(--zero-green)">
        <span class="card--label">develop</span>
        <h3 class="card--topic">educational content</h3>
        <p class="card--title">
          Educational content was key to
          <span class="accent">raising awareness</span> of the benefits of
          cardboard recycling
        </p>
        <p class="card--text">
          By highlighting the impact of recycling, the content aimed to foster a
          sense of responsibility among users.
        </p>
      </div>
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="disney" />
          <p>tv version</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/zero/educational-content.png" />
        <Tooltip width="var(--tooltip-width)">
          <template #top-text>
            Incorporating components from
            <strong>user interview insights</strong> was essential
          </template>
          <template #bottom-text>
            Check out these informational cards!
          </template>
        </Tooltip>
      </div>
    </section>

    <!-- CONVERSION -->
    <section class="conversion">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="zero" />
          <p>conversion</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/zero/conversion.png" />
        <Tooltip width="var(--tooltip-width)">
          <template #top-text>
            Each page includes one or more calls to action (CTAs)
          </template>
          <template #bottom-text>
            Here, a “Join Zero” button <strong>guides users</strong> into
            choosing a subscription plan
          </template>
        </Tooltip>
      </div>

      <div class="card" style="--accent: var(--zero-cyan)">
        <span class="card--label">develop</span>
        <h3 class="card--topic">conversion-oriented</h3>
        <p class="card--title">
          I aimed to <span class="accent">boost conversions</span> by placing
          CTAs to encourage subscriptions and recycling pickups
        </p>
        <p class="card--text">
          I planned for ongoing A/B testing of various elements—like button
          placements, headlines, and layouts—to continually improve the site's
          performance and drive higher conversion rates.
        </p>
      </div>
    </section>

    <!-- MEASURING SUCCESS -->
    <section class="measuring-success">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="zero" />
          <p>measuring success</p>
        </span>

        <NuxtImg class="display-image" src="/images/case-studies/zero/measuring-success.png" />
      </div>
      <div class="card" style="--accent: var(--zero-green)">
        <span class="card--label">results</span>
        <h3 class="card--topic">brand recognition</h3>
        <p class="card--title">
          Zero saw a <span class="accent">50% increase</span> in brand awareness
        </p>
        <p class="card--text">
          Within three months of launching the website, the company saw a 50%
          increase in brand awareness, as reflected by increased social media
          followers and direct inquiries from the website.
        </p>
      </div>
      <div class="card" style="--accent: var(--zero-cyan)">
        <span class="card--label">results</span>
        <h3 class="card--topic">advertising success</h3>
        <p class="card--title">
          Targeted promotions led to a
          <span class="accent">35% increase</span> in service bookings
        </p>
        <p class="card--text">
          The website served as a successful platform for the company’s first
          digital advertising campaigns, leading to a 35% increase in service
          bookings through targeted promotions.
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
$colors: (
  green: #2dd867,
  cyan: #25d2b4,
);

main {
  @each $name, $color in $colors {
    --zero-#{"" + $name}: #{$color};
  }
}

section {
  min-height: rem(850);
  margin-bottom: var(--common-gap);

  .card.borderless:has(.tooltip) {
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

  .card.borderless:not(:has(.tooltip)) {
    padding-top: rem(128);
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

.gallery {
  display: grid;
  grid-template: 1fr / 10.5fr 1.5fr;
  gap: var(--common-gap);
  min-height: initial;
  height: min-content;
  max-height: 85vh;
  grid-template-areas: "preview selector";

  img {
    height: 100%;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: var(--common-gap);

    list-style: none;
    overflow-y: auto;

    scrollbar-color: var(--color-background-card-light) transparent;
    scrollbar-width: thin;
    grid-area: selector;

    li {
      display: contents;
    }

    button {
      background: transparent;
      border: 0;
      outline: none;

      &:focus img {
        border: none;
        outline: rem(3) solid var(--color-border);
      }

      img {
        height: 100%;
        aspect-ratio: 1 / 1;
        cursor: pointer;
        outline-offset: rem(-3);

        &:hover {
          outline: rem(3) solid var(--color-border);
        }

        &.active {
          outline: rem(3) solid var(--color-text-primary);
        }
      }
    }
  }

  @media (max-width: width(580)) {
    grid-template: rem(100) 1fr / 1fr;
    height: auto;

    grid-template-areas: "selector" "preview";

    ul {
      flex-direction: row;
      overflow-y: hidden;
      overflow-x: auto;
    }
  }
}

.early-ideation {
  display: grid;
  grid-template: 1fr 1fr / 7fr 5fr;
  gap: var(--common-gap);
  grid-template-areas:
    "image insight"
    "image theory";

  @media (max-width: width(1215)) {
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

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card:nth-of-type(2) {
    grid-area: insight;
  }

  .card:nth-of-type(3) {
    grid-area: theory;
  }

  .display-image {
    max-width: 100%;
    max-height: 70%;
  }
}

.documented-research {
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

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card:nth-of-type(2) {
    grid-area: insight;
  }

  .card:nth-of-type(3) {
    grid-area: theory;
  }

  .display-image {
    max-width: 100%;
    max-height: 70%;
  }
}

.branding {
  min-height: rem(536);
  display: grid;
  gap: var(--common-gap);
  grid-template: 1fr / 7fr 5fr;
  grid-template-areas: "image card";

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
    display: flex;
    justify-content: center;
    align-items: flex-end;
    grid-area: image;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.educational-content {
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
    right: rem(64);
    position: absolute;
  }

  .card.borderless {
    display: flex;
    justify-content: center;
    align-items: center;

    .display-image {
      max-width: 100%;
      max-height: 70%;
      bottom: rem(64);
      right: rem(64);
    }
  }
}

.conversion {
  min-height: rem(536);
  display: grid;
  grid-template: 1fr / 7fr 5fr;
  gap: var(--common-gap);
  grid-template-areas: "image card";

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
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 0;
    grid-area: image;

    @media (max-width: width(1060)) {
      padding-bottom: rem(64);
    }

    .display-image {
      max-width: 100%;
      max-height: 90%;
    }
  }
}

.measuring-success {
  display: grid;
  grid-template: 1fr 1fr / 5fr 7fr;
  gap: var(--common-gap);
  grid-template-areas:
    "insight image"
    "theory image";

  @media (max-width: width(1215)) {
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
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 0;

    .display-image {
      max-height: 95%;
      max-width: 100%;
    }
  }

  .card:nth-of-type(2) {
    grid-area: insight;
  }

  .card:nth-of-type(3) {
    grid-area: theory;
  }
}
</style>
