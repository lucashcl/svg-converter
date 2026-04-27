import { Button } from './Button'
import { Card } from './Card'
import type { ConversionResult } from '../types/converter'

interface ResultsListProps {
   results: ConversionResult[]
   onDownloadOne: (result: ConversionResult) => void
   onDownloadAll: () => void
}

export function ResultsList({ onDownloadAll, onDownloadOne, results }: ResultsListProps) {
   return (
      <Card
         title="Resultados"
         description="Faça download individual de cada XML ou baixe todos em lote."
      >
         {results.length === 0 ? (
            <p className="text-left text-sm text-slate-500">Converta pelo menos uma fonte para liberar os downloads.</p>
         ) : (
            <div className="space-y-3">
               <div className="flex justify-end">
                  <Button type="button" onClick={onDownloadAll}>
                     Baixar todos os XMLs
                  </Button>
               </div>
               <ul className="space-y-2">
                  {results.map((result) => (
                     <li key={result.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                           <div className="text-left">
                              <p className="text-sm font-semibold text-slate-900">{result.fileName}</p>
                              <p className="text-xs text-slate-500">Origem: {result.sourceLabel}</p>
                           </div>
                           <Button type="button" variant="secondary" onClick={() => onDownloadOne(result)}>
                              Download
                           </Button>
                        </div>
                        <pre className="mt-3 max-h-40 overflow-auto rounded-lg border border-slate-200 bg-white p-3 text-left text-xs text-slate-700">
                           {result.xml}
                        </pre>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </Card>
   )
}
