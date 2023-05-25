<template>
  <div>
    <div style="height: 400px" class="aaa">
      <div v-for="message in messages" :key="message.id">
      <div v-if="message.type === 'user'">
        <span class="user-message">{{ message.text }}</span>
      </div>
      <div v-if="message.type === 'bot'">
        <span class="bot-message">{{ message.text }}</span>
      </div>
    </div>
    </div>
    
    <div style="width: 100%;" class="input-container">
      <input style="width: 400px;" class="input-field" v-model="inputText" @keydown.enter="sendMessage" placeholder="Type a message" />
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

      // 打印用户输入
      this.messages.push({
        id:Date.now(),
        text: userInput,
        type: 'user'
      });


      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
      });

      if (response.ok) {
        const data = await response.json();
        let botReply = data.choices[0].message.content;

    // Split the response into individual lines and add a newline character every 50 characters using a for loop
    let lines = [];
    for (let i = 0; i < botReply.length; i += 50) {
      lines.push(botReply.substr(i, 50));
    }
    botReply = lines.join('\n');

        // Split the response into individual lines and add each line as a separate message
        botReply.split('\n').forEach(line => {
          this.messages.push({ id: Date.now(), text: line, type: 'bot' });
        });
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
  /* display: flex; */
  align-items: center;
  margin-top: 10px;
}

.input-field {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  width: 500px;
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
.aaa {
  width: 600px;
  margin: auto;
  border: 1px solid black;
  border-radius: 5px;
}
.aaa:hover {
  background: #f5f3f3;
}
</style>