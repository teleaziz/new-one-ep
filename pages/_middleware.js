import { NextResponse } from 'next/server'
import { getPersonalizedRewrite } from '@builder.io/personalization-utils/dist/get-personalized-rewrite'


export default function middleware(request) {
  const excludededPrefixes = ['/favicon', '/api', '/product', '/sw.js', '/site.webmanifest', '/icon-192x192.png']
  const url = request.nextUrl
  let response = NextResponse.next()
  if (!excludededPrefixes.find((path) => url.pathname?.startsWith(path))) {
    const rewrite = getPersonalizedRewrite(url?.pathname, {
      'builder.userAttributes.domain': request.headers.get('Host') || '',
      'builder.userAttributes.city': request.geo?.city || '',
      'builder.userAttributes.country': request.geo?.country || '',
      'builder.userAttributes.region': request.geo?.region || '',
      'builder.userAttributes.searchBot': String(request.ua?.isBot),
      // allow overriding by cookies for testint with the configurator UI, press ctrl + right click for details
      ...request.cookies,
    })

    console.log(' rewriting to ', rewrite);
    if (rewrite) {
      response = NextResponse.rewrite(rewrite)
    }
  }
  return response
}
