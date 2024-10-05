# API Documentation

このドキュメントでは、提供されるAPIの各関数について説明します。各関数は特定のタスクを実行し、JSON形式でデータを受け取りまた返します。  

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

* 戻り値
```
{
    "statusCode": 200,
    "body":  { "id": 3, "text": "部屋を掃除する", "completed": false }
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

### DELETE
TODOを消す

*引数
```
{  
    "httpMethod": "DELETE",
    "id": 3
}
```

  
