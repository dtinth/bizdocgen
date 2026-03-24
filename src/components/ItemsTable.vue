<template>
  <section class="items-section">
    <table class="items-table">
      <thead class="items-table__head">
        <tr class="items-table__row">
          <th class="items-table__header items-table__header--number">ลำดับ</th>
          <th class="items-table__header items-table__header--description">รายการ</th>
          <th class="items-table__header items-table__header--quantity">จำนวน</th>
          <th class="items-table__header items-table__header--unit-price">ราคาต่อหน่วย</th>
          <th class="items-table__header items-table__header--total">จำนวนเงิน</th>
        </tr>
      </thead>
      <tbody class="items-table__body">
        <tr v-for="(item, index) in viewModel.items" :key="item.id" class="items-table__row">
          <td class="items-table__cell items-table__cell--number">{{ index + 1 }}</td>
          <td class="items-table__cell items-table__cell--description">
            <div
              v-if="isMarkdown(item.description)"
              class="items-table__description items-table__description--markdown"
              v-html="renderMarkdown(item.description)"
            />
            <div v-else class="items-table__description">{{ item.description }}</div>
          </td>
          <td class="items-table__cell items-table__cell--quantity">{{ item.quantity }}</td>
          <td class="items-table__cell items-table__cell--unit-price">
            {{ formatCurrency(item.unitPrice) }}
          </td>
          <td class="items-table__cell items-table__cell--total">
            {{ formatCurrency(item.total) }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GristRecord } from '../types/document-schema'
import { formatCurrency } from '../utils/currency'
import { isMarkdown, renderMarkdown } from '../utils/markdown'
import { getViewModel } from '../utils/view-model'

interface Props {
  record: GristRecord
}

const props = defineProps<Props>()

const viewModel = computed(() => {
  return getViewModel(props.record)
})
</script>

<style>
.items-section {
  margin-bottom: var(--spacing-sm);
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-base);
}

.items-table__header {
  background-color: var(--bg-gray-50);
  border: 1px solid var(--border-default);
  padding: var(--table-cell-padding);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.items-table__cell {
  border: 1px solid var(--border-default);
  padding: var(--table-cell-padding);
  color: var(--text-primary);
  vertical-align: top;
  font-size: var(--font-size-base);
}

.items-table__header--number,
.items-table__cell--number {
  width: 1cm;
  text-align: center;
}

.items-table__header--description,
.items-table__cell--description {
  width: auto;
}

.items-table__header--quantity,
.items-table__cell--quantity {
  width: 1.5cm;
  text-align: right;
}

.items-table__header--unit-price,
.items-table__cell--unit-price {
  width: 2cm;
  text-align: right;
}

.items-table__header--total,
.items-table__cell--total {
  width: 2cm;
  text-align: right;
}

/* Remove vertical margins from first and last elements */
.items-table__description--markdown > *:first-child {
  margin-top: 0 !important;
}

.items-table__description--markdown > *:last-child {
  margin-bottom: 0 !important;
}

/* Table-specific overrides for tighter spacing in cells */
.items-table__description--markdown p {
  margin: 0 0 var(--spacing-xs) 0;
}

.items-table__description--markdown ul,
.items-table__description--markdown ol {
  margin: var(--spacing-xs) 0;
  font-size: var(--font-size-sm);
  padding-left: 3mm;
}

.items-table__description--markdown li {
  line-height: var(--line-height-tight);
}
</style>
