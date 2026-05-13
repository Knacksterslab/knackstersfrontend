import {defineField, defineType} from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'trialSetup',
      title: 'Trial Setup',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'workDelivered',
      title: 'Work Delivered',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
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
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: slug ? `/case-studies/${slug}` : 'No slug set',
      }
    },
  },
})