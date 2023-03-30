import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  organization: process.env.OPENAI_ORD_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(config);
export default openAi;
