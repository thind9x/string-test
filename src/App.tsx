import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./nam.scss";
// @ts-ignore
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { connect } from "react-redux";
import { getMessages } from "./reduxAction/actions";
interface AppProps {
  dispatch: (data: any) => void;
  mesagesData: {
    lists: [];
  };
}

const App: React.FC<AppProps> = ({ dispatch, mesagesData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIcon, setIsIcon] = useState(false);
  const [msg, setMgs] = useState<string>("");
  const [isConnect, setConnect] = useState(false);
  var userIds = ["user1", "user2"];
  var options = {
    name: "Your conversation name",
    isDistinct: false,
    isGroup: true,
  };

  const [msgcontent, setMgsContent] = useState<any>({});
  let stringeeClient: {
    on: (arg0: string, arg1: (res: any) => void) => void;
    connect: (data: string) => void;
  };
  // var stringeeClient;
  // Init
  stringeeClient = new StringeeClient();

  stringeeClient.connect(
    "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS0ZaZ2dBSEtNNTI4eEdLUDRTNVpXY25YcHdwYmhjYkItMTY1NzM2MDkyMyIsImlzcyI6IlNLRlpnZ0FIS001Mjh4R0tQNFM1Wldjblhwd3BiaGNiQiIsImV4cCI6MTY1OTk1MjkyMywidXNlcklkIjoidGhpbmQ5eCJ9.wXlyhcOPVs0eDLMTPmxZdR6xqsKm0oavcgi7Y5ukTfUsssss"
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

  useEffect(() => {
    stringeeClient.on("authen", function (res: any) {
      console.log(res);
      // khởi tạo stringeeChat ở đây
      setConnect(true);
    });
  }, []);
  const onChangeMsg = (e: any) => {
    setMgs(e?.target?.value);
  };
  const msgArr = [] as any;
  const getMessage = async (data: any) => {
    var convId = data;
    var count = 50;
    var isAscending = false;
    var sequence = 10;
    stringeeChat.getLastMessages(
      convId,
      sequence,
      count,
      isAscending,
      function (status: any, code: any, message: any, msgs: any) {
        console.log(
          "status:" +
            status +
            " code:" +
            code +
            " message:" +
            message +
            " conv:" +
            JSON.stringify(msgs)
        );
      }
    );
  };
  const onSendMgs = (e: any) => {
    if (isConnect) {
      console.log(isConnect);
      stringeeChat.createConversation(
        userIds,
        options,
        (status: any, code: any, message: any, conv: any) => {
          console.log(conv);
          var txtMsg = {
            type: 1,
            convId: "conv-vn-1-3QUQ1YWZ4G-1657040438464",
            message: {
              content: msg || "",
              metadata: {
                key: "value",
              },
            },
          };

          stringeeChat.sendMessage(
            txtMsg,
            function (status: any, code: any, message: any, msg: any) {
              console.log(message);
              // getMessage(conv?.lastMessage?.conversationId)
              dispatch({
                type: "ADD_LIST_MESSAGES",
                payload: { listId: msg?.content },
              });
            }
          );
        }
      );
      e.preventDefault();
    } else {
      console.log("AUTH NOT CONNECTED");
    }
    e.preventDefault();
  };
  const handleClickMessage = () => {
    setIsIcon(!isIcon);
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {isOpen && (
        <div className="container clearfix">
          <div className="people-list" id="people-list">
            <div className="search">
              <input type="text" placeholder="search" />
              <i className="fa fa-search"></i>
            </div>
            <ul className="list">
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
                {mesagesData?.lists?.map((item: any, index: number) => (
                  <li className="clearfix" key={index}>
                    <div className="message-data align-right">
                      <span className="message-data-time">10:10 AM, Today</span>{" "}
                      &nbsp; &nbsp;
                      <span className="message-data-name">Olia</span>{" "}
                      <i className="fa fa-circle me"></i>
                    </div>
                    <div className="message other-message float-right">
                      {item?.content}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="chat-message clearfix">
              <form onSubmit={onSendMgs} method={"post"}>
                <textarea
                  onChange={onChangeMsg}
                  name="message-to-send"
                  id="message-to-send"
                  placeholder="Type your message"
                ></textarea>
                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o"></i>
                <button type={"submit"}>Send</button>
              </form>
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
};

const mapStateToProps = (state: {
  getMessages: {
    lists: [];
  };
}) => {
  return {
    mesagesData: state?.getMessages,
  };
};

export default connect(mapStateToProps)(App);
