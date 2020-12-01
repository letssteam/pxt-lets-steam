#!/usr/bin/env bash
# Package and deploy target to GitHub Pages. See https://makecode.com/cli/staticpkg

deploy() {
    pxt staticpkg --githubpages
}
deploy