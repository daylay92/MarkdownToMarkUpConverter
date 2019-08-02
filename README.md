# MarkdownToMarkUpConverter

It is a tool that enables the convertion of Markdown files to their markup equivalent in rich text format.
The output is printed to the command line palette and also written into a **markup** sub-folder. 

## Clone the Repo

git clone https://github.com/daylay92/MarkdownToMarkUpConverter.git


## Prerequisites

The following tools will be needed to run this application successfully:

* Node v10.15.0 or above
* Npm v6.4 or above

## Setup
To run this project, install it locally using npm:

```
$ cd MarkdownToMarkUpConverter
$ mkdir markdown
$ npm install
$ npm run build
```
## Instructions For Use

* After setup is complete, Open the project folder and navigate to the *markdown* sub-folder.
* Move the Markdown file you wish to convert into the *markdown* sub-folder.
* Return to your command line palette and be sure you are in the root of the project.
* From the root of the project run the command `npm run convert [filename.extension]` Example : `npm run convert markdown.md`
* Check the command line palette for the output. Also navigate to the *markup* sub-folder to get the markup file created.



