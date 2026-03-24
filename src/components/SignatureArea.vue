<template>
  <footer class="signature">
    <!-- Quotation: Two signature boxes -->
    <div v-if="isQuotation" class="signature__grid">
      <div class="signature__section">
        <div class="signature__text">เสนอราคาโดย</div>
        <div class="signature__line"></div>
        <div class="signature__name">{{ displayName }}</div>
      </div>
      <div class="signature__section">
        <div class="signature__text">อนุมัติโดย</div>
        <div class="signature__line"></div>
        <div class="signature__name">
          ...................................................................
        </div>
        <div class="signature__date">วันที่ ....../....../.........</div>
      </div>
    </div>

    <!-- Invoice & Receipt: Single signature on right -->
    <div v-else class="signature__single">
      <div class="signature__section signature__section--right">
        <div class="signature__text">ลงชื่อ</div>
        <div class="signature__line"></div>
        <div class="signature__name">{{ displayName }}</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GristRecord } from '../types/document-schema'

interface Props {
  record: GristRecord
}

const props = defineProps<Props>()

const isQuotation = computed(() => {
  return props.record.Record.Document_Type.includes('Quotation')
})

const displayName = computed(() => {
  const p = props.record.Record.Provider
  return p.Personnel_Name ?? p.Name
})
</script>

<style>
.signature {
  margin-top: var(--spacing-lg);
  page-break-inside: avoid;
}

/* Quotation: Two signature boxes */
.signature__grid {
  display: flex;
  justify-content: space-between;
}

/* Invoice & Receipt: Single signature on right */
.signature__single {
  display: flex;
  justify-content: flex-end;
}

.signature__section {
  text-align: center;
  width: 5cm;
}

.signature__text {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  text-align: left;
}

.signature__line {
  height: var(--spacing-xl);
  border-bottom: 1px solid var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.signature__name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.signature__blank-line {
  height: var(--spacing-sm);
}

.signature__date {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-sm);
}
</style>
