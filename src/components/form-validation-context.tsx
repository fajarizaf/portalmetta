"use client"

import * as React from "react"

const FormValidationContext = React.createContext<boolean>(true)

export function useFormValidation() {
  return React.useContext(FormValidationContext)
}

export function FormValidationProvider({ 
  formId, 
  children 
}: { 
  formId: string
  children: React.ReactNode 
}) {
  const [isValid, setIsValid] = React.useState(true)

  React.useEffect(() => {
    const checkValidity = () => {
      const form = document.getElementById(formId) as HTMLFormElement
      if (!form) return
      const requiredInputs = Array.from(form.querySelectorAll("[required]"))
      const valid = requiredInputs.every((el) => {
        if (el instanceof HTMLInputElement) {
          if (el.disabled) return true
          // For checkboxes/radios, check `checked`; for others, check `value`
          if (el.type === "checkbox" || el.type === "radio") return el.checked
          return Boolean(el.value)
        }
        if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
          if (el.disabled) return true
          return Boolean(el.value)
        }
        return true
      })
      setIsValid(valid)
    }

    // Run initial check and also re-run on a short delay to catch
    // child rows that are added dynamically by ChildRowsAccordion
    const form = document.getElementById(formId)
    if (form) {
      checkValidity()
      // Re-check after a short delay to catch any client-side rendering
      const initialTimeout = setTimeout(checkValidity, 100)
      const additionalTimeout = setTimeout(checkValidity, 500)
      form.addEventListener("input", checkValidity)
      form.addEventListener("change", checkValidity)
      // Also observe DOM changes (for child rows added/removed)
      const observer = new MutationObserver(() => {
        // Small debounce to avoid running on every single mutation
        clearTimeout((observer as any)._timeout)
        ;(observer as any)._timeout = setTimeout(checkValidity, 50)
      })
      observer.observe(form, { childList: true, subtree: true })
      ;(form as any)._observer = observer

      return () => {
        clearTimeout(initialTimeout)
        clearTimeout(additionalTimeout)
        if (form) {
          form.removeEventListener("input", checkValidity)
          form.removeEventListener("change", checkValidity)
          if ((form as any)._observer) {
            (form as any)._observer.disconnect()
          }
        }
      }
    }

    return () => {}
  }, [formId])

  return (
    <FormValidationContext.Provider value={isValid}>
      {children}
    </FormValidationContext.Provider>
  )
}
