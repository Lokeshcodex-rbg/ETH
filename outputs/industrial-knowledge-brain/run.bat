@echo off
setlocal
cd /d "%~dp0"
echo Starting OpsBrain full-stack prototype...
echo.
echo Open this URL after the server starts:
echo http://127.0.0.1:4180/index.html
echo.
npm start
