<template>
    <div class="cover" ref="cover">
        <div class="content">
            <p>{{ message }}</p>
            <button class="cancel" @click="cancelModel">OK</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'AlertsView',
    
    setup() {
        const cover = ref(null);
        const message = ref('');

        const cancelModel = () => {
            cover.value.style.display = 'none';
        };

        const showModel = (msg) => {
            message.value = msg;
            cover.value.style.display = 'flex';
        };

        return { cover, message, cancelModel, showModel };
    }
};
</script>

<style scoped>
.cover {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.cancel {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #af0a0a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.cancel:hover {
    background-color: #eb0101;
}
</style>