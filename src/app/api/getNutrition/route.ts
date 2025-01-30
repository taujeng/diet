// import { Configuration, OpenAI } from "openai";
// import { NextResponse } from "next/server";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAI(configuration);

// export async function POST(req) {
//   console.log("API Key:", process.env.OPENAI_API_KEY);
//   try {
//     const { food } = await req.json();

//     if (!food || food.trim() === "") {
//       return NextResponse.json({ error: "Food item is required." }, { status: 400 });
//     }

//     // Define the chat model and prompt
//     const messages = [
//       {
//         role: "system",
//         content: "You are a helpful nutritionist with knowledge of food calories.",
//       },
//       {
//         role: "user",
//         content: `How many calories are in ${food}? Provide an approximate value and only answer in numbers.`,
//       },
//     ];

//     // Using the new chat completion API
//     const response = await openai.createChatCompletion({
//       model: "gpt-4o-mini-2024-07-18", // Ensure this is the correct model ID
//       messages,
//       max_tokens: 50,
//       temperature: 0.7,
//     });

//     // Extract the calories information from the response
//     const calories = response.data.choices[0].message.content.trim();

//     return NextResponse.json({ food, calories });
//   } catch (error) {
//     console.error("Error fetching calories:", error);
//     return NextResponse.json({ error: "Failed to fetch calorie information." }, { status: 500 });
//   }
// }



// import OpenAI from "openai";
// const openai = new OpenAI();

// const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//         { role: "system", content: "You are a succint nutritionist. Just answer with the estimated number of calories. No range, one number. Omit 'calories'" },
//         {
//             role: "user",
//             content: "How many calories are in a muffin?",
//         },
//     ],
//     temperature: 0.1,
//     store: true,
// });

// console.log(completion.choices[0].message);


import OpenAI from "openai";
import { NextResponse } from 'next/server'

// Initialize OpenAI instance with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in environment variables
});

export async function POST(request: Request) {
  try {
    // Get the request body
    const data = await request.json()
    const { food } = data
    console.log(food)

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a succinct nutritionist. Just answer with the estimated number of calories. Answer with an array. First number is calories, 2nd item is protein." },
            {
                role: "user",
                content: `How many calories and protein are in a ${food}?`,
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