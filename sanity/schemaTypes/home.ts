// sanity/schemaTypes/home.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // --- THÊM PHẦN NÀY ---
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true }, // Cho phép crop tâm ảnh
    }),
    defineField({
      name: 'showCustomHero',
      title: 'Use Custom Hero Image?',
      type: 'boolean',
      initialValue: true,
    }),
    // ---------------------
  ],
})