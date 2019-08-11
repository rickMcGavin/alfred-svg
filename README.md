# Alfred-SVG

An alfred workflow to help front end developers quickly perform common tasks with svg files.

## What it does

- Can use [svgo](https://github.com/svg/svgo) to perform compression.
- Can convert an svg in to a `background-image` css property in 1 of 3 formats:
  1. no svg encoding
  2. url encoded svg
  3. base64 encoded svg

## Requirements

- You will need [nodejs](https://nodejs.org/) installed globally.

## How to install and setup

_Since this is for developers, some assumptions are made that you are familiar with nodejs, npm packages, and how to install them._

1. Download and install svg-toolkit.alfredworkflow from the [releases](https://github.com/rickMcGavin/alfred-svg/releases) page.
2. Right-click on the SVG Toolkit in Alfred Preferences, and select "Open in Terminal"
3. Run an `npm install` in this folder to install [svgo](https://github.com/svg/svgo).

## How to use

1. Type `svg` into alfred and paste your svg markup.
2. Select one of the options given.
