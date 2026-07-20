"use client"

import * as React from "react"
import { ValidatedButton } from "@/components/validated-button"
import { ButtonProps } from "@/components/ui/button"

interface WorkflowSubmitterProps extends ButtonProps {
  targetStatus: string
  formId: string
}

export function WorkflowSubmitter({ targetStatus, formId, onClick, ...props }: WorkflowSubmitterProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return

    e.preventDefault()
    const form = document.getElementById(formId) as HTMLFormElement
    if (!form) return
    
    let input = form.querySelector('input[name="targetStatus"]') as HTMLInputElement
    if (!input) {
      input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'targetStatus'
      form.appendChild(input)
    }
    input.value = targetStatus
    form.requestSubmit()
  }

  return (
    <ValidatedButton 
      type="button" 
      onClick={handleClick}
      {...props}
    />
  )
}
