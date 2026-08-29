import type { Interviewer } from "../../types/interviewer";

type InterviewSummaryProps = {
  interviewer: Interviewer;
  selectedSlot?: string;
};

export default function InterviewSummary({
  interviewer,
  selectedSlot,
}: InterviewSummaryProps) {
  return (
    <div className="panel summary">
      <h3>Interview summary</h3>

      <div className="line">
        <span>Company</span>

        <b>{interviewer.company}</b>
      </div>

      <div className="line">
        <span>Designation</span>

        <b>{interviewer.designation}</b>
      </div>

      <div className="line">
        <span>Domain</span>

        <b>{interviewer.domain}</b>
      </div>

      {selectedSlot && (
        <div className="line">
          <span>Time slot</span>

          <b>{selectedSlot}</b>
        </div>
      )}

      <div className="line">
        <span>Duration</span>

        <b>60 minutes</b>
      </div>

      <div className="line">
        <span>Interview fee</span>

        <b>₹{interviewer.price.toLocaleString()}</b>
      </div>

      <hr />

      <div className="line">
        <b>Total</b>

        <b>₹{interviewer.price.toLocaleString()}</b>
      </div>
    </div>
  );
}
