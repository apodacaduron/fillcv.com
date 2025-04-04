// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { GoogleGenerativeAI } from 'npm:@google/generative-ai';

import { corsHeaders } from '../_shared/cors.ts';
import { structureAndFeedback } from '../_shared/resume.ts';
import { supabase } from '../_shared/supabaseClient.ts';

const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i += 1024) {
    binary += String.fromCharCode(...bytes.slice(i, i + 1024));
  }
  return btoa(binary);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabase.auth.getUser(token);
    const userId = data?.user?.id;
    const contentType = req.headers.get("content-type");

    let target_position = "";

    if (contentType?.includes("application/json")) {
      // Handle JSON input (text-based CV)
      const userResume = await req.json();
      target_position = userResume.target_position || "NOT PROVIDED";

      if (
        !userResume?.personal_info ||
        !userResume?.experience ||
        !userResume?.education ||
        !userResume?.languages
      ) {
        return new Response(
          JSON.stringify({ error: "Missing resume information" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      const genAI = new GoogleGenerativeAI(geminiApiKey!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result =
        await model.generateContent(`The user is trying to apply to the following target position: \n${target_position}.\n\n Review the following CV and provide constructive professional detailed feedback for improvement based on the provided information you can even add examples: \n${JSON.stringify(
          userResume
        )}.
      
      Additionally, based on user information arrange it in the following structure shared below, for the structure key the information i gave you has dummy text please replace it with the information given and if something is missing just leave it blank 
      
      The response must be in JSON format with the following structure and add a short feedback title:
      
      ${JSON.stringify(structureAndFeedback)}
      `);
      const response = await result.response;
      const cleaned = response
        .text()
        .trim()
        .replace(/^```json\s*|\s*```$/g, "");
      const parsedResponse = JSON.parse(cleaned);

      const resume = await supabase
        .from("resumes")
        .insert({ ...parsedResponse.structure, user_id: userId })
        .select()
        .single();
      const feedback = await supabase
        .from("feedbacks")
        .insert({
          feedback_text: parsedResponse.feedback,
          feedback_title: parsedResponse.feedback_title,
          user_id: userId,
          resume_id: resume?.data?.id,
          target_position,
        })
        .select()
        .single();
      await supabase.from("conversations").insert({
        sender: "model",
        user_id: userId,
        feedback_id: feedback?.data?.id,
        message: parsedResponse.feedback,
      });

      return new Response(JSON.stringify(feedback), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } else if (contentType?.includes("multipart/form-data")) {
      // Handle file upload (PDF)
      const formData = await req.formData();
      const targetPosition = formData.get("target_position");
      const file = formData.get("file") as File;

      const MAX_FILE_SIZE = 2 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        return new Response(
          JSON.stringify({ error: "File size exceeds 2MB limit" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      if (!file || file.type !== "application/pdf") {
        return new Response(
          JSON.stringify({ error: "Only PDF files are supported" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      target_position = targetPosition?.toString() || "NOT PROVIDED";

      const fileBuffer = await file.arrayBuffer();

      const genAI = new GoogleGenerativeAI(geminiApiKey!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        {
          text: `The user is trying to apply to the following target position: \n${target_position}.\n\n Review the following CV and provide constructive professional detailed feedback for improvement based on the provided file you can even add examples. 
                
                Additionally, based on the PDF extract the information and arrange it in the following structure shared below, for the structure key the information i gave you has dummy text please replace it with the information given and if something is missing just leave it blank 
                
                The response must be in JSON format with the following structure and add a short feedback title:
                
                ${JSON.stringify(structureAndFeedback)}
                `,
        },
        {
          inlineData: {
            mimeType: "application/pdf",
            data: arrayBufferToBase64(fileBuffer),
          },
        },
      ]);
      const response = await result.response;
      const cleaned = response
        .text()
        .trim()
        .replace(/^```json\s*|\s*```$/g, "");
      const parsedResponse = JSON.parse(cleaned);

      const resume = await supabase
        .from("resumes")
        .insert({ ...parsedResponse.structure, user_id: userId })
        .select()
        .single();
      const feedback = await supabase
        .from("feedbacks")
        .insert({
          feedback_text: parsedResponse.feedback,
          feedback_title: parsedResponse.feedback_title,
          user_id: userId,
          resume_id: resume?.data?.id,
          target_position,
        })
        .select()
        .single();
      await supabase.from("conversations").insert({
        sender: "model",
        user_id: userId,
        feedback_id: feedback?.data?.id,
        message: parsedResponse.feedback,
      });

      return new Response(JSON.stringify(feedback), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported content type" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
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
