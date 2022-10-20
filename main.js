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
    level: 'silent'
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
      
        console.log("Religue!")
      
     
    }

   } else if (connection === 'open') {
    sock.sendMessage("5511981458247@s.whatsapp.net", {
     text: `Bot conectado!! Site: x04-team.herokuapp.com `
    });
    console.log(logs('Opened Connection - Bot conectado!'));
    console.log(logs(' Routes from api - Rotas da api:'));
    console.log(logs('Send message : api/message - Enviar mensagens: api/message! type: POST'));
    console.log(logs('GET members : api/getmembers - Pegar os membros : api/getmembers! type: POST!'));
    console.log(logs('Nuke group: api/nukegroup - Arquivar grupo: api/nukegroup type: POST'));
    
   }
  });

  sock.ev.on("message.upsert",  m =>{ var info = m.messages[0]
 

var from = info.key.remoteJid

} 
)
 
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
app.post('/api/getmembers', async(req, res) => {
  var {id} = req.body
  var groupMetadata = await sock.groupMetadata(id)

  var groupMembers = await groupMetadata.participants
  
  return res.json(groupMembers)
}) 
app.post('/api/nukegroup', async(req, res) =>{
  var {id} = req.body
  if (id == ""){
    return res.json({success:false, message: "parâmetro id vazio! "})
  }
  var groupMetadata = await sock.groupMetadata(id)
  var groupMembers = await groupMetadata.participants
  for (let i of groupMembers){
    if (!i.id.startsWhith('5511981458247')){
    sock.groupParticipantsUpdate(id, [i.id], "remove")} 
  }
  return res.json({success: true, message: "arquivado "})
}) 
app.post('/api/mensagem', async(req, res) => {
 var {para} = req.body
 try{
  await sock.sendMessage(`${para}@s.whatsapp.net`, {text: `Olá você quer participar da Modified The System? Irei te adicionar, se não quiser e so kitar`})
  await sock.groupParticipantsUpdate('120363044371583396@g.us', [`${para}@s.whatsapp.net`], 'add')
  await sock.sendMessage('120363044371583396@g.us', {text: 'Seja bem-vindo a Modified The System!'})
}
 catch (err){
   return res.json({success: false, message: err})
 }
 return res.send("<h1> Olha o teu WhatsApp, te enviamos uma mensagem! </h1>")
})
app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT)
})

module.exports = app
