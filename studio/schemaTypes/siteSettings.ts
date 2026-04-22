import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Site Title', type: 'string'}),
    defineField({name: 'siteDescription', title: 'Site Description', type: 'text'}),
    defineField({name: 'mainCTA', title: 'Main CTA', type: 'string'}),
  ],
})