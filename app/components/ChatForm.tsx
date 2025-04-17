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


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            const form = e.currentTarget.form
            if (form) {
                handleSubmit(new FormEvent(form))
            }
        }
    }


    return (
        <div>
    
        </div>
    )
    
    
}




