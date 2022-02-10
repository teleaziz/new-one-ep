/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui'
import { Card, Text } from 'theme-ui'
import { Link, ImageCarousel } from '@components/ui'
import React from 'react'

export interface ProductCardProps {
  className?: string
  product: any
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const handle = (product as any).slug
  const price = product.meta.display_price.with_tax.formatted
  const enrichedProduct = {
    ...product,
    ...product.builderImagesResponse?.data,
  }

  return (
    <Card
      sx={{
        maxWidth: [700, imgWidth || 540],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link href={`/product/${handle}/`}>
        <div sx={{ flexGrow: 1 }}>
          <ImageCarousel
            currentSlide={
              enrichedProduct.images ? enrichedProduct.images.length - 1 : 0
            }
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            layout={imgLayout}
            sizes={imgSizes}
            alt={product.title}
            images={
              enrichedProduct.images?.length
                ? enrichedProduct.images
                : [
                    {
                      src: `https://via.placeholder.com/${imgWidth}x${imgHeight}`,
                    },
                  ]
            }
          />
        </div>
        <div sx={{ textAlign: 'center' }}>
          <Themed.h2 sx={{ mt: 4, mb: 0, fontSize: 14 }}>
            {enrichedProduct.title || enrichedProduct.name}
          </Themed.h2>
          <Text sx={{ fontSize: 12, mb: 2 }}>{price}</Text>
        </div>
      </Link>
    </Card>
  )
}

export default ProductCard
