<template>
  <section v-if="showQR" class="qr-section">
    <h3 class="qr-section__title">ชำระเงินผ่าน PromptPay</h3>
    <div class="qr-section__container">
      <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="PromptPay QR Code" class="qr-section__code" />
      <div v-else class="qr-section__loading">กำลังสร้าง QR Code...</div>
      <div class="qr-section__info">
        <div class="qr-section__info-item">PromptPay ID: {{ promptPayId }}</div>
        <div class="qr-section__info-item">จำนวนเงิน: {{ formatCurrency(viewModel.total) }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { GristRecord } from '../types/document-schema'
import { formatCurrency } from '../utils/currency'
import { generatePromptPayQR } from '../utils/promptpay'
import { getViewModel } from '../utils/view-model'

interface Props {
  record: GristRecord
}

const props = defineProps<Props>()

const qrCodeUrl = ref<string | null>(null)

const viewModel = computed(() => {
  return getViewModel(props.record)
})

const promptPayId = computed(() => {
  return viewModel.value.paymentInfo.promptPayId
})

const showQR = computed(() => {
  return !!promptPayId.value
})

const generateQRCode = async () => {
  qrCodeUrl.value = null
  if (showQR.value && promptPayId.value) {
    try {
      qrCodeUrl.value = await generatePromptPayQR(promptPayId.value, viewModel.value.total)
    } catch (error) {
      console.error('Failed to generate QR code:', error)
    }
  }
}

onMounted(generateQRCode)

watch(
  () => [promptPayId.value, viewModel.value.total],
  () => {
    generateQRCode()
  },
)
</script>

<style>
:root {
  --qr-size: 2.5cm;
}

.qr-section {
  text-align: center;
  width: 5cm;
}

.qr-section__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.qr-section__code {
  width: var(--qr-size);
  height: var(--qr-size);
  border: 1px solid var(--border-light);
}

.qr-section__loading {
  width: var(--qr-size);
  height: var(--qr-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--border-default);
  color: var(--text-muted);
}

.qr-section__info {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
