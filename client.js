const net = require('net')

/*인자값에 port, host 넣어야 함*/
// const socket = net.connect({port:3000, host:'127.0.0.1'})
/* 변수로 지정해서 넣어도 됨! */
const config = {port:3000, host:'127.0.0.1'}
const socket = net.connect(config)

socket.on("connect", ()=>{
    console.log('connected to server!')

    socket.write('나 데이터 보낸다~~~') /*얘는 데이터임! 16진수의 buffer로 보냄!*/
    // 이 내용을 잘 넣는 것이 http 프로토콜을 채우는 것?
    // 즉, http 프로토콜은 기본적으로 TCP 통신을 한다.
    // TCP 통신은 쌍방향 통신이 가능! 클라이언트가 서버에게, 서버가 클라이언트에게 요청이 가능함
    // 프로토콜 규격을 지킨다면 우리는 브라우저의 요청만으로도 처리가 가능함 
    // 브라우저에서 http://127.0.0.1:3000 을 치면 나의 TCP server가 받을 수 있음?
})

socket.on("data", (chunk)=> {
    console.log(`Received : ${chunk}`)
    socket.end() // 통신할 필요가 없을 때 자동으로 끊어지게 해줌!(더이상 주고받을 데이터가 없는 등)

})
// 서버가 보낸 데이터를 출력할 수 있도록 해줌!(나 데이터 받았어~ 하는 문구!)