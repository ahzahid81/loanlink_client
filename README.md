# 📘 LoanLink – Microloan Request & Approval Tracker System

## 🧠 Project Overview

LoanLink is a full-stack microloan request, review, and approval management system.  
It is designed to help microfinance organizations, NGOs, and small lenders manage loan applications, approvals, payments, and dashboards in one centralized platform.

---

## 🎯 Key Features

### 🌐 Public Features
- Modern landing page with Framer Motion animations
- Home page with featured loans from MongoDB
- All Loans page with search and pagination
- Loan Details page
- Responsive UI (mobile, tablet, desktop)
- Dark / Light theme toggle

---

### 🔐 Authentication & Security
- Firebase authentication (Email/Password + Google)
- JWT-based authorization (stored in cookies)
- Role-based private routes (Admin, Manager, Borrower)
- Secure environment variables
- Protected backend APIs

---

### 👤 Borrower Features
- Apply for loans (auto-filled information)
- View applied loans
- Cancel pending loan applications
- Stripe payment for application fee ($10)
- Payment success & cancel pages
- Payment details modal (Transaction ID, Email, Loan ID)
- Borrower dashboard with charts

---

### 🧑‍💼 Manager Features
- Add loan products
- Manage own loans
- View pending loan applications
- Approve or reject applications
- View approved loans
- Dashboard analytics

---

### 🛡 Admin Features
- Manage users (change role, suspend with reason)
- View all loans
- Edit and delete loan products
- Toggle “Show on Home” loans
- View all loan applications
- Filter applications by status
- Admin dashboard with charts

---

## 📊 Dashboard Highlights
- Total loans count
- Pending, approved, rejected applications
- Monthly loan application bar chart
- Application status pie chart

---

## 💳 Stripe Payment Integration
- Fixed $10 application fee
- Secure Stripe Checkout
- Payment success updates database
- Payment history stored and displayed
- Paid badge opens payment details modal

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS + DaisyUI
- TanStack Query
- React Hook Form
- Framer Motion
- SweetAlert2
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe API
- Cookie Parser
- CORS