# 💬 InnovaChat AI

InnovaChat AI is a modern AI-powered chat application that integrates Google's Gemini API to generate intelligent responses. It features user authentication, chat history storage via Supabase, and a sleek responsive UI powered by React.

[🌐 Live Demo](https://innovachat.vercel.app)

---

## ✨ Features

- ✅ Chat with Gemini 1.5 Flash API (Google AI)
- 🔐 Authentication using Supabase
- 💾 Chat history stored securely in Supabase DB
- 🌓 Light / Dark theme switch
- 🖼️ AI-generated image detection in chat
- 🧹 Clear chat history feature
- ⚡ Fast and responsive user interface
- 🛠️ Built with Vite + ReactJS

---

## 🧪 Tech Stack

| Frontend | Backend / Auth / DB | AI Integration |
|----------|----------------------|----------------|
| React.js, TailwindCSS | Supabase (Auth + DB) | Gemini 1.5 Flash API |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/kunalvvs/InnovaChatAI.git
cd InnovaChatAI/InnovaChatAI
```

2. Install Dependencies
```
npm install
```
4. Add Environment Variables
Create a .env file in the root directory:


```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```
4. Run the Development Server

```
npm run dev
```
📁 Project Structure

```
InnovaChatAI/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── main.jsx
├── .env
├── index.html
├── vite.config.js
└── README.md
```
📸 Screenshots

![image](https://github.com/user-attachments/assets/0c212be6-d688-48e2-8888-6d24924ad5cd)


📃 License
This project is licensed under the MIT License.

🔗 Links
🌐 Live Site: https://innovachat.vercel.app

📦 Repo: InnovaChatAI
