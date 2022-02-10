/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx, useThemeUI } from 'theme-ui'
import { Grid, Button } from 'theme-ui'
import { NextSeo } from 'next-seo'
import { useUI } from '../../components/ui/context'
import { ImageCarousel, LoadingDots } from '../../components/ui'
import ProductLoader from './ProductLoader'
import builder, { Builder, BuilderContent } from '@builder.io/react'
const clone = (o: any) => JSON.parse(JSON.stringify(o))

interface Props {
  className?: string
  children?: any
  product: any
  renderSeo?: boolean
  description?: string
  title?: string
}

const ProductBox: React.FC<Props> = ({
  product,
  renderSeo = true,
  description: descriptionInput,
  title = product.title,
}) => {
  const [loading, setLoading] = useState(false)
  const { openSidebar } = useUI()

  const [variant, setVariant] = useState({})

  const ts = useThemeUI();

  const addToCart = async () => {
    openSidebar()
  }

  const isLive = ( builder.editingModel || builder.previewingModel ) !== 'product-images'

  return (
    <React.Fragment>
      {renderSeo && (
        <NextSeo
          title={title}
          description={product.description}
          openGraph={{
            type: 'website',
            title: title,
            description: product.description,
            // images: [
            //   {
            //     url: product.images?.[0]?.src!,
            //     width: 800,
            //     height: 600,
            //     alt: title,
            //   },
            // ],
          }}
        />
      )}
      <BuilderContent
        key={product.id}
        model="product-images"
        content={clone(product.builderImagesResponse)}
        options={{
          query: {
            'data.product': product.slug,
          },
        }}
      >
        {(data) => {
          const enrichedProduct = {
            ...product,
            ... isLive ? product.builderImagesResponse?.data : data,
          }

          return (
            <Grid gap={4} columns={[1, 2]}>
              <div>
                <div
                  sx={{
                    border: '1px solid gray',
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <ImageCarousel
                    showZoom
                    alt={title}
                    width={1050}
                    height={1050}
                    priority
                    images={
                      enrichedProduct.images || [
                        {
                          src: `https://via.placeholder.com/1050x1050`,
                        },
                      ]
                    }
                  ></ImageCarousel>
                </div>
              </div>
              <div sx={{ display: 'flex', flexDirection: 'column' }}>
                <span sx={{ mt: 0, mb: 2 }}>
                  <Themed.h1>{title}</Themed.h1>
                  <Themed.h4 aria-label="price" sx={{ mt: 0, mb: 2 }}>
                    {enrichedProduct.meta.display_price.with_tax.formatted}
                  </Themed.h4>
                </span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: descriptionInput || enrichedProduct.description!,
                  }}
                />
                <div>
                  <Grid padding={2} columns={2}></Grid>
                </div>
                <Button
                  name="add-to-cart"
                  disabled={loading}
                  sx={{ margin: 2, display: 'block' , bg: ts.theme.colors?.primary}}
                  onClick={addToCart}
                >
                  Add to Cart {loading && <LoadingDots />}
                </Button>
              </div>
            </Grid>
          )
        }}
      </BuilderContent>
    </React.Fragment>
  )
}

const ProductView: React.FC<{
  product: string | any
  renderSeo?: boolean
  description?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
