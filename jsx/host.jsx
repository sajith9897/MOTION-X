/* MOTIONX host scripting for Adobe After Effects (ExtendScript / ES3 compatible). */
(function () {
    var ROOT = Folder.myDocuments.fsName + "/MOTIONX/Presets";
    var CATEGORIES = ["Transitions", "Effects", "Shakes", "Color Grading", "Text Animation", "Graphs", "Text Effects", "My Presets"];

    function cleanCategory(name) {
        name = String(name || "My Presets");
        for (var i = 0; i < CATEGORIES.length; i++) {
            if (CATEGORIES[i] === name) return name;
        }
        return "My Presets";
    }
    function ensureFolder(folder) {
        if (!folder.exists) folder.create();
        return folder;
    }
    function categoryFolder(category) {
        var base = ensureFolder(new Folder(ROOT));
        return ensureFolder(new Folder(base.fsName + "/" + cleanCategory(category)));
    }
    function errorText(prefix, error) {
        return prefix + (error && error.toString ? error.toString() : String(error));
    }

    $.global.MOTIONX_listPresets = function (category) {
        try {
            var folder = categoryFolder(category);
            var files = folder.getFiles(function (f) {
                return f instanceof File && /\.ffx$/i.test(f.name);
            });
            var lines = [];
            for (var i = 0; i < files.length; i++) {
                lines.push(files[i].displayName.replace(/[\r\n\t]/g, " ") + "\t" + files[i].fsName);
            }
            return lines.join("\n");
        } catch (e) {
            return "";
        }
    };

    $.global.MOTIONX_applyPreset = function (presetPath) {
        var undoStarted = false;
        try {
            var comp = app.project ? app.project.activeItem : null;
            if (!(comp instanceof CompItem)) return "Open a composition first.";
            if (!comp.selectedLayers || comp.selectedLayers.length === 0) return "Select at least one layer first.";
            var presetFile = new File(presetPath);
            if (!presetFile.exists) return "Preset file not found: " + presetPath;
            app.beginUndoGroup("MOTIONX - Apply Preset");
            undoStarted = true;
            var layers = comp.selectedLayers;
            for (var i = 0; i < layers.length; i++) layers[i].applyPreset(presetFile);
            app.endUndoGroup();
            undoStarted = false;
            return "OK";
        } catch (e) {
            if (undoStarted) {
                try { app.endUndoGroup(); } catch (ignore) {}
            }
            return errorText("Apply failed: ", e);
        }
    };

    $.global.MOTIONX_chooseAndImport = function (category) {
        try {
            var source = File.openDialog("Choose an After Effects animation preset (.ffx)", "*.ffx", false);
            if (!source) return "CANCELLED";
            if (!/\.ffx$/i.test(source.name)) return "Please select an .ffx preset file.";
            var destinationFolder = categoryFolder(category);
            var safeName = source.name.replace(/[\\\/:*?"<>|]/g, "_");
            var destination = new File(destinationFolder.fsName + "/" + safeName);
            if (destination.exists) {
                var base = safeName.replace(/\.ffx$/i, "");
                var ext = ".ffx";
                var n = 2;
                while (destination.exists) {
                    destination = new File(destinationFolder.fsName + "/" + base + "_" + n + ext);
                    n++;
                }
            }
            if (!source.copy(destination.fsName)) return "Could not copy preset. Check folder permissions.";
            return "IMPORTED:" + destination.fsName;
        } catch (e) {
            return errorText("Import failed: ", e);
        }
    };

    // Create the library folders when the panel loads.
    try {
        for (var j = 0; j < CATEGORIES.length; j++) categoryFolder(CATEGORIES[j]);
    } catch (ignoreInit) {}
})();