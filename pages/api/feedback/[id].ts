import { getFeedback } from ".";
import { NextApiRequest, NextApiResponse } from "next";

/* #TA04
   - dynamic API routes
*/
export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  const feedbackItems = getFeedback();

  const feedbackRes = feedbackItems.find((i) => i.id === id);
  res.status(200).json(feedbackRes);
};

export default handler;
