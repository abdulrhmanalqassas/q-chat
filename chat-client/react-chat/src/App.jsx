import { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import "./App.css";

function App() {
  const [serverData, setServerData] = useState("");
  const [userPrompt, setUserPrompt] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: "hi " }),
    })
      .then((res) => res.json())
      .then((data) => {
        const html = DOMPurify.sanitize(marked(data.data));
        setServerData({ data: data.data, html });
        setUserPrompt("");
      });
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      inputRef.current.blur();
      handleSubmit();
    }
  }
  function handleSubmit() {
    fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userPrompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        const html = DOMPurify.sanitize(marked(data.data));

        setServerData({ data: data.data, html });
        setChatHistory((prev) => [
          { prompt: userPrompt, answer: { data: data.data, html: html } },
          ...prev,
        ]);
        console.log(
          "+++++++++++++++++++++++++",
          serverData,
          "****************",
          chatHistory
        );
        inputRef.current.focus();
        setUserPrompt("");
      });
  }
  const Chat = (prompt, answer) => {
    return (
      <>
        <div class="chat-message">
          <span class="sender">prompt:</span>
          <span class="content">{prompt}</span>
        </div>

        <article
          style={{ margin: "0" }}
          dangerouslySetInnerHTML={{ __html: answer.html }}
        />
      </>
    );
  };

  return (
    <>
      <main
        style={{
          width: "90vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ padding: "10px", marginBottom: "0" }}>MyPrompter</h1>
        <div style={{ margin: "0", flexGrow: "1", overflow: "scroll" }}>
          <div style={{ width: "100%", height: "100%" }}>
            {/* {chatHistory.length > 0 ? (
              chatHistory.map((chat) => Chat(chat.prompt, chat.data))
            ) : (
              <></>
            )} */}
            {chatHistory.map((elem) => Chat(elem.prompt, elem.answer))}

            {serverData === "" ? (
              "Loading..."
            ) : (
              <article
                style={{ margin: "0" }}
                dangerouslySetInnerHTML={{ __html: serverData.html }}
              />
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            backgroundColor: "#222",
            padding: "10px",
          }}
        >
          <textarea
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={userPrompt ? userPrompt : ""}
            style={{ margin: "0", flexGrow: "1", overflowY: "hidden" }}
            placeholder="Type in Prompt..."
          />
          <button
            onClick={handleSubmit}
            style={{ margin: "0", flex: "1", marginLeft: "10px" }}
          >
            Go
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
