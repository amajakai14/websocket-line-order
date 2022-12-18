#!/bin/bash

filename=$1

filepath="src/database/migrations/$filename"
npm run migration:manual-generate "$filepath"
