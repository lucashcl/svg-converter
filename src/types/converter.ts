export type SourceKind = 'file' | 'url'

export interface SourceItem {
   id: string
   kind: SourceKind
   name: string
   file?: File
   url?: string
}

export interface ConversionResult {
   id: string
   fileName: string
   xml: string
   sourceLabel: string
}

export interface ConversionIssue {
   id: string
   sourceLabel: string
   message: string
}
