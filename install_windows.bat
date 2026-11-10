@echo off
setlocal
set "SOURCE=%~dp0"
set "DEST=%APPDATA%\Adobe\CEP\extensions\MOTIONX_AE_Extension"
if not exist "%APPDATA%\Adobe\CEP\extensions" mkdir "%APPDATA%\Adobe\CEP\extensions"
if exist "%DEST%" rmdir /s /q "%DEST%"
mkdir "%DEST%"
robocopy "%SOURCE%" "%DEST%" /E /XD ".git" >nul
if errorlevel 8 (echo Installation failed. Check folder permissions.& pause & exit /b 1)
if not exist "%DEST%\CSXS\manifest.xml" (echo ERROR: manifest missing.& pause & exit /b 1)
echo MOTIONX installed successfully at:
echo %DEST%
echo Now run enable_cep_debug.reg, approve it, and restart After Effects.
echo Open Window ^> Extensions (Legacy) ^> MOTIONX.
pause
