import type { Item, DocumentType } from '../types/document-schema'

export function sortItems(items: Item[]): Item[] {
  return [...items].sort((a, b) => {
    const sortA = a.Manual_Sort ?? 0
    const sortB = b.Manual_Sort ?? 0
    return sortA - sortB
  })
}

export function getDocumentTypeInThai(type: DocumentType, hasVat?: boolean): string {
  switch (type) {
    case 'Quotation':
      return 'ใบเสนอราคา'
    case 'Invoice':
      return 'ใบแจ้งหนี้'
    case 'Receipt':
      return hasVat ? 'ใบเสร็จรับเงิน / ใบกำกับภาษี' : 'ใบเสร็จรับเงิน'
    default:
      return type
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calculateSubtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.Total, 0)
}
