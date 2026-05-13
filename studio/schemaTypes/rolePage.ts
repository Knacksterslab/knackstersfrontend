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
      validation: Rule => Rule.required().max(220),
    }),
    defineField({
      name: 'whoItsFor',
      title: 'Who It’s For',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'commonProblems',
      title: 'Common Problems',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'whatToTestInTrial',
      title: 'What To Test In Trial',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'whyKnacksters',
      title: 'Why Knacksters',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: slug ? `/roles/${slug}` : 'No slug set',
      }
    },
  },
})