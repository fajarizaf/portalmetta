import * as Icons from "lucide-react"
import { LucideProps } from "lucide-react"

export const IconDisplay = ({ name, className, ...props }: { name?: string | null } & LucideProps) => {
  if (!name) return null
  
  // Lucide icons are exported as PascalCase (e.g. "FileText")
  // We treat the name as a key of Icons
  const Icon = (Icons as any)[name] as React.ComponentType<LucideProps> | undefined

  if (!Icon) return null
  
  return <Icon className={className} {...props} />
}
