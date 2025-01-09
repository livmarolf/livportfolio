<script setup lang="ts">
import TableOfContents, { type SectionLink } from '~/components/TableOfContents.vue';

const items: SectionLink[] = [
  { id: "#introduction", label: "introduction", icon: "info-circle" },
  { id: "#initial-task", label: "initial task", icon: "initial-task" },
  { id: "#responsibilities", label: "responsibilities", icon: "id-card" },
  { id: "#defining-the-problem", label: "defining the problem", icon: "danger" },
  { id: "#analyzing-constraints", label: "analyzing constraints", icon: "constraints" },
  { id: "#defining-success", label: "defining success", icon: "trending-up" },
  { id: "#highlighting-nesting", label: "highlighting nesting", icon: "target" },
  { id: "#research", label: "research", icon: "search" },
  { id: "#sketching", label: "sketching", icon: "ruler-and-pen" },
  { id: "#crazy-8s", label: "crazy 8s", icon: "lightning-circle" },
  { id: "#wireframes", label: "wireframes", icon: "format-square" },
  { id: "#revision-one", label: "revision 1", icon: "revision" },
  { id: "#revision-two", label: "revision 2", icon: "revision" },
  { id: "#revision-three", label: "revision 3", icon: "revision" },
  { id: "#final-design", label: "final design", icon: "pen-tool" },
]
</script>

