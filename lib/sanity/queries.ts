export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category,
    body,
    seoTitle,
    seoDescription
  }
`

export const ALL_POST_SLUGS_QUERY = `
  *[_type == "post"] { "slug": slug.current }
`

export const ALL_ROLES_QUERY = `
  *[_type == "rolePage"] | order(title asc) {
    title,
    "slug": slug.current,
    shortIntro
  }
`

export const ROLE_BY_SLUG_QUERY = `
  *[_type == "rolePage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    shortIntro,
    whoItsFor,
    commonProblems,
    whatToTestInTrial,
    whyKnacksters,
    faq,
    seoTitle,
    seoDescription
  }
`

export const ALL_ROLE_SLUGS_QUERY = `
  *[_type == "rolePage"] { "slug": slug.current }
`

export const ALL_CASE_STUDY_SLUGS_QUERY = `
  *[_type == "caseStudy"] { "slug": slug.current, publishedAt }
`

export const ALL_COMPARISON_SLUGS_QUERY = `
  *[_type == "comparisonPage"] { "slug": slug.current }
`
