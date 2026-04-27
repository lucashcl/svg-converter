import { useEffect, useState } from 'react'
import { Button } from './Button'
import { Card } from './Card'
import { Textarea } from './Textarea'

interface UrlCollectorProps {
   onAddUrls: (urls: string[]) => void
   resetSignal?: number
}

export function UrlCollector({ onAddUrls, resetSignal = 0 }: UrlCollectorProps) {
   const [urlText, setUrlText] = useState('')

   useEffect(() => {
      setUrlText('')
   }, [resetSignal])

   const handleAddUrls = () => {
      const parsedUrls = urlText
         .split(/\r?\n|,/)
         .map((value) => value.trim())
         .filter(Boolean)

      if (parsedUrls.length === 0) {
         return
      }

      onAddUrls(parsedUrls)
      setUrlText('')
   }

   return (
      <Card
         title="Colar URLs"
         description="Cole uma ou várias URLs de SVG, uma por linha ou separadas por vírgula."
      >
         <div className="space-y-3">
            <Textarea
               label="URLs de SVG"
               placeholder="https://exemplo.com/icon.svg"
               value={urlText}
               onChange={(event) => setUrlText(event.target.value)}
            />
            <Button type="button" variant="secondary" onClick={handleAddUrls}>
               Adicionar URLs
            </Button>
         </div>
      </Card>
   )
}
