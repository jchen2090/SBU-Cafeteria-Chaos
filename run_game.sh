#!/bin/bash

trap on_interrupt SIGINT SIGTERM


on_interrupt() {
    echo "Ctrl + C detecting, shutting down server and client" 

    server_pid=$(lsof -t -i:3000)
    client_pid=$(lsof -t -i:5173)

    if [[ -n "$server_pid" ]]; then 
        echo "Killing server process" 
        kill "$server_pid"
    fi

    if [[ -n "$client_pid" ]]; then 
        echo "Killing client process" 
        kill "$client_pid"
    fi

    exit 0
}

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"


cd ~/SBU-Cafeteria-Chaos/client || exit
npm i 
nohup npm run dev > ~/SBU-Cafeteria-Chaos/logs/client.log 2>&1 & 
cd ~/SBU-Cafeteria-Chaos/server  || exit
npm i 
nohup npm run dev > ~/SBU-Cafeteria-Chaos/logs/server.log 2>&1 & 

export DISPLAY=:0
nohup  chromium --process-per-site --disable-software-rasterizer --disable-gpu-memory-buffer-compositor-resources --kiosk http://localhost:5173 > ~/SBU-Cafeteria-Chaos/logs/chrome.log 2>&1 &

wait
