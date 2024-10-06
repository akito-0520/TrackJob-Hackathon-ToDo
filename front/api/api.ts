import axios from "axios";

interface ToDo {
    id: number;
    text: string;
    completed: boolean;
}

interface axiosResponse {
    status: number;
    data: data
}

interface data {
    statusCode: number
    body: ToDo | ToDo[] | undefined | string
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout:2000,
})

// ToDoを取得する関数
const fetchTodo = async():Promise<ToDo[]|undefined> => {
    const postData = {
        "httpMethod": "GET"
    }
    try {
        const response:axiosResponse = await axiosInstance.post("/", postData);
        if (response.status === 200 && response.data && response.data){
            const result = response.data.body as ToDo[] | undefined
            return result
        }else{
            console.error(response.data.body)
        }
    } catch (e) {
        console.error("Error fetching ToDo:", e);
        throw e;
    }
}


// ToDoを登録する関数
const registerTodo = async(text:string):Promise<ToDo|undefined> => {
    try {
        const postData = {
            "httpMethod": "POST",
            text: text,
        };
        const response:axiosResponse = await axiosInstance.post("/", postData);
        if (response.status === 200 && response.data && response.data.body) {
            const result = response.data.body as ToDo
            return result
        }
    } catch (e) {
        console.error("Error registering ToDo:", e);
        throw e;
    }
}

// ToDoを完了状態にする
const patchTodo = async(id:number):Promise<Number|undefined> => {
    try {
        const postData = {
            "httpMethod": "PATCH",
            "id": id,
        }
        const response = await axiosInstance.post("/", postData);
        if(response && response.data) {
            return response.data
        }
    } catch (e) {
        console.error("Error patching Todo:", e);
        throw e;
    }
}

// ToDoを削除する
const deleteTodo = async(id:number):Promise<Number|undefined> => {
    try {
        const data = {
            "httpMethod": "DELETE",
            "id": id,
        }
        const response = await axiosInstance.post("/", data);
        if(response && response.data) {
            return response.data
        }
    } catch (e) {
        console.error("Error deleting Todo:", e);
        throw e;
    }
}

const api = {fetchTodo, registerTodo, patchTodo, deleteTodo}
export default api