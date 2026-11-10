MOTIONX - After Effects CEP Extension
Version: 0.1.0
Platform target: Windows / Adobe After Effects

WHAT THIS STARTER DOES
- Creates a dockable CEP panel with sections for Transitions, Effects, Shakes,
  Color Grading, Text Animation, Graphs, Text Effects and My Presets.
- Imports .ffx animation presets into a category folder under Documents\MOTIONX\Presets.
- Lists the .ffx files in the selected category.
- Applies a chosen .ffx preset to all currently selected layers in the active composition.
- Keeps your imported presets outside the extension folder, so updating the panel
  does not remove your personal library.

IMPORTANT
This is a functional starter extension, not a pre-filled commercial preset pack.
It does not include third-party Jerryflow / AB FX Pro assets or proprietary presets.
Each category starts empty. Add your own legally obtained or self-created .ffx files.

INSTALL (WINDOWS)
1. Close After Effects.
2. Copy the entire "MOTIONX_AE_Extension" folder into:
   %APPDATA%\Adobe\CEP\extensions\
   The final path should be:
   %APPDATA%\Adobe\CEP\extensions\MOTIONX_AE_Extension\CSXS\manifest.xml
3. Enable unsigned CEP extension loading for your current Windows user:
   - Open Registry Editor (regedit).
   - Go to HKEY_CURRENT_USER\Software\Adobe\CSXS.12
   - Create a String Value named PlayerDebugMode and set it to 1.
   - If CSXS.12 is not the runtime used by your AE installation, consult Adobe's
     CEP runtime documentation for the appropriate CSXS version.
   - Registry changes are at your own risk; do not change unrelated keys.
4. Start After Effects.
5. Open Window > Extensions (Legacy) > MOTIONX.
   Menu wording can vary by After Effects release.

USING THE PANEL
1. Open a composition and select one or more layers.
2. Choose a category.
3. Click "Import preset" and choose a .ffx file.
4. Click the imported preset card to apply it.
5. Your library is stored in Documents\MOTIONX\Presets.

PRESET NOTES
- Text animation presets should be authored for compatible text layers.
- Transition presets may need to be authored for the intended layer type and
  animation direction. A generic .ffx is not automatically a complete edit-point
  transition workflow.
- Color grading presets need to target compatible footage / adjustment layers.
- Graph presets are animation/easing presets saved as .ffx; this starter does not
  directly manipulate the Graph Editor UI.
- The first version applies a preset to selected layers. It does not yet provide
  duration/intensity sliders, thumbnail previews, preset deletion/renaming,
  user-created categories, or a visual graph editor.

DEVELOPMENT
- UI: index.html + css/style.css + js/app.js
- CEP bridge: js/cep-bridge.js
- After Effects scripting: jsx/host.jsx
- Extension metadata: CSXS/manifest.xml

This project is an independent starter implementation. MOTIONX is a working name.
