import { NextApiRequest, NextApiResponse } from 'next'
import { createAdminApiClient } from '@builder.io/admin-sdk';

if (!process.env.BUILDER_PRIVATE_KEY) {
  throw new Error('No BUILDER_PRIVATE_KEY defined')
}

export const getAttributes = async (privateKey: string) => {
  const adminSDK = createAdminApiClient(privateKey);
  const res = await adminSDK.query({
    settings: true,
  })
  return res.data?.settings.customTargetingAttributes;
};


/**
 * API to get the custom targeting attributes from Builder, only needed for the context menu to show a configurator and allow toggling of attributes
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const attributes = await getAttributes(process.env.BUILDER_PRIVATE_KEY!)
  res.send(attributes)
}
