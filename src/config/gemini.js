import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"

const apiKey = 'AIzaSyBpSDuEIeayZ7rcVVym43kYA5suw8yacVE';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt,history = []) {
    const formattedHistory = Array.isArray(history) ? history : [];

    const chatSession = model.startChat({
        generationConfig,
        history: formattedHistory.map(msg => ({
            role: msg.role === "user" ? "user" : "model", // Ensure role is either "user" or "model"
            parts: [{ text: msg.content }], // Wrap content in "parts"
        })),
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
}

export default run;