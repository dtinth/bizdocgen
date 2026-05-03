<template>
  <header class="document-header">
    <div class="document-header__provider">
      <h1 class="document-header__provider-name">{{ record.Record.Provider.Name }}</h1>
      <div class="document-header__provider-details">
        <div
          v-if="
            record.Record.Provider.Personnel_Name &&
            record.Record.Provider.Personnel_Name !== record.Record.Provider.Name
          "
          class="document-header__personnel"
        >
          {{ record.Record.Provider.Personnel_Name }}
        </div>
        <div class="document-header__address">
          {{ trimAddress(record.Record.Provider.Address) }}
        </div>
        <div v-if="record.Record.Provider.Email" class="document-header__email">
          อีเมล: {{ record.Record.Provider.Email }}
        </div>
        <div class="document-header__tax-id">
          เลขประจำตัวผู้เสียภาษี: {{ record.Record.Provider.Tax_ID }}
        </div>
      </div>
    </div>

    <div class="document-header__info">
      <h2 class="document-header__type">
        {{ getDocumentTypeInThai(record.Record.Document_Type[0], hasVat) }}
      </h2>
      <div class="document-header__details">
        <div class="document-header__number">เลขที่: {{ record.Record.Number }}</div>
        <div class="document-header__date">วันที่: {{ formatDate(record.Record.Date) }}</div>
        <div v-if="viewModel.reference.number" class="document-header__reference">
          อ้างอิง: {{ viewModel.reference.number }}
        </div>
        <div v-if="viewModel.creditTerm" class="document-header__credit-term">
          เครดิต: {{ viewModel.creditTerm }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GristRecord } from '../types/document-schema'
import { formatDate, getDocumentTypeInThai } from '../utils/document'
import { getViewModel } from '../utils/view-model'
import { isVatRate } from '../utils/tax'

interface Props {
  record: GristRecord
}

const props = defineProps<Props>()

const viewModel = computed(() => {
  return getViewModel(props.record)
})

const hasVat = computed(() => isVatRate(props.record.Record.Tax))

function trimAddress(address: string): string {
  return address.trim()
}
</script>

<style>
.document-header {
  display: flex;
  gap: var(--spacing-md);
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--spacing-lg);
}

.document-header__provider {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.document-header__provider-name {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-base);
  color: var(--text-primary);
}

.document-header__provider-details {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.document-header__personnel {
  font-weight: var(--font-weight-semibold);
}

.document-header__address {
  white-space: pre-line;
}

.document-header__info {
  text-align: right;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.document-header__type {
  margin: 0;
  font-size: var(--font-size-xl);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.document-header__details {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
