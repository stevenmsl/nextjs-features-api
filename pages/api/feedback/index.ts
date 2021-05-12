import type { NextApiRequest, NextApiResponse } from "next";
import { FeedbackReq, FeedbackRes } from "../../../types";
import fs from "fs";
import path from "path";

const feedbackFilePath = () => {
  const filepath = path.join(process.cwd(), "data", "feedback.json");
  return filepath;
};

export const getFeedback = () => {
  const file = fs.readFileSync(feedbackFilePath(), "utf-8");
  const data = JSON.parse(file) as FeedbackRes[];
  return data;
};

/* #TA02  */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const feebackReq = req.body as FeedbackReq;
    const feedback: FeedbackRes = {
      id: new Date().toISOString(),
      ...feebackReq,
    };
    const data = getFeedback();
    data.push(feedback);
    const path = feedbackFilePath();
    fs.writeFileSync(path, JSON.stringify(data));
    res.status(201).json({ message: "Success", feedback: feedback });
  } else {
    const data = getFeedback();
    res.status(200).json(data);
  }
};

export default handler;
