import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful nutritionist." },
        {
            role: "user",
            content: "How many calories are in a muffin?",
        },
    ],
    store: true,
});

console.log(completion.choices[0].message);