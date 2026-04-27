import { useMemo, useState } from 'react'
import { convertSvgToAndroidXml } from '../lib/convertSVGtoXML'
import { saveAs } from '../lib/saveAs'
import type { ConversionIssue, ConversionResult, SourceItem } from '../types/converter'
import { Button } from './Button'
import { FilePicker } from './FilePicker'
import { ResultsList } from './ResultsList'
import { SourceList } from './SourceList'
import { UrlCollector } from './UrlCollector'

function createId(): string {
   if ('randomUUID' in crypto) {
      return crypto.randomUUID()
   }

   return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function sanitizeFileName(name: string): string {
   return name
      .replace(/\.svg$/i, '')
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/_+/g, '_')
}

function inferNameFromUrl(urlValue: string): string {
   try {
      const url = new URL(urlValue)
      const pathName = decodeURIComponent(url.pathname)
      const fallbackName = `svg-${Date.now()}`
      const candidate = pathName.split('/').filter(Boolean).at(-1) ?? fallbackName

      return candidate.toLowerCase().endsWith('.svg') ? candidate : `${candidate}.svg`
   } catch {
      return `svg-${Date.now()}.svg`
   }
}

async function loadSvgFromUrl(url: string): Promise<string> {
   const response = await fetch(url)

   if (!response.ok) {
      throw new Error(`Falha ao baixar SVG (${response.status})`)
   }

   const content = await response.text()

   if (!content.includes('<svg')) {
      throw new Error('A URL não retornou um conteúdo SVG válido')
   }

   return content
}

export function ConverterWorkspace() {
   const [sources, setSources] = useState<SourceItem[]>([])
   const [results, setResults] = useState<ConversionResult[]>([])
   const [issues, setIssues] = useState<ConversionIssue[]>([])
   const [isConverting, setIsConverting] = useState(false)
   const [urlResetSignal, setUrlResetSignal] = useState(0)

   const canConvert = sources.length > 0 && !isConverting

   const statusSummary = useMemo(() => {
      if (results.length === 0 && issues.length === 0) {
         return 'Nenhuma conversão executada ainda.'
      }

      return `${results.length} convertido(s) com sucesso, ${issues.length} com erro.`
   }, [issues.length, results.length])

   const handleAddFiles = (files: File[]) => {
      const mapped = files.map((file) => ({
         id: createId(),
         kind: 'file' as const,
         name: file.name,
         file,
      }))

      setSources((previous) => [...previous, ...mapped])
   }

   const handleAddUrls = (urls: string[]) => {
      const mapped = urls.map((urlValue) => ({
         id: createId(),
         kind: 'url' as const,
         name: inferNameFromUrl(urlValue),
         url: urlValue,
      }))

      setSources((previous) => [...previous, ...mapped])
   }

   const handleRemoveSource = (sourceId: string) => {
      setSources((previous) => previous.filter((source) => source.id !== sourceId))
   }

   const handleClearSources = () => {
      setSources([])
   }

   const handleConvertAll = async () => {
      setIsConverting(true)
      setResults([])
      setIssues([])

      const convertedResults: ConversionResult[] = []
      const convertedIssues: ConversionIssue[] = []

      await Promise.all(
         sources.map(async (source) => {
            try {
               const svgContent =
                  source.kind === 'file'
                     ? await source.file?.text()
                     : await loadSvgFromUrl(source.url ?? '')

               if (!svgContent) {
                  throw new Error('Não foi possível ler o conteúdo SVG')
               }

               const xml = convertSvgToAndroidXml(svgContent)
               const fileName = `${sanitizeFileName(source.name)}.xml`

               convertedResults.push({
                  id: source.id,
                  fileName,
                  xml,
                  sourceLabel: source.kind === 'file' ? source.name : source.url ?? source.name,
               })
            } catch (error) {
               convertedIssues.push({
                  id: source.id,
                  sourceLabel: source.kind === 'file' ? source.name : source.url ?? source.name,
                  message: error instanceof Error ? error.message : 'Erro inesperado',
               })
            }
         }),
      )

      setResults(convertedResults)
      setIssues(convertedIssues)
      setSources([])
      setUrlResetSignal((previous) => previous + 1)
      setIsConverting(false)
   }

   const handleDownloadOne = (result: ConversionResult) => {
      const blob = new Blob([result.xml], { type: 'application/xml;charset=utf-8' })
      saveAs(blob, result.fileName)
   }

   const handleDownloadAll = () => {
      results.forEach((result) => {
         const blob = new Blob([result.xml], { type: 'application/xml;charset=utf-8' })
         saveAs(blob, result.fileName)
      })
   }

   return (
      <div className="grid gap-5 lg:grid-cols-2">
         <div className="space-y-5">
            <FilePicker onSelectFiles={handleAddFiles} />
            <UrlCollector onAddUrls={handleAddUrls} resetSignal={urlResetSignal} />
            <SourceList sources={sources} onRemoveSource={handleRemoveSource} onClearSources={handleClearSources} />

            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-md shadow-slate-200/60">
               <div className="flex flex-wrap items-center gap-3">
                  <Button type="button" onClick={handleConvertAll} disabled={!canConvert}>
                     {isConverting ? 'Convertendo...' : 'Converter tudo para XML'}
                  </Button>
                  <p className="text-sm text-slate-600">{statusSummary}</p>
               </div>

               {issues.length > 0 ? (
                  <ul className="mt-3 space-y-2 rounded-xl border border-rose-200 bg-rose-50 p-3">
                     {issues.map((issue) => (
                        <li key={issue.id} className="text-left text-sm text-rose-700">
                           <strong>{issue.sourceLabel}:</strong> {issue.message}
                        </li>
                     ))}
                  </ul>
               ) : null}
            </div>
         </div>

         <ResultsList results={results} onDownloadOne={handleDownloadOne} onDownloadAll={handleDownloadAll} />
      </div>
   )
}