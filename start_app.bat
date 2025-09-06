@echo off
echo Starting Vastu Calculator Application
echo =====================================

echo.
echo 1. Starting FastAPI Backend...
start "Backend Server" cmd /k "cd backend && python start_backend.py"

echo.
echo 2. Waiting for backend to initialize...
timeout /t 10 /nobreak > nul

echo.
echo 3. Starting React Frontend...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:8080
echo.
echo Press any key to exit...
pause > nul
