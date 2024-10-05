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
            'body'; jsonify(database["todos"])
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
