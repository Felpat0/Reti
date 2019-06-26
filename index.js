  var Peer = require('simple-peer')

  //Creo un peer (un partecipante)
  var peer = new Peer({
    initiator: location.hash === '#init', //Se nella location attuale c'è "#init" sarà l'iniziatore della connessione
    trickle: false
  })

/*Quando il peer deve inviare un segnale instauratore all'altro peer
  NB: se il peer è l'iniziatore, allora questa funzione verrà richiamata subito
      Se non lo è, viene eseguita in seguito alla chiamata peer.segnal
*/
  peer.on('signal', function (data) {
    document.getElementById('id').value = JSON.stringify(data)
  })

//Quando il pulsante "Avvia connessione" viene premuto...
  document.getElementById('submit').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value) //Codifico in JSON i dati dell'altra textarea
    peer.signal(otherId) //Prendo i dati di segnalazione dell'altro peer
                         // ed eseguo peer.on('signal',..)
  })

//Quando il pulsante "Invia messaggio" viene premuto...
  document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('message').value
    peer.send(yourMessage) // Invia il messaggio all'altr peer
    document.getElementById('messages').innerHTML += '<div align="right" id="message1"><p class="border">' + yourMessage + '</p></div>'
    document.getElementById('message').value = "";
  })

//Quando il peer riceve un messaggio...
  peer.on('data', function (data) {
        document.getElementById('messages').innerHTML += '<div align="left" id="message1"><p class="border">' + data + '</p></div>'
  })
