//  https://api.moltin.com/oauth/access_token

let token: any = null

export const getAccessToken = ({ client_id }: any) => {
  if (!client_id) {
    throw new Error('You must have a client_id set')
  }

  const body: any = {
    grant_type: 'implicit',
    client_id,
  }

  return token
    ? Promise.resolve(token)
    : fetch(`https://api.moltin.com/oauth/access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.keys(body)
          .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
          .join('&'),
      })
        .then((res) => {
          return res.text().then((body: any) => {
            return {
              status: res.status,
              ok: res.ok,
              json: body !== '' ? JSON.parse(body) : '{}',
            }
          })
        })
        .then(({ json }) => {
          const { access_token, refresh_token, expires } = json
          if (access_token || refresh_token) {
            token = {
              client_id,
              access_token,
              expires,
              ...(refresh_token && { refresh_token }),
            }
          }
          return token
        })
        .catch((e) => {
          return null
        })
}

export async function request(handle: string, client_id: string) {
  const url = `https://api.moltin.com/v2/products?include=main_images,variations&filter=eq(slug,${handle}):eq(status,live)`

  const { access_token } = await getAccessToken({ client_id })
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data[0])
}
