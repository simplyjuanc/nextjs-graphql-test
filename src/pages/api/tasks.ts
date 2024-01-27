import type { NextApiRequest, NextApiResponse } from "next";




export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':

      break;
    case 'PUT':

      break;
    case 'DELETE':

      break;

    default:
      break;
  }

  res.status(200).json({ message: 'Success' })
}