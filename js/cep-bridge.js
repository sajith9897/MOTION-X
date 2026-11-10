/* Small CEP bridge wrapper. CEP exposes the host bridge through __adobe_cep__. */
(function (global) {
  function evalScript(script, callback) {
    if (global.__adobe_cep__ && typeof global.__adobe_cep__.evalScript === "function") {
      global.__adobe_cep__.evalScript(script, callback || function () {});
    } else {
      console.warn("MOTIONX is running outside Adobe CEP. Host scripting is unavailable.");
      if (callback) callback("NO_CEP_HOST");
    }
  }
  global.MotionXBridge = {
    evalScript: evalScript,
    isCEP: function () {
      return !!(global.__adobe_cep__ && global.__adobe_cep__.evalScript);
    }
  };
})(window);