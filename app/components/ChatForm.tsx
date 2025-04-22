"use client"

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Loader2Icon, TrashIcon } from "lucide-react";
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

    const messageList = (
        <div className="my-4 flex h-fit min-h-full flex-col gap-4">
            {messages.map((message, index) => (
                <div key={index} data-role={message.role} className="max-w-[80%] rounded-xl px-3 py-2 text-sm data-[role-assistant]:self-start
                 data-[role=user]:self-end data-[role=assistant]:bg-gray-100 data-[role=user]:bg-blue-500 data-[role=assistant]:text-black data-[role=user]:text-white">

                    {message.content}

                </div>
            ))}

            {isLoading && (
                <div className="self-start rounded-xl bg-gray-100 px-3 py-2 text-sm">
                    <Loader2Icon className="animate-spin" size={16} />
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    )

    
    return (
       <TooltipProvider>
        <main className={cn("ring-none mx-auto flex h-svh max-h-svh w-full max-w-[35rem] flex-col items-stretch border-none", className,

        )}
            {...props}
            >

                <div className="flex justify-between items-center px-6 py-2 border-b">
                    <h2 className="text-lg font-medium">Chat with AI</h2>


                    {messages.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearChat} className="text-muted-foreground hover:text-destructive">
                            <TrashIcon size={16} className="mr-1" />
                        </Button>
                    )}
                </div>

                <div className="flex-1 content-center overflow-y-auto px-6">
                    {messages.length ? messageList : header}
                </div>

                <form onSubmit={handleSubmit} className="border">

                </form>
        

        </main>
       </TooltipProvider>
    )
    
    
}




