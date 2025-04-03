export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // Add system message to define the bot's personality
    const apiMessages = [
      {
        role: "system",
        content: "You are CommandBot, an AI assistant for AceCommander09's portfolio website. Be helpful, friendly, and knowledgeable about web development and technology."
      },
      ...messages
    ];
    
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // You can use "gpt-4" if you have access
        messages: apiMessages,
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    const assistantMessage = data.choices[0].message;
    
    return Response.json(assistantMessage);
  } catch (error) {
    console.error("Error in chat API:", error);
    return Response.json(
      { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      { status: 500 }
    );
  }
}
