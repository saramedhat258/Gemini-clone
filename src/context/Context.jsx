import { createContext } from "react";
import run from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setprevPrompts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [resultData, setResultData] = useState("")

    const delay = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }
    const newchat = () => {
        setLoading(false)
        setShowResult(false)
    }
    const onsent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        
        /* لو بعرض اجابة سؤال من ال recent */
        if (prompt !== undefined) {
            response = await run(prompt)
            setRecentPrompt(prompt)
        } else {
        /* لو بعرض اجابة سؤال جاي من ال input  */
            response = await run(input)
            setRecentPrompt(input)
            setprevPrompts(prev => [...prev, input])
        }

        let responseArray = response.split("**")
        console.log(responseArray)
        
        let newResponse = ""
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i]
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>" 
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextword = newResponseArray[i]
            delay(i, nextword + " ")
        }
        setLoading(false)
        setInput("")
    }

    const contexvalue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setprevPrompts,
        loading,
        showResult,
        resultData,
        onsent,
        newchat
    }

    return (
        <Context.Provider value={contexvalue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider