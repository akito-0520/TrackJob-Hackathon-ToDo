const apiUrl = "http://localhost:8000/";

// APIへGETリクエストを送る関数
function getTodos() {
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            httpMethod: "GET"
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("ToDos:", data.body);
        // ToDoリストを表示する処理を書く（例えばHTMLに出力）
    })
    .catch(error => console.error("Error fetching todos:", error));
}

// APIへPOSTリクエストを送る関数（新しいToDoを追加）
function addTodo(text) {
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            httpMethod: "POST",
            text: text
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Added new ToDo:", data.body);
        // 新しいToDoをリストに追加する処理を書く
    })
    .catch(error => console.error("Error adding todo:", error));
}

// APIへPATCHリクエストを送る関数（ToDoの完了ステータスを変更）
function completeTodo(id) {
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            httpMethod: "PATCH",
            id: id
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Updated ToDo:", data.body);
        // 更新されたToDoの表示を変更する処理を書く
    })
    .catch(error => console.error("Error updating todo:", error));
}

// APIへDELETEリクエストを送る関数（ToDoを削除）
function deleteTodo(id) {
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            httpMethod: "DELETE",
            id: id
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Deleted ToDo:", data.body);
        // 削除されたToDoをリストから消す処理を書く
    })
    .catch(error => console.error("Error deleting todo:", error));
}

// 使用例
getTodos(); // ToDoリストを取得
addTodo("新しいタスクを追加する"); // 新しいタスクを追加
completeTodo(1); // IDが1のタスクを完了に変更
deleteTodo(2); // IDが2のタスクを削除
