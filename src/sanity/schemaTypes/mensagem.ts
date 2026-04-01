import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const mensagemType = defineType({
  name: 'mensagem',
  title: 'Mensagem',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titulo', maxLength: 200 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'texto',
      title: 'Texto',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Bom Dia', value: 'bom-dia' },
          { title: 'Boa Noite', value: 'boa-noite' },
          { title: 'Amor', value: 'amor' },
          { title: 'Fé e Espiritualidade', value: 'fe-espiritualidade' },
          { title: 'Família', value: 'familia' },
          { title: 'Motivação', value: 'motivacao' },
          { title: 'Amizade', value: 'amizade' },
          { title: 'Aniversário', value: 'aniversario' },
          { title: 'Datas Comemorativas', value: 'datas-comemorativas' },
          { title: 'Meses Temáticos', value: 'meses-tematicos' },
          { title: 'Reflexão', value: 'reflexao' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'destaque',
      title: 'Destaque',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'categoria',
    },
  },
})
