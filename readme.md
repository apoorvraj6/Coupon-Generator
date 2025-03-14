# Round-Robin Coupon Distribution with Abuse Prevention

## 🔹 Project Overview
This is a web application that distributes coupons to guest users in a round-robin manner, ensuring fair distribution while preventing abuse.

## 🔹 Features
✅ Distributes coupons fairly using a round-robin method  
✅ Allows guest users to claim coupons without login  
✅ Prevents users from claiming multiple coupons using **IP tracking + cookie tracking**  
✅ Provides clear feedback messages for users  
✅ Fully deployed and accessible via a public URL  

## 🔹 Live Demo
🔗 [Frontend URL](https://coupon-generator-delta.vercel.app/)  
🔗 [Backend URL](https://your-backend-url.com)  

---

## 🔹 **Abuse Prevention Strategies**
To prevent users from exploiting the system by refreshing or changing networks, we implement **two abuse prevention mechanisms**:

### **1️⃣ IP Tracking (Server-Side)**
- When a user claims a coupon, their **IP address** is stored in **Redis**.
- If the **same IP** tries to claim another coupon within 1 hour, they **are blocked**.
- **Why?** Prevents multiple claims from the same WiFi or VPN.

### **2️⃣ Cookie-Based Session Tracking**
- We generate a **unique session ID (`sessionid`)** and store it in **httpOnly cookies**.
- This session ID is also stored in **Redis**, so even if users **change their IP**, they **still can't claim again**.
- **Why?** Prevents abuse when users switch networks (WiFi → Mobile Data).

### **3️⃣ Combined Protection**
✅ **IP Tracking stops abuse from the same network.**  
✅ **Session Tracking stops abuse when changing networks.**  
✅ **Both are stored in Redis for 1 hour to enforce the cooldown period.**  

---

## 🔹 **Setup Instructions**
### **1️⃣ Clone the Repository**
```sh
git clone <your-repo-url>
cd your-project
2️⃣ Install Dependencies
sh
Copy code
npm install
3️⃣ Start Backend
sh
Copy code
npm run dev
4️⃣ Start Frontend
sh
Copy code
cd frontend
npm install
npm run dev
🔹 Tech Stack
Frontend: React, Axios, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Cache & Abuse Prevention: Redis
Deployment: Vercel (Frontend), Render (Backend)
