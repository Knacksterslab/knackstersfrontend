import {defineField, defineType} from 'sanity'

export const rolePageType = defineType({
  name: 'rolePage',
  title: 'Role Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shortIntro',
      title: 'Short Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whoItsFor',
      title: 'Who It’s For',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'commonProblems',
      title: 'Common Problems',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'whatToTestInTrial',
      title: 'What To Test In Trial',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'whyKnacksters',
      title: 'Why Knacksters',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
  ],
})