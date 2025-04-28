import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log(prompt);
  const result = await Hf.textGeneration({
    model: "Salesforce/codet5-base",
    inputs: `${prompt}`,
    parameters: {
      // This limits the maximum number of tokens the model can generate in response to your input
      max_new_tokens: 128,
      //   This controls the randomness or creativity of the output.
      temperature: 0.7,
      //   This controls whether the model returns the original prompt along with the output.
      return_full_text: false,
    },
  });

  return NextResponse.json({ result });
}
