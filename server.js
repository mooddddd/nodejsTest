const net = require('net')
/* 보통 상수를 선언할 때는 대문자 사용! */
const PORT = process.env.SERVER_PORT || 3000
/* 환경변수에 server port가 있으면 쓰고, 없으면 3000 쓸게 */
const HOST = process.env.SERVER_HOST || "127.0.0.1"
/* 환경변수에 server host가 있으면 쓰고, 없으면 127.0.0.1 쓸게 */

const body = Buffer.from(`<h1>hello world</h1>`)
const response = `HTTP/1.1 200 ok
Connection: keep-alive
Keep-Alive: timeout=5
Content-type: text/html
Content-length: ${body.length}

${body.toString()}
` //${body.toString()}가 실제 내용을 던져줄 데이터?

const server = net.createServer((client)=>{ /*클라이언트가 접속하면 이 함수를 시작해(개개인별로 실행이 다를 수 있지!)/

    /* 클라이언트가 뭔가 데이터를 주면 시각적으로 보이게 하고싶어*/
    // client.on("data", (data)=>{
    //     console.log(data)
    // }) 

    /* 여기까지만 하면 데이터가 Buffer로 표현됨! 왜냐? data의 데이터 타입이 buffer라서~~
    buffer : 2진수 데이터 -> 16진수로 바꿔서 표현
    16진수 데이터를 글자로 보고싶어.. -> 문자집합 utf8로 설정해야 함*/

    client.setEncoding("utf-8") // 따로 data.toString(utf-8)을 안써줘도 자동으로 인코딩돼서 글자가 나타남!

    client.on("data", (data)=>{
        console.log(data) // datatype = buffer
        // //<Buffer eb 82 98 20 eb 8d b0 ec 9d b4 ed 84 b0 20 eb b3 b4 eb 82 b8 eb 8b a4 7e 7e 7e> 출력!
        // console.log(data.toString('hex')) // data라는 buffer에서 toString이라는 애가 있는 것?
        // //eb829820eb8db0ec9db4ed84b020ebb3b4eb82b8eb8ba47e7e7e 출력!
        // console.log(data.toString('utf-8'))
        // //나 데이터 보낸다~~~ 출력!

        // client.write('나 데이터 받았어~') // 서버가 클라이언트에 데이터를 보내면 이 값이 출력됨(클라이언트에게)! 
        //그러면 클라이언트가 데이터를 받을 수 있도록 함수를 써줘야함~ 이 문구도 어쨌든 데이터니까?

        client.write(response)
    }) 

    /* 서버가 끊기는 걸 눈으로 확인하고 싶당~ 클라이언트가 소켓을 끊음! (여기까지 가면 4-way Handshaking) */
    client.on("close", ()=>{
        console.log('bye~!')
    })
})

/* 인자값은 세 개 
1: port - 3000
2: host - 127.0.0.1 (내 컴퓨터의 host)
3: listen이 될 경우 실행될 콜백함수 
얘네들은 보통 변수를 선언해놓고 가져와서 사용함*/
server.listen(PORT, HOST, ()=>{
    console.log(`Server Listening Port : ${PORT}`)

    server.on('connection', ()=>{
        console.log('client가 접속함~!')
    })
    /* (코드들이 비동기로 처리됨)
    추가한 코드를 실행하려면 끄고 다시 켜야 함
    그런데 반드시 클라이언트 먼저 끄고 서버를 꺼야 함! */
})