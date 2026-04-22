import {defineField, defineType} from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'challenge', title: 'Challenge', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'trialSetup', title: 'Trial Setup', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'workDelivered', title: 'Work Delivered', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'outcome', title: 'Outcome', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string'}),
    defineField({name: 'seoDescription', title: 'SEO Description', type: 'text'}),
  ],
})