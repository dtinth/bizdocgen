import { describe, expect, it } from 'vite-plus/test'

import { GristRecordSchema } from '../types/document-schema'

function createRecord(documentType: unknown) {
  return {
    id: 1,
    Record: {
      Client: {
        Address: '123 Test Street',
        Name: 'Test Client Co., Ltd.',
        Tax_ID: '1234567890123',
        id: 2,
      },
      Credit_Term: null,
      Date: '2025-08-09T00:00:00.000Z',
      Document_Type: documentType,
      Items: [
        {
          Description: 'Test Item',
          Document: { tableId: 'Documents', rowId: 1 },
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
        id: 4,
      },
      Reference: null,
      Remarks: null,
      Signed_Document_URL: '',
      Tax: 0.07,
      id: 5,
    },
  }
}

describe('GristRecordSchema', () => {
  it('accepts Document_Type as a single choice and normalizes it to a one-item array', () => {
    const parsed = GristRecordSchema.parse(createRecord('Receipt'))

    expect(parsed.Record.Document_Type).toEqual(['Receipt'])
  })

  it('accepts Document_Type as a one-item choice list', () => {
    const parsed = GristRecordSchema.parse(createRecord(['Invoice']))

    expect(parsed.Record.Document_Type).toEqual(['Invoice'])
  })

  it('rejects Document_Type arrays with multiple values', () => {
    const result = GristRecordSchema.safeParse(createRecord(['Quotation', 'Invoice']))

    expect(result.success).toBe(false)
  })

  it('parses Record when it is a JSON string', () => {
    const objectRecord = createRecord('Receipt')
    const stringRecord = { id: 1, Record: JSON.stringify(objectRecord.Record) }
    const parsed = GristRecordSchema.parse(stringRecord)

    expect(parsed.Record.Document_Type).toEqual(['Receipt'])
    expect(parsed.Record.Number).toBe('TEST-001')
    expect(parsed.Record.Items).toHaveLength(1)
  })

  it('rejects Record when it is an invalid JSON string', () => {
    const result = GristRecordSchema.safeParse({ id: 1, Record: 'not valid json' })

    expect(result.success).toBe(false)
  })

  it('accepts Actions_Data as an optional field', () => {
    const input = createRecord('Quotation')
    const parsed = GristRecordSchema.parse({
      ...input,
      Record: {
        ...input.Record,
        Actions_Data: {
          actions: [
            {
              title: 'สร้างใบแจ้งหนี้',
              table: 'Documents',
              record: { Document_Type: ['Invoice'], Number: 'INV-001' },
              items: {
                table: 'Items',
                records: [{ Description: 'Test', Quantity: 1, Unit_Price: 100, Total: 100 }],
              },
            },
          ],
        },
      },
    } as unknown)

    expect(parsed.Record.Actions_Data).toBeDefined()
    expect(parsed.Record.Actions_Data!.actions).toHaveLength(1)
    expect(parsed.Record.Actions_Data!.actions[0].title).toBe('สร้างใบแจ้งหนี้')
  })

  it('allows Actions_Data with zero actions', () => {
    const input = createRecord('Quotation')
    const parsed = GristRecordSchema.parse({
      ...input,
      Record: { ...input.Record, Actions_Data: { actions: [] } },
    } as unknown)

    expect(parsed.Record.Actions_Data).toBeDefined()
    expect(parsed.Record.Actions_Data!.actions).toHaveLength(0)
  })

  it('handles record missing Actions_Data gracefully', () => {
    const parsed = GristRecordSchema.parse(createRecord('Quotation'))

    expect(parsed.Record.Actions_Data).toBeUndefined()
  })
})
