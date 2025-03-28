// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { GoogleGenerativeAI } from 'npm:@google/generative-ai';

import { corsHeaders } from '../_shared/cors';

const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders  })
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const contentType = req.headers.get("content-type");

    let text = "";
    let target = "";

    if (contentType?.includes("application/json")) {
      // Handle JSON input (text-based CV)
      const body = await req.json();
      text = body.text;
      target = body.target || "NOT PROVIDED";

      const genAI = new GoogleGenerativeAI(geminiApiKey!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `The user is trying to apply to the following target position: \n${target}.\n\n Review the following CV and provide constructive feedback for improvement:\n${text}.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;

      return new Response(JSON.stringify({ feedback: response.text() }), {
        headers: { "Content-Type": "application/json" },
      });
    } else if (contentType?.includes("multipart/form-data")) {
      // Handle file upload (PDF)
      const formData = await req.formData();
      const targetValue = formData.get("target");
      const file = formData.get("file") as File;

      if (!file || file.type !== "application/pdf") {
        return new Response(
          JSON.stringify({ error: "Only PDF files are supported" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      target = targetValue?.toString() || "NOT PROVIDED";

      const fileBuffer = await file.arrayBuffer();

      const contents = [
        {
          text: `The user is trying to apply to the following target position: \n${target}.\n\n Review the following CV and provide constructive feedback for improvement based on the provided file`,
        },
        {
          inlineData: {
            mimeType: "application/pdf",
            data: Buffer.from(fileBuffer).toString("base64"),
          },
        },
      ];

      const genAI = new GoogleGenerativeAI(geminiApiKey!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(contents);
      const response = await result.response;
      return new Response(JSON.stringify({ feedback: response.text() }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported content type" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
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
