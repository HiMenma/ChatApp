<template>
    <div>
      <div v-for="message in messages" :key="message.id">
        <div v-if="message.type === 'user'">
          <span class="user-message">{{ message.text }}</span>
        </div>
        <div v-if="message.type === 'bot'">
          <span class="bot-message">{{ message.text }}</span>
        </div>
      </div>
      <div class="input-container">
        <input class="input-field" v-model="inputText" @keydown.enter="sendMessage" placeholder="Type a message" />
        <!-- <button class="send-button" @click="sendMessage">Send</button> -->
        <button class="send-button" @click="sendMessage">
            <font-awesome-icon icon="comment" /> Send
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [],
        inputText: ''
      };
    },
    methods: {
      async sendMessage() {
        const userInput = this.inputText;
  
        // 发送用户输入给后端接口
        const response = await fetch('http://localhost:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userInput })
        });
  
        if (response.ok) {
          const data = await response.json();
          const botReply = data.reply;
  
          // 添加用户输入和机器人回复到消息列表
          this.messages.push({ id: Date.now(), text: userInput, type: 'user' });
          this.messages.push({ id: Date.now() + 1, text: botReply, type: 'bot' });
        } else {
          console.error('Error:', response.status);
        }
  
        this.inputText = '';
      }
    }
  };
  </script>
  
  <style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.messages {
  flex: 1;
  margin-bottom: 10px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.input-field {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.send-button {
  padding: 8px 15px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>