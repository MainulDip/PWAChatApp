class Message {
    constructor() {
        this.messages = [];

        //web socket / io() sits on client lib and call the socket server as well
        this.socket = io();

        this.socket.once('connect_error', () => {
			window.dispatchEvent(new Event('messages_error'));
        })

        this.socket.on('all_messages', (messages) => {
        	this.messages = messages;
			window.dispatchEvent(new Event('messages_ready'));
        })

        this.socket.on('new_message', (message)=>{
        	this.messages.unshift(message);
        	window.dispatchEvent(new CustomEvent('new_message', {detail: message}))
        })
    }

    get all() {
        return this.messages;
    }

    add(data_url, caption_text) {
        let message = {
            photo: data_url,
            caption: caption_text
        }

        this.messages.unshift(message);
        // console.log('sending to server');

        this.socket.emit('new_message', message);

        return message;
    }
}