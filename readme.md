<h1>MindLancer</h1>
<img src="./Frontend//src/assets/logo.png" style='height: 150px; align-self: left;'></img>
<p>MindLancer is a platform to ease the process of connecting freelancers to Freelance project providers or companies in general.Ouraim to develop this project is to integrate AI and provide a comprehensively better platform then existing ones.</p>


<h2>Basic Features</h2>
<li>Github and LinkedIn authentication</li>
<li>Freelancer and Company dashboard with statistics</li>
<li>AI based recommendation system for freelancers</li>
<li>Chat/Video Call feature for client-company interaction</li>
<li>Efficient job posting for companies </li>
<li>Chat feature for freelancers and companies
<li>

<h2>Tech Stack</h2>
<li><b>Frontend:</b> React JS, Tailwind CSS</li>
<li><b>Backend:</b> Express JS, Mongo DB, passport JS</li>
<li><b>AI-ML:</b> Scikit Learn,Python,Flask</li>

<h2>Project Structure</h2>
<p>
  mindlancer/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── assets/
│   └── src/
│       ├── assets/
│       │   └── logo.png
│       ├── components/
│       │   ├── auth/
│       │   ├── dashboard/
│       │   ├── chat/
│       │   └── jobs/
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── FreelancerDashboard.tsx
│       │   └── CompanyDashboard.tsx
│       ├── services/
│       │   ├── api.ts
│       │   └── auth.ts
│       ├── utils/
│       ├── App.tsx
│       └── index.tsx
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── jobController.ts
│   │   │   └── userController.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Job.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── api.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── config/
│   │   │   └── passport.ts
│   │   └── app.ts
│   └── package.json
├── ml-service/
│   ├── src/
│   │   ├── models/
│   │   │   └── recommender.py
│   │   ├── utils/
│   │   │   └── data_processing.py
│   │   └── app.py
│   └── requirements.txt
└── README.md
</p>



<h2>Usage</h2>
<li>Freelancers can sign up and create a profile on Github,LinkedIn,etc</li>
<li>Companies can post jobs and interact with freelancers</li>
<li>AI will provide recommendations to freelancers based on their skills and job requirements</li>
<li>The freelancers can apply for the same </li>
<li>The companies can then hire them for the projects</li>

