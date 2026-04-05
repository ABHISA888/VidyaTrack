# VidyaTrack — DEO Education Intelligence Portal

**VidyaTrack** is a high-performance analytics dashboard designed for District Education Officers (DEOs) to monitor and act on ASER (Annual Status of Education Report) data. It provides a real-time, evidence-based view of foundational literacy and numeracy (FLN) across India.

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure AI Advisor**:
   Create a `.env` file in the root directory:


3. **Data Setup**:
   Ensure `ASER_FULL_Grade3_4_5_AllStates.csv` is present in `public/data/`.

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📊 CSV Schema

The application expects the following columns in the CSV:
- **Year**: integer (2018 | 2019 | 2021 | 2022 | 2024)
- **State**: string (e.g., "Bihar", "All India")
- **Grade**: string ("Grade 3" | "Grade 4" | "Grade 5")
- **Grade_Num**: integer (3 | 4 | 5)
- **Reading_AtLevel_Pct**: float (% students reading Std II text)
- **Arith_Subtraction_Pct**: float (% students doing subtraction)
- **Arith_Division_Pct**: float (% students doing division)
- **School_Type**: string ("Government")
- **Risk_Category**: string ("Critical" | "High Risk" | "Moderate" | "Good")

## 🧩 Key Modules

### 1. Overview Dashboard
- **KPI Cards**: Shows national averages and year-over-year changes.
- **Reading Distribution**: A visual breakdown of students' mastery levels from "Cannot Read" to "Story level."
- **Division Cliff Monitor**: Tracks critical Grade 5 arithmetic proficiency.

### 2. Grade Trends
- Longitudinal analysis showing proficiency drops during COVID (2021) and the trajectory of recovery since 2022.

### 3. State Risk Intelligence
- A sortable matrix allowing DEOs to rank states by any metric and drill down into individual profiles.

### 4. Priority Queue
- **Compute Score**: Automatically ranks states for intervention based on:
  - Reading Gap vs National (40%)
  - Division Cliff Performance (35%)
  - Historical Stagnation (25%)

### 5. Intervention Tracker
- A localized log for tracking education programs, showing "Pre-Baseline" vs "Current Lift" metrics.

### 6. AI Advisor (Claude 3.5 Sonnet Integration)
- A context-aware chatbot that uses the actual CSV data to answer strategical questions. The system prompt is dynamically built from the current dataset.

## 🛠 Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom palette: Navy #1A3356, Saffron #C94C0C, Teal #0A6E5E)
- **Charts**: Recharts (Customized for premium aesthetics)
- **Parser**: PapaParse
- **Icons**: Lucide-React

## ⚠️ Known Limitations
- ASER data cycles are roughly every 2 years; intermediate years (e.g., Grade 4 specific cuts in some cycles) are interpolated.
- Priority scores are rule-based approximations for administrative support.
