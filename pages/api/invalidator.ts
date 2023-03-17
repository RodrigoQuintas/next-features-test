// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  await res.revalidate("/example-isr");
  res.status(200).json('example-isr has been invalidate');
}
