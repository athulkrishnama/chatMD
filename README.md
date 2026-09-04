<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# ChatMD 🎯

## Basic Details
### Team Name: lonewolf

### Team Members
- Team Lead: Athul Krishna M A - Brototype

### Project Description
ChatMD is a hyper-invasive, neo-brutalist Chat Wrapped experience for WhatsApp Web. It locally parses your chat history, feeds it to an AI, and spits out a 12-page brutal psychological teardown of your texting habits.

### The Problem (that doesn't exist)
People are living their lives perfectly happily without knowing who "carried" their WhatsApp conversations, who is the slowest texter, and exactly what percentage of the time they initiate conversations. Ignorance is bliss, but where is the fun in that?

### The Solution (that nobody asked for)
An aggressively colorful Chrome Extension that forcefully scrapes your WhatsApp Web DOM, processes thousands of your messages on your local device to preserve privacy, and then uses AI to ruthlessly psychoanalyze your relationship dynamic. It scores your chat chemistry, exposes your most used emojis, and renders a 12-chapter "Wrapped" story that you can cry over or share with friends.

## Technical Details
### Technologies/Components Used
For Software:
- **Languages:** TypeScript, HTML, CSS
- **Frameworks:** React, Vite, Express.js, Framer Motion
- **Databases & APIs:** MongoDB, OpenRouter API (Gemini/Claude)
- **Tools:** TailwindCSS, Chrome Extension API (Manifest V3)

### Implementation
For Software:

# How to load the Extension from a ZIP file
If you want to use the extension without building it from source, follow these steps:
1. Download the `extension.zip` file from the **Releases** section of this repository.
2. Extract the ZIP file to a folder on your computer.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Turn on **"Developer mode"** (the toggle switch in the top right corner).
5. Click the **"Load unpacked"** button in the top left.
6. Select the extracted folder containing the extension files.
7. The ChatMD extension is now installed! Open WhatsApp Web and click the extension icon to start.

# Installation (For Developers)
```bash
# 1. Clone the repository
git clone https://github.com/your-username/chatmd.git
cd chatmd

# 2. Setup the Backend API
cd api
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI and OpenRouter API Key

# 3. Setup the Chrome Extension (Frontend)
cd ../extension
npm install
cp .env.example .env
# Ensure VITE_API_URL and VITE_WEB_URL point to your hosted backend (or localhost:3000)
```

# Run
```bash
# 1. Start the Backend API
cd api
npm run dev

# 2. Build the Extension
cd extension
npm run build
# Then load the generated /dist folder into Chrome as an unpacked extension via chrome://extensions
```

### Project Documentation
For Software:

# Screenshots (Add at least 3)
![Screenshot1](Add screenshot 1 here with proper name)
*The Neo-Brutalist Intro Screen generating the Wrapped data*

![Screenshot2](Add screenshot 2 here with proper name)
*Who Carried This Chat? Exposing the message balance*

![Screenshot3](Add screenshot 3 here with proper name)
*The Grand Calculation: The AI roasting the relationship dynamic*

# Diagrams
![Workflow](Add your workflow/architecture diagram here)
*Workflow: Extension DOM Scraping -> Local Analytics Processing -> Backend AI Analysis -> MongoDB Storage -> React Story Viewer*

### Project Demo
# Video
[Add your demo video link here]
*This video demonstrates scraping a live WhatsApp Web chat and viewing the 12-page generated story.*

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- **Athul Krishna M A**: Built the Chrome Extension DOM parser, the Express/MongoDB Backend, the OpenRouter AI integration, and the 12-page Neo-Brutalist React UI.

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
