import Header from "../../components/common/Header";
import FeedbackCard from "../../components/feedback/FeedbackCard";

import { feedback } from "../../data/feedback";

export default function InterviewerFeedback() {
  return (
    <>
      <Header
        title="Interview feedback"
        sub="Review feedback and performance reports from your mock interviews."
      />

      <div className="feedbackgrid">
        {feedback.map((item) => (
          <FeedbackCard key={`${item.domain}-${item.date}`} feedback={item} />
        ))}
      </div>
    </>
  );
}
