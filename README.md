# LOOP AI – Customer Feedback Intelligence Platform

An AI-powered customer feedback management platform that collects, analyzes, and visualizes customer feedback using Large Language Models (LLMs).

## Live Demo

**Website:** https://loop-ai-customer-feedback-beta.vercel.app

## Features

- User Authentication (NextAuth)
- Customer Feedback Submission
- Bulk CSV Feedback Import
- AI Sentiment Analysis
- AI Category Classification
- AI Priority Detection
- AI Executive Summary
- AI Insights
- Dashboard Analytics
- Reports Dashboard
- Feedback Status Management
- Pagination
- Export Dashboard as PDF
- Responsive UI

---

## Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)

### Authentication
- NextAuth.js

### AI
- Groq API
- Llama 3.3 70B Versatile

### Deployment
- Vercel

---

## Project Structure

```
app/
├── dashboard/
├── feedback/
├── reports/
├── api/
│   ├── feedback/
│   ├── summary/
│   ├── insights/
│   └── reports/
components/
lib/
prisma/
```

---

## Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Customer Feedback

![Customer Feedback](screenshots/feedback.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Reports

![Reports](screenshots/reports.png)

### CSV Import

![CSV Import](screenshots/csv-import.png)

### AI Insights

![AI Insights](screenshots/ai-insights.png)

---

## Installation

Clone the repository

```bash
git clone https://github.com/Akshay272002/loop-ai-customer-feedback.git
```

Go to project folder

```bash
cd loop-ai-customer-feedback
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=your_database_url
AUTH_SECRET=your_secret
GROQ_API_KEY=your_groq_api_key
NEXTAUTH_URL=http://localhost:3000
```

Run Prisma

```bash
npx prisma db push
```

Start development server

```bash
npm run dev
```

---

## AI Workflow

Customer Feedback

↓

Groq LLM

↓

Sentiment Classification

↓

Category Detection

↓

Priority Prediction

↓

Executive Summary

↓

AI Insights

↓

Dashboard Analytics

---

## Future Improvements

- Multi-tenant Workspace
- Email Notifications
- Dark Mode
- Advanced Analytics
- Custom AI Models
- Real-time Dashboard

---

## Author

**Akshay Lawand**

GitHub:
https://github.com/Akshay272002

---

## License

MIT License