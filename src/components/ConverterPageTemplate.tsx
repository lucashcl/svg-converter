import type { ReactNode } from 'react'

interface ConverterPageTemplateProps {
   children: ReactNode
}

export function ConverterPageTemplate({ children }: ConverterPageTemplateProps) {
   return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_5%_20%,#e0f2fe_0%,transparent_25%),radial-gradient(circle_at_95%_10%,#fef9c3_0%,transparent_20%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-8 md:px-8">
         <div className="mx-auto max-w-6xl space-y-6">
            <header className="space-y-2 text-left">
               <p className="inline-flex rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-800">
                  SVG para Android XML
               </p>
               <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Converta SVG local ou remoto em lote
               </h1>
               <p className="max-w-2xl text-sm text-slate-600 md:text-base">
                  Adicione arquivos pelo file picker, cole URLs de SVG e gere múltiplos XMLs para Android em uma única execução.
               </p>
            </header>

            {children}
         </div>
      </main>
   )
}
