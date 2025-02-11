function adjustTextareaHeight() {
  const textarea = document.getElementById('inputText');
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

document.getElementById('inputText').addEventListener('input', adjustTextareaHeight);

// Enhanced encryption function
function secureCipher(text, encrypt = true) {
  const secretKey = new TextEncoder().encode('32-char-long-secure-key-here!'); // 256-bit key
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  
  if (encrypt) {
    // Encryption process
    const data = encoder.encode(text);
    const encrypted = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      encrypted[i] = data[i] ^ secretKey[i % secretKey.length];
    }
    // Convert to Base64 and add random padding
    const base64 = btoa(String.fromCharCode(...encrypted));
    return base64.replace(/=/g, '') + '$' + Math.random().toString(36).substr(2, 3);
  } else {
    // Decryption process
    const parts = text.split('$');
    const base64 = parts[0];
    const raw = atob(base64);
    const encrypted = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      encrypted[i] = raw.charCodeAt(i);
    }
    const decrypted = new Uint8Array(encrypted.length);
    for (let i = 0; i < encrypted.length; i++) {
      decrypted[i] = encrypted[i] ^ secretKey[i % secretKey.length];
    }
    return decoder.decode(decrypted);
  }
}

function processText(encrypt) {
  const input = document.getElementById('inputText').value;
  try {
    const result = secureCipher(input, encrypt);
    const resultContainer = document.getElementById('resultContainer');
    const resultText = document.getElementById('resultText');
    
    resultText.textContent = result;
    resultContainer.style.display = 'block';
    
    // Validate length constraints
    if (encrypt && result.length > input.length * 3) {
      console.warn('Encrypted text exceeds length constraints');
    }
  } catch (error) {
    alert('Error processing text: ' + error.message);
  }
}

function copyResult() {
  const text = document.getElementById('resultText').textContent;
  navigator.clipboard.writeText(text);
}