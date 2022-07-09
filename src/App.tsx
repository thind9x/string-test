import React,{useState} from 'react';
import './App.css';
// @ts-ignore
import {StringeeChat, StringeeClient} from "stringee-chat-js-sdk";

function App() {

  let stringeeClient: { on: (arg0: string, arg1: { (): void; (res: any): void; (res: any): void; }) => void; connect:(data:string)=>void };
  // var stringeeClient;
  // Init
  stringeeClient = new StringeeClient();

  stringeeClient.connect('eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1ZMUllRY0Q2Z3p2d1d4MnZlRUdoMU1xZzZHaXAwYVFtLTE2NTcyNzczNDMiLCJpc3MiOiJTS1ZMUllRY0Q2Z3p2d1d4MnZlRUdoMU1xZzZHaXAwYVFtIiwiZXhwIjoxNjU5ODY5MzQzLCJ1c2VySWQiOiJ0aGluZDl4In0.M2cjCCzhI2tiecHwfiqyTrpVKukqxsy-dZ-d3SW1P_s');

  // init
  var stringeeChat = new StringeeChat(stringeeClient);

  var userIds = ["user1", "user2"];
  var options = {
    name: "Your conversation name",
    isDistinct: false,
    isGroup: true
  };
  const[msg,setMgs] = useState("");

  stringeeClient.on('authen', function () {
    // khởi tạo stringeeChat ở đây

    stringeeChat.createConversation(userIds, options, (status:any, code:any, message:any, conv:any) => {
      var txtMsg = {
        type: 1,
        convId: conv?.lastMessage?.conversationId,
        message: {
          content: msg,
          metadata: {
            key: 'value'
          }
        }
      };
      stringeeChat.sendMessage(txtMsg, function (status:any, code:any, message:any, msg:any) {
       console.log(msg);
      });
    });

    var convId = 'conv-vn-1-3QUQ1YWZ4G-1657040257363';
    var count = 50;
    var isAscending = false;
    stringeeChat.getLastMessages(convId, count, isAscending, function (status:any, code:any, message:any, msgs:any) {
      msgs?.map((it:any)=>{
        console.log(it)
      })
    });


  })






  return (
    <div className="App">
      <p id={"chat"}></p>
      <textarea placeholder={"chat"} value={msg} onChange={(e)=>{
        setMgs(e?.target?.value)
      }}></textarea>
    </div>
  );
}

export default App;
