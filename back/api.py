from flask import Flask, jsonify, request
import threading
import time
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)

# インメモリデータベース
database = {
    "todos": [
        {"id": 1, "text": "買い物をする", "completed": False},
        {"id": 2, "text": "メールをチェックする", "completed": True},
    ]
}

@app.route('/', methods=['POST'])
def add_todo():
    #httpMethodの確認
    global database
    data = request.get_json()
    if not data["httpMethod"]:
        return jsonify({
            'statusCode': 400,
            'body': 'httpMethodがありありません'
        }), 400

    #GET
    if data["httpMethod"] == "GET":
        print("GETリクエストが来ました")
        print(data)
        return jsonify({
            'statusCode': 200,
            'body': database["todos"]
        }), 200

    #POST
    if data["httpMethod"] == "POST":
        print("POSTリクエストが来ました")
        print(data)
        if not data["text"]:
            return jsonify({
                'statusCode': 400,
                'body': 'textがありありません'
            }), 400

        id = 1
        for i in database["todos"]:
            if id == i["id"]:
                id += 1
        new_todo = {
        "id": id,
        "text": data["text"],
        "completed": False
        }
        database["todos"].append(new_todo)

        return jsonify({
            'statusCode': 200,
            'body': new_todo
        }), 200

    #PATCH
    if data["httpMethod"] == "PATCH":
        print("PATCHリクエストが来ました")
        print(data)
        if not data["id"]:
            return jsonify({
                'statusCode': 400,
                'body': 'idがありありません'
            }), 400
        
        todo = next((t for t in database["todos"] if t['id'] == data["id"]), None)
        if not todo:
            return jsonify({
                'statusCode': 404,
                'body': '指定したidのTODOがありません'
            }), 404
        
        todo["completed"] = False

        return jsonify({
            'statusCode': 200,
            'body': NULL
        }), 200

    #DELETE
    if data["httpMethod"] == "DELETE":
        print("DELETEリクエストが来ました")
        print(data)
        if not data["id"]:
            return jsonify({
                'statusCode': 400,
                'body': 'idがありありません'
            }), 400
        
        todo = next((t for t in database["todos"] if t['id'] == data["id"]), None)
        if not todo:
            return jsonify({
                'statusCode': 404,
                'body': '指定したidのTODOがありません'
            }), 404

        database["todos"] = [t for t in database["todos"] if t["id"] != data["id"]]
        
        return jsonify({
            'statusCode': 200,
            'body': NULL
        }), 200

# システム全体の監視用の関数
def background_monitor():
    while True:
        # 例: データベースの状態を定期的にログに出力
        print(f"Database status: {database}")
        time.sleep(100)  # 10秒に1回ログを出力

if __name__ == '__main__':
    # バックグラウンドで別のスレッドを実行
    monitor_thread = threading.Thread(target=background_monitor)
    monitor_thread.daemon = True
    monitor_thread.start()

    # Flaskサーバーの起動
    app.run(host="localhost", port=8000, debug=True)
