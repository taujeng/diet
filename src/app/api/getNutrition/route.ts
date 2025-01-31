import OpenAI from "openai";
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(request: Request) {
  try {
    // Get the request body
    const data = await request.json()
    const { food, size } = data
    console.log(food, size)

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: `
              You are a succinct nutritionist. 
              Given a food item and portion size (small, normal, or large), 
              estimate the calorie and protein content. 
              In the event that you don't recognize the food item, just return 0 for calorie and protein count.
              Answer as an array: [calories (integer), protein in grams (integer)].` },
            {
                role: "user",
                content: `For a ${size} portion of ${food}, how many calories and grams of protein does it have?`,
            },
        ],
        temperature: 0.1,
        store: true,
    });

    console.log(completion.choices[0].message);

    return NextResponse.json({ 
      success: true, 
      user: completion.choices[0].message
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 400 }
    )
  }
}