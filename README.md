# RAG Chatbot

A modern, intelligent chatbot powered by Retrieval-Augmented Generation (RAG) technology. This application combines the power of Google Gemini AI with semantic search capabilities to provide context-aware responses based on your custom knowledge base.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

## ✨ Features

- 🤖 **AI-Powered Chat Interface** - Conversational UI powered by Google Gemini 2.0
- 🔍 **Semantic Search** - Uses Hugging Face embeddings for intelligent document retrieval
- 📚 **RAG Architecture** - Retrieval-Augmented Generation for context-aware responses
- 💾 **Vector Database** - Supabase integration for efficient similarity search
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast & Efficient** - Built with Vite for optimal performance
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19.1** - Modern React with latest features
- **Vite 7.1** - Next-generation frontend tooling
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **React Markdown** - Markdown rendering support
- **FontAwesome** - Icon library

### AI & ML
- **Google Gemini AI** - Advanced language model (gemini-2.0-flash-exp)
- **Hugging Face Transformers** - Embedding generation (BAAI/bge-small-en-v1.5)
- **@xenova/transformers** - Client-side ML capabilities

### Database
- **Supabase** - Vector database for semantic search
- PostgreSQL with pgvector extension

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git**

You'll also need API keys for:
- Google Gemini API
- Hugging Face API
- Supabase account

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AliAbdullahpgr/Rag-Chatbot.git
   cd Rag-Chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Google Gemini API
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   
   # Hugging Face API
   VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Set up Supabase Database**
   
   In your Supabase project, you'll need to:
   - Enable the pgvector extension
   - Create a `documents` table with vector columns
   - Set up the `match_documents` RPC function for similarity search
   
   Refer to the `.env.example` file in `Db/vectorDbRes/` for additional configuration.

## 🎯 Usage

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 📂 Project Structure

```
Rag-Chatbot/
├── src/
│   ├── components/          # React components
│   │   ├── MainCard.jsx     # Main chat interface
│   │   └── Sidebar.jsx      # Sidebar navigation
│   ├── services/            # Business logic
│   │   └── ragService.js    # RAG workflow implementation
│   ├── config/              # Configuration files
│   │   └── ragConfig.js     # RAG and API configuration
│   ├── assets/              # Static assets
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── Db/
│   └── vectorDbRes/         # Database utilities
│       ├── embeddingUtils.js    # Embedding generation
│       └── searchUtils.js       # Vector search utilities
├── public/                  # Public assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── eslint.config.js        # ESLint configuration
└── package.json            # Project dependencies
```

## 🔧 Configuration

### RAG Configuration

Edit `src/config/ragConfig.js` to customize:

- **Chunk Settings**: Document chunking size and overlap
- **Match Settings**: Similarity threshold and result count
- **Model Selection**: Choose different AI models
- **Embedding Dimensions**: Configure vector dimensions

```javascript
rag: {
    chunkSize: 1000,           // Size of document chunks
    chunkOverlap: 200,         // Overlap between chunks
    matchThreshold: 0.2,       // Similarity threshold (0-1)
    matchCount: 5,             // Number of similar docs to retrieve
    embeddingDimensions: 384,  // Vector dimensions
}
```

## 🎨 Features in Detail

### RAG Workflow

1. **Document Ingestion**: Upload documents to build your knowledge base
2. **Embedding Generation**: Converts text to vector embeddings using Hugging Face
3. **Vector Storage**: Stores embeddings in Supabase with pgvector
4. **Semantic Search**: Retrieves relevant documents based on query similarity
5. **AI Response**: Google Gemini generates context-aware responses

### Chat Interface

- Real-time message streaming
- Markdown rendering for formatted responses
- Loading indicators
- Error handling with user-friendly messages
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

## 🔐 API Keys Setup

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env` as `VITE_GEMINI_API_KEY`

### Hugging Face API
1. Visit [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Create a new access token
3. Add to `.env` as `VITE_HUGGINGFACE_API_KEY`

### Supabase
1. Create a project at [Supabase](https://supabase.com)
2. Get your project URL and anon key from project settings
3. Add to `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) for the powerful AI model
- [Hugging Face](https://huggingface.co/) for embedding models
- [Supabase](https://supabase.com/) for the vector database
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) teams for excellent tooling

## 📧 Contact

Ali Abdullah - [@AliAbdullahpgr](https://github.com/AliAbdullahpgr)

Project Link: [https://github.com/AliAbdullahpgr/Rag-Chatbot](https://github.com/AliAbdullahpgr/Rag-Chatbot)

---

⭐ Star this repository if you find it helpful!
