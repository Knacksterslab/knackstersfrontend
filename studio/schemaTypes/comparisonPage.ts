import {defineField, defineType} from 'sanity'

export const comparisonPageType = defineType({
  name: 'comparisonPage',
  title: 'Comparison Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'comparedAgainst',
      title: 'Compared Against',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'whenKnackstersFits',
      title: 'When Knacksters Fits',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string', validation: Rule => Rule.max(60)}),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      validation: Rule => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      comparedAgainst: 'comparedAgainst',
      slug: 'slug.current',
    },
    prepare({title, comparedAgainst, slug}) {
      const target = comparedAgainst ? `vs ${comparedAgainst}` : ''
      const path = slug ? `/compare/${slug}` : 'No slug set'
      return {
        title,
        subtitle: [target, path].filter(Boolean).join(' | '),
      }
    },
  },
})