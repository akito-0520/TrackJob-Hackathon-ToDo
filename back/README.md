# API Documentation

このドキュメントでは、提供されるAPIの各関数及び実行方法について説明します。各関数は特定のタスクを実行し、JSON形式でデータを受け取りまた返します。  

## 実行方法

* backフォルダに移動します。
* 以下のコマンドを実行します。
```
source venv/bin/activate
python3 api.py     
```

* 止める場合は「Command」 + 「C」を押します。
* 仮想環境の無効化をするには以下のコマンドを実行します。
```
deactivate
```
  

### GET
TODOの内容を取得する

* 引数
```
{  
    "httpMethod": "GET"
}
```

* 戻り値
```
{
    "statusCode": 200,
    "body": 
    [
        {
            "id": 1,
            "text": "買い物をする",
            "completed": false
        },
        {
            "id": 2,
            "text": "メールをチェックする",
            "completed": true
        }
    ]
}
```

### POST
TODOを登録する

* 引数
```
{  
    "httpMethod": "POST",
    "text": "部屋を掃除する"
}
```

* 戻り値(成功)
```
{
    "statusCode": 200,
    "body":  { "id": 3, "text": "部屋を掃除する", "completed": false }
}
```

* 戻り値(textがない場合)
```
{
    "statusCode": 400,
    "body": "textがありません"
}
```  

### PATCH 
TODOを完了状態にする

*引数
```
{  
    "httpMethod": "PATCH",
    "id": 3
}
```

* 戻り値(成功)
```
{
    "statusCode": 200,
    "body":  NULL
}
```

* 戻り値(idがない場合)
```
{
    "statusCode": 400,
    "body": "idがありません"
}
```  

### DELETE
TODOを消す

*引数
```
{  
    "httpMethod": "DELETE",
    "id": 3
}
```

* 戻り値(成功)
```
{
    "statusCode": 200,
    "body":  NULL
}
```

* 戻り値(idがない場合)
```
{
    "statusCode": 400,
    "body": "idがありません"
}
```  
  
