


export const maxDuration = 30

export async function POST(req: Request) {
    try {
        const { messages }: { messages: CoreMessage[] } = await req.json()

        if(!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: "Invalid request: messages array is required" }), { status: 400 })
        }

        const result = streamText
    }
}