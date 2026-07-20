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
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
          if (el.disabled) return true
          return Boolean(el.value)
        }
        return true
      })
      setIsValid(valid)
    }

    const form = document.getElementById(formId)
    if (form) {
      checkValidity()
      form.addEventListener("input", checkValidity)
      form.addEventListener("change", checkValidity)
    }

    return () => {
      if (form) {
        form.removeEventListener("input", checkValidity)
        form.removeEventListener("change", checkValidity)
      }
    }
  }, [formId])

  return (
    <FormValidationContext.Provider value={isValid}>
      {children}
    </FormValidationContext.Provider>
  )
}
