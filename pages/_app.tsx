import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'

import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import Cookies from 'js-cookie'
import {
  initUserAttributes,
  AsyncConfigurator,
} from '@builder.io/personalization-utils/dist/browser'
// only needed for context menu styling
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import '@builder.io/widgets'
import { useEffect } from 'react'
builder.init(builderConfig.apiKey)

import '../blocks/ProductGrid/ProductGrid.builder'
import '../blocks/ProductView/ProductView.builder'
import { Layout } from '@components/common'

Builder.register('insertMenu', {
  name: 'Elasticpath Products Components',
  items: [
    { name: 'ProductGrid' },
    { name: 'ProductBox' },
  ],
})

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const record = Cookies.get();
    delete record['builder.userAttributes'];
    initUserAttributes(record);
  }, [])

  useEffect(() => {
    const { urlPath, date, ...rest } = builder.getUserAttributes();
    let changed = false;
    Object.keys(rest).forEach((key) => {
      const cookie = `builder.userAttributes.${key}`;
      const value = String(rest[key]);
      const valueInCookie = Cookies.get(cookie);
      if (valueInCookie !== value) {
        Cookies.set(cookie, value, {
          sameSite: 'None',
          // TODO , isDev (localhost)
          secure: true,
        });
        changed = true;
      }
    })
    if (changed) {
      // in studio tab
      setTimeout(() => location.reload(), 0);
    }
  }, [builder.userAttributesChanged.value])

  return (
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
        <AsyncConfigurator />
      </Layout>
  )
}

