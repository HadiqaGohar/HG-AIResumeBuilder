# HG-AI-Resume-Builder 🚀

**AI-Powered Resume Builder** built for the **Code with Kiro Hackathon**. It leverages **Kiro (AI-powered IDE)** to streamline resume building with **dynamic editing, AI-generated summaries, multiple template switching, and PDF download capabilities**. Designed to help **students and professionals** create **ATS-friendly, professional resumes quickly**, this project shines in the **Productivity & Workflow Tools** category.

---

## ✨ Features

* **🤖 AI-Powered Summaries:** Generates concise, professional summaries tailored to user inputs using **OpenAI Agents SDK**.
* **⚡ Dynamic Editing:** Real-time resume updates with fields for personal info, education, experience, and skills.
* **🎨 Multiple Templates:** Switch between professionally designed resume templates.
* **📄 PDF Download:** Export resumes as ATS-compatible PDFs with **@react-pdf/renderer**.
* **🛒 Cart System:** Save drafts to `localStorage` with **react-hot-toast** notifications.
* **🔗 Kiro Integration:** Uses **Kiro’s spec-driven development** and agent hooks for code automation, UI enhancements, and backend routes.

---

## 🛠 Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS, React Hot Toast
* **Backend:** FastAPI (Python)
* **AI:** OpenAI Agents SDK (summary generation)
* **PDF Generation:** @react-pdf/renderer
* **IDE:** Kiro (spec-driven dev + agent hooks)
* **Version Control:** Git, GitHub

---

## 📋 Prerequisites

* Node.js (v16+)
* Python (v3.8+)
* Git
* Kiro IDE *(optional for dev)*
* OpenAI API Key (for AI summary generation)

---

## ⚙️ Installation

```bash
# Clone the Repository
git clone https://github.com/your-username/HG-AI-Resume-Builder.git
cd HG-AI-Resume-Builder

# Install Frontend Dependencies
npm install

# Install Backend Dependencies
pip install -r requirements.txt

# Create .env file and add your OpenAI key
OPENAI_API_KEY=your-openai-api-key

# Run Backend (FastAPI)
uvicorn main:app --reload

# Run Frontend (Next.js)
npm run dev

# Build for Production
npm run build
npm start
```

---

## 🎯 Usage

1. Open **[http://localhost:3000](http://localhost:3000)** in your browser.
2. Enter personal details, education, experience, and skills.
3. Use **AI summary generation** for a professional summary.
4. Switch between **resume templates**.
5. Save drafts to **Cart** or download as **PDF**.

---

## ⚡ Kiro Integration

This project was built using **Kiro IDE**, which automated:

* Generating **Next.js components** and **FastAPI routes** via spec-driven development.
* Adding **agent hooks** for real-time UI animations and backend optimizations.
* Polishing the UI with **Tailwind CSS vibe coding** for consistent styling.

📂 The `/.kiro` directory contains specifications and hooks for hackathon compliance.

---

## 🎥 Demo Video

* Showcases **real-time resume creation** (e.g., Ali Khan, CS Graduate).
* AI-generated summaries, template switching, and PDF downloads.
* Highlights **Kiro’s role** in accelerating development.

*(Add YouTube/Vercel link here)*

---

## 🚧 Challenges Faced

* **TypeScript Errors:** Fixed issues like `Cannot find name 'ResumeState'` by standardizing `ResumeData` in `lib/store.ts`.
* **PDF Integration:** Resolved `@react-pdf/renderer` preview issues for reliable downloads.
* **Kiro Learning Curve:** Overcame initial confusion via docs and Discord community.

---

## 🔮 Future Enhancements

* AI skill analysis for **job-specific keyword optimization**.
* Integrate **live portfolio generation**.
* Support **multilingual resumes** (Urdu, Hindi, etc.).

---

## 📜 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

---

## 🙌 Acknowledgments

* **Code with Kiro Hackathon** — for the opportunity to build with an AI-powered IDE.
* **OpenAI** — for powering the AI summary generator.
* **DEV Community** — for valuable feedback (Aug 31, 2025).

---

## 👩‍💻 Author

**Hadiqa Gohar** — [tasleemhadiqa76@gmail.com](mailto:tasleemhadiqa76@gmail.com)

---

✨ *HG-AI-Resume-Builder: Create professional, ATS-friendly resumes in minutes with AI & Kiro integration!*
