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
      nameField: 'product',
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
      nameField: 'product',
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
      type: 'Tags',
      name: 'stringsArray',
      defaultValue: ['foo', 'bar']
    },
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
	  required: true
    },
    {
      name: 'regularObject',
      type: 'object',
      helperText: 'edit this',
      subFields: Array.from({ length: 4 }).map((_, index) => {
        return {
          type: index % 2 === 0 ? 'text' : 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'mp4],
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

Builder.registerComponent(JSONProps, {
  name: 'ListLocalizationText',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/play-list-remove.svg',
  description: 'Folded test description',
  inputs: [
    {
			name: 'favoriteTechStack',
			type: 'list',
			defaultValue: [
				{
					name: 'Svelte',
					description: 'A compiler for building user interfaces.'
				}
			],
			localized: true,
			subFields: [
				{
					name: 'name',
					type: 'text',
					defaultValue: 'Svelte',
					localized: true
				},
				{
					name: 'description',
					type: 'text',
					defaultValue: 'A compiler for building user interfaces.',
					localized: true
				}
			]
		}
  ] as any,
})
Builder.registerComponent(JSONProps, {
  name: 'DefaultLocalized',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/play-list-remove.svg',
  description: 'Folded test description',
  inputs: [
    {
      name: 'aaa',
      type: 'text',
      localized: true,
      defaultValue: 'AAA Optional Eyebrow',
    },
    {
      name: 'num',
      type: 'number',
      localized: true,
      defaultValue: 23,
    },
   {
      name: 'zeroDefault',
      type: 'number',
      localized: true,
      defaultValue: 0,
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Optional Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: 'Powerful for developers Fast for everyone',
    },
  ] as any,
})




const a: any =  [
  {
    type: 'tags',
    name: 'tags',
    defaultValue: ['A', 'B']
  },
    {
      name: 'Ref',
      type: 'reference'
    },
    {
      name: 'color',
      type: 'color'
    },
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
