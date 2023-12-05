#!/usr/bin/env bash

set -e

project_ver() {
    cat Refresh\ Button\ Worshiper.xcodeproj/project.pbxproj | grep 'CURRENT_PROJECT_VERSION = ' | sort -u | sed 's/;//' |  while read -r _ _ n
    do
	echo $n
    done
}

marketing_ver() {
    cat Refresh\ Button\ Worshiper.xcodeproj/project.pbxproj | grep 'MARKETING_VERSION = ' | sort -u | sed 's/;//' |  while read -r _ _ n
    do
	echo $n
    done
}

MARKETING_VER=$(marketing_ver)
PROJECT_VER=$(project_ver)

cd chrome/extension
find . -type f -name .DS_Store -delete
zip ../../arwb-${MARKETING_VER}.${PROJECT_VER}.zip -r *
