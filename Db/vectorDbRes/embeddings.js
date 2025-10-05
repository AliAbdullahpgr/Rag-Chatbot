import { pipeline } from '@xenova/transformers'
import data from './question.js'
const question = data.question;
async function createEmbeddings(question) {
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
    const output = await extractor(question, { pooling: 'mean', normalize: true })
    const embeddings = Array.from(output.data)
    console.log('\n✅ All embeddings generated successfully!\n')
    return embeddings
}

const embeddings = await createEmbeddings(question)

export default embeddings
