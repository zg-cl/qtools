<!-- json格式化基础版 -->
<template>
    <div class="tool-container">
        <div class="editor-area">
            <textarea v-model="inputJson" placeholder="请输入JSON数据" class="json-editor" />
            <div class="button-group">
                <button @click="formatJson" class="action-btn">格式化</button>
                <button @click="validateJson" class="action-btn">校验</button>
                <button @click="clearAll" class="action-btn danger">清空</button>
            </div>
        </div>
        <div v-if="formattedJson" class="result-area">
            <div class="result-header">
                <button @click="copyResult" class="copy-btn">
                    {{ copyStatus }}
                </button>
            </div>
            <pre>{{ formattedJson }}</pre>
        </div>
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const inputJson = ref("");
const formattedJson = ref("");
const errorMessage = ref("");
const copyStatus = ref('复制')

const copyResult = async () => {
    try {
        await navigator.clipboard.writeText(formattedJson.value)
        copyStatus.value = '已复制!'
        setTimeout(() => {
            copyStatus.value = '复制'
        }, 2000)
    } catch (err) {
        errorMessage.value = '复制失败，请手动复制'
    }
}
const formatJson = () => {
    try {
        const parsed = JSON.parse(inputJson.value);
        formattedJson.value = JSON.stringify(parsed, null, 2);
        errorMessage.value = "";
    } catch (e) {
        errorMessage.value = `JSON格式错误：${e.message}`;
    }
};

const validateJson = () => {
    try {
        JSON.parse(inputJson.value);
        errorMessage.value = "JSON格式正确";
    } catch (e) {
        errorMessage.value = `校验失败：${e.message}`;
    }
};

const clearAll = () => {
    inputJson.value = "";
    formattedJson.value = "";
    errorMessage.value = "";
};
</script>

<style scoped>
.tool-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    min-height: calc(100vh - 80px);
}

.json-editor {
    width: 100%;
    height: 400px;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-family:
        "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;
    font-size: 14px;
    line-height: 1.5;
    resize: vertical;
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

.result-area pre {
    padding: 15px;
    box-sizing: border-box;
    background: #f8f9fa;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    white-space: pre-wrap;
    font-family:
        "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
}


.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.copy-btn {
    padding: 4px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    color: #606266;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s;
}

.error-message {
    color: #f56c6c;
    margin-top: 12px;
}
</style>
