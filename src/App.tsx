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

  stringeeClient.connect('eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1ZMUllRY0Q2Z3p2d1d4MnZlRUdoMU1xZzZHaXAwYVFtLTE2NTY1NTg3NzIiLCJpc3MiOiJTS1ZMUllRY0Q2Z3p2d1d4MnZlRUdoMU1xZzZHaXAwYVFtIiwiZXhwIjoxNjU5MTUwNzcyLCJ1c2VySWQiOiJ0aGluZDl4In0.56DDkRh8M1K_jdQoN6xLm_qhkFXW0IMwXeLP5vIId1Q');

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



  useEffect(()=>{
    stringeeClient.on('connect', function () {
      console.log('++++++++++++++ connected to StringeeServer');
    });
    stringeeClient.on('authen', function () {
      console.log('authen');
    });
    stringeeClient.on('otherdeviceauthen', function () {
      console.log('authen');
    });

  },[stringeeClient])

  useMemo(() => {
    stringeeChat.createConversation(userIds, options, (status:any, code:any, message:any, conv:any) => {
      console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(conv));
    });


    stringeeChat.sendMessage(txtMsg, function (status:any, code:any, message:any, msg:any) {
      console.log(status + code + message + "msg result " + JSON.stringify(msg));
    });
  }, [options,stringeeChat,userIds]);
  const apiKeySid = 'AC3f62d69e974a7e404329c3f1be3237c3';
  const apiKeySecret = "fd4d91bbc809c5eb88b53f6824e97db1";
  // function getAccessToken() {
  //   var now = Math.floor(Date.now() / 1000);
  //   var exp = now + 3600;
  //
  //   var header = {cty: "stringee-api;v=1"};
  //   var payload = {
  //     jti: apiKeySid + "-" + now,
  //     iss: apiKeySid,
  //     exp: exp,
  //     rest_api: 1
  //   };
  //
  //   var jwt = require('jsonwebtoken');
  //   var token = jwt.sign(payload, apiKeySecret, {algorithm: 'HS256', header: header})
  //   return token;
  // }
  //
  // const token = getAccessToken();
  // console.log(token)

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
