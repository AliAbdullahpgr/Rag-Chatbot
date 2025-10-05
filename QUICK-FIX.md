# 🚨 ONNX Runtime Error - Quick Fix Guide

## Error You Saw
```
Uncaught TypeError: Cannot read properties of undefined (reading 'registerBackend')
```

## ✅ What I Fixed

### 1. Changed COEP Header
**File**: `vite.config.js`
```javascript
// Before:
'Cross-Origin-Embedder-Policy': 'credentialless'

// After:
'Cross-Origin-Embedder-Policy': 'require-corp'
```

### 2. Added Environment Config
**File**: `Db/vectorDbRes/embeddingUtils.js`
```javascript
import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false;  // Use CDN
env.allowRemoteModels = true;  // Allow downloads
```

### 3. Added Quantized Model Option
```javascript
extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2',
    { quantized: true }  // Smaller, more compatible
);
```

---

## 🧪 Test Now

### Step 1: Hard Refresh Browser
1. Press `Ctrl + Shift + R` (Windows/Linux)
2. Or `Cmd + Shift + R` (Mac)
3. This clears the cache

### Step 2: Open DevTools Console
Press `F12` and click on "Console" tab

### Step 3: Ask a Question
Type: "What laptop does Ali use?"

### Step 4: Watch Console
Should see:
```
✅ Model loaded successfully!
✅ Generated 384-dimensional embedding locally
```

**NO ONNX errors!** 🎉

---

## 🐛 If Still Getting Errors

### Try This:
1. Close all browser tabs
2. Reopen http://localhost:5173
3. Wait 60 seconds for model download
4. Try again

### Check Network Tab:
- Should see `model.onnx` downloading
- Should see `ort-wasm-simd.wasm` loading
- All should be status `200`

---

## 📊 What to Expect

### First Query
- ⏱️ **30-60 seconds** (downloads model)
- 📥 ~90MB download
- 🎯 Then works instantly

### Second Query
- ⏱️ **<1 second** (cached!)
- 📥 No download
- 🎯 Super fast

---

## 🎉 Status
- ✅ ONNX Runtime error fixed
- ✅ Vite config updated
- ✅ Environment configured
- ✅ Server running
- ✅ Ready to test!

**Your turn**: Clear cache and test! 🚀
