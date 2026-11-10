(function () {
  "use strict";
  var categories = ["Transitions","Effects","Shakes","Color Grading","Text Animation","Graphs","Text Effects","My Presets"];
  var descriptions = {
    "Transitions":"Add motion to your edits in one click.",
    "Effects":"Stylize layers with reusable effect stacks.",
    "Shakes":"Add impact, energy and camera movement.",
    "Color Grading":"Apply reusable color looks and treatments.",
    "Text Animation":"Animate titles, captions and typography.",
    "Graphs":"Apply reusable motion and easing presets.",
    "Text Effects":"Build a distinctive look for your typography.",
    "My Presets":"Your personal collection of imported presets."
  };
  var currentCategory = "Transitions";
  var allPresets = [];

  function qs(id) { return document.getElementById(id); }
  function safeEvalString(value) {
    return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r/g, "").replace(/\n/g, "");
  }
  function showNotice(message, error) {
    var el = qs("notice");
    el.textContent = message;
    el.style.borderColor = error ? "#78434a" : "#25303c";
    el.style.color = error ? "#ff9ca4" : "#8292a5";
  }
  function hostCall(expression, callback) {
    if (!MotionXBridge.isCEP()) {
      showNotice("Open this panel inside After Effects to use preset actions. You can still explore the interface.", true);
      if (callback) callback("");
      return;
    }
    MotionXBridge.evalScript(expression, callback || function () {});
  }
  function render() {
    var query = qs("searchInput").value.toLowerCase();
    var filtered = allPresets.filter(function (p) { return p.name.toLowerCase().indexOf(query) !== -1; });
    qs("presetCount").textContent = filtered.length + (filtered.length === 1 ? " PRESET" : " PRESETS");
    qs("activeCategory").textContent = currentCategory.toUpperCase();
    var grid = qs("presetGrid");
    grid.innerHTML = "";
    if (!filtered.length) {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = '<div class="empty-icon">✧</div><h3>No presets in this section yet</h3><p>Import an After Effects <b>.ffx</b> file to get started.</p>';
      grid.appendChild(empty);
      return;
    }
    filtered.forEach(function (preset) {
      var card = document.createElement("div");
      card.className = "preset-card";
      var symbol = document.createElement("div"); symbol.className = "preset-symbol"; symbol.textContent = "✧";
      var name = document.createElement("div"); name.className = "preset-name"; name.textContent = preset.name;
      var meta = document.createElement("div"); meta.className = "preset-meta";
      var type = document.createElement("span"); type.textContent = ".FFX PRESET";
      var apply = document.createElement("span"); apply.className = "apply-tag"; apply.textContent = "APPLY ↗";
      meta.appendChild(type); meta.appendChild(apply);
      card.appendChild(symbol); card.appendChild(name); card.appendChild(meta);
      card.addEventListener("click", function () { applyPreset(preset.path, preset.name); });
      grid.appendChild(card);
    });
  }
  function parseList(raw) {
    if (!raw || raw === "NO_CEP_HOST" || raw === "undefined") return [];
    return raw.split("\n").filter(Boolean).map(function (line) {
      var parts = line.split("\t");
      return { name: parts[0], path: parts.slice(1).join("\t") };
    });
  }
  function loadPresets() {
    hostCall('MOTIONX_listPresets("' + safeEvalString(currentCategory) + '")', function (raw) {
      allPresets = parseList(raw);
      render();
    });
  }
  function applyPreset(path, name) {
    showNotice("Applying " + name + "…");
    hostCall('MOTIONX_applyPreset("' + safeEvalString(path) + '")', function (result) {
      if (result === "OK") showNotice(name + " applied. You can undo it in After Effects.");
      else showNotice(result || "Could not apply preset. Check your selected layer and composition.", true);
    });
  }
  function importPreset() {
    hostCall('MOTIONX_chooseAndImport("' + safeEvalString(currentCategory) + '")', function (result) {
      if (result && result.indexOf("IMPORTED:") === 0) {
        showNotice("Preset imported successfully.");
        loadPresets();
      } else if (result === "CANCELLED") {
        showNotice("Import cancelled.");
      } else if (result && result !== "undefined") {
        showNotice(result, true);
      }
    });
  }
  function switchCategory(category) {
    currentCategory = category;
    Array.prototype.forEach.call(document.querySelectorAll(".nav-item"), function (button) {
      button.classList.toggle("active", button.getAttribute("data-category") === category);
    });
    qs("categoryTitle").textContent = category;
    qs("categoryDesc").textContent = descriptions[category] || "Your custom preset collection.";
    loadPresets();
  }
  document.addEventListener("DOMContentLoaded", function () {
    qs("categoryNav").addEventListener("click", function (event) {
      var button = event.target.closest("[data-category]");
      if (button) switchCategory(button.getAttribute("data-category"));
    });
    qs("searchInput").addEventListener("input", render);
    qs("addPresetBtn").addEventListener("click", importPreset);
    qs("refreshBtn").addEventListener("click", loadPresets);
    switchCategory(currentCategory);
  });
})();