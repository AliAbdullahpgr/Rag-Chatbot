import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xnxknptxhsjfdzowgpnp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueGtucHR4aHNqZmR6b3dncG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzYxODEsImV4cCI6MjA3NTIxMjE4MX0.iS_Sm657cbOakO7oZCP8dHAwNzgE7ZCTU6LNPnihQjg';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkDatabase() {
    console.log('\n🔍 Checking Supabase Database...\n');
    console.log('='.repeat(70));
    
    try {
        // Count total documents
        const { count, error: countError } = await supabase
            .from('documents')
            .select('*', { count: 'exact', head: true });
        
        if (countError) throw countError;
        
        console.log(`📊 Total documents in database: ${count}`);
        
        // Get all documents (or first 10)
        const { data, error } = await supabase
            .from('documents')
            .select('id, content')
            .limit(10);
        
        if (error) throw error;
        
        console.log('\n📄 Documents in database:\n');
        console.log('='.repeat(70));
        
        if (data && data.length > 0) {
            data.forEach((doc, index) => {
                console.log(`\n${index + 1}. ID: ${doc.id}`);
                console.log(`   Content (first 200 chars):`);
                console.log(`   ${doc.content.substring(0, 200)}...`);
                console.log('-'.repeat(70));
            });
        } else {
            console.log('⚠️  No documents found in database!');
            console.log('\n💡 Run this to insert data:');
            console.log('   cd Db/vectorDb && node supabase.js');
        }
        
        console.log('\n' + '='.repeat(70));
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

await checkDatabase();
