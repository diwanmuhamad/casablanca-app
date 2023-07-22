import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { sendSuccessMsg } from "../../commons/response";
import { BufferMemory } from "langchain/memory";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";

const questionAnswer = async (req: any, res: any) => {
  const reqBody = JSON.parse(JSON.stringify(req?.body));
  /* Initialize the LLM to use to answer the question */
  const model = new ChatOpenAI({});
  /* Load in the file we want to do question answering over */
  const loader = new DirectoryLoader(
    "src/files",
    {
      ".csv": (path) => new CSVLoader(path),
    }
  );

  const text: any = await loader.load();
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(text, new OpenAIEmbeddings());
  /* Create the chain */
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      memory: new BufferMemory({
        memoryKey: "chat_history", // Must be set to "chat_history"
      }),
    }
  );
  /* Ask it a question */
  const question = `${reqBody?.question}`;
  const result = await chain.call({ question });

  return sendSuccessMsg(res, {
    data: result.text,
    message: "answer successfully generated!",
  });
};

export { questionAnswer };
