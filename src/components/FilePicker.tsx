import { Card } from './Card'
import type { ChangeEvent } from 'react'

interface FilePickerProps {
   onSelectFiles: (files: File[]) => void
}

export function FilePicker({ onSelectFiles }: FilePickerProps) {
   const handleSelectFiles = (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files

      if (!fileList || fileList.length === 0) {
         return
      }

      onSelectFiles(Array.from(fileList))
      event.target.value = ''
   }

   return (
      <Card
         title="Selecionar SVG"
         description="Use o seletor para escolher 1 ou vários arquivos SVG de uma vez."
      >
         <div className="flex flex-col items-start gap-3">
            <input
               className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
               type="file"
               accept=".svg,image/svg+xml"
               multiple
               onChange={handleSelectFiles}
            />
            <p className="text-left text-xs text-slate-500">
               Dica: manter Ctrl ou Shift permite selecionar vários arquivos no file picker.
            </p>
         </div>
      </Card>
   )
}