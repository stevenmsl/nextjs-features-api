import { FormEventHandler, MouseEventHandler, useRef, useState } from "react";
import { FeedbackReq, FeedbackRes } from "../types";
const HomePage = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackRes[]>([]);
  const emailInput = useRef<HTMLInputElement>(null);
  const feedbackInput = useRef<HTMLTextAreaElement>(null);

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const email = emailInput.current.value;
    const feedback = feedbackInput.current.value;

    const myFeedback: FeedbackReq = { email, feedback };

    /* #TA01 */
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(myFeedback),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getFeedback: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const res = await fetch("/api/feedback");
    const feedback: FeedbackRes[] = await res.json();
    setFeedbackItems(feedback);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInput}></input>
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInput}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={getFeedback}>Get Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedback} by {item.email}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
