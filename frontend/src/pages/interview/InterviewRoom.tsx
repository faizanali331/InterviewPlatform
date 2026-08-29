import { MessageSquare } from "lucide-react";

import Badge from "../../components/common/Badge";

export default function InterviewRoom() {
  return (
    <div className="room">
      <div className="roomtop">
        <div className="brand">
          <b>IP</b>
          InterviewPro
        </div>

        <Badge tone="danger">● REC 00:38:42</Badge>
      </div>

      <div className="videos">
        <div className="video">
          <span>Interviewer · Amazon SDE-3</span>

          <strong>AI</strong>
        </div>

        <div className="video smallvideo">
          <span>You</span>

          <strong>MF</strong>
        </div>
      </div>

      <div className="roomfooter">
        <div>
          <h2>Java + Spring Boot Mock Interview</h2>

          <p>
            Secure room · interviewer identity is protected · platform recording
            enabled.
          </p>
        </div>

        <div>
          <button>Mute</button>

          <button>Camera</button>

          <button>Share screen</button>

          <button className="leave">Leave</button>
        </div>
      </div>

      <div className="chat">
        <MessageSquare size={17} />
        Interview chat · Mock chat area
      </div>
    </div>
  );
}
