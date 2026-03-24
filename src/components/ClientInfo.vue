<template>
  <section class="client-info">
    <h3 class="client-info__title">ลูกค้า</h3>
    <div class="client-info__content">
      <div class="client-info__name">{{ record.Record.Client.Name }}</div>
      <div class="client-info__details">
        <div class="client-info__address">{{ trimAddress(record.Record.Client.Address) }}</div>
        <div class="client-info__tax-id">
          เลขประจำตัวผู้เสียภาษี: {{ record.Record.Client.Tax_ID }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GristRecord } from '../types/document-schema'

interface Props {
  record: GristRecord
}

defineProps<Props>()

function trimAddress(address: string): string {
  return address.trim()
}
</script>

<style>
.client-info {
  margin-bottom: var(--spacing-lg);
}

.client-info__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.client-info__details {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  color: var(--text-secondary);
}

.client-info__name {
  font-weight: var(--font-weight-semibold);
}

.client-info__address {
  white-space: pre-line;
}
</style>
