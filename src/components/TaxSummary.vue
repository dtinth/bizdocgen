<template>
  <section class="tax-summary">
    <div class="tax-summary__table">
      <div class="tax-summary__row">
        <div class="tax-summary__label">ยอดรวม</div>
        <div class="tax-summary__amount">{{ formatCurrency(subtotal) }}</div>
      </div>

      <div v-if="taxInfo.label" class="tax-summary__row">
        <div class="tax-summary__label">{{ taxInfo.label }}</div>
        <div
          class="tax-summary__amount"
          :class="{ 'tax-summary__amount--negative': taxInfo.percentage < 0 }"
        >
          {{ taxInfo.percentage < 0 ? '-' : '' }}{{ formatCurrency(Math.abs(taxInfo.amount)) }}
        </div>
      </div>

      <div class="tax-summary__row tax-summary__row--total">
        <div class="tax-summary__label">จำนวนเงินสุทธิ</div>
        <div class="tax-summary__amount">
          {{ formatCurrency(total) }}
          <div class="tax-summary__baht-text">({{ formatBahtText(total) }})</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GristRecord } from '../types/document-schema'
import { formatBahtText, formatCurrency } from '../utils/currency'
import { getViewModel } from '../utils/view-model'

interface Props {
  record: GristRecord
}

const props = defineProps<Props>()

const viewModel = computed(() => {
  return getViewModel(props.record)
})

const subtotal = computed(() => viewModel.value.subtotal)
const taxInfo = computed(() => viewModel.value.tax)
const total = computed(() => viewModel.value.total)
</script>

<style>
.tax-summary {
  margin-bottom: var(--spacing-xl);
  display: flex;
  justify-content: flex-end;
}

.tax-summary__table {
  width: 50%;
}

.tax-summary__row {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-bottom: 1px solid var(--border-light);
}

.tax-summary__row--total {
  border-bottom: 2px solid var(--border-dark);
  font-weight: var(--font-weight-bold);
}

.tax-summary__label {
  color: var(--text-primary);
}

.tax-summary__amount {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  text-align: right;
}

.tax-summary__amount--negative {
  color: var(--text-error);
}

.tax-summary__baht-text {
  color: var(--text-primary);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-base);
  font-weight: normal;
}
</style>
