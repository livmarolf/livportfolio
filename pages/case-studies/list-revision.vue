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
  <div>
    <main>
      <!-- INTRO -->
      <section>
        <div id="introduction" class="card" style="--accent: var(--spotify-yellow)">
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
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-view-original.png" />
        </div>
        <div id="initial-task" class="card" style="--accent: var(--spotify-yellow)">
          <span class="card--label">INITIAL TASK</span>
          <h2 class="card--topic">re-design the list </h2>
          <p class="card--title">
            Initially, the list view no longer aligned with the project's direction
          </p>
          <p class="card--text">
            The list view needed additional features to better support the project's goals and improve the overall user
            experience.
          </p>
        </div>
        <div id="responsibilities" class="card" style="--accent: var(--spotify-orange)">
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
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-problem-indicators.png" />
        </div>
        <div id="defining-the-problem" class="card" style="--accent: var(--spotify-pink)">
          <span class="card--label">DEFINING THE PROBLEM</span>
          <h2 class="card--topic">why a redesign?</h2>
          <p class="card--title">
            It was essential to closely analyze the pain points of the initial design
          </p>
          <p class="card--text">
            Through discussions with my team, we established a clear list of issues to address in the list redesign.
          </p>
          <ul>
            <li>Unable to nest rows</li>
            <li>Lacks customization</li>
            <li>Unable to sort</li>
            <li>No custom columns</li>
            <li>Unable to reorder</li>
          </ul>
        </div>
      </section>
      <!-- ANALYZING CONSTRAINTS -->
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-constraints.png" />
        </div>
        <div id="analyzing-constraints" class="card" style="--accent: var(--spotify-yellow)">
          <span class="card--label">ANALYZING CONSTRAINTS</span>
          <h2 class="card--topic">designing within constraints</h2>
          <p class="card--title">
            At the start of this task, there were certain constraints to consider
          </p>
          <p class="card--text">
            At this stage of the process, it was important to identify constraints to ensure the solutions would deliver
            the best possible results for the product.
          </p>

          <ul>
            <li>Must be visible on mobile devices</li>
            <li>Must be completed within 4 weeks</li>
            <li>Must accommodate users with low technical skills</li>
            <li>Users prefer minimal visual clutter</li>
            <li>Must be able to resize</li>
          </ul>
        </div>
      </section>
      <!-- DEFINING SUCCESS -->
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-defining-success.png" />
        </div>
        <div id="defining-success" class="card" style="--accent: var(--spotify-pink)">
          <span class="card--label">DEFINING SUCCESS</span>
          <h2 class="card--topic">success metrics</h2>
          <p class="card--title">
            Before progressing further with this task, it was important to define what success would look like
          </p>
          <p class="card--text">
            During team meetings, we established specific success metrics to measure the effectiveness of this redesign.
          </p>
          <ul>
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
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/nesting-research.png" />
        </div>
        <div id="highlighting-nesting" class="card" style="--accent: var(--spotify-yellow)">
          <span class="card--label">HIGHLIGHTING NESTING</span>
          <h2 class="card--topic">let's talk about nesting</h2>
          <p class="card--title">
            Nesting was challenging due to the need for clear data display, and the potential depth of some rows
          </p>
          <p class="card--text">
            Given the complexity of this case study, I found it most impactful to focus on just one of the key problems
            I solved.
          </p>
        </div>
        <div id="research" class="card" style="--accent: var(--spotify-orange)">
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
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-sketches.png" />
        </div>
        <div id="sketching" class="card" style="--accent: var(--spotify-pink)">
          <span class="card--label">SKETCHING</span>
          <h2 class="card--topic">getting ideas on the page</h2>
          <p class="card--title">
            After gathering my research, I translated those ideas into sketches
          </p>
          <p class="card--text">
            With the potential solutions from research in mind, it was time to sketch out rough ideas tailored to this
            task and see what worked.
          </p>
        </div>
        <div id="crazy-8s" class="card" style="--accent: var(--spotify-light-green)">
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
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-view-wireframe.png" />
        </div>
        <div id="wireframes" class="card" style="--accent: var(--spotify-yellow)">
          <span class="card--label">WIREFRAMES</span>
          <h2 class="card--topic">initial wireframe</h2>
          <p class="card--title">
            The first wireframe featured basic, nested rows
          </p>
          <p class="card--text">
            While this initial design was a simple and clean solution for nested rows, some adjustments were necessary.
            As the task evolved, it became clear that incorporating more elements of a traditional table structure would
            better align us with a comprehensive solution.
          </p>
          <ul>
            <li>I wonder how this design could look more lightweight?</li>
            <li>I wonder how it might look without the nesting containers?</li>
            <li>I wonder how to clearly illustrate columns in conjunction with the nesting</li>
            <li>I wonder how division lines between nested rows could look?</li>
          </ul>
        </div>
      </section>
      <!-- REVISION 1 -->
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-revision-1.png" />
        </div>
        <div id="revision-one" class="card" style="--accent: var(--spotify-pink)">
          <span class="card--label">REVISION 1</span>
          <h2 class="card--topic">a more “table”-like feel</h2>
          <p class="card--title">
            This frame combined clear nesting with a clean, readable design and added more typical table elements
          </p>
          <p class="card--text">
            I collaborated with my team to develop thought-provoking questions that would help refine and guide the
            design.
          </p>
          <ul>
            <li>What is the purpose of the thumbnail? Is it necessary?</li>
            <li>I wonder how the nesting could be adjusted to better accommodate multiple levels?</li>
            <li>I wonder how to clearly show nesting even on darker screens?</li>
          </ul>
        </div>
      </section>
      <!-- REVISION 2 -->
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-view-wireframe.png" />
        </div>
        <div id="revision-two" class="card" style="--accent: var(--spotify-yellow)">
          <span class="card--label">REVISION 2</span>
          <h2 class="card--topic">deeper nesting</h2>
          <p class="card--title">
            This example demonstrates clearer nesting and a better use of available space
          </p>
          <p class="card--text">
            With the thumbnail removed and nesting clarity improved, this design offers a viable solution. The only
            potential issue is the use of space.
          </p>
          <ul>
            <li>How might this look with 3+ nested rows?</li>
            <li>On smaller screens how will the nesting illustration shrink down?</li>
            <li>What may take the place of the white circles next to the titles?</li>

          </ul>
        </div>
      </section>
      <!-- REVISION 3 -->
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-revision-1.png" />
        </div>
        <div id="revision-three" class="card" style="--accent: var(--spotify-pink)">
          <span class="card--label">REVISION 3</span>
          <h2 class="card--topic">compact and efficient</h2>
          <p class="card--title">
            This iteration improved nesting capabilities while maintaining a compact and clear design
          </p>
          <p class="card--text">
            This minimalist approach to nesting ensures that resizing the screen won’t disrupt the design.
          </p>
          <ul>
            <li>Clear hierarchy </li>
            <li>Compact design</li>
            <li>Resizable</li>
            <li>Selectable rows</li>
          </ul>
        </div>
      </section>
      <!-- FINAL DESIGN -->
      <section>
        <div class="card borderless dark">
          <NuxtImg class="display-image" src="/images/case-studies/list-revision/list-view-wireframe.png" />
        </div>
        <div id="final-design" class="card" style="--accent: var(--spotify-yellow)">
          <span class="card--label">FINAL DESIGN</span>
          <h2 class="card--topic">nesting solution</h2>
          <p class="card--title">
            The final solution resulted in a clean and elegant design
          </p>
          <p class="card--text">
            The new list features compact nesting, custom columns, selectable rows, and a clean layout that effectively
            displays complex data.
          </p>
          <ul>
            <li>
              <h2>Increased task efficiency</h2>
              <p>Time to complete tasks with the table improved by 30%</p>
            </li>
            <li>
              <h2>User satisfaction</h2>
              <p>Achieve a usability score of 4.8/5 was achieved in post-test surveys</p>
            </li>
            <li>
              <h2>Adoption rate</h2>
              <p>95% of existing users adopt the new data table features within the first month of launch</p>
            </li>

          </ul>
        </div>
      </section>

    </main>
    <TableOfContents :items="items" />
  </div>
</template>

<style></style>