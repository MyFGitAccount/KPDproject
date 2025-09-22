#!/bin/bash

firefox "http://127.0.0.1:9025/"
python3 -m http.server --bind 127.0.0.1 9025

