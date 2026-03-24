export interface DisplayItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  sortOrder: number
}

export interface TaxInfo {
  label: string | null
  amount: number
  percentage: number
}

export interface BankInfo {
  accountHolder: string | null
  accountNumber: string | null
  bank: string | null
  branch: string | null
}

export interface PaymentInfo {
  promptPayId: string | null
  bankDetails: BankInfo | null
}

export interface ReferenceInfo {
  number: string | null
}

export interface DocumentViewModel {
  items: DisplayItem[]
  subtotal: number
  tax: TaxInfo
  total: number
  paymentInfo: PaymentInfo
  reference: ReferenceInfo
  creditTerm: string | null
  remarks: string | null
}
