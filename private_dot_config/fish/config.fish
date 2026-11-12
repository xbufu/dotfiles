source /usr/share/cachyos-fish-config/cachyos-config.fish

# overwrite greeting
# potentially disabling fastfetch
#function fish_greeting
#    # smth smth
#end

# --- Personal additions (above: CachyOS default, cachyos-fish-config etc/skel/.config/fish/config.fish) ---
test -f ~/.config/fj/env; and source ~/.config/fj/env
set -gx GOPATH $HOME/.go
fish_add_path --global --append $HOME/.local/bin $GOPATH/bin
if status is-interactive; and test -f ~/.bash_aliases
    source ~/.bash_aliases
end
test -f ~/.config/shell/secrets.sh; and source ~/.config/shell/secrets.sh
