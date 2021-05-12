import { GetStaticPathsResult, GetStaticProps } from "next";
import { FeedbackRes } from "../../types";
import { getFeedback } from "../api/feedback";
import { Fragment, useState } from "react";
interface FeedbackPageProps {
  feedbackItems: FeedbackRes[];
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ feedbackItems }) => {
  const [feedback, setFeedback] = useState<FeedbackRes>(null);
  const showEmail = async (id: string) => {
    const url = `/api/feedback/${id}`;
    const res = await fetch(url);
    const feedback = (await res.json()) as FeedbackRes;
    setFeedback(feedback);
  };

  return (
    <Fragment>
      {feedback && <p> {feedback.email} </p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedback}
            <button onClick={showEmail.bind(null, item.id)}>Show email</button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

/*  #TA03
  - don't use fetch to call into the API routes
  - use the functions exported by the API routes
    instead to perform the same logic required
    to avoid unnecessary http calls
*/
export const getStaticProps: GetStaticProps<FeedbackPageProps> = async () => {
  const feedbackItems = getFeedback();
  return {
    props: { feedbackItems },
  };
};

export default FeedbackPage;
