export const validateTransactionForm = (formData, setError) => {
  // Reset any existing errors
  if (setError) setError("")

  if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
    const error = "Please enter a valid amount"
    if (setError) setError(error)
    return { isValid: false, error }
  }

  if (!formData.description.trim()) {
    const error = "Please enter a description"
    if (setError) setError(error)
    return { isValid: false, error }
  }

  if (!formData.category) {
    const error = "Please select a category"
    if (setError) setError(error)
    return { isValid: false, error }
  }

  if (!formData.date) {
    const error = "Please select a date"
    if (setError) setError(error)
    return { isValid: false, error }
  }

  return { isValid: true, error: null }
}

export const formatTransactionData = (formData, activeTab) => {
  return {
    type: activeTab,
    amount: Number.parseFloat(formData.amount),
    description: formData.description.trim(),
    category: formData.category,
    date: formData.date,
    paymentMethod: formData.paymentMethod || null,
    notes: formData.notes.trim() || null,
    recurring: formData.recurring,
    frequency: formData.recurring ? formData.frequency : null,
  }
}

export const getInitialFormData = () => ({
  amount: "",
  description: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  paymentMethod: "",
  notes: "",
  recurring: false,
  frequency: "",
})
