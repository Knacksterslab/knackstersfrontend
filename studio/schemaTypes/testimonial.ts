import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({name: 'quote', title: 'Quote', type: 'text'}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean'}),
  ],
})