import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./nam.scss";
// @ts-ignore
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { transform } from "typescript";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIcon, setIsIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  let stringeeClient: {
    on: (
      arg0: string,
      arg1: { (): void; (res: any): void; (res: any): void }
    ) => void;
    connect: (data: string) => void;
  };
  // var stringeeClient;
  // Init
  stringeeClient = new StringeeClient();

  stringeeClient.connect(
    "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS21YUG1kOEpaejJ1WUh6eWpTWTN5c3p3emFvMWFIN1VnLTE2NTcyNTM3MTkiLCJpc3MiOiJTS21YUG1kOEpaejJ1WUh6eWpTWTN5c3p3emFvMWFIN1VnIiwiZXhwIjoxNjU5ODQ1NzE5LCJ1c2VySWQiOiJQaGFtRGFuZ0tob2EifQ.bYzidvlKHsSOawM4lJdhIZN2tAxOqtVG3bEWWJax9fU"
  );

  // init
  var stringeeChat = new StringeeChat(stringeeClient);

  var userIds = ["user1", "user2"];
  var options = {
    name: "Your conversation name",
    isDistinct: false,
    isGroup: true,
  };
  var txtMsg = {
    type: 1,
    convId: "YOUR_CONVERSATION_ID",
    message: {
      content: "Hello",
      metadata: {
        key: "value",
      },
    },
  };

  stringeeClient.on("authen", function () {
    // khởi tạo stringeeChat ở đây
    stringeeChat.sendMessage(
      txtMsg,
      function (status: any, code: any, message: any, msg: any) {
        console.log(
          status + code + message + "msg result " + JSON.stringify(msg)
        );
      }
    );
    stringeeChat.createConversation(
      userIds,
      options,
      (status: any, code: any, message: any, conv: any) => {
        console.log(
          "status:" +
            status +
            " code:" +
            code +
            " message:" +
            message +
            " conv:" +
            JSON.stringify(userIds)
        );
      }
    );
  });
  const handleClickMessage = () => {
    setIsIcon(!isIcon);
    setIsOpen(!isOpen);
  };

  // console.log("rotate", rotate);
  return (
    <div>
      {isOpen && (
        <div className="container clearfix">
          <div className="people-list" id="people-list">
            <div className="search">
              <input type="text" placeholder="search" />
              <i className="fa fa-search"></i>
            </div>
            <ul className="list listUl" style={{ listStyleType: "none" }}>
              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Vincent Porter</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Aiden Chavez</div>
                  <div className="status">
                    <i className="fa fa-circle offline"></i> left 7 mins ago
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Mike Thomas</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Erica Hughes</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Ginger Johnston</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Tracy Carpenter</div>
                  <div className="status">
                    <i className="fa fa-circle offline"></i> left 30 mins ago
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Christian Kelly</div>
                  <div className="status">
                    <i className="fa fa-circle offline"></i> left 10 hours ago
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Monica Ward</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Dean Henry</div>
                  <div className="status">
                    <i className="fa fa-circle offline"></i> offline since Oct
                    28
                  </div>
                </div>
              </li>

              <li className="clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg"
                  alt="avatar"
                />
                <div className="about">
                  <div className="name">Peyton Mckinney</div>
                  <div className="status">
                    <i className="fa fa-circle online"></i> online
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="chat">
            <div className="chat-header clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                alt="avatar"
              />

              <div className="chat-about">
                <div className="chat-with">Chat with Vincent Porter</div>
                <div className="chat-num-messages">already 1 902 messages</div>
              </div>
              <button
                id="stringee-button-launcher"
                style={{
                  background: "white",
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                  border: "1px solid black",
                  float: "right",
                }}
                onClick={handleClickMessage}
              >
                <i
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    color: "black",
                  }}
                  className="fas fa-times"
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            <div className="chat-history">
              <ul>
                <li className="clearfix">
                  <div className="message-data align-right">
                    <span className="message-data-time">10:10 AM, Today</span>{" "}
                    &nbsp; &nbsp;
                    <span className="message-data-name">Olia</span>{" "}
                    <i className="fa fa-circle me"></i>
                  </div>
                  <div className="message other-message float-right">
                    Hi Vincent, how are you? How is the project coming along?
                  </div>
                </li>

                <li>
                  <div className="message-data">
                    <span className="message-data-name">
                      <i className="fa fa-circle online"></i> Vincent
                    </span>
                    <span className="message-data-time">10:12 AM, Today</span>
                  </div>
                  <div className="message my-message">
                    Are we meeting today? Project has been already finished and
                    I have results to show you.
                  </div>
                </li>

                <li className="clearfix">
                  <div className="message-data align-right">
                    <span className="message-data-time">10:14 AM, Today</span>{" "}
                    &nbsp; &nbsp;
                    <span className="message-data-name">Olia</span>{" "}
                    <i className="fa fa-circle me"></i>
                  </div>
                  <div className="message other-message float-right">
                    Well I am not sure. The rest of the team is not here yet.
                    Maybe in an hour or so? Have you faced any problems at the
                    last phase of the project?
                  </div>
                </li>

                <li>
                  <div className="message-data">
                    <span className="message-data-name">
                      <i className="fa fa-circle online"></i> Vincent
                    </span>
                    <span className="message-data-time">10:20 AM, Today</span>
                  </div>
                  <div className="message my-message">
                    Actually everything was fine. I'm very excited to show this
                    to our team.
                  </div>
                </li>

                <li>
                  <div className="message-data">
                    <span className="message-data-name">
                      <i className="fa fa-circle online"></i> Vincent
                    </span>
                    <span className="message-data-time">10:31 AM, Today</span>
                  </div>
                  <i className="fa fa-circle online"></i>
                  <i
                    className="fa fa-circle online"
                    style={{ color: "#AED2A6" }}
                  ></i>
                  <i
                    className="fa fa-circle online"
                    style={{ color: ":#DAE9DA" }}
                  ></i>
                </li>
              </ul>
            </div>
            <div className="chat-message clearfix">
              <textarea
                name="message-to-send"
                id="message-to-send"
                placeholder="Type your message"
              ></textarea>
              <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
              <i className="fa fa-file-image-o"></i>
              <button>Send</button>
            </div>
          </div>
        </div>
      )}
      <button
        id="stringee-button-launcher"
        style={{
          background:
            "linear-gradient(135deg, rgb(15, 227, 61), rgb(0, 189, 23))",
          width: "50px",
          height: "50px",
          borderRadius: "100%",
          position: "fixed",
          border: "1px solid white",
          bottom: "100px",
          right: "30px",
        }}
        onClick={handleClickMessage}
      >
        <i
          style={{
            textAlign: "center",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white",
          }}
          className={
            isIcon ? "rotate fas fa-times" : "rotateComment fa fa-comment"
          }
          aria-hidden="true"
        ></i>
      </button>
    </div>
  );
}

export default App;
