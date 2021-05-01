var chat = new Vue({
    el: ".conversations",
    data: {
        messages: [{'me': '我現在好飽，你呢？', 'robot': '我也好飽!'}] //保存所有的對話內容
    },
    // 以下會將聊天內容保持在最下方
    methods: {
        scrollToEnd () {
        var cw = this.$refs.conversations_window;
        cw.scrollTop = cw.scrollHeight;
        }
    },
    updated () {
        this.scrollToEnd(); 
    },
    mounted () {
        this.scrollToEnd();	
    }
});
var _input = new Vue({
    el: ".message_input",
    data: {
        Input: ""
    },
    methods: {
        key_enter_handler() {
            if (_input.Input != ""){ //沒有輸入不給過
                chat.messages.push({me: this.Input, robot: ""});
                //以下傳值到後端
                axios.post('/', {
                    frontend: this.Input
                })
                .then(function (response) {
                    console.log(response);
                    chat.messages[chat.messages.length-1]['robot'] = response.data.backend // 後端傳過來的值
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.Input = "";
            }
        }
    }
});
new Vue({
    el: ".send_message",
    methods: {
        clicked_handler() {
            _input.key_enter_handler(); //點擊button和按enter鍵的效果一樣
        }
    }
});

