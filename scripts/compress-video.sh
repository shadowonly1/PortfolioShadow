#!/usr/bin/env bash
# Compresse la vidéo du hero (17 Mo → ~2,4 Mo, qualité quasi identique).
# Prérequis : brew install ffmpeg
# Usage : bash scripts/compress-video.sh
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="public/images/video.MP4"
mkdir -p _archive/originals
[ -f _archive/originals/video.MP4 ] || cp "$SRC" _archive/originals/video.MP4

# 720p max, sans audio (la vidéo est muette), démarrage rapide (faststart)
ffmpeg -y -i _archive/originals/video.MP4 -an \
  -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset slow -crf 22 \
  -movflags +faststart public/images/hero.mp4

ls -lh public/images/hero.mp4
echo "OK — components/HeroVideo.tsx lit public/images/hero.mp4."
