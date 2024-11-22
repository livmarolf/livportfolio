<template>

  <Head>
    <Link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <Link rel="shortcut icon" href="/favicon.ico" />
    <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <Meta name="apple-mobile-web-app-title" content="Olivia Marolf" />
    <Link rel="manifest" href="/site.webmanifest" />
    <Meta name="description"
      content="Hi, I'm Olivia, a UX designer focused on creating user-friendly, effective designs. I work on projects like interfaces, reports, and websites, combining usability and strategy to meet user and business needs." />
  </Head>
  <PageHeader />
  <slot />
  <PageFooter />
</template>

<style lang="scss">
@import '~/assets/styles/index.scss';
</style>