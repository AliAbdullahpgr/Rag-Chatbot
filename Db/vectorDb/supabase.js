import { createClient } from '@supabase/supabase-js'
import chunks from './chunks.js';
import embeddings from './embeddings.js'
const supabase = createClient(
    'https://xnxknptxhsjfdzowgpnp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueGtucHR4aHNqZmR6b3dncG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzYxODEsImV4cCI6MjA3NTIxMjE4MX0.iS_Sm657cbOakO7oZCP8dHAwNzgE7ZCTU6LNPnihQjg'
)

async function storeInSupabase(chunks, embeddings) {
    const records = chunks.map( (chunk, index ) => ({
        content: chunk,
        embedding: embeddings[index]
    }));
    const {error} = await supabase.from('documents').insert(records);
    if (error) {
        console.error('Error inserting records:', error);
    } else {
        console.log('Records inserted successfully');
    }
}

await storeInSupabase(chunks, embeddings);

