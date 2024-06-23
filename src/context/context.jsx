import { createContext, useState } from "react";
import run from "../config/gemini";

// create and export variable
export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }


// asynchronous function
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompts(prev=>[...prev, input])
        const response = await run(input)
        let responseArray = response.split("**"); // split("**") method splits the string at each occurrence of the double asterisks "**". It returns an array of substrings. //basically splits strings based on ** and return a substring of full string based on split
        let newResponse;
        for(let i=0; i<responseArray.length; i++)
        {
            // i === 0: If the current index i is 0.
            // i % 2 !== 1: If the current index i is even (i.e., not odd).
            if(i===0 || i%2 !==1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>" + responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        // setResultData(newResponse2)
        let newResponseArray = newResponse2.split("*").join("</br>")
        for (let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+ "")
        }
        setLoading(false)
        setInput("")

        console.log(responseArray)
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return(
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider;

