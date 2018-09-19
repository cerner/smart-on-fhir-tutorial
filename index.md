# 1. Overview
This tutorial will introduce you to creating SMART on FHIR apps that can be registered and launched from a number of different SMART Sandboxes, as well as SMART on FHIR-supporting EHRs.

*Our tutorial is based on [this tutorial](https://engineering.cerner.com/smart-on-fhir-tutorial/#introduction) from the Cerner engineering team].*
*If you work with Cerner EHRs, feel free to check out their tutorial as well!*

# 2. Table of Contents
- [1. Overview](#1-overview)
- [2. Table of Contents](#2-table-of-contents)
- [3. Prereqs](#3-prereqs)
    - [3.1 Testing your setup](#31-testing-your-setup)
- [4. Learning Objectives](#4-learning-objectives)
    - [4.1 Main](#41-main)
    - [4.2 Extra Credit](#42-extra-credit)
- [5. First Steps](#5-first-steps)
- [6. Explore the Project Folder](#6-explore-the-project-folder)
- [7. Setup Github Pages](#7-setup-github-pages)
- [8. Register Your App](#8-register-your-app)
- [9. Launch Your App](#9-launch-your-app)
    - [9.1 Provider-facing EHR Launch](#91-provider-facing-ehr-launch)
        - [App Launch Flow Overview](#app-launch-flow-overview)
    - [9.2 Patient Portal Launch](#92-patient-portal-launch)
        - [App Launch Flow Overview](#app-launch-flow-overview)
- [10. Authorize Your App](#10-authorize-your-app)
- [11. Retrieve the Access Token](#11-retrieve-the-access-token)
- [12. Get Patient Data using FHIR](#12-get-patient-data-using-fhir)
- [13. Display the Retrieved Data](#13-display-the-retrieved-data)
- [14. Test Your Application!](#14-test-your-application)
    - [14.1 Provider Launch](#141-provider-launch)
    - [14.2 Patient Launch](#142-patient-launch)
- [15. Extra Credit](#15-extra-credit)
    - [15.1 Launch App from the SMART Sandbox](#151-launch-app-from-the-smart-sandbox)
    - [15.2 Launch App using a Stand-alone Launch](#152-launch-app-using-a-stand-alone-launch)
    - [15.3 Develop Your App Further](#153-develop-your-app-further)
        - [App Launch Flow Overview](#app-launch-flow-overview)
- [16. Next Steps](#16-next-steps)
- [17. Useful Resources](#17-useful-resources)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# 3. Prereqs
- Create a public GitHub account if you do not have one by going to www.github.com and clicking the `Sign up for Github` button.
  
- Create an account for the HSPC Sandbox by going to https://sandbox.hspconsortium.org/#/start and clicking the `Sign Up` button.

- Install a text editor for viewing and editing code. Some options:
    * [VS Code](https://code.visualstudio.com/)
    * [Sublime](https://www.sublimetext.com/)
    * [Atom](https://atom.io/)

- Install Git if you don't have it. Check out the [Git book install guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and the [download page](https://git-scm.com/downloads)
    
## 3.1 Testing your setup

**Note: if you're unfamiliar with git or Github, check these out:**
- [Github Guides - Hello World](https://guides.github.com/activities/hello-world/)
- [Github Bootcamp](https://help.github.com/categories/bootcamp/)
- [Getting Started - Git Book](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

# 4. Learning Objectives

## 4.1 Main
- **Create** and **Register** a SMART on FHIR App in the HSPC sandbox. 
- **Launch** app as a patient *and* as a provider from the HSPC sandbox using the [SMART on FHIR Javascript Client](https://github.com/smart-on-fhir/client-js). 

## 4.2 Extra Credit
- Demonstrate interoperability by launch app from **SMART on FHIR** sandbox. 
- Set up a standalone patient access app
- Build on the provided code to make something useful!

# 5. First Steps
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

# 6. Explore the Project Folder
- `example-smart-app`: This is a simple client-side web application.
    * `lib/js/fhir-client.js`: The app uses uses the library to (1) communicate with our Sandbox using the FHIR API and (2) handle the SMART on FHIR authorization workflows. Check out more information about this client here: https://github.com/smart-on-fhir/client-js
    * `launch-hspc.html`: this webpage is the initial entry point into the SMART on FHIR application, called the `launch_url` in the SMART documentation. This page will be called by the HSPC sandbox when we launch our app. We'll cover the different launch patterns later in the tutorial.
    * `launch-smart-sandbox.html`: this page is similar to the previous launch, but will be used when we launch from the SMART on FHIR sandbox.
    * `launch-standalone.html`: this page is similar to the previous launch, but will demonstrate launching a stand-alone application - in this case from a patient context. 
    * `index.html`: this is the main web page for our application, and will be redirected to after Authorization succeeds.  

# 7. Setup Github Pages
1. Edit `example-smart-app/index.html`
   - [ ] Open the target file in your text editor. 
   - [ ] In the `<head>` section, find the `<title>` tag and replace the text inside with something like: `<title>[Your Name]'s SMART App</title>`.

2. Commit and Push your change
    - [ ] Open your terminal or Github Bash window
    - [ ] Navigate to the project folder: `cd [path-to-project-folder]`
    - [ ] Stage all of your changes: `git add .`
    - [ ] Commit your changes and write a commit message describing your work: `git commit -m 

# 8. Register Your App
In order for us to be able to launch our app from the HSCP Sandbox and access the FHIR resources in this sandbox, we need to register our app. 

1. 

# 9. Launch Your App 
SMART on FHIR apps can be launched in a variety of ways. 

See http://docs.smarthealthit.org/authorization/#ehr-launch-sequence and http://docs.smarthealthit.org/authorization/scopes-and-launch-context/#scopes-for-requesting-context-data for more information!


## 9.1 Provider-facing EHR Launch
This type of launch would happen from inside of a provider-facing EHR UI. For example, a provider might be examining a patient's chart in Epic Hyperspace, and click a link on the chart to launch this application in the current EHR context. 

### App Launch Flow Overview
![alt-text][ehr-flow]

<figcaption>source: <a href='https://engineering.cerner.com/smart-on-fhir-tutorial/images/ehr_launch_seq.png'>https://engineering.cerner.com/smart-on-fhir-tutorial/images/ehr_launch_seq.png</a></figcaption>


## 9.2 Patient Portal Launch
This type of launch would be initiated by a Patient from a patient-facing EHR portal like Epic MyChart. A patient would be logged into their portal, and click a link or button that would launch this app in their Patient context.

### App Launch Flow Overview
![alt-text][patient-flow]

<figcaption>source: <a href='https://engineering.cerner.com/smart-on-fhir-tutorial/images/patient_launch_seq.png'>https://engineering.cerner.com/smart-on-fhir-tutorial/images/patient_launch_seq.png</a></figcaption>

# 10. Authorize Your App
![alt-text][authorization-flow]

<figcaption>source: <a href='http://www.hl7.org/fhir/smart-app-launch/'>http://www.hl7.org/fhir/smart-app-launch/</a></figcaption>


# 11. Retrieve the Access Token

# 12. Get Patient Data using FHIR

# 13. Display the Retrieved Data

# 14. Test Your Application!
## 14.1 Provider Launch
## 14.2 Patient Launch

# 15. Extra Credit

## 15.1 Launch App from the SMART Sandbox
A major goal of SMART on FHIR is interoperability. Any EHR that conforms to the SMART on FHIR standard should be able to launch our app with minimal modifications. To demonstrate interoperability, we'll try registering and launching our app in another popular sandbox made by [SMART Health IT](https://smarthealthit.org/) team. 

## 15.2 Launch App using a Stand-alone Launch
We'll use the SMART Health IT Sandbox to demonstrate a third app launch flow where we want to launch a standalone app that, despite being launched outside of the EHR or Patient Portal context, authenticates with the EHR and has access to the available FHIR resources.

## 15.3 Develop Your App Further

### App Launch Flow Overview
![alt-text][standalone-flow]

<figcaption>source: <a href='http://www.hl7.org/fhir/smart-app-launch/'></a>http://www.hl7.org/fhir/smart-app-launch/</figcaption>


# 16. Next Steps



# 17. Useful Resources









[ehr-flow]: https://engineering.cerner.com/smart-on-fhir-tutorial/images/ehr_launch_seq.png "EHR Launch Flow Diagram"

[patient-flow]:https://engineering.cerner.com/smart-on-fhir-tutorial/images/patient_launch_seq.png "Patient Launch Flow Diagram"

[standalone-flow]:
images/standalone_launch_sequence.png "Standalone Launch Flow Diagram"

[authorization-flow]:
images/authorization_sequence.png "SMART Authorization Sequence Diagram"