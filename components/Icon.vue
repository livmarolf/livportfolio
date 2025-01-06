<script lang="ts" setup>

// <% BEGIN_ICON_IMPORT %>
import Affinity from '~/assets/icons/affinity.svg?component'
import ArrowAngled from '~/assets/icons/arrow-angled.svg?component'
import ArrowDown from '~/assets/icons/arrow-down.svg?component'
import ArrowRight from '~/assets/icons/arrow-right.svg?component'
import ArrowUp from '~/assets/icons/arrow-up.svg?component'
import Clickup from '~/assets/icons/clickup.svg?component'
import Constraints from '~/assets/icons/constraints.svg?component'
import Css3 from '~/assets/icons/css3.svg?component'
import Danger from '~/assets/icons/danger.svg?component'
import Disney from '~/assets/icons/disney.svg?component'
import Download from '~/assets/icons/download.svg?component'
import Figma from '~/assets/icons/figma.svg?component'
import FormatSquare from '~/assets/icons/format-square.svg?component'
import FramerMotion from '~/assets/icons/framer-motion.svg?component'
import Framer from '~/assets/icons/framer.svg?component'
import Github from '~/assets/icons/github.svg?component'
import Home from '~/assets/icons/home.svg?component'
import Html5 from '~/assets/icons/html5.svg?component'
import IdCard from '~/assets/icons/id-card.svg?component'
import InfoCircle from '~/assets/icons/info-circle.svg?component'
import InitialTask from '~/assets/icons/initial-task.svg?component'
import Javascript from '~/assets/icons/javascript.svg?component'
import LightningCircle from '~/assets/icons/lightning-circle.svg?component'
import LinkedIn from '~/assets/icons/linked-in.svg?component'
import Logo from '~/assets/icons/logo.svg?component'
import PenTool from '~/assets/icons/pen-tool.svg?component'
import Python from '~/assets/icons/python.svg?component'
import React from '~/assets/icons/react.svg?component'
import Resume from '~/assets/icons/resume.svg?component'
import Revision from '~/assets/icons/revision.svg?component'
import RulerAndPen from '~/assets/icons/ruler-and-pen.svg?component'
import Sass from '~/assets/icons/sass.svg?component'
import Search from '~/assets/icons/search.svg?component'
import Spotify from '~/assets/icons/spotify.svg?component'
import Sql from '~/assets/icons/sql.svg?component'
import Target from '~/assets/icons/target.svg?component'
import TrendingUp from '~/assets/icons/trending-up.svg?component'
import VsCode from '~/assets/icons/vs-code.svg?component'
import Zero from '~/assets/icons/zero.svg?component'
// <% END_ICON_IMPORT %>

const icons = {
  // <% BEGIN_ICON_MAP %>
  'affinity': Affinity,
  'arrow-angled': ArrowAngled,
  'arrow-down': ArrowDown,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'clickup': Clickup,
  'constraints': Constraints,
  'css3': Css3,
  'danger': Danger,
  'disney': Disney,
  'download': Download,
  'figma': Figma,
  'format-square': FormatSquare,
  'framer-motion': FramerMotion,
  'framer': Framer,
  'github': Github,
  'home': Home,
  'html5': Html5,
  'id-card': IdCard,
  'info-circle': InfoCircle,
  'initial-task': InitialTask,
  'javascript': Javascript,
  'lightning-circle': LightningCircle,
  'linked-in': LinkedIn,
  'logo': Logo,
  'pen-tool': PenTool,
  'python': Python,
  'react': React,
  'resume': Resume,
  'revision': Revision,
  'ruler-and-pen': RulerAndPen,
  'sass': Sass,
  'search': Search,
  'spotify': Spotify,
  'sql': Sql,
  'target': Target,
  'trending-up': TrendingUp,
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