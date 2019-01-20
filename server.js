var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if(path==='/music.json'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', '*')

    var data = fs.readFileSync('./music.json')

    response.write(`${data}`)
    response.end()
  }else if(path==='/shedidnotanswer'){
    var mp3='./she did not answer.mp3'
    var stat=fs.statSync(mp3)
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.writeHead(200,{
        'Content-Type':'audio/mpeg',
        'Content-Length':stat.size
    })
    var readableStream=fs.createReadStream(mp3)
    // 管道pipe流入
    readableStream.pipe(response);
  }else if(path==='/%E4%B8%8D%E8%A7%81%E5%BD%92%E4%BA%BA'){
    var mp3='./落Aki - 不见归人（Cover：彭晓晖、任震昊）.mp3'
    var stat=fs.statSync(mp3)
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.writeHead(200,{
        'Content-Type':'audio/mpeg',
        'Content-Length':stat.size
    })
    var readableStream=fs.createReadStream(mp3)
    // 管道pipe流入
    readableStream.pipe(response);
  }else if(path==='/%E8%85%90%E8%8D%89%E4%B8%BA%E8%90%A4'){
    var mp3='./落Aki - 腐草为萤（Cover：银临）.mp3'
    var stat=fs.statSync(mp3)
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.writeHead(200,{
        'Content-Type':'audio/mpeg',
        'Content-Length':stat.size
    })
    var readableStream=fs.createReadStream(mp3)
    // 管道pipe流入
    readableStream.pipe(response);
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
