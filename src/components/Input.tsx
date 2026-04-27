import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   label: string
}

export function Input({ className = '', id, label, ...props }: InputProps) {
   return (
      <label className="flex flex-col gap-2 text-left">
         <span className="text-sm font-medium text-slate-700">{label}</span>
         <input
            id={id}
            className={`rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${className}`}
            {...props}
         />
      </label>
   )
}
