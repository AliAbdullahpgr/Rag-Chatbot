import React, { useEffect } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { ragWorkflow, initializeGemini } from '../services/ragService'
import config from '../config/ragConfig'
import Markdown from 'react-markdown'

const MainCard = () => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        initializeGemini(config.gemini.apiKey)
    }, [])
    
    const handleInputChange = (e) => {
        setInput(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim()) return
        
        const userMessage = { type: 'user', content: input, id: Date.now() }
        setMessages(prev => [...prev, userMessage])
        
        const currentInput = input
        setInput('')
        setIsLoading(true)
        
        try {
            const result = await ragWorkflow(currentInput)
            
            const aiMessage = { 
                type: 'ai', 
                content: result.answer,
                sources: result.sources,
                id: Date.now() + 1 
            }
            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('Error in RAG workflow:', error)
            console.error('Full error details:', JSON.stringify(error, null, 2))
            
            let errorMsg = error.message || 'Unknown error occurred'
            if (errorMsg.includes('<!DOCTYPE')) {
                errorMsg = 'API endpoint error. Please verify your Gemini API key is correct.'
            }
            
            const errorMessage = { 
                type: 'ai', 
                content: `Sorry, I encountered an error: ${errorMsg}. Please check the console for more details.`,
                id: Date.now() + 1 
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex-1 w-full h-full text-white flex flex-col bg-[rgb(25,26,26)]">
            {messages.length === 0 ? (
                <div className="flex-1 w-full flex flex-col gap-20 justify-center items-center ">
                    <h1 className="text-5xl ">AI Chat Assistant</h1>
                    <form
                        onSubmit={handleSubmit}
                        action=""
                        className="border-[1px] border-solid border-gray-700 gap-10 w-[750px] p-4 rounded-4xl bg-[rgb(31,33,33)] flex items-center justify-center"
                    >
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            className="pl-3 chatInput w-full h-[24px] overflow-hidden resize-none bg-transparent text-white placeholder-gray-400 border-0 outline-none"
                            placeholder="Ask anything"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmit(e)
                                }
                            }}
                        />
                        <button
                            className="bg-blue-500 px-3 py-2 rounded-4xl hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                            type="submit"
                            disabled={!input.trim()}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />{' '}
                        </button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                        <div className="max-w-4xl mx-auto space-y-6">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.type === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`max-w-2xl p-4 rounded-lg ${
                                            message.type === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-[rgb(31,33,33)] border border-gray-700 text-white'
                                        }`}
                                    >
                                        <div className="prose prose-invert max-w-none whitespace-pre-wrap">
                                            <Markdown>{message.content}</Markdown>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-2xl p-4 rounded-lg bg-[rgb(31,33,33)] border border-gray-700 text-white">
                
                                        <div className="flex items-center space-x-2">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: '0.1s' }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: '0.2s' }}
                                                ></div>
                                            </div>
                                            <span className="text-gray-400 text-sm">
                                                Thinking...
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className=" bg-[rgb(25,26,26)] p-4">
                        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                            <div className="border border-gray-700 rounded-4xl bg-[rgb(31,33,33)] flex items-center p-3">
                                <textarea
                                    value={input}
                                    onChange={handleInputChange}
                                    className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 outline-none resize-none px-3 py-2"
                                    placeholder="Ask a follow-up question..."
                                    rows="1"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSubmit(e)
                                        }
                                    }}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 p-2 rounded-4xl ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default MainCard
