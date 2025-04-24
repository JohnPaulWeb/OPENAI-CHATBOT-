


export const maxDuration = 30

export async function POST(req: Request) {
    try {
        const { messages }: { messages: CoreMessage[] } = await req.json()

        if(!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: "Invalid request: messages array is required" }), { status: 400 })
        }
        
        const result = streamText({
            model: openai("gpt-4o-mini"),
            system: "You are a helpful",
            messages,
            temperature: 0.7,
            maxTokens: 1000,
        })

        return result.toDataStreamResponse()
    } catch (error) {
        console.error("Error in chat API:", error)
        return new Response(JSON.stringify({ error: "An error occured while processing your request idol"}, { status: 500 }))
    }
}