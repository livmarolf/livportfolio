<script lang="ts" setup>

// <% BEGIN_ICON_IMPORT %>
import Affinity from '~/assets/icons/affinity.svg?component'
import ArrowAngled from '~/assets/icons/arrow-angled.svg?component'
import ArrowRight from '~/assets/icons/arrow-right.svg?component'
import ArrowUp from '~/assets/icons/arrow-up.svg?component'
import Clickup from '~/assets/icons/clickup.svg?component'
import Css3 from '~/assets/icons/css3.svg?component'
import Disney from '~/assets/icons/disney.svg?component'
import Download from '~/assets/icons/download.svg?component'
import Figma from '~/assets/icons/figma.svg?component'
import FramerMotion from '~/assets/icons/framer-motion.svg?component'
import Framer from '~/assets/icons/framer.svg?component'
import Github from '~/assets/icons/github.svg?component'
import Home from '~/assets/icons/home.svg?component'
import Html5 from '~/assets/icons/html5.svg?component'
import Javascript from '~/assets/icons/javascript.svg?component'
import LinkedIn from '~/assets/icons/linked-in.svg?component'
import Logo from '~/assets/icons/logo.svg?component'
import Python from '~/assets/icons/python.svg?component'
import React from '~/assets/icons/react.svg?component'
import Resume from '~/assets/icons/resume.svg?component'
import Sass from '~/assets/icons/sass.svg?component'
import Spotify from '~/assets/icons/spotify.svg?component'
import Sql from '~/assets/icons/sql.svg?component'
import VsCode from '~/assets/icons/vs-code.svg?component'
import Zero from '~/assets/icons/zero.svg?component'
// <% END_ICON_IMPORT %>

const icons = {
  // <% BEGIN_ICON_MAP %>
  'affinity': Affinity,
  'arrow-angled': ArrowAngled,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'clickup': Clickup,
  'css3': Css3,
  'disney': Disney,
  'download': Download,
  'figma': Figma,
  'framer-motion': FramerMotion,
  'framer': Framer,
  'github': Github,
  'home': Home,
  'html5': Html5,
  'javascript': Javascript,
  'linked-in': LinkedIn,
  'logo': Logo,
  'python': Python,
  'react': React,
  'resume': Resume,
  'sass': Sass,
  'spotify': Spotify,
  'sql': Sql,
  'vs-code': VsCode,
  'zero': Zero
  // <% END_ICON_MAP %>
} as const

export type IconName = keyof typeof icons

const props = defineProps<{ name: IconName }>()
</script>

<template>
  <component class="icon" :is="icons[props.name]" />
</template>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>