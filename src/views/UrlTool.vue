<template>
  <div class="tool-container">
    <div class="input-area">
      <textarea
        v-model="inputText"
        placeholder="请输入需要编解码的内容"
        class="url-editor"
      />
      <div class="button-group">
        <button @click="encodeUrl" class="action-btn">编码</button>
        <button @click="decodeUrl" class="action-btn">解码</button>
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
import { ref } from 'vue'

const inputText = ref('')
const resultText = ref('')
const errorMessage = ref('')

const encodeUrl = () => {
  try {
    resultText.value = encodeURIComponent(inputText.value)
    errorMessage.value = ''
  } catch (e) {
    errorMessage.value = `编码失败：${e.message}`
  }
}

const decodeUrl = () => {
  try {
    resultText.value = decodeURIComponent(inputText.value)
    errorMessage.value = ''
  } catch (e) {
    errorMessage.value = `解码失败：${e.message}`
  }
}

const clearAll = () => {
  inputText.value = ''
  resultText.value = ''
  errorMessage.value = ''
}
</script>

<style scoped>
.url-editor {
  width: 100%;
  height: 200px;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
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
.result-area {
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-all;
}

.result-area pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
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
</style>