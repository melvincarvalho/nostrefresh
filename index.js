; (() => {
  globalThis.qs = Object.fromEntries(new URLSearchParams(document.location.search))

  var t = qs.t || 5

  if (qs.relay) {
    var socket = new WebSocket(qs.relay)

    socket.onopen = function (event) {
      console.log('wss open', qs.relay)
      let now = new Date().getTime()
      now = Math.floor(now / 1000.0)
      let subscribe = `["REQ", "tail", {"since": ${now} }]`
      console.log(subscribe)
      socket.send(subscribe)
    }
    socket.onmessage = function (event) {
      console.log('refreshing in', t)
      setTimeout(() => {
        document.location.reload()
      }, t * 1000)
    }
  }
}
)()