const Discord = require('discord.js');
const client = new Discord.Client();
var date = new Date;
var time = date.toISOString();
const request = require('request');
const auth = require('./config/auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
        status: "online",
        game: {
            name: "Bot vẫn đang beta",
            type: "STREAMING"
        }
    }); 
});

client.on('message', message => {
if (message.author.bot) return;
const prefix = auth.prefix;
if (message.content.startsWith(prefix)) {
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	
	if (command.startsWith('warp+')) {
		var arr = message.content.split(" "),
			options,
			id = arr[1],
			times = arr[2]
			function sendReq() {
				request(options, function (error, response, body){
						if(error) {console.log(error)}
						else{console.log(body)}
					})
				}
		const baseString =
		  '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

		const getRandomInt = (min, max) => {
		  return Math.floor(Math.random() * (max - min)) + min;
		};

		const getRandomString = (length, base) => {
		  let result = '';
		  const baseLength = base.length;

		  for (let i = 0; i < length; i++) {
			const randomIndex = getRandomInt(0, baseLength);
			result += base[randomIndex];
		  }

		  return result;
		};
		if (0< times < 101) {
			var install_id = getRandomString(11, baseString);
			message.channel.send('Đang tăng WARP+ cho: '+id+' '+times+' lần :3')
			var i = 1;
			function run () {
			   setTimeout(function () {
					var data_raw =
						{
							"key": getRandomString(42, baseString)+'=',
							"install_id": install_id,
							"fcm_token": install_id+":APA91b"+getRandomString(134, baseString),
							"referrer": id,
							"warp_enabled": false,
							"tos": time.slice(0,-1)+"+07:00",
							"type": "Android",
							"locale": "zh-CN"
						}
					var data = JSON.stringify(data_raw)
					options = {
						url: 'https://api.cloudflareclient.com/v0a745/reg',
						data: data,
						headers: {
							'Content-Type': 'application/json; charset=UTF-8',
							'Host': 'api.cloudflareclient.com',
							'Connection': 'Keep-Alive',
							'Accept-Encoding': 'gzip',
							'User-Agent': 'okhttp/3.12.1'
						}
					};
				   console.log(options.data)
				  sendReq()
				  i++;
				  if (i < times) {
					 run();
				  }
			   }, 3000)
			}

			run(); 
		}
		}
		else {
				message.channel.send('Tối đa là 100 lần thôi ông à .-.')
		}
	}
})

client.login(auth.token);