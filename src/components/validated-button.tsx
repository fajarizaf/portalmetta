"use client"

import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { useFormValidation } from "./form-validation-context"

export function ValidatedButton({ onClick, ...props }: ButtonProps) {
  const isValid = useFormValidation()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If the button has a name and value, and it's part of a form,
    // we manually inject a hidden input before submit because 
    // Server Actions sometimes miss the clicked button's value.
    if (props.type === "submit" && props.name && props.value != null) {
      const form = e.currentTarget.form
      if (form) {
        // Remove any existing hidden action inputs first
        form.querySelectorAll(`input[type="hidden"][name="${props.name}"]`).forEach(el => el.remove())
        
        const hidden = document.createElement("input")
        hidden.type = "hidden"
        hidden.name = props.name
        hidden.value = Array.isArray(props.value) ? (props.value[0] ?? "") : String(props.value)
        form.appendChild(hidden)
      }
    }
    if (onClick) onClick(e)
  }

  return <Button {...props} onClick={handleClick} disabled={props.disabled || !isValid} />
}
