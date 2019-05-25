// ==UserScript==
// @name        Tagpro Bot
// @namespace   sflem1993
// @author      Sean Fleming
// @version     0.1
// @include     https://tagpro.koalabeast.com/game
// @include     http://tagpro-maptest.koalabeast.com:*/
// @include     http://tangent.jukejuice.com:*
// @include     http://maptest2.newcompte.fr:*/
// @grant       none
// ==/UserScript==

//registers our function with the game by passing it into tagpro.ready when the objects we need are initialized
//tagpro.ready registers our_function and calls it when the game is ready for userscripts to execute
//inline_src/Babel compilation is copied from Tampermonkey template to make installation of this script possible
/* jshint ignore:start */
function addToTagpro(startFunction) {
  if (typeof window.tagpro !== "undefined" && typeof window.tagpro.map !== "undefined") {
      console.log("reached")
      window.tagpro.ready(startFunction);
  } else {
    //if not ready, wait and try again
    //console.log("waiting")
    setTimeout(() => {
      addToTagpro(startFunction);
    }, 100);
  }
}

function bot() {
  //listen for all grabbed/dropped flag updates for player's own team
  window.tagpro.socket.on("p", (info) => {
    //the property u is an array that contains all updates to be applied to players
    let updates = info.u || info;
    updates.forEach((update) => {
      if (update.hasOwnProperty("flag")) {
        window.tagpro.socket.emit("chat", {
          message: "the flags been tampered with.",
          toAll: true
        });
      }
    });
  });
}

console.log("gottem")
addToTagpro(bot)