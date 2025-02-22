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
              Given the following details about your client, provide the estimated number of calories and protein they need to maintain their current weight.
              Reply with an object structured exactly like this format with no spaces after colons: {"calories":2000,"protein":150}
              ` },
            {
                role: "user",
                content: 
                 `User is ${profile.age}-year-old ${profile.sex} who is ${feetInchesToCm(profile.height.feet, profile.height.inches)} cm tall, weighs ${lbsToKg(profile.weight)} kg, and has a ${profile.lifestyle} lifestyle.`
            },
        ],
        temperature: 0.1,
        store: true,
    });

    // console.log(completion)
    console.log(completion.choices[0].message.content);
    const res = completion.choices[0].message.content;
    const resObject = typeof res === 'string' ? JSON.parse(res) : res;


    return NextResponse.json({ 
      success: true, 
      user: resObject
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 400 }
    )
  }
}