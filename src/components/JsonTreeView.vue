<template>
    <div class="json-tree-item">
        <template v-if="['object', 'array'].includes(getType(data))">
            <div class="node-content" @click="hasChildren && toggleNode">
                <span :class="['key', hasChildren ? 'clickable' : '']">
                    {{ getType(data) === 'array' ? '[' : '{' }}
                </span>
            </div>
            <div v-if="nodeExpanded" class="children">
                <div v-for="(value, key) in data" :key="key" class="item">
                    <span 
                        :class="['key', isExpandable(value) ? 'clickable' : '']" 
                        @click.stop="isExpandable(value) && $refs[key][0].toggleNode()"
                    >{{ key }}:</span>
                    <JsonTreeView 
                        :data="value" 
                        :ref="key"
                    />
                </div>
            </div>
            <div v-if="nodeExpanded" class="closing">
                {{ getType(data) === 'array' ? ']' : '}' }}
            </div>
        </template>
        <span v-else class="value">{{ JSON.stringify(data) }}</span>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    data: {
        type: [Object, Array, String, Number, Boolean],
        required: true
    }
})

const nodeExpanded = ref(true)

const hasChildren = computed(() => {
    return ['object', 'array'].includes(getType(props.data)) && 
           Object.keys(props.data).length > 0
})

const isExpandable = (value) => {
    return ['object', 'array'].includes(getType(value)) && 
           Object.keys(value).length > 0
}

const toggleNode = () => {
    nodeExpanded.value = !nodeExpanded.value
}

defineExpose({
    toggleNode
})

const getType = (value) => {
    if (Array.isArray(value)) return 'array'
    return typeof value
}
</script>

<style scoped>
.json-tree-item {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    text-align: left;
    line-height: 1.5;
}

.toggle {
    cursor: pointer;
    display: inline-block;
}

.toggle-icon {
    display: inline-block;
    width: 20px;
    color: #409eff;
}

.children {
    padding-left: 20px;
}

.item {
    padding: 2px 0;
    display: flex;
}

.key {
    color: #881391;
    margin-right: 4px;
}

.value {
    color: #1a1aa6;
}

.closing {
    color: #881391;
}

.clickable {
    cursor: pointer;
    user-select: none;
}

.clickable:hover {
    color: #409eff;
}

/* 删除 .toggle 和 .toggle-icon 相关样式 */
</style>