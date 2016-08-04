var http = require('http').Server();
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis('redis');
//
////subscribe to all channels
redis.psubscribe('*', function(err, count) {
    if (err)
        console.error(err);
});
//
redis.on('pmessage', function(pattern, channel, payload) {
    payload = JSON.parse(payload);
    //io.emit(channel + ':' + message.event, message.data);
    console.log(channel);
    io.emit(channel, payload.data);
});

io.on('connection', function (socket) {
    console.log('connected');
});


http.listen(8080, function(){
    console.log('Listening on Port 8080.');
});