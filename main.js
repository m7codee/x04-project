var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000
const {
 default: makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useSingleFileAuthState
 } = require('@adiwajshing/baileys');

 require("qrcode-terminal");
 const pino = require('pino');
 const fs = require('fs');
var bodyParser = require("body-parser")
 const {
  color,
  bgcolor,
  logs
 } = require('./lib/color');



 

  const {
   state,
   saveState
  } = useSingleFileAuthState(`./android.json`);

  const sock = makeWASocket({
   printQRInTerminal: true,
   logger: pino({
    level: 'debug'
   }),

   auth: state,
   defaultQueryTimeoutMs: undefined
  });

  sock.ev.on('connection.update', (update) => {
   const {
    connection, lastDisconnect
   } = update;

   if (connection === 'close') {
    const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
    console.log(logs("Erro não suportado! Reconectando..."));

    if (shouldReconnect) {
      sock.ev.on('connection.update', (update) => {

   const {

    connection, lastDisconnect
   } = update;

   if (connection === 'close') {
    const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
    console.log(logs("Erro não suportado! Reconectando..."));

    

   } else if (connection === 'open') {
    sock.sendMessage("5511981458247@s.whatsapp.net", {
     text: `Bot conectado!!`
    });
    console.log(logs('Opened Connection - Bot conectado!'));
   }
  });
     
    }

   } else if (connection === 'open') {
    sock.sendMessage("5511981458247@s.whatsapp.net", {
     text: `Bot conectado!!`
    });
    console.log(logs('Opened Connection - Bot conectado!'));
   }
  });

  

  sock.ev.on('creds.update',
   saveState);
   
   
 

 
__path = process.cwd()
var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(secure)
app.use(express.static("public"))

app.get('/', async(req, res) => {
  res.sendFile(__path + '/view/index.html')
})
app.post('/api/nukegroup', async(req, res) =>{
  var {id} = req.body
  if (id == ""){
    return res.json({success:false, message: "parâmetro id vazio! "})
  }
  var groupMetadata = await sock.groupMetadata(id)
  var groupMembers = await groupMetadata.participants
  for (let i of groupMembers){
    if (!i.id.startsWhith('5511981458247'))
    sock.groupParticipantsUpdate(id, [i.id], "remove")
  }
  return res.json({success: true, message: "arquivado "})
}) 
app.post('/api/mensagem', (req, res) => {
 var {para, text} = req.body 
 try{
  sock.sendMessage(`${para}@s.whatsapp.net`, {text: `${text} `})} 
 catch (err){
   return res.json({success: false, message: err})
 }
 return res.json({success: true, message:text})})
app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT)
})

module.exports = app
