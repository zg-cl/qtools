<template>
  <div class="tool-container">
    <div class="input-area">
      <input
        v-model="domain"
        placeholder="请输入需要校验的域名（例如：www.example.com）"
        class="domain-input"
      />
      <button @click="checkCertificate" class="action-btn" :disabled="isLoading">
        {{ isLoading ? '检查中...' : '检查证书' }}
      </button>
    </div>
    
    <div v-if="certInfo" class="result-area">
      <div class="result-item">
        <label>域名：</label>
        <span>{{ certInfo.domain }}</span>
      </div>
      <div class="result-item">
        <label>证书状态：</label>
        <span :class="{'status-valid': certInfo.isValid, 'status-invalid': !certInfo.isValid}">
          {{ certInfo.isValid ? '有效' : '无效' }}
        </span>
      </div>
      <div class="result-item">
        <label>颁发者：</label>
        <span>{{ certInfo.issuer }}</span>
      </div>
      <div class="result-item">
        <label>生效时间：</label>
        <span>{{ certInfo.validFrom }}</span>
      </div>
      <div class="result-item">
        <label>过期时间：</label>
        <span>{{ certInfo.validTo }}</span>
      </div>
      <div class="result-item">
        <label>SAN：</label>
        <div class="san-list">
          <span v-for="(san, index) in certInfo.sans" :key="index" class="san-item">
            {{ san }}
          </span>
        </div>
      </div>
    </div>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const domain = ref('')
const certInfo = ref(null)
const errorMessage = ref('')
const isLoading = ref(false)

const checkCertificate = async () => {
  if (!domain.value) {
    errorMessage.value = '请输入域名'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  certInfo.value = null

  try {
    const response = await fetch(`https://ssl-check-api.example.com/check?domain=${encodeURIComponent(domain.value)}`)
    if (!response.ok) throw new Error('证书检查失败')
    
    const data = await response.json()
    certInfo.value = {
      domain: domain.value,
      isValid: data.valid,
      issuer: data.issuer,
      validFrom: new Date(data.validFrom).toLocaleString(),
      validTo: new Date(data.validTo).toLocaleString(),
      sans: data.sans || []
    }
  } catch (e) {
    errorMessage.value = e.message || '证书检查失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.input-area {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.domain-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.action-btn {
  padding: 8px 24px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover:not(:disabled) {
  background: #66b1ff;
}

.action-btn:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.result-area {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.result-item {
  margin: 12px 0;
  display: flex;
  align-items: flex-start;
}

.result-item label {
  min-width: 100px;
  color: #666;
  font-weight: 500;
}

.status-valid {
  color: #67c23a;
  font-weight: 500;
}

.status-invalid {
  color: #f56c6c;
  font-weight: 500;
}

.san-list {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.san-item {
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: #fef0f0;
  color: #f56c6c;
  border-radius: 4px;
}
</style>