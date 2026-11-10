MOTIONX v0.2.0 — Adobe After Effects 2024
Install by copying this folder into %APPDATA%\Adobe\CEP\extensions\ and enabling CEP PlayerDebugMode under HKCU\Software\Adobe\CSXS.11. Restart AE and open Window > Extensions (Legacy) > MOTIONX.

Included in this build: custom category creation, preset import/list/search, right-click preset rename/delete, theme settings (blue/violet/emerald/mono), editable brand name, intensity and duration sliders, easing curve selection and curve preview, apply selected .ffx to selected layers.

Important limitations: generic .ffx files do not expose universal intensity/duration controls. The sliders are currently UI controls only; the host receives their values but does not rescale arbitrary preset keyframes. The curve graph is a preview and easing selector, not yet a draggable Bezier graph editor. Preset thumbnails are not yet importable/persistently associated in this build. Custom category navigation is session-based; folders persist on disk but the UI does not yet discover custom folders on next launch. These need the next engineering iteration and preset-specific adapters.

Right-click a preset card to rename or delete it. Presets live in Documents\MOTIONX\Presets.
This is an independent implementation; no proprietary Jerryflow or AB FX assets/code are included.
