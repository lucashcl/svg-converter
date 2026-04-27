import { Button } from './Button'
import { Card } from './Card'
import type { SourceItem } from '../types/converter'

interface SourceListProps {
   sources: SourceItem[]
   onRemoveSource: (sourceId: string) => void
   onClearSources: () => void
}

export function SourceList({ onClearSources, onRemoveSource, sources }: SourceListProps) {
   return (
      <Card
         title="Fontes para conversão"
         description="Arquivos locais e URLs adicionados para gerar XML Android."
      >
         {sources.length === 0 ? (
            <p className="text-left text-sm text-slate-500">Nenhuma fonte adicionada ainda.</p>
         ) : (
            <div className="space-y-3">
               <ul className="space-y-2">
                  {sources.map((source) => (
                     <li
                        key={source.id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                     >
                        <div className="text-left">
                           <p className="text-sm font-medium text-slate-800">{source.name}</p>
                           <p className="text-xs text-slate-500">
                              {source.kind === 'file' ? 'Arquivo local' : 'URL remota'}
                           </p>
                        </div>
                        <Button type="button" variant="ghost" onClick={() => onRemoveSource(source.id)}>
                           Remover
                        </Button>
                     </li>
                  ))}
               </ul>
               <Button type="button" variant="secondary" onClick={onClearSources}>
                  Limpar lista
               </Button>
            </div>
         )}
      </Card>
   )
}