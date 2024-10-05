from flask import Flask, jsonify, request
import threading
import time

app = Flask(__name__)

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
        return {
            'statusCode': 400,
            'body': json.dumps('httpMethodがありありません')
        }

    #GET
    if data["httpMethod"] == "GET":
        return {
            'statusCode': 200,
            'body': jsonify(database["todos"])
        }

    #POST
    if data["httpMethod"] == "POST":
        if not data["text"]:
            return {
                'statusCode': 400,
                'body': json.dumps('textがありありません')
            }

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

        return {
            'statusCode': 200,
            'body': new_todo
        }

    #PATCH
    if data["httpMethod"] == "PATCH":
        if not data["id"]:
            return {
                'statusCode': 400,
                'body': json.dumps('idがありありません')
            }
        
        todo = next((t for t in database["todos"] if t['id'] == data["id"]), None)
        if not todo:
            return {
                'statusCode': 404,
                'body': json.dumps('指定したidのTODOがありません')
            }
        
        todo["completed"] = False

        return {
            'statusCode': 200,
            'body': NULL
        }

    #DELETE
    if data["httpMethod"] == "PATCH":
        if not data["id"]:
            return {
                'statusCode': 400,
                'body': json.dumps('idがありありません')
            }
        
        todo = next((t for t in database["todos"] if t['id'] == data["id"]), None)
        if not todo:
            return {
                'statusCode': 404,
                'body': json.dumps('指定したidのTODOがありません')
            }

        database["todos"] = [t for t in database["todos"] if t["id"] != data["id"]]
        
        return {
            'statusCode': 200,
            'body': NULL
        }

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
    app.run(debug=True)
