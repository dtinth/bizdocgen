import type { GristRecord } from '../types/document-schema'
import type {
  DocumentViewModel,
  DisplayItem,
  TaxInfo,
  PaymentInfo,
  BankInfo,
  ReferenceInfo,
} from '../types/view-model'
import { calculateSubtotal, sortItems } from './document'
import { getTaxInfo } from './tax'

const viewModelCache = new WeakMap<GristRecord, DocumentViewModel>()

export function getViewModel(record: GristRecord): DocumentViewModel {
  // Check cache first
  if (viewModelCache.has(record)) {
    return viewModelCache.get(record)!
  }

  // Transform items to display format
  const sortedItems = sortItems(record.Record.Items)
  const items: DisplayItem[] = sortedItems.map((item) => ({
    id: item.id.toString(),
    description: item.Description,
    quantity: item.Quantity,
    unitPrice: item.Unit_Price,
    total: item.Total,
    sortOrder: item.Manual_Sort ?? 0,
  }))

  // Calculate financial totals
  const subtotal = calculateSubtotal(record.Record.Items)
  const gristTaxInfo = getTaxInfo(record.Record.Tax, subtotal)

  const tax: TaxInfo = {
    label: gristTaxInfo.label,
    amount: gristTaxInfo.amount,
    percentage: gristTaxInfo.percentage,
  }

  const total = subtotal + tax.amount

  // Transform payment info
  const paymentMethod = record.Record.Payment_Method
  const bankDetails: BankInfo | null = paymentMethod
    ? {
        accountHolder: paymentMethod.Account_Holder ?? null,
        accountNumber: paymentMethod.Account_Number ?? null,
        bank: paymentMethod.Bank ?? null,
        branch: paymentMethod.Branch ?? null,
      }
    : null

  const paymentInfo: PaymentInfo = {
    promptPayId: paymentMethod?.PromptPay ?? null,
    bankDetails,
  }

  // Transform reference info
  const reference: ReferenceInfo = {
    number: record.Record.Reference?.Number ?? null,
  }

  // Get credit term
  const creditTerm = record.Record.Credit_Term ?? null

  // Get remarks
  const remarks = record.Record.Remarks ?? null

  // Create view model
  const viewModel: DocumentViewModel = {
    items,
    subtotal,
    tax,
    total,
    paymentInfo,
    reference,
    creditTerm,
    remarks,
  }

  // Cache and return
  viewModelCache.set(record, viewModel)
  return viewModel
}
