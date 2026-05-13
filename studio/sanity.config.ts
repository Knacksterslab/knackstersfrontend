import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {singletonTypes, structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

if (!projectId) {
  throw new Error('Missing Sanity project ID. Set SANITY_STUDIO_PROJECT_ID in studio/.env.')
}

export default defineConfig({
  name: 'default',
  title: 'KNacksters Lab',

  projectId,
  dataset,

  plugins: [structureTool({structure}), visionTool()],

  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({action}) => action !== 'delete' && action !== 'duplicate' && action !== 'unpublish')
        : prev,
  },

  schema: {
    types: schemaTypes,
  },
})
