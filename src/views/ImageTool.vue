<template>
  <div class="tool-container">
    <div
      class="upload-area"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @dragenter.prevent
    >
      <input
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        hidden
        ref="fileInput"
        multiple
      />
      <button @click="$refs.fileInput.click()" class="upload-btn">
        <Icon icon="mdi:upload" class="upload-icon" />
        点击上传或拖放图片（支持多选）
      </button>
    </div>
    <div class="quality-control">
      <label>压缩质量：</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        v-model="quality"
        @input="handleQualityChange"
      />
      <span>{{ Math.round(quality * 100) }}%</span>
    </div>

    <div v-if="images.length > 0" class="images-list">
      <div class="batch-actions">
        <button @click="downloadAllImages" class="action-btn primary">
          <Icon icon="mdi:download-multiple" class="action-icon" />
          下载所有图片
        </button>
      </div>
      
      <div v-for="(img, index) in images" :key="index" class="image-item">
        <img
          :src="img.compressedUrl"
          alt="压缩图片预览"
          class="preview-image"
        />
        <div class="image-info">
          <div class="size-info">
            原始尺寸：{{ img.originalSize }} KB 压缩后：{{
              img.compressedSize
            }}
            KB
          </div>
          <div class="image-actions">
            <button @click="downloadImage(img)" class="action-btn">下载</button>
            <button @click="removeImage(index)" class="action-btn danger">
              删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const fileInput = ref(null);
const quality = ref(0.8);
const errorMessage = ref("");
const images = ref([]);

const handleFileSelect = (e) => {
  const files = Array.from(e.target.files);
  files.forEach(processImage);
};

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files);
  files.forEach(processImage);
};

const processImage = async (file) => {
  if (!file.type.match("image.*")) {
    errorMessage.value = "请选择有效的图片文件";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const imageInfo = {
      originalUrl: e.target.result,
      originalSize: (file.size / 1024).toFixed(2),
      compressedUrl: "",
      compressedSize: 0,
      name: file.name,
    };
    images.value.push(imageInfo);
    compressImage(imageInfo, images.value.length - 1);
  };
  reader.readAsDataURL(file);
};

const compressImage = (imageInfo, index) => {
  const img = new Image();
  img.src = imageInfo.originalUrl;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxWidth = 1920;
    const scale = Math.min(maxWidth / img.width, 1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // 设置白色背景
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    
    // 根据原始图片格式决定输出格式
    // const outputFormat = imageInfo.name.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

    canvas.toBlob(
      (blob) => {
        const compressedUrl = URL.createObjectURL(blob);
        images.value[index] = {
          ...imageInfo,
          compressedUrl,
          compressedSize: (blob.size / 1024).toFixed(2),
        };
      },
      "image/jpeg",
      // 'image/png',
      quality.value
    );
  };
};

const handleQualityChange = () => {
  images.value.forEach((img, index) => {
    compressImage(img, index);
  });
};

const downloadImage = (img) => {
  const link = document.createElement("a");
  // const extension = img.name.split('.').pop() || 'jpg';
  // link.download = `compressed_${Date.now()}.${extension}`;
  link.download = img.name;
  link.href = img.compressedUrl;
  link.click();
};

const removeImage = (index) => {
  URL.revokeObjectURL(images.value[index].compressedUrl);
  images.value.splice(index, 1);
};

const downloadAllImages = () => {
  // 创建一个延时队列，避免浏览器同时触发太多下载
  images.value.forEach((img, index) => {
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = img.name;
      link.href = img.compressedUrl;
      link.click();
    }, index * 500); // 每个下载间隔500毫秒
  });
};
</script>

<style scoped>
.images-list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.image-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.image-info {
  margin-top: 12px;
}

.image-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.action-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #409eff;
  color: white;
}

.action-btn.danger {
  background: #f56c6c;
}

.upload-area {
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 40px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 20px;
}

.upload-btn {
  background: #f0f0f0;
  border: none;
  padding: 12px 24px;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  margin: 20px 0;
  border-radius: 8px;
}

.quality-control {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.size-info {
  margin: 12px 0;
  color: #666;
}

.batch-actions {
  grid-column: 1 / -1;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.action-icon {
  font-size: 1.2em;
  margin-right: 4px;
}

.action-btn.primary {
  background: #409eff;
  padding: 12px 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.action-btn.primary:hover {
  background: #66b1ff;
}
</style>
