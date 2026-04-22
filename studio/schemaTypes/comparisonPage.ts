import {defineField, defineType} from 'sanity'

export const comparisonPageType = defineType({
  name: 'comparisonPage',
  title: 'Comparison Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'comparedAgainst', title: 'Compared Against', type: 'string'}),
    defineField({name: 'summary', title: 'Summary', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'pros', title: 'Pros', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'cons', title: 'Cons', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'whenKnackstersFits', title: 'When Knacksters Fits', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string'}),
    defineField({name: 'seoDescription', title: 'SEO Description', type: 'text'}),
  ],
})