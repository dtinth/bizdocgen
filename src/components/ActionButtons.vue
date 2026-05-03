<template>
  <div class="action-buttons action-buttons--print-hidden" data-testid="action-buttons">
    <div v-if="isGristMocked" class="action-buttons__scenario">
      <select
        id="scenario-select"
        v-model="selectedScenarioSlug"
        class="action-buttons__select"
        data-testid="scenario-selector"
        aria-label="เลือกตัวอย่างเอกสาร"
        @change="onScenarioChange"
      >
        <option value="">— เลือกตัวอย่าง —</option>
        <option v-for="s in scenarios" :key="s.slug" :value="s.slug">{{ s.title }}</option>
      </select>
    </div>

    <button
      type="button"
      class="action-buttons__button action-buttons__button--primary"
      data-testid="print-button"
      aria-label="พิมพ์เอกสาร"
      @click="handlePrint"
      :disabled="disablePrint"
    >
      🖨️ พิมพ์เอกสาร
    </button>

    <div class="action-buttons__menu-wrapper" ref="menuWrapperRef">
      <button
        type="button"
        class="action-buttons__button action-buttons__button--secondary"
        data-testid="more-button"
        aria-label="ตัวเลือกเพิ่มเติม"
        aria-haspopup="true"
        :aria-expanded="menuOpen"
        @click="toggleMenu"
        :disabled="isExecuting"
      >
        ▼ เพิ่มเติม
      </button>
      <div
        v-if="menuOpen"
        class="action-buttons__dropdown"
        data-testid="more-dropdown"
        role="menu"
      >
        <button
          v-for="(action, i) in actions"
          :key="i"
          type="button"
          class="action-buttons__dropdown-item"
          data-testid="action-button"
          :aria-label="action.title"
          role="menuitem"
          @click="handleAction(action)"
        >
          {{ action.title }}
        </button>
        <div v-if="actions.length" class="action-buttons__dropdown-divider" role="separator"></div>
        <button
          type="button"
          class="action-buttons__dropdown-item"
          data-testid="copy-json-button"
          aria-label="คัดลอกข้อมูล JSON"
          role="menuitem"
          @click="handleCopyJson"
        >
          📋 คัดลอก JSON
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Action } from '../types/document-schema'
import { scenarios } from '../utils/scenarios'
import { isGristMocked } from '../utils/grist'

interface Props {
  rawGristData: unknown
  disablePrint?: boolean
  actions: Action[]
  isExecuting: boolean
  onExecuteAction?: (action: Action) => void
  onCopyJson?: () => void
}

const props = defineProps<Props>()

const selectedScenarioSlug = ref('')
const menuOpen = ref(false)
const menuWrapperRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handlePrint() {
  if (props.disablePrint) return
  window.print()
}

function handleCopyJson() {
  props.onCopyJson?.()
  closeMenu()
}

function handleAction(action: Action) {
  props.onExecuteAction?.(action)
  closeMenu()
}

function onScenarioChange() {
  const s = scenarios.find((x) => x.slug === selectedScenarioSlug.value)
  if (s) {
    document.dispatchEvent(
      new CustomEvent('mockgristrecord', {
        detail: s.data,
      }),
    )
  }
}

function onDocumentClick(e: MouseEvent) {
  if (menuWrapperRef.value && !menuWrapperRef.value.contains(e.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<style>
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  justify-content: center;
  position: relative;
}

.action-buttons__scenario {
  display: flex;
  align-items: center;
}

.action-buttons__select {
  padding: var(--button-padding);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-light);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  background: white;
}

.action-buttons__button {
  padding: var(--button-padding);
  border: none;
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-family);
}

.action-buttons__button--primary {
  background-color: var(--primary-blue);
  color: white;
}

.action-buttons__button--primary:hover {
  background-color: var(--primary-blue-dark);
}

.action-buttons__button--secondary {
  background-color: var(--secondary-gray);
  color: white;
}

.action-buttons__button--secondary:hover:not([disabled]) {
  background-color: var(--secondary-gray-dark);
}

.action-buttons__button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-buttons__menu-wrapper {
  position: relative;
}

.action-buttons__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  min-width: 200px;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
}

.action-buttons__dropdown-item {
  display: block;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: none;
  text-align: left;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s;
}

.action-buttons__dropdown-item:hover {
  background-color: #f0f0f0;
}

.action-buttons__dropdown-divider {
  height: 1px;
  background: var(--border-light);
  margin: 4px 0;
}

@media print {
  .action-buttons--print-hidden {
    display: none !important;
  }
}
</style>
