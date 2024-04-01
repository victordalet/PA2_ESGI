import React from "react";


export interface stateChatBot {
    chat: string[];
}

export class ChatBot extends React.Component {


    constructor(props: any) {
        super(props);
        this.state = {
            chat: []
        };
    }


    private openChat() {
        const chatBox = document.querySelector<HTMLElement>(".container-chat");
        if (chatBox) {
            console.log(chatBox.style.transform);
            if (chatBox.style.transform == "scale(1)") {
                chatBox.style.transform = "scale(0)";
            } else {
                chatBox.style.transform = "scale(1)";
            }
        }
    }

    private async getChatMessages() {
        const chatBotAPI: string = process.env.CHAT_BOT_HOST || "http://localhost:5000";
        const input = document.querySelector<HTMLInputElement>("#chat-input");
        const response = await fetch(chatBotAPI + "/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: input?.value || ""
            })
        });
        const data = await response.json();
        const chatBox = document.querySelector<HTMLElement>(".chat-box");
        if (chatBox) {
            const youMessage = document.createElement("div");
            youMessage.className = "chat-message";
            youMessage.innerHTML = `<p>${input?.value}</p>`;
            chatBox.appendChild(youMessage);
            const chatMessage = document.createElement("div");
            chatMessage.className = "chat-message";
            chatMessage.innerHTML = `<p>${data.response}</p>`;
            chatBox.appendChild(chatMessage);
        }
        if (input) {
            input.value = "";
        }
    }


    render() {
        return (
            <div>
                <div className="chat-round" onClick={this.openChat}>
                    <h3>Chat</h3>
                </div>
                <div className="container-chat">
                    <div className="chat-box">
                        <div className="chat-message">
                            <p>Hi, how can I help you?</p>
                        </div>
                    </div>
                    <div className="chat-input">
                        <input type="text" id={"chat-input"} placeholder="Type a message..."/>
                        <i className={"ai-paper-airplane"} onClick={this.getChatMessages}></i>
                    </div>
                </div>
            </div>
        );
    }
}