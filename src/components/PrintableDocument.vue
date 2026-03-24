<template>
  <article
    class="document"
    data-testid="document"
    role="document"
    :data-document-type="documentType?.toLowerCase()"
    :data-document-id="record?.id"
    :data-document-number="documentNumber"
    :data-provider-name="providerName"
    :data-customer-name="customerName"
    :data-payment-method-name="paymentMethodName"
  >
    <DocumentHeader v-if="record" :record="record" />

    <ClientInfo v-if="record" :record="record" />

    <ItemsTable v-if="record" :record="record" />

    <TaxSummary v-if="record" :record="record" />

    <RemarksSection v-if="record" :record="record" />

    <div v-if="record?.Record.Payment_Method" class="document__payment-section">
      <PaymentInfo v-if="record" :record="record" />
      <QRCodeSection v-if="record" :record="record" />
    </div>

    <SignatureArea v-if="record" :record="record" />
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GristRecord } from '../types/document-schema'
import ClientInfo from './ClientInfo.vue'
import DocumentHeader from './DocumentHeader.vue'
import ItemsTable from './ItemsTable.vue'
import PaymentInfo from './PaymentInfo.vue'
import QRCodeSection from './QRCodeSection.vue'
import RemarksSection from './RemarksSection.vue'
import SignatureArea from './SignatureArea.vue'
import TaxSummary from './TaxSummary.vue'

interface Props {
  record: GristRecord | null
}

const props = defineProps<Props>()

const documentType = computed(() => {
  return props.record?.Record.Document_Type[0] || null
})

const providerName = computed(() => {
  return props.record?.Record.Provider.Name || null
})

const customerName = computed(() => {
  return props.record?.Record.Client.Name || null
})

const documentNumber = computed(() => {
  return props.record?.Record.Number || null
})

const paymentMethodName = computed(() => {
  return props.record?.Record.Payment_Method?.Name || null
})
</script>

<style>
.document {
  padding: var(--document-padding-top) var(--document-padding-right) var(--document-padding-bottom)
    var(--document-padding-left);
  font-family: var(--font-family);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  box-sizing: border-box;
  position: relative;
}

@media print {
  .document {
    zoom: 1 !important;
    width: 100% !important;
    min-height: auto !important;
  }
}

@media screen {
  .document {
    margin-left: auto;
    margin-right: auto;
    width: var(--document-width);
    min-height: var(--document-height);
    background: var(--bg-white);
    box-shadow: var(--document-shadow);
    zoom: var(--document-scale);
  }
}

.document__payment-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-xl);
  align-items: start;
}

@media print {
  .document {
    box-shadow: none;
    min-height: auto;
  }
}
</style>
