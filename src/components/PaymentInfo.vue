<template>
  <section v-if="paymentMethod" class="payment-info">
    <h3 class="payment-info__title">ข้อมูลการชำระเงิน</h3>

    <div class="payment-info__details">
      <div v-if="paymentMethod.Bank" class="payment-info__row">
        <span class="payment-info__label">ธนาคาร:</span>
        <span class="payment-info__value">{{ paymentMethod.Bank }}</span>
      </div>

      <div v-if="paymentMethod.Branch" class="payment-info__row">
        <span class="payment-info__label">สาขา:</span>
        <span class="payment-info__value">{{ paymentMethod.Branch }}</span>
      </div>

      <div v-if="paymentMethod.Account_Number" class="payment-info__row">
        <span class="payment-info__label">เลขที่บัญชี:</span>
        <span class="payment-info__value">{{ paymentMethod.Account_Number }}</span>
      </div>

      <div v-if="paymentMethod.Account_Holder" class="payment-info__row">
        <span class="payment-info__label">ชื่อบัญชี:</span>
        <span class="payment-info__value">{{ paymentMethod.Account_Holder }}</span>
      </div>

      <div v-if="paymentMethod.PromptPay" class="payment-info__row">
        <span class="payment-info__label">PromptPay:</span>
        <span class="payment-info__value">{{ paymentMethod.PromptPay }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GristRecord } from '../types/document-schema'

interface Props {
  record: GristRecord
}

const props = defineProps<Props>()

const paymentMethod = props.record.Record.Payment_Method
</script>

<style>
.payment-info__details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.payment-info__row {
  display: flex;
}

.payment-info__label {
  width: 2.5cm;
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

.payment-info__value {
  color: var(--text-primary);
  flex: 1;
}
</style>
