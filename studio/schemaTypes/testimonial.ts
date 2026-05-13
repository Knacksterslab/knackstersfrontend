import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'role', title: 'Role', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'company', title: 'Company', type: 'string', validation: Rule => Rule.required()}),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: Rule => Rule.required().min(15).max(500),
    }),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      company: 'company',
      featured: 'featured',
    },
    prepare({title, role, company, featured}) {
      const detail = [role, company].filter(Boolean).join(', ')
      const flag = featured ? 'Featured' : 'Standard'
      return {
        title,
        subtitle: [detail, flag].filter(Boolean).join(' | '),
      }
    },
  },
})