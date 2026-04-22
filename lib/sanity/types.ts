export interface SanityPost {
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  category?: string
  body?: SanityBlock[]
  seoTitle?: string
  seoDescription?: string
}

export interface SanityRolePage {
  title: string
  slug: string
  shortIntro?: string
  whoItsFor?: SanityBlock[]
  commonProblems?: SanityBlock[]
  whatToTestInTrial?: SanityBlock[]
  whyKnacksters?: SanityBlock[]
  faq?: SanityBlock[]
  seoTitle?: string
  seoDescription?: string
}

export interface SanityBlock {
  _type: string
  _key: string
  style?: string
  children?: Array<{
    _type: string
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{ _type: string; _key: string }>
}
