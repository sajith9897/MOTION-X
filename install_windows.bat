@echo off
setlocal
set "DEST=%APPDATA%\Adobe\CEP\extensions\MOTIONX_AE_Extension"
if not exist "%APPDATA%\Adobe\CEP\extensions" mkdir "%APPDATA%\Adobe\CEP\extensions"
if exist "%DEST%" rmdir /s /q "%DEST%"
xcopy "%~dp0*" "%DEST%\" /E /I /Y
echo.
echo MOTIONX copied to:
echo %DEST%
echo.
echo Next: enable CEP debug mode as described in README.txt, then restart After Effects.
pause
