#!/bin/bash
# tmux copy-pipe: Auswahl in Primary + Clipboard legen (Wayland: wl-copy, X11: xclip)
IN="$(cat)"
if [ -n "$WAYLAND_DISPLAY" ] && command -v wl-copy >/dev/null; then
    printf '%s' "$IN" | wl-copy --primary
    printf '%s' "$IN" | wl-copy
elif command -v xclip >/dev/null; then
    printf '%s' "$IN" | xclip -i -sel p
    printf '%s' "$IN" | xclip -i -sel c
fi
