<script setup lang="ts">
const { query } = useRoute()

const showResume = 'resume' in query
</script>
<template>
  <footer class="page-footer">
    <div>
      <svg
        width="153"
        height="153"
        viewBox="0 0 153 153"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="153" height="153" fill="#FFC600" />
        <path
          d="M87.1391 82.1633C87.1258 84.906 84.9057 87.1261 82.1631 87.1393L75.477 87.1715C67.245 87.2112 63.1525 97.0949 68.9435 102.886L72.9645 106.907C74.9172 108.86 78.0831 108.86 80.0358 106.907L106.907 80.036C108.859 78.0833 108.859 74.9174 106.907 72.9647L95.756 61.8141C92.6143 58.6724 87.2417 60.8826 87.2203 65.3256L87.1391 82.1633Z"
          fill="black" />
        <path
          d="M65.8579 70.837C65.8711 68.0944 68.0912 65.8743 70.8339 65.8611L77.52 65.8288C85.7519 65.7891 89.8445 55.9055 84.0534 50.1145L80.0325 46.0935C78.0798 44.1408 74.9139 44.1408 72.9612 46.0935L46.0903 72.9644C44.1376 74.917 44.1376 78.083 46.0903 80.0356L57.241 91.1863C60.3827 94.328 65.7553 92.1178 65.7767 87.6748L65.8579 70.837Z"
          fill="black" />
      </svg>
      <h2 class="mono">Olivia Marolf</h2>
      <ul>
        <li>
          <NuxtLink href="https://www.linkedin.com/in/oliviamarolf/" target="_blank">
            LinkedIn
            <NewTabIcon />
          </NuxtLink>
        </li>
        <li v-if="showResume">
          <NuxtLink href="/resume.pdf" target="_blank">
            Resume
            <NewTabIcon />
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="link-lists">
      <div>
        <h2 class="mono">Case Studies</h2>
        <ul>
          <li>
            <NuxtLink href="#">
              Seeing more with gestures
              <ArrowRightIcon />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink href="#">
              Challenging design paradigms
              <ArrowRightIcon />
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="mono">Articles</h2>
        <ul>
          <li>
            <NuxtLink href="#">
              Could, Should, Might, Don't
              <ArrowRightIcon />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink href="#">
              Beyond Existing Frameworks
              <ArrowRightIcon />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink href="#">
              The Case for Risk
              <ArrowRightIcon />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.page-footer {
  display: grid;
  grid-template: 1fr / 1fr auto;
  background: var(--item-background);
  gap: 48px;
  padding: 48px 60px 48px 120px;

  .link-lists {
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    gap: 48px;
  }

  ul,
  li {
    display: contents;
  }

  h2 {
    color: var(--text-label);
    font-size: 16px;
    margin-bottom: 24px;
  }

  a {
    font-size: 16px;
    color: var(--text-primary);
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--stroke);
    height: 28px;
    gap: 100px;
    margin-bottom: 8px;
    padding: 0 0 8px 0;
    text-decoration: none;

    transition: border-color 0.75s ease-out;

    &:hover {
      transition: border-color 0s;
      border-color: var(--text-primary);
    }
  }
}
</style>
