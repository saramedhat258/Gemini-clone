import { assets } from "../assets/assets";
import { useContext } from "react";
import { Context } from "../context/Context";

function Chat() {
    const {
        input,
        setInput,
        showResult,
        onsent,
        history,
        setHistory,
        saveCurrentconv
    } = useContext(Context);

    const prompt = async (prompt) => {
        saveCurrentconv(history)
        setHistory([])
        await onsent(prompt);
    };

    return (
        <>
            <div className="flex-grow-1 d-flex flex-column chat">
                {/* Navbar */}
                <div className="navbar mx-4 mt-2">
                    <p className="fs-4">Gemini</p>
                    <img
                        src={assets.user_icon}
                        alt="user profile"
                        className="usericon rounded-circle"
                    />
                </div>
                {showResult ? (
                <div className="result-box mx-auto mb-auto">
                    <div className="chat-history">
                        {history.map((message, index) => (
                            <div key={index} className={`message ${message.role}`}>
                                {message.isLoading ? (
                                    <div className="assistant-message d-flex gap-3 align-items-center">
                                        <img
                                            src={assets.gemini_icon}
                                            alt="gemini-icon"
                                            className="res-icon"
                                        />
                                        <div className="loader">
                                            <hr />
                                            <hr />
                                            <hr />
                                        </div>
                                    </div>
                                ) : message.role === "user" ? (
                                    <div className="user-message d-flex gap-3 align-items-center">
                                        <img
                                            src={assets.user_icon}
                                            alt="usericon"
                                            className="res-icon rounded-circle"
                                        />
                                        <p className="usermsg">{message.content}</p>
                                    </div>
                                ) : (
                                    <div className="assistant-message d-flex gap-3 align-items-center">
                                        <img
                                            src={assets.gemini_icon}
                                            alt="gemini-icon"
                                            className="res-icon"
                                        />
                                        <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                    <>
                        {/* Greeting */}
                        <div className="m-auto mt-4 greet">
                            <div className="greeting ms-4">
                                <span>Hello, Sara.</span>
                                <p>How can I help you today?</p>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="m-auto justify-content-evenly cards row mt-5">
                            <div
                                onClick={() => prompt('Suggest beautiful places to see on an upcoming road trip')}
                                className="qcard col-lg-2 col-md-4 col-sm-5 col-12 position-relative p-3 rounded-2 mb-2"
                            >
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img
                                    src={assets.compass_icon}
                                    alt="cardimg"
                                    className="card-icon position-absolute bottom-0 end-0 me-3 mb-3 bg-white p-2 rounded-circle"
                                />
                            </div>
                            <div
                                onClick={() => prompt("Briefly summarize this concept: urban planning")}
                                className="qcard col-lg-2 col-md-4 col-sm-5 col-12 position-relative p-3 rounded-2 mb-2"
                            >
                                <p>Briefly summarize this concept: urban planning</p>
                                <img
                                    src={assets.bulb_icon}
                                    alt="cardimg"
                                    className="card-icon position-absolute bottom-0 end-0 me-3 mb-3 bg-white p-2 rounded-circle"
                                />
                            </div>
                            <div
                                onClick={() => prompt("Brainstorm team bonding activities for our work retreat")}
                                className="qcard col-lg-2 col-md-4 col-sm-5 col-12 position-relative p-3 rounded-2 mb-2"
                            >
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img
                                    src={assets.message_icon}
                                    alt="cardimg"
                                    className="card-icon position-absolute bottom-0 end-0 me-3 mb-3 bg-white p-2 rounded-circle"
                                />
                            </div>
                            <div
                                onClick={() => prompt("Tell me about React js and React native")}
                                className="qcard col-lg-2 col-md-4 col-sm-5 col-12 position-relative p-3 rounded-2 mb-2"
                            >
                                <p>Tell me about React js and React native</p>
                                <img
                                    src={assets.code_icon}
                                    alt="cardimg"
                                    className="card-icon position-absolute bottom-0 end-0 me-3 mb-3 bg-white p-2 rounded-circle"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Input */}
                <div className="footer">
                    <div className="inputq m-auto mt-5 rounded-pill p-3 d-flex justify-content-between">
                        <input
                            type="text"
                            placeholder="Enter a prompt here"
                            className="border-0 w-75"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                        <div className="icons-box d-flex gap-2">
                            <img
                                src={assets.gallery_icon}
                                alt="inputicon"
                                className="inputicon"
                            />
                            <img
                                src={assets.mic_icon}
                                alt="inputicon"
                                className="inputicon"
                            />
                            <img
                                onClick={() => onsent(input)} 
                                src={assets.send_icon}
                                alt="inputicon"
                                className="inputicon"
                            />
                        </div>
                    </div>
                    <p className="text-center mt-3">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </>
    );
}

export default Chat;