import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required().max(60),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      validation: Rule => Rule.required().max(160),
    }),
    defineField({
      name: 'mainCTA',
      title: 'Main CTA',
      type: 'string',
      validation: Rule => Rule.required().max(80),
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'mainCTA',
    },
  },
})