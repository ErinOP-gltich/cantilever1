#!/usr/bin/env python3
"""
Startup script for the Vastu Calculator FastAPI backend
"""
import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("Installing Python dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False
    return True

def start_server():
    """Start the FastAPI server"""
    print("Starting FastAPI server...")
    try:
        subprocess.run([sys.executable, "main.py"])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    print("🚀 Vastu Calculator Backend Startup")
    print("=" * 40)
    
    if install_requirements():
        start_server()
    else:
        print("❌ Failed to install dependencies. Please check your Python environment.")
        sys.exit(1)
