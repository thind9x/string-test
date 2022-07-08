import React, {useEffect,useMemo} from 'react';
import logo from './logo.svg';
import './App.css';
// @ts-ignore
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
function App() {

  let stringeeClient: { on: (arg0: string, arg1: { (): void; (res: any): void; (res: any): void; }) => void; connect:(data:string)=>void };
  // var stringeeClient;
  // Init
  stringeeClient = new StringeeClient();

  stringeeClient.connect('eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS21YUG1kOEpaejJ1WUh6eWpTWTN5c3p3emFvMWFIN1VnLTE2NTcyNTM3MTkiLCJpc3MiOiJTS21YUG1kOEpaejJ1WUh6eWpTWTN5c3p3emFvMWFIN1VnIiwiZXhwIjoxNjU5ODQ1NzE5LCJ1c2VySWQiOiJQaGFtRGFuZ0tob2EifQ.bYzidvlKHsSOawM4lJdhIZN2tAxOqtVG3bEWWJax9fU');

  // init
  var stringeeChat = new StringeeChat(stringeeClient);

  var userIds = ["user1", "user2"];
  var options = {
    name: "Your conversation name",
    isDistinct: false,
    isGroup: true
  };
  var txtMsg = {
    type: 1,
    convId: "YOUR_CONVERSATION_ID",
    message: {
      content: 'Hello',
      metadata: {
        key: 'value'
      }
    }
  };

  stringeeClient.on('authen', function () {
    // khởi tạo stringeeChat ở đây
    stringeeChat.sendMessage(txtMsg, function (status:any, code:any, message:any, msg:any) {
      console.log(status + code + message + "msg result " + JSON.stringify(msg));
    });
    stringeeChat.createConversation(userIds, options, (status:any, code:any, message:any, conv:any) => {
      console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(userIds));
    });
  })






  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
