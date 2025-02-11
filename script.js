function adjustTextareaHeight() {
  const textarea = document.getElementById('inputText');
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

document.getElementById('inputText').addEventListener('input', adjustTextareaHeight);

function simpleCipher(text, encrypt = true) {
  const shift = 3;
  return text
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(encrypt ? code + shift : code - shift);
    })
    .join('');
}

function processText(encrypt) {
  const input = document.getElementById('inputText').value;
  const result = simpleCipher(input, encrypt);

  const resultContainer = document.getElementById('resultContainer');
  const resultText = document.getElementById('resultText');

  resultText.textContent = result;
  resultContainer.style.display = 'block';
}

function copyResult() {
  const text = document.getElementById('resultText').textContent;
  navigator.clipboard.writeText(text);
}
