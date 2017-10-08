var restify = require('restify');
var builder = require('botbuilder');

//https://emojipedia.org/people/  para pegar emojis en la conversacion.

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialogos
bot.dialog('/', [
    function (session, results, next) {
        if (!session.userData.nombre) {
            builder.Prompts.text(session, '¿Quien eres, cual es tu nombre?');
        }
        else {
            session.endDialog(`¡Hola que mas! ${session.userData.nombre}!`);
        }
    },
    function (session, results) {
        if (results.response) {
            let msj = results.response;
            session.userData.nombre = msj;

            session.send(`Hola  ${session.userData.nombre}!, queria preguntarte algo `);
        }
        session.beginDialog('/PreguntasPersonajes');
    }

]);

bot.dialog('/PreguntasPersonajes', [ //método preguntar Personajes
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿cual es tu Anime favorito ?');
    },
    function (session, results){
        let ocupacion = results.response;
        session.endConversation(`${ocupacion} es un muy buen Anime  😄😄 jajajja tambien me gusta mucho`);
        session.beginDialog('/preguntarAnime');
    }
]);

bot.dialog('/preguntarAnime', [ //método preguntar por la familia
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿oye y que es lo que mas te gusta de ese Anime ?');
    },
    function (session, results){
        let serie = results.response;
        session.endConversation(` ${serie}, excelente 😎 `);
        session.beginDialog('/preguntarCantCapitulos');
    }

]);

bot.dialog('/preguntarCantCapitulos',[
	function(session){

		if(session.userData.cantCapitulos == '0'){
			
			builder.Prompts.text(session,'me podrias decir cuantos capitulos tiene ese Anime, tengo curiosidad');
			
		}else if(session.userData.cantCapitulos){

			session.endDialog(`${session.userData.nombre} ¿me dijiste que eran: ${session.userData.CantCapitulos}?`);
			//session.beginDialog('/DirSiConoce');

		}else {

			builder.Prompts.text(session,'¿Cual es la Cantidad de capitulos de ese Anime?');

		}
    },
	function(session,results){
		if(results.response){
			session.userData.cantCapitulos = results.response;
		}
		
		session.endDialog();
		session.beginDialog('/MostrarAsombro')
	}

]);
bot.dialog('/MostrarAsombro', [
	function(session){
		builder.Prompts.text(session,'WOOOW! son muchos es increible ');
		session.send({
			type: "message",
			attachments: [
			  {
				contentType: "image/gif",
				contentUrl: "C:/Users/Lucho/Desktop/bot/ProyectoCorteDos/img/asombro.gif",
				name: "asombro.gif"
			  }
			]
          });

          session.endDialog('deben ser capitulos emocionantes!, no?');
       
    },
    function (session) {
        builder.Prompts.text(session, 'Perdona, ¿cual era tu Anime favorito ?');
        },
        function (session, results) {
            session.dialogData.denuevo = results.response;
            session.endDialog(`AH verdad es: ${session.dialogData.denuevo} tengo mala memoria jajajj 😅😅 `);
             session.beginDialog('/preguntarOtra');
        }
]);

bot.dialog('/preguntarOtra', [ //método preguntar otra serie
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿y que te parecen los simpsons ?');
    },
    function (session, results){
        let otra = results.response;
        session.endConversation(`uyyy que bien ${otra} yo tambien estoy de acuerdo, aunque no sea anime`);
        session.beginDialog('/preguntarPersonaje');
    }
]);

bot.dialog('/preguntarPersonaje', [ //método preguntar personaje
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿Cual es tu personaje favorito de todas las serie de Anime ?');
    },
    function (session, results){
        let fav = results.response;
        session.endConversation(`me parece bien  ${fav} es uno de los personajes mas destacados`);
        session.beginDialog('/MostrarmiPersonaje');
    }
]);

bot.dialog('/MostrarmiPersonaje', [ //método preguntar personaje
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿Quieres saber cual es el mio ?');
    },
    function (session, results){
        let miper = results.response;
        session.endConversation(`dijiste: ${miper}, pues es GOKU de Dragon Ball Z`);
        session.beginDialog('/recomendarSerie');
    }
]);

bot.dialog('/recomendarSerie', [ //método preguntar personaje
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿ Que otra serie me recomiendas ver ?');
    },
    function (session, results){
        let rec = results.response;
        session.endConversation(`${rec}, hace rato tenia ganas de verme esa, se nota que sabes bastante`);
        session.beginDialog('/preguntaOtaku');
    }
]);

bot.dialog('/preguntaOtaku', [ //método preguntar otaku
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿ te consideras Otaku ?');
    },
    function (session, results){
        let otaku = results.response;
        session.endConversation(`${otaku}, mmmmm no lo se rick...... `);
        session.beginDialog('/preguntar');
    }
]);

/*bot.dialog('/preguntar', [ //método preguntar otaku
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿ seguro ?');
    },
    function (session, results){
        let preg = results.response;
        session.endConversation(`${preg}, muy bien 👀  `);
        session.beginDialog('/MostrarMiFavorito');
    
]);*/
bot.dialog('/preguntar', [ //método preguntar otaku
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿ seguro ?');
    },
    function (session, results){
        let preg = results.response;
        session.endConversation(`${preg}, muy bien 👀  `);
        session.beginDialog('/MostrarMiFavorito');
    }
]);

bot.dialog('/MostrarMiFavorito', [
	function(session){
		builder.Prompts.text(session,'Te mostrare mi serie favorita 😍❤!');
		session.send({
			type: "message",
			attachments: [
			  {
				contentType: "image/png",
				contentUrl: "C:/Users/Lucho/Desktop/bot/ProyectoCorteDos/img/naruto.jpg",
				name: "naruto.png"
			  }
			]
          });

          session.send('Gracias por compartir tus gusto conmigo, Buena suerte!');
          session.endConversation();
    }
    
]);