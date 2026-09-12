import { defineConfig } from 'sanity'
import { schemaTypes } from './sanity/schema/index.js'

export default defineConfig({
  name: 'sidetwo',
  title: 'SideTwo Inhalte',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  schema: { types: schemaTypes },
})
