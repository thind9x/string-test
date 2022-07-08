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

  stringeeClient.connect('eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1ZMUllRY0Q2Z3p2d1d4MnZlRUdoMU1xZzZHaXAwYVFtLTE2NTcyNzA1MjYiLCJpc3MiOiJTS1ZMUllRY0Q2Z3p2d1d4MnZlRUdoMU1xZzZHaXAwYVFtIiwiZXhwIjoxNjU3MzU2OTI2LCJ1c2VySWQiOiJTdHJpbmdlZVR1YW50ZXN0In0.aOYkoeWkQDWu_4QI3Dd7egGRYD4H4G6CUum8K9Lkwlo');

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

  stringeeClient.on('connect', function () {
    console.log('++++++++++++++ connected to StringeeServer');
  });
  stringeeClient.on('authen', function () {
    console.log('authen');
  });
  stringeeClient.on('otherdeviceauthen', function () {
    console.log('authen');
  });



  stringeeChat.sendMessage(txtMsg, function (status:any, code:any, message:any, msg:any) {
    console.log(status)
    console.log(status + code + message + "msg result " + JSON.stringify(txtMsg));
  });
  var userIds = ["user1"];

  stringeeChat.createConversation(userIds, options, (status:any, code:any, message:any, conv:any) => {
    console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(userIds));
  });

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
