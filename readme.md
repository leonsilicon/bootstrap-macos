# Bootstrap MacOS

A collection of useful scripts/tutorials to bootstrap your macOS installation with some useful utilities and programs!

## Why?

Sometimes, installing programs can be much more involved than just a simple `brew install` command; oftentimes, there are extra configuration steps you need to take, extra optional dependencies that you might to install, extra settings you need to enable, or even a different installation command altogether due to Homebrew limitations.

For example, one of the programs I've needed to install recently was macTeX for macOS, but simply using `brew install --cask mactex` wasn't enough. The `latexindent` command-line program was broken and needed me to install some extra Perl modules (which took a long time to debug), I needed to update all the LaTeX packages manually, and I need to install some extra Python dependencies since I make heavy use of Python code inside of my LaTeX documents.

While I could write a note about this somewhere or even create a short blog post, I thought I'd take this one step further: why not just write a program that automates this process? Instead of having to go through the pain of installing tons of programs on a new computer and sifting through hundreds of StackExchange answers trying to figure out why your installation of a certain program is broken, why not just have a script that handles these edge-cases for you?

This is why I'm building macOS Bootstrappers, which provides a list of custom scripts for fully installing and fixing edge-cases of various programs, so that whenever I need to install a program again (e.g. after performing a fresh install of macOS to clean up bloat), it's as easy as running a few scripts with minimal manual intervention.
