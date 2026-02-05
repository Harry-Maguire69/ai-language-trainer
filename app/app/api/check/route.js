import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  const { question, answer } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful language tutor. Be friendly and clear."
      },
      {
        role: "user",
        content: `
French sentence: "${question}"
User's Dutch translation: "${answer}"

Check if the translation is correct.
Explain mistakes if any.
Accept informal but correct Dutch.
`
      }
    ]
  });

  return Response.json({
    feedback: completion.choices[0].message.content
  });
}
