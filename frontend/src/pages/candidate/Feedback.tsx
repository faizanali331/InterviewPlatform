import Header from "../../components/common/Header";
import FeedbackCard from "../../components/feedback/FeedbackCard";

import { feedback } from "../../data/feedback";

export default function Feedback() {
  return (
    <>
      <Header
        title="Your feedback"
        sub="Actionable reports from your mock interviews, retained for long-term preparation."
      />

      <div className="feedbackgrid">
        {feedback.map((item) => (
          <FeedbackCard key={`${item.domain}-${item.date}`} feedback={item} />
        ))}
      </div>
    </>
  );
}
