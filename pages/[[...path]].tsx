import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { BuilderComponent, Builder, builder, useIsPreviewing } from '@builder.io/react'
import builderConfig from '@config/builder'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { resolveBuilderContent } from '@lib/resolve-builder-content'

builder.init(builderConfig.apiKey)
import { useThemeUI } from 'theme-ui'
import { Link } from '@components/ui'
import { Themed } from 'theme-ui'
import { getLayoutProps } from '@lib/get-layout-props'

const isProduction = process.env.NODE_ENV === 'production'

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<{ path: string[] }>) {
  const isPersonalizedRequest = params?.path?.[0].startsWith(';')
  const urlPath = '/' + (params?.path?.join('/') || '')

  const targeting = isPersonalizedRequest
    ? getTargetingValues(params!.path[0].split(';').slice(1))
    : { urlPath }

  const page = await resolveBuilderContent('page',targeting)
  const { theme } = await getLayoutProps();
  return {
    props: {
      page,
      targeting,
      locale: targeting?.locale || 'en-US',
      theme,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 second
    revalidate: 1,
  }
}

import { getTargetingValues } from '@builder.io/personalization-utils'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default function Path({
  page,
  targeting,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const ts = useThemeUI();
  const isPreviewing = useIsPreviewing();
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (!page && !Builder.isEditing && !Builder.isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        {Builder.isBrowser && <DefaultErrorPage statusCode={404} />}
      </>
    )
  }

  const { title, description, image } = page?.data! || {}
  console.log('targeting', targeting);
  builder.setUserAttributes(targeting);
  return (
    <div>
      {title && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title,
            description,
            locale,
            ...(image && {
              images: [
                {
                  url: image,
                  width: 800,
                  height: 600,
                  alt: title,
                },
              ],
            }),
          }}
        />
      )}
      <BuilderComponent
        model="page"
        locale={locale}
        options={{ enrich: true}}
        data={{ theme: ts.theme, targeting }}
        renderLink={(props: any) => {
          // nextjs link doesn't handle hash links well if it's on the same page (starts with #)
          if (props.target === '_blank' || props.href?.startsWith('#')) {
            return <Themed.a {...props} />
          }
          return <Themed.a {...props} as={Link} />
        }}
        {...(page && { content: page })}
      />
    </div>
  )
}

Path.Layout = Layout
