import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'
import { Input } from '@builder.io/sdk'
import { JSONProps } from './jsonProps'
const LazyProductGrid = dynamic(async () => {
  return (await import('./ProductGrid')).ProductGrid
})

const productCardFields: Input[] = [
  {
    name: 'imgWidth',
    type: 'number',
    defaultValue: 540,
  },
  {
    name: 'imgHeight',
    type: 'number',
    defaultValue: 540,
  },
  {
    name: 'imgPriority',
    type: 'boolean',
    advanced: true,
    defaultValue: true,
  },
  {
    name: 'imgLoading',
    type: 'enum',
    advanced: true,
    defaultValue: 'lazy',
    enum: ['eager', 'lazy'],
  },
  {
    name: 'imgLayout',
    type: 'enum',
    enum: ['fixed', 'intrinsic', 'responsive', 'fill'],
    advanced: true,
    defaultValue: 'fill',
  },
]

export const productGridSchema = (folded: boolean): any[] => ([
  {
    name: 'cardProps',
    ...folded && {
      folded: true,
      keysHelperText: 'pick the property you want to edit'
    },
    defaultValue: {
      imgPriority: true,
      imgLayout: 'responsive',
      imgLoading: 'eager',
      imgWidth: 540,
      imgHeight: 540,
      layout: 'fixed',
    },
    type: 'object',
    subFields: productCardFields,
  },
  {
    name: 'offset',
    type: 'number',
    defaultValue: 0,
  },
  {
    name: 'limit',
    type: 'number',
    defaultValue: 9,
  },
])

Builder.registerComponent(LazyProductGrid, {
  name: 'ProductGrid',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/play-list-add.svg',
  description: 'Pick products free form',
  inputs: [
    {
      name: 'productsList',
      type: 'list',
      subFields: [
        {
          name: 'product',
          type: `ElasticpathProductHandle`,
        },
      ],
    },
  ].concat(productGridSchema(false)),
})


Builder.registerComponent(LazyProductGrid, {
  name: 'ProductGridFolded',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/play-list-add.svg',
  description: 'Folded test description',
  inputs: [
    {
      name: 'productsList',
      type: 'list',
      subFields: [
        {
          name: 'product',
          type: `ElasticpathProductHandle`,
        },
      ],
    },
  ].concat(productGridSchema(true)),
})


Builder.registerComponent(JSONProps, {
  name: 'FoldedExperiment',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/play-list-add.svg',
  description: 'Folded test description',
  inputs: [
    {
      name: 'Ref',
      type: 'reference'
    },
    {
      name: 'color',
      type: 'color'
    },
    {
      name: 'localizedText',
      type: 'text',
      localized: true,
    },
    {
      name: 'regularText',
      type: 'text',
    },
    {
      name: 'refList',
      type: 'list',
      subFields: [
        {
          name: 'ref',
          type: `reference`,
        },
      ],
    },
    {
          name: 'localizedLongText',
          type: 'longText',
          defaultValue: 'Hello World',
          localized: true,
    },
    {
      name: 'regularObject',
      type: 'object',
      helperText: 'edit this',
      subFields: Array.from({ length: 4 }).map((_, index) => {
        return {
          type: index % 2 === 0 ? 'text' : 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          name: `prop${index}`,
          helperText: `the helper text of prop ${index}`,
        }
      })
    },
    {
      name: 'HugeObject',
      type: 'object',
      folded: true,
      keysHelperText: 'Pick a property to edit',
      helperText: 'edit this enormouse size object',
      subFields: Array.from({ length: 30 }).map((_, index) => {
        return {
          type: index % 2 === 0 ? 'text' : 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          name: `prop${index}`,
          helperText: `the helper text of prop ${index}`,
        }
      })
    },
  ] as any,
})


cons a: any =  [
      {
        name: 'gridCTA',
        type: 'object',
        defaultValue: {
          fontVariant: 'condensedVipHomepageFamily',
        },
        subFields: [
          {
            name: 'fontVariant',
            type: 'string',
            enum: ['condensedVipHomepageFamily'],
            hideFromUI: true,
          },
          {
            name: 'label',
            type: 'string',
            localized: true,
          },
          {
            name: 'url',
            type: 'string',
            localized: true,
          },
        ],
      }
    ];


Builder.registerComponent(JSONProps, {
  name: 'BugRepro',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/box.svg',
  description: 'bug temp',
  inputs: a 
});
