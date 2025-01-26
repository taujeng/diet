import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req) {
  try {
    const { food } = await req.json();

    if (!food || food.trim() === "") {
      return NextResponse.json({ error: "Food item is required." }, { status: 400 });
    }

    const prompt = `How many calories are in ${food}? Provide an approximate value.`;
    const response = await openai.createCompletion({
      model: "gpt-4o-mini-2024-07-18",
      prompt,
      max_tokens: 50,
      temperature: 0.7,
    });

    const calories = response.data.choices[0].text.trim();

    return NextResponse.json({ food, calories });
  } catch (error) {
    console.error("Error fetching calories:", error);
    return NextResponse.json({ error: "Failed to fetch calorie information." }, { status: 500 });
  }
}