<template>
  <div class="page-container">
    <main>
      <!-- INTRO -->
      <section class="intro">
        <div id="introduction" class="card">
          <span class="card--label">case study</span>
          <h1 class="card--title"><span class="accent">list revision</span> to data table</h1>

          <p class="card--text">
            This case study shows how I transformed a basic list into a data table. The final design is clean,
            user-friendly, and efficiently handles large datasets.
          </p>
        </div>

        <NuxtImg class="card" src="/images/case-studies/list-revision/list-revision.png" />
      </section>
      <!-- INITIAL TASK -->
      <section class="section-two">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-view-original.png" />
        </div>
        <div id="initial-task" class="card">
          <span class="card--label">INITIAL TASK</span>
          <h3 class="card--topic">re-design the list </h3>
          <p class="card--title">
            Initially, the list view no longer aligned with the project's direction
          </p>
          <p class="card--text">
            The list view needed additional features to better support the project's goals and improve the overall user
            experience.
          </p>
        </div>
        <div id="responsibilities" class="card">
          <span class="card--label">RESPONSIBILITIES</span>
          <h3 class="card--topic">my roles</h3>
          <ul>
            <li>UX Researcher</li>
            <li>UX Designer</li>
            <li>Interaction Designer</li>
          </ul>
        </div>
      </section>
      <!-- DEFINING THE PROBLEM -->
      <section class="section-three">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-problem-indicators.png" />
        </div>
        <div id="defining-the-problem" class="card">
          <span class="card--label">DEFINING THE PROBLEM</span>
          <h3 class="card--topic">why a redesign?</h3>
          <p class="card--title">
            It was essential to closely analyze the pain points of the initial design
          </p>
          <p class="card--text">
            Through discussions with my team, we established a clear list of issues to address in the list redesign.
          </p>
          <ul class="rounded">
            <li>
              <Icon name="warning" />Unable to nest rows
            </li>
            <li>
              <Icon name="warning" />Lacks customization
            </li>
            <li>
              <Icon name="warning" />Unable to sort
            </li>
            <li>
              <Icon name="warning" />No custom columns
            </li>
            <li>
              <Icon name="warning" />Unable to reorder
            </li>
          </ul>
        </div>
      </section>
      <!-- ANALYZING CONSTRAINTS -->
      <section class="section-four">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-constraints.png" />
        </div>
        <div id="analyzing-constraints" class="card">
          <span class="card--label">ANALYZING CONSTRAINTS</span>
          <h3 class="card--topic">designing within constraints</h3>
          <p class="card--title">
            At the start of this task, there were certain constraints to consider
          </p>
          <p class="card--text">
            At this stage of the process, it was important to identify constraints to ensure the solutions would deliver
            the best possible results for the product.
          </p>

          <ul class="square">
            <li>
              <Icon name="one-circled" />Must be visible on mobile devices
            </li>
            <li>
              <Icon name="two-circled" />Must be completed within 4 weeks
            </li>
            <li>
              <Icon name="three-circled" />Must accommodate users with low technical skills
            </li>
            <li>
              <Icon name="four-circled" />Users prefer minimal visual clutter
            </li>
            <li>
              <Icon name="five-circled" />Must be able to resize
            </li>
          </ul>
        </div>
      </section>
      <!-- DEFINING SUCCESS -->
      <section class="section-five">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-defining-success.png" />
        </div>
        <div id="defining-success" class="card">
          <span class="card--label">DEFINING SUCCESS</span>
          <h3 class="card--topic">success metrics</h3>
          <p class="card--title">
            Before progressing further with this task, it was important to define what success would look like
          </p>
          <p class="card--text">
            During team meetings, we established specific success metrics to measure the effectiveness of this redesign.
          </p>
          <ul class="stacked">
            <li>
              <h3>Increased task efficiency</h3>
              <p>Time to complete tasks with the table improves by 25%</p>
            </li>
            <li>
              <h3>User satisfaction</h3>
              <p>Achieve a usability score of 4.5/5 or higher in post-test surveys</p>
            </li>
            <li>
              <h3>Adoption rate</h3>
              <p>75% of existing users adopt the new data table features within the first month of launch</p>
            </li>
          </ul>
        </div>
      </section>
      <!-- HIGHLIGHTING NESTING -->
      <section class="section-six">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/nesting-research.png" />
        </div>
        <div id="highlighting-nesting" class="card">
          <span class="card--label">HIGHLIGHTING NESTING</span>
          <h3 class="card--topic">let's talk about nesting</h3>
          <p class="card--title">
            Nesting was challenging due to the need for clear data display, and the potential depth of some rows
          </p>
          <p class="card--text">
            Given the complexity of this case study, I found it most impactful to focus on just one of the key problems
            I solved.
          </p>
        </div>
        <div id="research" class="card">
          <span class="card--label">RESEARCH</span>
          <h3 class="card--topic">nesting examples</h3>
          <p class="card--title">
            I drew inspiration for nesting from various UI patterns across different elements
          </p>
          <p class="card--text">
            During my research, much of my inspiration came from the nesting used in file structures and task management
            systems.
          </p>
        </div>
      </section>
      <!-- SKETCHING -->
      <section class="section-seven">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-sketches.png" />
        </div>
        <div id="sketching" class="card">
          <span class="card--label">SKETCHING</span>
          <h class="card--topic">getting ideas on the page</h>
          <p class="card--title">
            After gathering my research, I translated those ideas into sketches
          </p>
          <p class="card--text">
            With the potential solutions from research in mind, it was time to sketch out rough ideas tailored to this
            task and see what worked.
          </p>
        </div>
        <div id="crazy-8s" class="card">
          <span class="card--label">CRAZY 8S</span>
          <h3 class="card--topic">sketching workshop</h3>
          <p class="card--title">
            Crazy 8s is a workshop technique where I sketch 8 different solutions in 8 minutes to quickly explore a
            variety of ideas
          </p>
          <p class="card--text">
            This exercise is great for overcoming mental design blocks and quickly generating a variety of helpful ideas
            in a short amount of time.
          </p>
        </div>
      </section>
      <!-- WIREFRAMES -->
      <section class="section-eight">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-view-wireframe.png" />
        </div>
        <div id="wireframes" class="card">
          <span class="card--label">WIREFRAMES</span>
          <h3 class="card--topic">initial wireframe</h3>
          <p class="card--title">
            The first wireframe featured basic, nested rows
          </p>
          <p class="card--text">
            While this initial design was a simple and clean solution for nested rows, some adjustments were necessary.
            As the task evolved, it became clear that incorporating more elements of a traditional table structure would
            better align us with a comprehensive solution.
          </p>
          <ul class="square">
            <li>
              <Icon name="speech-question" />I wonder how this design could look more lightweight?
            </li>
            <li>
              <Icon name="speech-question" />I wonder how it might look without the nesting containers?
            </li>
            <li>
              <Icon name="speech-question" />I wonder how to clearly illustrate columns in conjunction with the nesting
            </li>
            <li>
              <Icon name="speech-question" />I wonder how division lines between nested rows could look?
            </li>
          </ul>
        </div>
      </section>
      <!-- REVISION 1 -->
      <section class="section-nine">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-revision-1.png" />
        </div>
        <div id="revision-one" class="card">
          <span class="card--label">REVISION 1</span>
          <h3 class="card--topic">a more “table”-like feel</h3>
          <p class="card--title">
            This frame combined clear nesting with a clean, readable design and added more typical table elements
          </p>
          <p class="card--text">
            I collaborated with my team to develop thought-provoking questions that would help refine and guide the
            design.
          </p>
          <ul class="square">
            <li>
              <Icon name="speech-question" />What is the purpose of the thumbnail? Is it necessary?
            </li>
            <li>
              <Icon name="speech-question" />I wonder how the nesting could be adjusted to better accommodate multiple
              levels?
            </li>
            <li>
              <Icon name="speech-question" />I wonder how to clearly show nesting even on darker screens?
            </li>
          </ul>
        </div>
      </section>
      <!-- REVISION 2 -->
      <section class="section-ten">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-revision-2.png" />
        </div>
        <div id="revision-two" class="card">
          <span class="card--label">REVISION 2</span>
          <h3 class="card--topic">deeper nesting</h3>
          <p class="card--title">
            This example demonstrates clearer nesting and a better use of available space
          </p>
          <p class="card--text">
            With the thumbnail removed and nesting clarity improved, this design offers a viable solution. The only
            potential issue is the use of space.
          </p>
          <ul class="square">
            <li>
              <Icon name="speech-question" />How might this look with 3+ nested rows?
            </li>
            <li>
              <Icon name="speech-question" />On smaller screens how will the nesting illustration shrink down?
            </li>
            <li>
              <Icon name="speech-question" />What may take the place of the white circles next to the titles?
            </li>

          </ul>
        </div>
      </section>
      <!-- REVISION 3 -->
      <section class="section-eleven">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-revision-3.png" />
        </div>
        <div id="revision-three" class="card">
          <span class="card--label">REVISION 3</span>
          <h3 class="card--topic">compact and efficient</h3>
          <p class="card--title">
            This iteration improved nesting capabilities while maintaining a compact and clear design
          </p>
          <p class="card--text">
            This minimalist approach to nesting ensures that resizing the screen won’t disrupt the design.
          </p>
          <ul class="rounded">
            <li>
              <Icon name="circle-check" />Clear hierarchy
            </li>
            <li>
              <Icon name="circle-check" />Compact design
            </li>
            <li>
              <Icon name="circle-check" />Resizable
            </li>
            <li>
              <Icon name="circle-check" />Selectable rows
            </li>
          </ul>
        </div>
      </section>
      <!-- FINAL DESIGN -->
      <section class="section-twelve">
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/final-design.png" />
        </div>
        <div id="final-design" class="card">
          <span class="card--label">FINAL DESIGN</span>
          <h3 class="card--topic">nesting solution</h3>
          <p class="card--title">
            The final solution resulted in a clean and elegant design
          </p>
          <p class="card--text">
            The new list features compact nesting, custom columns, selectable rows, and a clean layout that effectively
            displays complex data.
          </p>
          <ul class="stacked">
            <li>
              <h3>Increased task efficiency</h3>
              <p>Time to complete tasks with the table improved by 30%</p>
            </li>
            <li>
              <h3>User satisfaction</h3>
              <p>Achieve a usability score of 4.8/5 was achieved in post-test surveys</p>
            </li>
            <li>
              <h3>Adoption rate</h3>
              <p>95% of existing users adopt the new data table features within the first month of launch</p>
            </li>

          </ul>
        </div>
      </section>

    </main>
    <TableOfContents :items="items" />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  margin: calc(var(--common-gap) * 2 + rem(56)) var(--common-gap) 0 var(--common-gap);
  display: flex;
  gap: var(--common-gap);
}

