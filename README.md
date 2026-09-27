# 💪 FitLog — Modern Dark Workout Library & Tracker

A dark, no-nonsense gym companion built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Pick a lift, lock it into today's plan, visualize calorie and duration distribution using **Recharts**, and watch your progress add up.

---

## 🚀 Live Demo & Repository
- **Live Demo**: [FitLog on Vercel](https://fitlog-test.vercel.app) *(or your deployed URL)*
- **GitHub Repository**: [https://github.com/itsmashiat/fitlog-test](https://github.com/itsmashiat/fitlog-test)

---

## 🛠️ Technologies Used
- **Next.js 16 (App Router)**: Fast server and client-side rendering with static site generation (SSG) and incremental caching.
- **TypeScript**: Strict type definitions for workout models, contexts, and API responses.
- **Tailwind CSS v4 & DaisyUI**: Modern dark mode styling, custom theme tokens (`#CCFF00` neon lime, `#0B0C0E` pitch black), and responsive layouts.
- **Recharts**: Interactive visual charts and energy analytics comparing calories and duration across exercises.
- **Lucide React**: Clean, accessible iconography throughout navigation, stats, and actions.
- **React Toastify**: Smooth toast notifications for adding, saving, completing, and removing lifts.

---

## ✨ 5 Key Features

### 1. 🏋️ The Library with 3x4 Responsive Grid
- Dynamically loads 12 comprehensive lifts covering all major muscle groups from the FitLog REST API.
- Each card displays muscle group badges, workout name, equipment, duration, calories burned, and star rating.
- Clicking any card navigates to an in-depth two-column details page.

### 2. 📋 Comprehensive Two-Column Workout Details
- Features a high-resolution illustration and complete workout overview.
- Structured **Key Specs table** covering equipment, difficulty, sets, reps, duration, calories, and user rating.
- Step-by-step numbered exercise instructions with interactive **"Add to today's plan"** and **"Save for later"** actions.

### 3. ⏱️ My Plan Management with 5-Lift Cap Guardrails
- Organizes workouts into two clean tabs: **Today's Plan** and **Saved for Later**.
- Live badge counters in the top navigation reflect planned and saved counts in real-time.
- Protects training discipline with a smart 5-lift cap for the current day's routine.
- Includes **Mark as Done** status toggles and one-click removal with toast notifications.

### 4. 📊 Real-time Metrics Summary & Recharts Analytics
- Live header statistics automatically sum total **Exercises**, **Minutes**, and **Calories**.
- Embedded **Recharts** analytics bar chart provides visual side-by-side comparisons of calorie burn and duration between lifts.
- Switch between active plan analytics and full library benchmarks on demand.

### 5. 🔍 Multi-Criteria Sorting, Live Search & LocalStorage Persistence
- Sort workouts instantaneously by **Duration**, **Calories**, or **Rating**.
- Live search filtering by workout name, equipment, or target muscle group.
- Full `localStorage` persistence guarantees your workout routine and saved exercises survive browser reloads.

---

## 🔌 API Endpoints
- **All Workouts**: `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout**: `https://api.abcz.workers.dev/api/fitlog/:id`

---

## 💻 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/itsmashiat/fitlog-test.git
   cd fitlog-test
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📄 License
© 2026 FitLog — Workout Library. Train hard, log honest.