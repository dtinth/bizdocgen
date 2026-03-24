<template>
  <section v-if="viewModel.remarks" class="remarks-section">
    <div class="remarks-section__content" v-html="renderMarkdown(viewModel.remarks)" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GristRecord } from '../types/document-schema'
import { getViewModel } from '../utils/view-model'
import { renderMarkdown } from '../utils/markdown'

interface Props {
  record: GristRecord
}

const props = defineProps<Props>()

const viewModel = computed(() => {
  return getViewModel(props.record)
})
</script>

<style>
.remarks-section {
  margin-bottom: var(--spacing-lg);
}

.remarks-section__content {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--text-primary);
}

/* Remove vertical margins from first and last elements */
.remarks-section__content > *:first-child {
  margin-top: 0 !important;
}

.remarks-section__content > *:last-child {
  margin-bottom: 0 !important;
}
</style>