main {
  --accent: #6E67FF;
  width: 100%;
  margin: 0;
}

section {
  height: rem(850);
  margin-bottom: var(--common-gap);

  &:last-child {
    margin-bottom: 0;
  }
}

.intro {
  display: grid;
  grid-template: 1fr / 5fr 7fr;
  gap: var(--common-gap);

  img.card {
    object-position: top left;
  }
}

.section-two,
.section-six {
  display: grid;
  grid-template: 1fr 1fr / 7fr 5fr;
  gap: var(--common-gap);
  grid-template-areas:
    "image insight"
    "image theory";

  .card.borderless {
    grid-area: image;
    display: flex;
    justify-content: center;
    align-items: center;

    // ???????? 0_0 ????????
    img {
      width: 100%;
    }

  }

  .card:nth-of-type(2) {
    grid-area: insight;
  }

  .card:nth-of-type(3) {
    grid-area: theory;
  }
}

.section-three,
.section-five,
.section-nine,
.section-eleven {
  display: grid;
  gap: var(--common-gap);
  grid-template: 1fr / 5fr 7fr;
  grid-template-areas: "card image";
  height: min-content;

  .card {
    grid-area: card;
  }

  .card.borderless {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: image;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.section-four,
.section-eight,
.section-ten,
.section-twelve {
  display: grid;
  gap: var(--common-gap);
  grid-template: 1fr / 7fr 5fr;
  grid-template-areas: "image card";
  height: min-content;

  .card {
    grid-area: card;
  }


  .card.borderless {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: image;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.section-seven {
  display: grid;
  grid-template: 1fr 1fr / 5fr 7fr;
  gap: var(--common-gap);
  grid-template-areas:
    "insight image"
    "theory image";

  .card.borderless {
    grid-area: image;
    display: flex;
    justify-content: center;
    align-items: center;

    // ???????? 0_0 ????????
    img {
      width: 100%;
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