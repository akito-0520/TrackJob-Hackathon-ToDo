from flask import Flask, jsonify, request
import sqlite3
import threading
from flask_cors import CORS  
import time

app = Flask(__name__)
CORS(app)

# データベースの初期化
def init_db():
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    # TODOテーブルの作成
    c.execute('''
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN NOT NULL CHECK (completed IN (0, 1))
        )
    ''')
    conn.commit()
    conn.close()

# TODOリストをデータベースから取得
def get_all_todos():
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('SELECT * FROM todos')
    todos = [{'id': row[0], 'text': row[1], 'completed': bool(row[2])} for row in c.fetchall()]
    conn.close()
    return todos

# TODOをデータベースに追加
def add_todo_to_db(text):
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('INSERT INTO todos (text, completed) VALUES (?, ?)', (text, False))
    conn.commit()
    new_todo_id = c.lastrowid
    conn.close()
    return new_todo_id

# TODOをIDで取得
def get_todo_by_id(todo_id):
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('SELECT * FROM todos WHERE id = ?', (todo_id,))
    row = c.fetchone()
    conn.close()
    if row:
        return {'id': row[0], 'text': row[1], 'completed': bool(row[2])}
    return None

# TODOの状態を反転
def toggle_todo_in_db(todo_id):
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    todo = get_todo_by_id(todo_id)
    if todo:
        new_completed = not todo["completed"]  # 現在の状態を反転
        c.execute('UPDATE todos SET completed = ? WHERE id = ?', (new_completed, todo_id))
        conn.commit()
    conn.close()
    return new_completed if todo else None

# TODOを削除
def delete_todo_from_db(todo_id):
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
    conn.commit()
    conn.close()

# APIエンドポイントの実装
@app.route('/', methods=['POST'])
def handle_request():
    data = request.get_json()

    # httpMethodの確認
    if not data or "httpMethod" not in data:
        return jsonify({'statusCode': 400, 'body': 'httpMethodが指定されていません'}), 400

    # GET
    if data["httpMethod"] == "GET":
        todos = get_all_todos()
        return jsonify({'statusCode': 200, 'body': todos}), 200

    # POST
    if data["httpMethod"] == "POST":
        if "text" not in data:
            return jsonify({'statusCode': 400, 'body': 'textが指定されていません'}), 400
        new_todo_id = add_todo_to_db(data["text"])
        return jsonify({'statusCode': 200, 'body': {'id': new_todo_id, 'text': data["text"], 'completed': False}}), 200

    # PATCH
    if data["httpMethod"] == "PATCH":
        if "id" not in data:
            return jsonify({'statusCode': 400, 'body': 'idが指定されていません'}), 400
        
        new_completed = toggle_todo_in_db(data["id"])
        
        if new_completed is None:
            return jsonify({'statusCode': 404, 'body': '指定されたidのTODOが見つかりません'}), 404
        
        return jsonify({'statusCode': 200, 'body': {'id': data["id"], 'new_completed': new_completed}}), 200

    # DELETE
    if data["httpMethod"] == "DELETE":
        if "id" not in data:
            return jsonify({'statusCode': 400, 'body': 'idが指定されていません'}), 400
        delete_todo_from_db(data["id"])
        return jsonify({'statusCode': 200, 'body': '削除しました'}), 200

    return jsonify({'statusCode': 400, 'body': '不正なhttpMethodです'}), 400

# データベースの初期化
init_db()

def log_database_status():
    while True:
        todos = get_all_todos()
        print("現在のデータベースの状態: ")
        for todo in todos:
            print(f"ID: {todo['id']}, テキスト: {todo['text']}, 完了: {todo['completed']}")
        time.sleep(10)  # 10秒ごとにデータベースの状態を出力

if __name__ == '__main__':
    # Flaskサーバーの起動
    monitor_thread = threading.Thread(target=log_database_status)
    monitor_thread.daemon = True
    monitor_thread.start()
    app.run(host="localhost", port=8000, debug=True)
