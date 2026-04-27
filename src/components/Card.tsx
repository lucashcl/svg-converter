import type { ReactNode } from 'react'

interface CardProps {
   title: string
   description?: string
   children: ReactNode
}

export function Card({ children, description, title }: CardProps) {
   return (
      <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-md shadow-slate-200/60 backdrop-blur">
         <header className="mb-4 space-y-1">
            <h2 className="text-left text-lg font-semibold text-slate-900">{title}</h2>
            {description ? <p className="text-left text-sm text-slate-600">{description}</p> : null}
         </header>
         {children}
      </section>
   )
}