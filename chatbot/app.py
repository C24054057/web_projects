from flask import Flask, render_template, url_for, request, jsonify
import random

app = Flask(__name__)

count = 0

@app.route('/', methods=['POST', 'GET'])
def index():
    global count
    if request.method == 'POST':
        print("你輸入的字：", end=" ")
        print(request.get_json()['frontend']) # 前端傳過來的值
        count += 1
        return jsonify({'backend':'這是第' + str(count) + '個回傳'})
        
    return render_template('chatBot.html')
    
if __name__ == '__main__':
    app.run(debug=True)