#!/usr/bin/env sh

# Created by Seth Holladay

# This script is designed to completely and robustly uninstall Node.js
# so that you may return your environment to a squeaky clean state.

cd "$HOME";
brew uninstall node >/dev/null 2>&1 || true;
sudo rm -rf "$HOME/.npm";
sudo rm -rf "$HOME/.node-gyp";
sudo rm -rf "$HOME/local/node";
sudo rm -rf "$HOME/local/node_modules";
sudo rm -rf "$HOME/local/lib/node";
sudo rm -rf "$HOME/local/lib/node_modules";
sudo rm -rf "$HOME/lib/node";
sudo rm -rf "$HOME/lib/node_modules";
sudo rm -rf "$HOME/include/node";
sudo rm -rf "$HOME/include/node_modules";
sudo rm -rf '/usr/local/bin/npm';
sudo rm -rf '/usr/local/bin/node';
sudo rm -rf '/usr/local/lib/node';
sudo rm -rf '/usr/local/lib/node_modules';
sudo rm -rf '/usr/local/lib/dtrace/node.d';
sudo rm -rf '/usr/local/include/node';
sudo rm -rf '/usr/local/include/node_modules';
sudo rm -rf '/usr/local/share/man/man1/node.1';
sudo rm -rf '/opt/local/bin/node';
sudo rm -rf '/opt/local/include/node';
sudo rm -rf '/opt/local/lib/node_modules';
