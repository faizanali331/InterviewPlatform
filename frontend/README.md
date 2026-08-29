# InterviewPro — Mock Interview Platform UI Prototype

React + TypeScript + Vite prototype with mock data.

## Run

npm install
npm run dev

Open the Vite URL, normally http://localhost:5173

## Roles

Use the role selector in the sidebar to switch between Candidate, Interviewer and Admin.

## Main prototype flows

Candidate: dashboard → find interviewer → company/domain filters → confidential interviewer → slots → mock payment → booking → secure interview room → feedback.

Interviewer: dashboard → verification → availability → interviews → feedback.

Admin: dashboard → verification/management tables → payments.

## Backend later

Replace mock data with Spring Boot REST APIs for JWT authentication, RBAC, company-domain verification, candidate seniority validation, payments, scheduling, notifications, video/WebRTC/Zoom integration, recording storage, encryption, audit logs and feedback persistence.
