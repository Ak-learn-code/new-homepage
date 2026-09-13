import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema/index.js'

export default defineConfig({
  name: 'sidetwo',
  title: 'SideTwo Inhalte',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 't29qpo9b',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
