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


cd client || exit
npm i 
npm run dev & 
cd ../server  || exit
npm i 
npm run dev & 
firefox --kiosk http://localhost:5173 &

wait