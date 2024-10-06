import axios from "axios";
import * as dotenv from "dotenv"

dotenv.config()

interface axiosResponse {
    statusCode: number;
    body: string | undefined
}

interface ToDo {
        id: number;
        text: string;
        completed: boolean;
}

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout:2000,
})

// ToDoを取得する関数
const fetchToDo = async():Promise<ToDo[]|undefined> => {
    const postData = {
        httpMethod: "GET"
    }
    try {
        const response:axiosResponse = await axiosInstance.post("", postData);
        if (response.statusCode === 200 && response.body){
            return JSON.parse(response.body)
        }
    } catch (e) {
        console.error("Error fetching ToDo:", e);
        throw e;
    }
}


// ToDoを登録する関数
const registerTodo = async(text:string):Promise<ToDo|undefined> => {
    try {
        const data = {
            httpMethod: "POST",
            text: text,
        };
        const response:axiosResponse = await axiosInstance.post("", data);
        if (response.statusCode === 200 && response.body) {
            return JSON.parse(response.body)
        }
    } catch (e) {
        console.error("Error registering ToDo:", e);
        throw e;
    }
}

// ToDoを完了状態にする
const patchToDo = async(id:number) => {
    try {
        const data = {
            httpMethod: "PATCH",
            id: id,
        }
        await axiosInstance.post("", data);
    } catch (e) {
        console.error("Error patching Todo:", e);
        throw e;
    }
}

// ToDoを削除する
const deleteToDo = async(id:number) => {
    try {
        const data = {
            httpMethod: "DELETE",
            id: id,
        }
        await axiosInstance.post("", data);
    } catch (e) {
        console.error("Error deleting Todo:", e);
        throw e;
    }
}

const api = {fetchToDo, registerTodo, patchToDo, deleteToDo}
export default api