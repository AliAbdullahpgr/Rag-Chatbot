import searchSimilar from "./similaritySearch";
import question from "./question";

console.log("Starting similarity search...");
console.log(`Question embedding dimension: ${question.length}\n`);
const results = await searchSimilar(question, {
    matchThreshold: 0.5,  // Minimum similarity (0-1)
    matchCount: 5         // Number of results to return
});
