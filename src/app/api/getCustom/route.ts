import OpenAI from "openai";
import { NextResponse } from 'next/server'
import { feetInchesToCm, lbsToKg } from "@/app/utils/conversion";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(request: Request) {
  try {
    // Get the request body
    const data = await request.json()
    const { profile } = data
    // console.log(profile)

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: `
              You are a succinct nutritionist. 
              Given the following details about your client, provide the estimated number of calories they need to maintain their current weight.
              Reply with one number. Omit calories.
              ` },
            {
                role: "user",
                content: 
                 `For a ${profile.age}-year-old ${profile.sex} who is ${feetInchesToCm(profile.height.feet, profile.height.inches)} cm tall, weighs ${lbsToKg(profile.weight)} kg, and has a ${profile.lifestyle} lifestyle, how many calories do they need daily to maintain their weight?`
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