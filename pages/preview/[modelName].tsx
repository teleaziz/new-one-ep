import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import Head from 'next/head'
import { useThemeUI } from 'theme-ui'
import { getLayoutProps } from '@lib/get-layout-props'
builder.init(builderConfig.apiKey!)

const builderModel = 'product-page'

export async function getServerSideProps({
  params
}: GetServerSidePropsContext<{ modelName: string }>) {

  return {
    props: {
      modelName: params?.modelName || 'symbol',
      ...(await getLayoutProps()),
    },
  }
}


export default function Handle({
  modelName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { theme } = useThemeUI()
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <>
    <Head>
    <meta name="robots" content="noindex" />
    <meta name="title"></meta>
  </Head>

    <BuilderComponent
      model={modelName}
      data={{ theme }}
    />
    </>
  )
}

Handle.Layout = Layout
