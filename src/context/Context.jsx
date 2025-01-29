import { createContext } from "react";
import run from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [history, setHistory] = useState([]);
    const [Conversations, setConversation] = useState([])
    const [currentConvID, setCurrentConvID] = useState(null)

    const saveCurrentconv = (newhistory) => {
        if (newhistory.length > 0) {
            setConversation(prevconv => {
                const isExist = prevconv.findIndex(conv => conv.id === currentConvID)
                if (isExist !== -1) {
                    const updateconv = [...prevconv]
                    updateconv[isExist] = {
                        ...updateconv[isExist],
                        history: [...newhistory],
                    }
                    return updateconv
                } else {
                    const newconv =
                    {
                        id: Date.now(),
                        name: newhistory[0]?.content.slice(0, 15),
                        history: [...newhistory],
                    }
                    setCurrentConvID(newconv.id)
                    return [...prevconv, newconv]
                }
            })
        }
    }
    const newchat = () => {
        saveCurrentconv(history)
        setHistory([])
        setLoading(false)
        setShowResult(false)
        setCurrentConvID(null)
    }

    const LoadConversation = (id) => {
        saveCurrentconv(history)
        let conv = Conversations.find(conv => conv.id === id)
        if (conv) {
            setHistory(conv.history)
            setShowResult(true)
            setCurrentConvID(id)
        }
    }

    const onsent = async (prompt) => {
        setLoading(true);
        setShowResult(true);

        const userMessage = { role: "user", content: prompt || input };

        setHistory((prev) => {
            const updhis=[...prev, userMessage]
            saveCurrentconv(updhis)
            return updhis
        }
        );
        

        const loadingMessage = { role: "model", content: "", isLoading: true };
        setHistory((prev) => [...prev, loadingMessage]);

        let response;
        if (prompt !== undefined) {
            response = await run(prompt, history);
        } else {
            response = await run(input, history);
        }

        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");

        setHistory((prev) => {
            const updatedHistory = [...prev];
            updatedHistory.pop();
            const assistantMessage = { role: "model", content: "", isLoading: true };
            return [...updatedHistory, assistantMessage];
        });

        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            setTimeout(() => {
                setHistory((prev) => {
                    const updatedHistory = [...prev];
                    const lastMessage = updatedHistory[updatedHistory.length - 1];
                    lastMessage.content += nextWord + " ";
                    lastMessage.isLoading = false;
                    return updatedHistory;
                });

            }, 50 * i);
        }
        console.log(Conversations)
        setInput("");
        
    };


    const contexvalue = {
        input,
        setInput,
        loading,
        showResult,
        onsent,
        newchat,
        history,
        setHistory,
        LoadConversation,
        Conversations,
        setConversation,
        saveCurrentconv
    }

    return (
        <Context.Provider value={contexvalue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider

