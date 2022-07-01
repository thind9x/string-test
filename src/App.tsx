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

  stringeeClient.connect('eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1ZMUllRY0Q2Z3p2d1d4MnZlRUdoMU1xZzZHaXAwYVFtLTE2NTY2NDYxNjAiLCJpc3MiOiJTS1ZMUllRY0Q2Z3p2d1d4MnZlRUdoMU1xZzZHaXAwYVFtIiwiZXhwIjoxNjU2NzMyNTYwLCJ1c2VySWQiOiJTdHJpbmdlZVR1YW50ZXN0In0.1bRfjEemyEnSNUsK2If4VezLhqgPKHHhNVK1VPIZRko');

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
