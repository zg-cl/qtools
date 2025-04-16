<template>
    <div class="tool-container">
        <div class="tool-header">
            <h2>图片取色工具</h2>
            <p class="tool-desc">上传图片并点击任意位置获取颜色值</p>
        </div>

        <div class="main-content">
            <div class="upload-section">
                <input type="file" ref="fileInput" accept="image/*" @change="handleFileUpload" class="file-input" />
                <div class="upload-area" @click="triggerFileInput">
                    <button class="action-btn">
                        <Icon icon="mdi:upload" class="btn-icon" />
                        选择图片
                    </button>
                    <p class="upload-tip">支持 jpg、png 等常见图片格式</p>
                </div>
                <canvas v-show="isShowCanvas" ref="colorCanvas" @mousemove="handleCanvasHover" @click="pickColor"
                    class="preview-canvas"></canvas>
            </div>

            <transition name="fade">
                <div v-if="selectedColor" class="result-display">
                    <div class="color-info">
                        <div class="color-preview" :style="{ backgroundColor: selectedColor }">
                            <div class="color-preview-inner"></div>
                        </div>
                        <div class="color-values">
                            <div class="color-value">
                                <span class="label">HEX</span>
                                <span class="value">{{ selectedColor }}</span>
                            </div>
                            <div class="color-value">
                                <span class="label">RGB</span>
                                <span class="value">{{ rgbValue }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <transition name="fade">
            <div v-if="errorMessage" class="error-message">
                <Icon icon="mdi:alert" class="error-icon" />
                {{ errorMessage }}
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const fileInput = ref(null);
const colorCanvas = ref(null);
const selectedColor = ref("");
const rgbValue = ref("");
const errorMessage = ref("");
const isShowCanvas = ref(false);

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    isShowCanvas.value = true;
    const reader = new FileReader();
    reader.onload = (e) => {
        loadImage(e.target.result);
    };
    reader.readAsDataURL(file);
};

const loadImage = (src) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        const canvas = colorCanvas.value;
        const ctx = canvas.getContext("2d");
        
        // 保存原始尺寸
        const originalWidth = img.width;
        const originalHeight = img.height;
        
        // 计算适应容器的尺寸
        const maxWidth = canvas.parentElement.clientWidth;
        const scale = maxWidth / originalWidth;
        const scaledHeight = originalHeight * scale;
        
        // 设置画布尺寸为缩放后的尺寸
        canvas.width = maxWidth;
        canvas.height = scaledHeight;
        
        // 绘制图片
        ctx.drawImage(img, 0, 0, maxWidth, scaledHeight);
    };
    img.onerror = () => {
        errorMessage.value = "图片加载失败，请重试";
    };
    img.src = src;
};

const handleCanvasHover = (event) => {
    const canvas = colorCanvas.value;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // 计算实际的像素坐标
    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);
    
    try {
        const ctx = canvas.getContext("2d");
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        canvas.style.cursor = `crosshair`;
    } catch (error) {
        console.error('获取像素数据失败:', error);
    }
};

const pickColor = (event) => {
    const canvas = colorCanvas.value;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // 计算实际的像素坐标
    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);
    
    try {
        const ctx = canvas.getContext("2d");
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        
        selectedColor.value = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
        rgbValue.value = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    } catch (error) {
        console.error('获取像素数据失败:', error);
        errorMessage.value = "无法获取该位置的颜色值";
    }
};
</script>

<style scoped>
.tool-container {
    padding: 20px;
    box-sizing: border-box;
}

.tool-header {
    text-align: center;
    margin-bottom: 40px;
}

.tool-header h2 {
    font-size: 28px;
    color: #2c3e50;
    margin-bottom: 12px;
}

.tool-desc {
    color: #606266;
    font-size: 16px;
}

.main-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.upload-section {
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.upload-area {
    text-align: center;
    padding: 30px;
    box-sizing: border-box;
    border: 2px dashed #dcdfe6;
    border-radius: 8px;
    transition: all 0.3s;
    cursor: pointer;
}

.upload-area:hover {
    border-color: #409eff;
    background: #f5f7fa;
}

.upload-tip {
    margin-top: 12px;
    color: #909399;
    font-size: 14px;
}

.file-input {
    display: none;
}

.action-btn {
    display: inline-flex;
    align-items: center;
    padding: 12px 24px;
    box-sizing: border-box;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 16px;
}

.action-btn:hover {
    background: #66b1ff;
    transform: translateY(-2px);
}

.btn-icon {
    font-size: 20px;
    margin-right: 8px;
}

.preview-canvas {
    margin-top: 30px;
    max-width: 100%;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.result-display {
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.color-info {
    display: flex;
    align-items: center;
    gap: 30px;
}

.color-preview {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.color-preview-inner {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: inherit;
    transition: all 0.3s;
}

.color-preview:hover .color-preview-inner {
    transform: scale(1.1);
}

.color-values {
    flex: 1;
}

.color-value {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 12px 16px;
    box-sizing: border-box;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s;
}

.color-value:hover {
    background: #eef2f6;
}

.label {
    font-weight: 600;
    color: #606266;
    margin-right: 12px;
    min-width: 40px;
}

.value {
    font-family: monospace;
    color: #2c3e50;
    font-size: 15px;
}

.error-message {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f56c6c;
    margin-top: 20px;
    padding: 16px;
    box-sizing: border-box;
    background: #fef0f0;
    border-radius: 8px;
    font-size: 15px;
}

.error-icon {
    font-size: 20px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
