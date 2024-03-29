import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import  dayjs from "dayjs"
import {timeConverter} from "./feature/timeStampConverter";

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
type Inputs = {
    messages: string,
};
const App: React.FC<AppProps> = ({ dispatch, mesagesData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIcon, setIsIcon] = useState(false);
  const [msg, setMgs] = useState<string>("");
  const [isConnect, setConnect] = useState(false);


  const [msgcontent, setMgsContent] = useState<any>({});
  let stringeeClient: {
    on: (arg0: string, arg1: (res: any) => void) => void;
    connect: (data: string) => void;
  };
  // var stringeeClient;
  // Init
  stringeeClient = new StringeeClient();

  stringeeClient.connect(
      "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS0ZaZ2dBSEtNNTI4eEdLUDRTNVpXY25YcHdwYmhjYkItMTY1NzYwNzI0NCIsImlzcyI6IlNLRlpnZ0FIS001Mjh4R0tQNFM1Wldjblhwd3BiaGNiQiIsImV4cCI6MTY2MDE5OTI0NCwidXNlcklkIjoidGhpOXgifQ.ga3EFOzpnsx8dCIGPIFOJZSWvPEb4yE5gZUDqObPj8U"
  );

  // init
  var stringeeChat = new StringeeChat(stringeeClient);


    stringeeClient.on('otherdeviceauthen', function (data) {
        // console.log(data)
    })

  var userIds = ["user1", "user2"];
  var options = {
    name: "Your conversation name",
    isDistinct: false,
    isGroup: true,
  };

    stringeeClient.on("connect", function (res: any) {
        stringeeClient.on("authen", function (res: any) {
            // console.log(res)
            // khởi tạo stringeeChat ở đây
            setConnect(true);
        });

    });
    stringeeChat.on('onObjectChange', (res:any) => {
        // console.log('+++ onObjectChange on Stringee object change ', res);
    });

    stringeeClient.on('disconnect', function () {
        // console.log('++++++++++++++ disconnected');
    });
    const times = timeConverter(1659079791357);
    console.log(times)

    var s = new Date(1659079791357).toLocaleDateString("vi-VN")
    console.log(s)

    const onChangeMsg = (e: any) => {
      setMgs(e?.target?.value);

  };
    const { register, handleSubmit, watch,resetField,reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        if (isConnect) {
            stringeeChat.createConversation(
                userIds,
                options,
                (status: any, code: any, message: any, conv: any) => {
                    var txtMsg = {
                        type: 1,
                        convId: conv?.lastMessage?.conversationId,
                        message: {
                            content: data?.messages || "",
                            metadata: {
                                key: "value",
                            },
                        },
                    };

                    stringeeChat.sendMessage(
                        txtMsg,
                        function (status: any, code: any, message: any, msg: any) {
                            // getMessage(conv?.lastMessage?.conversationId)
                            console.log(msg )
                            dispatch({
                                type: "ADD_LIST_MESSAGES",
                                payload: { listId: {"content":msg?.content,"sender":msg?.sender,"createdAt":msg?.createdAt }},
                            });
                            reset();
                            var convId = conv?.lastMessage?.conversationId;
                            var count = 50;
                            var isAscending = false;
                            stringeeChat.getLastMessages(convId, count, isAscending, function (status:any, code:any, message:any, msgs:any) {
                                console.log(msgs)
                            });
                        }
                    );
                }
            );
        } else {
            console.log("AUTH NOT CONNECTED");
        }
    }

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

  const handleClickMessage = () => {
    setIsIcon(!isIcon);
    setIsOpen(!isOpen);
  };
  console.log(mesagesData?.lists)
  return (
    <div>
      {!isOpen && (
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
                      <span className="message-data-time">{timeConverter(item?.createAt)}, Today</span>{" "}
                      &nbsp; &nbsp;
                      <span className="message-data-name">{item?.sender}</span>{" "}
                      <i className="fa fa-circle me"></i>
                    </div>
                    <div className="message other-message float-right">
                      {item?.content?.content}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="chat-message clearfix">
              <form  onSubmit={handleSubmit(onSubmit)}  method={"post"}>
                <textarea
                  {...register("messages", { required: true })}
                  name="messages"
                  id="message-to-send"
                  placeholder="Type your message"
                ></textarea>
                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o"></i>
                <button   type={"submit"}>Send</button>
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
