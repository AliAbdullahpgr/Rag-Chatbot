# AI Chat Assistant with RAG

A modern AI-powered chat application built with React and Vite, featuring Retrieval-Augmented Generation (RAG) capabilities powered by Google's Gemini AI and vector embeddings.

## Features

- 💬 Interactive chat interface with real-time responses
- 🧠 RAG (Retrieval-Augmented Generation) for context-aware answers
- 🎨 Modern dark-themed UI with Tailwind CSS
- ⚡ Fast development experience with Vite
- 📝 Markdown support for formatted responses
- 🔍 Vector-based document retrieval using Transformers.js
- 💾 Supabase integration for data persistence

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **AI/ML**: 
  - Google Generative AI (Gemini)
  - Transformers.js for embeddings
- **Database**: Supabase
- **UI Components**: FontAwesome icons, React Markdown

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key
- Supabase account (optional, for data persistence)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd gpt
```

2. Install dependencies:
```bash
npm install
```

3. Configure your environment:
   - Set up your Gemini API key in `src/config/ragConfig.js`
   - Configure Supabase credentials if using database features

## Usage

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

### Lint

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
├── src/
│   ├── components/      # React components
│   │   ├── MainCard.jsx # Main chat interface
│   │   └── Sidebar.jsx  # Sidebar navigation
│   ├── services/        # RAG and API services
│   ├── config/          # Configuration files
│   ├── assets/          # Static assets
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Public assets
├── Db/                  # Database resources
└── index.html           # HTML template
```

## Configuration

Update the configuration in `src/config/ragConfig.js` with your API keys and settings:

```javascript
export default {
  gemini: {
    apiKey: 'YOUR_GEMINI_API_KEY'
  }
  // Add other configurations as needed
}
```

## Features in Detail

### RAG Workflow
The application uses a Retrieval-Augmented Generation workflow that:
1. Processes user queries
2. Retrieves relevant context from a vector database
3. Generates contextually accurate responses using Gemini AI

### Chat Interface
- Clean, modern dark-themed UI
- Real-time message streaming
- Markdown rendering for formatted responses
- Loading states and error handling
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.

## Acknowledgments

- Google Generative AI for the Gemini API
- Hugging Face for Transformers.js
- Supabase for backend services
