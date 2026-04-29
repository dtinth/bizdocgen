import { describe, expect, it } from 'vite-plus/test'

import { mount } from '@vue/test-utils'
import SignatureArea from '../components/SignatureArea.vue'
import type { GristRecord } from '../types/document-schema'

function createRecord(documentType: 'Quotation' | 'Invoice'): GristRecord {
  return {
    id: 1,
    Record: {
      Client: {
        Address: '123 Test Street',
        Name: 'Test Client Co., Ltd.',
        Tax_ID: '1234567890123',
      },
      Credit_Term: null,
      Date: '2025-08-09T00:00:00.000Z',
      Document_Type: [documentType],
      Items: [
        {
          Description: 'Test Item',
          Manual_Sort: 1,
          Quantity: 1,
          Total: 100,
          Unit_Price: 100,
          id: 3,
        },
      ],
      Number: 'TEST-001',
      Payment_Method: null,
      Provider: {
        Address: '456 Provider Road',
        Email: 'provider@example.com',
        Name: 'Test Provider Co., Ltd.',
        Personnel_Name: 'Test Provider',
        Tax_ID: '9876543210987',
      },
      Reference: null,
      Remarks: null,
      Signed_Document_URL: '',
      Tax: 0.07,
    },
  }
}

describe('SignatureArea', () => {
  it('renders quotation signatures with distinct signature types', () => {
    const wrapper = mount(SignatureArea, {
      props: { record: createRecord('Quotation') },
    })

    const sections = wrapper.findAll('.signature__section')

    expect(sections).toHaveLength(2)
    expect(sections[0]?.attributes('data-signature-type')).toBe('issuer')
    expect(sections[1]?.attributes('data-signature-type')).toBe('approver')
  })

  it('renders invoice signatures with the issuer signature type', () => {
    const wrapper = mount(SignatureArea, {
      props: { record: createRecord('Invoice') },
    })

    const section = wrapper.get('.signature__section--right')

    expect(section.attributes('data-signature-type')).toBe('issuer')
  })
})
