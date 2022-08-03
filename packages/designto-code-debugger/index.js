const IS_DEV = process.env.NODE_ENV === "development";
let MUTED = false;

// if browser
if (typeof window !== "undefined") {
  ///
  /// on console, type
  /// - window.postMessage("mute") to mute
  /// - window.postMessage("unmute") to unmute
  ///
  addEventListener("message", function (event) {
    var data = event.data;
    if (data === "mute") {
      MUTED = true;
      console.log("muted");
    }
    if (data === "unmute") {
      MUTED = false;
      console.log("unmuted");
    }
  });
}

function debug(...messages) {
  if (!MUTED && IS_DEV) {
    console.log(...messages);
  }
}

function debugIf(condition, ...messages) {
  const _continue = typeof condition === "function" ? condition() : condition;
  if (_continue) {
    debug(...messages);
  }
}

module.exports = {
  debug,
  debugIf,
};
