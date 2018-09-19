# Overview
This tutorial will introduce you to creating SMART on FHIR apps that can be registered and launched from a number of different SMART Sandboxes, as well as SMART on FHIR-supporting EHRs.

*Our tutorial is based on [this tutorial](https://engineering.cerner.com/smart-on-fhir-tutorial/#introduction) from the Cerner engineering team].*
*If you work with Cerner EHRs, feel free to check out their tutorial as well!*

# Table of Contents

# Prereqs
- Create a public GitHub account if you do not have one by going to www.github.com and clicking the `Sign up for Github` button.
  
- Create an account for the HSPC Sandbox by going to https://sandbox.hspconsortium.org/#/start and clicking the `Sign Up` button.

- Install a text editor for viewing and editing code. Some options:
    * [VS Code](https://code.visualstudio.com/)
    * [Sublime](https://www.sublimetext.com/)
    * [Atom](https://atom.io/)

- Install Git if you don't have it. Check out the [Git book install guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and the [download page](https://git-scm.com/downloads)
    
## Testing your setup

## Note: if you're unfamiliar with git or Github, check these out:
- [Github Guides - Hello World](https://guides.github.com/activities/hello-world/)
- [Github Bootcamp](https://help.github.com/categories/bootcamp/)
- [Getting Started - Git Book](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

# Learning Objectives

## Main
- **Create** and **Register** a SMART on FHIR App in the HSPC sandbox. 
- **Launch** app as a patient *and* as a provider from the HSPC sandbox using the [SMART on FHIR Javascript Client](https://github.com/smart-on-fhir/client-js). 

## Extra Credit
- Demonstrate interoperability by launch app from **SMART on FHIR** sandbox. 
- Set up a standalone patient access app

# First Steps
1. Fork the SMART on FHIR app from Github.
    - [ ] Create an account on Github if you have not already.
    - [ ] Login to your [Github account](https://github.com/login)
    - [ ] Navigate to https://github.com/uw-fhir/smart-on-fhir-tutorial.git
    - [ ] Click on the `Fork` button in the top right corner of the page. 
    - [ ] Wait a few seconds, and you should see a copy of the repo in your github account. 

2. Clone your project to your computer 
    - [ ] Open a terminal or Git Bash
    - [ ] Navigate to a folder where you want to keep your project. For example:
            ```
            cd C:/Users/Piotr/code
            ```
    - [ ] Find the project url by clicking the `Clone or download` green button on your Github project page and copying it to your clipboard.
    - [ ] Run the following command in the terminal to clone this project into the chosen folder: `git clone https://github.com/pmanko/smart-on-fhir-tutorial.git`    
    - [ ] When you open your chosen folder, you should see the project files in a directory called `smart-on-fhir-tutorial`.
3. Open your project folder in your text editor for this tutorial to be able to view and change the files. We'll be using VS Code; so if you're also using that editor, go to `File/Open Folder...` to accomplish this. 

# Explore the Project Folder
- `example-smart-app`: This is a simple client-side web application.
    * `lib/js/fhir-client.js`: The app uses uses the library to (1) communicate with our Sandbox using the FHIR API and (2) handle the SMART on FHIR authorization workflows. Check out more information about this client here: https://github.com/smart-on-fhir/client-js
    * `launch-hspc.html`: this webpage is the initial entry point into the SMART on FHIR application, called the `launch_url` in the SMART documentation. This page will be called by the HSPC sandbox when we launch our app. We'll cover the different launch patterns later in the tutorial.
    * `launch-smart-sandbox.html`: this page is similar to the previous launch, but will be used when we launch from the SMART on FHIR sandbox.
    * `launch-standalone.html`: this page is similar to the previous launch, but will demonstrate launching a stand-alone application - in this case from a patient context. 
    * `index.html`: this is the main web page for our application, and will be redirected to after Authorization succeeds.  

# Setup Github Pages
1. Edit `example-smart-app/index.html`
   - [ ] Open the target file in your text editor. 
   - [ ] In the `<head>` section, find the `<title>` tag and replace the text inside with something like: `<title>[Your Name]'s SMART App</title>`.

2. Commit and Push your change
    - [ ] Open your terminal or Github Bash window
    - [ ] Navigate to the project folder: `cd [path-to-project-folder]`
    - [ ] Stage all of your changes: `git add .`
    - [ ] Commit your changes and write a commit message describing your work: `git commit -m 

# Next Steps

# Resources
