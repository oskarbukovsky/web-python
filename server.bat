@echo off
title Server
start /min cmd.exe /C "code . > Nul"
start http://127.0.0.1.nip.io
python -m http.server 80