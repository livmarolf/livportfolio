<script lang="ts" setup></script>

<template>
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
    <section class="gallery"></section>

    <!-- EARLY IDEATION -->
    <section class="early-ideation">
      <div class="card borderless dark">
        <span class="card--label">
          <Icon name="zero" />
          <p>early ideation</p>
        </span>

        <NuxtImg
          class="display-image"
          src="/images/case-studies/zero/early-ideation.png"
        />
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

        <NuxtImg
          class="display-image"
          src="/images/case-studies/zero/documented-research.png"
        />
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

        <NuxtImg
          class="display-image"
          src="/images/case-studies/zero/branding.png"
        />
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

        <NuxtImg
          class="display-image"
          src="/images/case-studies/zero/educational-content.png"
        />
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

        <NuxtImg
          class="display-image"
          src="/images/case-studies/zero/conversion.png"
        />
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

        <NuxtImg
          class="display-image"
          src="/images/case-studies/zero/measuring-success.png"
        />
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
      <div class="card" style="--accent: var(--zero-green)">
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
  height: clamp(rem(600), 75vh, rem(750));
  margin-bottom: var(--common-gap);
}

.intro {
  display: grid;
  grid-template: 1fr / 5fr 7fr;
  gap: var(--common-gap);
}

.early-ideation {
  display: grid;
  grid-template: 1fr 1fr / 7fr 5fr;
  grid-template-areas:
    "image insight"
    "image theory";

  gap: var(--common-gap);

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

  .display-image {
    max-width: 100%;
    max-height: 70%;
    position: absolute;
    bottom: rem(64);
    left: rem(64);
  }
}

.documented-research {
  display: grid;
  grid-template: 1fr 1fr / 5fr 7fr;
  grid-template-areas:
    "insight image"
    "theory image";

  gap: var(--common-gap);

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

  .display-image {
    max-width: 100%;
    max-height: 70%;
    position: absolute;
    bottom: rem(64);
    left: rem(64);
  }
}

.branding {
  height: rem(536);
  display: grid;
  grid-template: 1fr / 7fr 5fr;
  gap: var(--common-gap);

  :deep(.tooltip) {
    --tooltip-width: #{rem(350)};
    bottom: rem(64);
    right: rem(64);
    position: absolute;
  }

  .card.borderless {
    display: flex;
    justify-content: center;
    align-items: end;

    img {
      width: 100%;
    }
  }
}

.educational-content {
  height: rem(536);
  display: grid;
  grid-template: 1fr / 5fr 7fr;
  gap: var(--common-gap);

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
  height: rem(536);
  display: grid;
  grid-template: 1fr / 7fr 5fr;
  gap: var(--common-gap);

  :deep(.tooltip) {
    --tooltip-width: #{rem(350)};
    bottom: rem(64);
    right: rem(64);
    position: absolute;
  }

  .card.borderless {
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 0;

    .display-image {
      max-width: 100%;
      max-height: 90%;
    }
  }
}

.measuring-success {
  display: grid;
  grid-template: 1fr 1fr / 5fr 7fr;
  grid-template-areas:
    "insight image"
    "theory image";

  gap: var(--common-gap);

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
