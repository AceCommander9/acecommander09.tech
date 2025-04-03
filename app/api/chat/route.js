export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // Extract just the text from the last user message
    const userMessage = messages.filter(msg => msg.role === "user").pop()?.content || "";
    
    // Format conversation history for context (optional)
    let conversationHistory = "";
    if (messages.length > 1) {
      conversationHistory = messages.slice(0, -1)
        .map(msg => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
        .join("\n") + "\n";
    }
    
    // Prepare prompt with system instruction
    const prompt = `
You are CommandBot, an AI assistant for AceCommander09's portfolio website. Be helpful, friendly, and knowledgeable about web development and technology.

${conversationHistory}
User: ${userMessage}
CommandBot:`;

    // Call Hugging Face Inference API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/gemma-7b-it",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Hugging Face API error:", error);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    // Extract the generated text
    let generatedText = result[0]?.generated_text || "";
    
    // Clean up the response (remove the prompt part)
    generatedText = generatedText.replace(prompt, "").trim();
    
    // If the response starts with "CommandBot:", remove it
    if (generatedText.startsWith("CommandBot:")) {
      generatedText = generatedText.substring("CommandBot:".length).trim();
    }

    return Response.json({
      role: "assistant",
      content: generatedText,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return Response.json(
      { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again in a moment." 
      },
      { status: 500 }
    );
  }
}
