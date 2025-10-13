

export interface Country {
  name: {
    common: string
    official: string
    nativeName?: Record<string, { official: string }>
  }
  flags: {
    png: string
  }
  cca2: string
  cca3: string
  altSpellings?: string[]
  idd: {
    root: string
    suffixes: string[]
  }
  currencies?: Record<string, { name: string; symbol?: string }>
  capital?: string[]
  region?: string
  subregion?: string
  languages?: Record<string, string>

}
