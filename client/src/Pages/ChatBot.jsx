import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatBot.css";
import { Configuration, OpenAIApi } from "openai";
import Nav from '../components/Nav'
const configuration = new Configuration({
  organization: "org-Ot7KTTYiuxFIsC8E94RqVJwt",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function ChatBot() {

  const navigate = useNavigate();
  const [userData, setuser] = useState({});
  const callAuth = async () => {
    try {
      const resFromBack = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const userData = await resFromBack.json(); // Parse the response body as JSON
      setuser(userData)
      if (!userData.name) {
        alert("Please login.")
        navigate('/login')
      }
      setChats([{ content: `Hi ${userData.name},\n I am InnerCalm AI, how may I help you ?`, role: "assistant" }])
      // Perform any necessary actions with the user data
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callAuth();
  }, [])

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const chat = async (e, message) => {
    e.preventDefault();
    console.log(message)

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are InnerCalm(AI). You can help with mentally sick people",
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);


  console.log(chats)

  return (
    <> <Nav />
      <div className="chatpage">
        <main>
          <h1>InnerCalm-AI</h1>

          <section ref={chatContainerRef}>
            {chats && chats.length
              ? chats.map((chat, index) => (
                <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                  <span>
                    <b>{chat.role.toUpperCase() === "USER" ? "" : "InnerCalm :"}</b>
                  </span>
                  <br />
                  {/* <span>:</span> */}
                  <span>{chat.content}</span>
                </p>
              ))
              : ""}
          </section>

          <div className={isTyping ? "" : "hide"}>
            <p>
              <i>{isTyping ? "Typing" : ""}</i>
            </p>
          </div>

          <div className="inputChat" >
            <form action="" onSubmit={(e) => chat(e, message)}>
              <input
                type="text"
                name="message"
                value={message}
                placeholder="Type your message here"
                autocomplete="off"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit"> Send</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default ChatBot;