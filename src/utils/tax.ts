export interface TaxInfo {
  label: string | null
  percentage: number
  amount: number
  displayAmount: string
}

export function isVatRate(taxPercentage: number): boolean {
  return taxPercentage > 0 && Math.abs(taxPercentage - 0.07) < 0.001
}

export function getTaxInfo(taxPercentage: number, subtotal: number): TaxInfo {
  const taxAmount = subtotal * taxPercentage

  // Check for 7% VAT (with some tolerance for floating point)
  if (isVatRate(taxPercentage)) {
    return {
      label: 'VAT 7%',
      percentage: taxPercentage,
      amount: taxAmount,
      displayAmount: `${Math.abs(taxAmount).toFixed(2)}`,
    }
  }

  // Negative tax = WHT (Withholding Tax)
  if (taxPercentage < 0) {
    const whtPercentage = Math.abs(taxPercentage * 100)
    return {
      label: `ภาษีหัก ณ ที่จ่าย ${whtPercentage}%`,
      percentage: taxPercentage,
      amount: taxAmount,
      displayAmount: `${Math.abs(taxAmount).toFixed(2)}`,
    }
  }

  // 0% or other amounts - no display
  return {
    label: null,
    percentage: taxPercentage,
    amount: taxAmount,
    displayAmount: '0.00',
  }
}
