import { request } from './ep'

export interface BuillderConfig {
  apiKey: string
  productsModel: string
  collectionsModel: string
  isDemo?: boolean
}

export async function getProduct(
  config: BuillderConfig,
  options: { handle: string }
) {
  const product = await request(
    options.handle,
    process.env.ELASTICPATH_CLIENT_ID!
  )

  const builderImagesResponse = await fetch(
    `https://cdn.builder.io/api/v2/content/product-images?apiKey=${config.apiKey}&single=true&query.data.product=${product.slug}`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 404) {
        return null
      }
      return res
    })

  return {
    ...product,
    builderImagesResponse: builderImagesResponse
      ? { ...builderImagesResponse }
      : null,
  }
}
