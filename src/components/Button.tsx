import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: ReactNode
   variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
   primary:
      'bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 hover:bg-slate-700',
   secondary:
      'bg-slate-100 text-slate-900 ring-1 ring-slate-300 hover:-translate-y-0.5 hover:bg-slate-200',
   ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
   return (
      <button
         className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
         {...props}
      >
         {children}
      </button>
   )
}