// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { GoogleGenerativeAI } from 'npm:@google/generative-ai';

const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { text, target } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: "CV text is required" }), {
        status: 400,
      });
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `The user is trying to apply to the following target position: \n${
      target ?? "NOT PROVIDED"
    }.\n\n Review the following CV and provide constructive feedback for improvement:\n${text}.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return new Response(JSON.stringify({ feedback: response.text() }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/ai-cv-feedback' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
