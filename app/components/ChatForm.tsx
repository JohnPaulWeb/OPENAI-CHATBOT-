"use client"

import { useChat } from "@ai-sdk/react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";


export default function ChatForm({ className, ...props}: React.ComponentProps<"form">) {
    const messagesEndRef = useRef<HTMLDivElement>(null)


    const {messages, input, setInput, handleSubmit, isLoading, error, reload, stop } = useChat({
        api: "/api/chat",
        id: "main-chat",
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            })
        },
    })

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])


    // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //     if (e.key === "Enter" && !e.shiftKey) {
    //         e.preventDefault()
    //         const form = e.currentTarget.form
    //         if (form) {
    //             handleSubmit(new FormEvent(form))
    //         }
    //     }
    // }

    const clearChat = () => {
        localStorage.removeItem(`ai-chat-main-chat`)
        window.location.reload()
    }

    const header = (
        <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">AI Chatbot</h1>
            <p className="text-muted-foreground text-sm">
                This is an AI chatbot app built in <span className="text-foreground">Nextjs</span>, the{" "}
                <span className="text-foreground">Vercel AI SDK</span>, and
                <span className="text-foreground">OPEN AI</span>
            </p>

            <p className="">Send A Message to start chatting wit the AI assistant </p>
        </header>
    )

    


    return (
        <div>
    
        </div>
    )
    
    
}




