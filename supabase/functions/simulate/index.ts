import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const inputSchema = z.object({
  goal: z.string().min(1, "Goal is required").max(5000, "Goal too long"),
  params: z.object({
    complexity: z.number().min(1).max(10),
    innerSteps: z.number().int().min(1).max(500),
    metaFrequency: z.number().int().min(1).max(100),
    heisenberg: z.number().min(0).max(1)
  }),
  language: z.enum(['ru', 'en'])
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Authenticated user:", user.id);

    // Parse and validate input
    let body;
    try {
      body = await req.json();
    } catch {
      console.error("Invalid JSON in request body");
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const validationResult = inputSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Input validation failed:", validationResult.error.errors);
      return new Response(JSON.stringify({ error: 'Invalid input parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { goal, params, language } = validationResult.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Starting simulation for goal (truncated):", goal.substring(0, 100), "params:", params, "language:", language, "user:", user.id);

    const systemPrompt = `You are a "AI Genius" simulator based on the GRA-Heisenberg architecture. Your task is to conduct deep scientific-philosophical analysis of the user's research goal.

The architecture works as follows:
1. Inner Loop: iterative theory refinement through minimization of functional Φ(θ) = H(θ) + λ·R(θ)
2. Outer Loop: meta-adaptation of Heisenberg uncertainty ε and goals G

Simulation parameters:
- Complexity: ${params.complexity}/10
- Inner loop steps: ${params.innerSteps}
- Meta-iteration frequency: every ${params.metaFrequency} steps
- Initial Heisenberg uncertainty: ${params.heisenberg}

You MUST return a valid JSON object with this EXACT structure (no markdown, no code blocks):
{
  "formalization": {
    "ru": "Russian: formalized description of the problem using mathematical notation",
    "en": "English: formalized description of the problem using mathematical notation", 
    "complexity": <number between 2 and 8>
  },
  "innerLoop": {
    "trajectory": [
      {"t": 0, "phi": 1.0, "entropy": 0.5},
      ... generate ${Math.min(params.innerSteps, 50)} realistic trajectory points with decreasing phi and varying entropy
    ],
    "phiFinal": <final phi value, small number like 0.05-0.2>,
    "entropyFinal": <final entropy value 0.1-0.5>,
    "heisenbergUsed": ${params.heisenberg}
  },
  "outerLoop": {
    "iterations": [
      {"k": 0, "heisenberg": <value>, "goalUpdate": {"ru": "Russian update description", "en": "English update description"}, "lambdas": [<3 numbers>]},
      ... generate ${Math.ceil(params.innerSteps / params.metaFrequency)} meta-iterations
    ],
    "totalIterations": <number of iterations>,
    "finalHeisenberg": <final heisenberg value>,
    "convergenceRate": <0.7-0.95>
  },
  "conclusion": {
    "summary": {"ru": "Russian summary of findings", "en": "English summary of findings"},
    "hypotheses": [
      {"ru": "Russian hypothesis 1", "en": "English hypothesis 1"},
      {"ru": "Russian hypothesis 2", "en": "English hypothesis 2"},
      {"ru": "Russian hypothesis 3", "en": "English hypothesis 3"}
    ],
    "predictions": [
      {"ru": "Russian prediction 1", "en": "English prediction 1"},
      {"ru": "Russian prediction 2", "en": "English prediction 2"}
    ]
  },
  "diagnostics": {
    "geniusScore": <0.6-0.95>,
    "phiProximity": <0.6-0.95>,
    "pathOptimality": <0.5-0.9>,
    "coherence": <0.7-0.95>,
    "stability": <0.65-0.95>
  }
}

IMPORTANT: 
- Generate meaningful, scientific content related to the research goal
- Use proper mathematical notation where appropriate (Φ, ψ, ℏ, etc.)
- Make trajectory data realistic with decreasing phi values
- All text fields must have both "ru" and "en" versions
- Return ONLY the JSON, no explanations`;

    const userPrompt = `Research goal: "${goal}"

Generate a complete simulation result with realistic data. The content should be scientifically meaningful and relate to the research goal. Generate trajectory with ${Math.min(params.innerSteps, 50)} points and ${Math.ceil(params.innerSteps / params.metaFrequency)} meta-iterations.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Request failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error("No content in AI response");
      return new Response(JSON.stringify({ error: "Request failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("AI response received, parsing...");

    // Parse JSON from response (handle potential markdown wrapping)
    let result;
    try {
      // Try to extract JSON from potential markdown code blocks
      let jsonStr = content;
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      } else {
        // Try to find raw JSON object
        const objMatch = content.match(/\{[\s\S]*\}/);
        if (objMatch) {
          jsonStr = objMatch[0];
        }
      }
      
      // Fix invalid escape sequences in JSON (LaTeX backslashes like \forall, \zeta, etc.)
      // Replace single backslashes with double backslashes, but preserve already escaped ones
      jsonStr = jsonStr.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
      
      result = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, "Content:", content.substring(0, 500));
      return new Response(JSON.stringify({ error: "Request failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!result.formalization || !result.innerLoop || !result.outerLoop || !result.conclusion || !result.diagnostics) {
      console.error("Missing required fields in result:", Object.keys(result));
      return new Response(JSON.stringify({ error: "Request failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Simulation completed successfully");

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Simulation error:", error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
