<template>
  <div class="tool-container">
    <div class="input-area">
      <textarea
        v-model="inputText"
        placeholder="请输入需要加解密的内容"
        class="crypto-editor"
      />
      <div class="key-inputs">
        <input
          v-model="publicKey"
          placeholder="公钥（可选）"
          class="key-input"
        />
        <input
          v-model="privateKey"
          placeholder="私钥（可选）"
          class="key-input"
        />
      </div>
      <div class="button-group">
        <button @click="encryptData" class="action-btn">加密</button>
        <button @click="decryptData" class="action-btn">解密</button>
        <button @click="clearAll" class="action-btn danger">清空</button>
      </div>
    </div>
    <div class="result-area">
      <pre>{{ resultText }}</pre>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { sm2 } from 'sm-crypto'

const inputText = ref("");
const publicKey = ref("");
const privateKey = ref("");
const resultText = ref("");
const errorMessage = ref("");

const encryptData = () => {
  try {
    if (!inputText.value) throw new Error('请输入需要加密的内容')
    if (!publicKey.value) {
      // 生成密钥对
      const keypair = sm2.generateKeyPairHex()
      publicKey.value = keypair.publicKey
      privateKey.value = keypair.privateKey
    }
    
    // 加密
    const encrypted = sm2.doEncrypt(inputText.value, publicKey.value, 1)
    resultText.value = encrypted
    errorMessage.value = ""
  } catch (e) {
    errorMessage.value = `加密失败：${e.message}`
  }
};

const decryptData = () => {
  try {
    if (!privateKey.value) throw new Error("需要私钥进行解密")
    if (!inputText.value) throw new Error("请输入需要解密的密文")
    
    // 解密
    const decrypted = sm2.doDecrypt(inputText.value, privateKey.value, 1)
    resultText.value = decrypted
    errorMessage.value = ""
  } catch (e) {
    errorMessage.value = `解密失败：${e.message}`
  }
};

const clearAll = () => {
  inputText.value = "";
  publicKey.value = "";
  privateKey.value = "";
  resultText.value = "";
  errorMessage.value = "";
};
</script>

<style scoped>
.crypto-editor {
  width: 100%;
  height: 200px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  margin-bottom: 12px;
  font-family:
    "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;
}

.key-inputs {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.key-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.result-area {
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-all;
}

.result-area pre {
  font-family:
    "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;
  padding: 12px;
  box-sizing: border-box;
  background: #f8f8f8;
  border-radius: 6px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  text-align: left;
  width: 100%;
  overflow: hidden;
}

.button-group {
  margin: 16px 0;
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  background: #409eff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #66b1ff;
}

.action-btn.danger {
  background: #f56c6c;
}

.action-btn.danger:hover {
  background: #f78989;
}
</style>
