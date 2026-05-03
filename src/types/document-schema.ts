import { z } from 'zod'

export const PaymentMethodSchema = z.object({
  Account_Holder: z.string().nullish(),
  Account_Number: z.string().nullish(),
  Bank: z.string().nullish(),
  Branch: z.string().nullish(),
  Name: z.string(), // Internal use only, not displayed
  PromptPay: z.string().nullish(),
})

export const ClientSchema = z.object({
  Address: z.string(),
  Name: z.string(),
  Tax_ID: z.string(),
})

export const ProviderSchema = z.object({
  Address: z.string(),
  Email: z.string().nullish(),
  Name: z.string(), // Brand name
  Personnel_Name: z.string().nullish(), // Optional, for signature (ลงชื่อ)
  Tax_ID: z.string(),
})

export const ItemSchema = z.object({
  Description: z.string(),
  Manual_Sort: z.number().nullish(),
  Quantity: z.number(),
  Total: z.number(),
  Unit_Price: z.number(),
  id: z.number(),
})

export const DocumentTypeSchema = z.enum(['Quotation', 'Invoice', 'Receipt'])

export const DocumentTypeListSchema = z.preprocess((value) => {
  return Array.isArray(value) ? value : [value]
}, z.array(DocumentTypeSchema).length(1))

export const ReferenceSchema = z
  .object({
    Number: z.string(),
  })
  .nullish()

export const ActionItemSchema = z.object({
  table: z.string(),
  records: z.array(z.record(z.string(), z.unknown())),
})

export const ActionSchema = z.object({
  title: z.string(),
  table: z.string(),
  record: z.record(z.string(), z.unknown()),
  items: ActionItemSchema.optional(),
})

export const ActionsDataSchema = z.object({
  actions: z.array(ActionSchema),
})

export const RecordDataSchema = z.object({
  Client: ClientSchema,
  Credit_Term: z.string().nullish(),
  Date: z.string(), // ISO date string
  Document_Type: DocumentTypeListSchema,
  Items: z.array(ItemSchema),
  Number: z.string(),
  Payment_Method: PaymentMethodSchema.nullish(),
  Provider: ProviderSchema,
  Reference: ReferenceSchema,
  Remarks: z.string().nullish(),
  Tax: z.number(),
  Signed_Document_URL: z.union([z.url(), z.literal('')]).nullish(),
  Actions_Data: ActionsDataSchema.optional(),
})

export const GristRecordSchema = z.object({
  id: z.number(),
  Record: z.preprocess((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val)
      } catch {
        return val
      }
    }
    return val
  }, RecordDataSchema),
})

// TypeScript types derived from Zod schemas
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
export type Client = z.infer<typeof ClientSchema>
export type Provider = z.infer<typeof ProviderSchema> // includes Personnel_Name
export type Item = z.infer<typeof ItemSchema>
export type DocumentType = z.infer<typeof DocumentTypeSchema>
export type Reference = z.infer<typeof ReferenceSchema>
export type RecordData = z.infer<typeof RecordDataSchema>
export type GristRecord = z.infer<typeof GristRecordSchema>
export type ActionItem = z.infer<typeof ActionItemSchema>
export type Action = z.infer<typeof ActionSchema>
export type ActionsData = z.infer<typeof ActionsDataSchema>
