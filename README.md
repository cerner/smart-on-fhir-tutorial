# 1. Overview
This tutorial will introduce you to launching a SMART on FHIR app from a the HSPC Sandbox. 

The codebase you will use contains a basic client-side SMART on FHIR web application that uses the `client-js` javascript SMART on FHIR client library. Although the provided app mearly displays the retrieved FHIR resources, you can easily use it as a framework for developing a more interesting tool. 

This tutorial is based on [this excellent tutorial](https://engineering.cerner.com/smart-on-fhir-tutorial/#introduction) made by the Cerner engineering team. If you work with Cerner, feel free to check out their tutorial as well!

# 2. Table of Contents
- [1. Overview](#1-overview)
- [2. Table of Contents](#2-table-of-contents)
- [3. Prereqs](#3-prereqs)
- [4. Learning Objectives](#4-learning-objectives)
    - [4.1 Main](#41-main)
    - [4.2 Extra Credit](#42-extra-credit)
- [5. First Steps](#5-first-steps)
- [6. Explore the Project Folder](#6-explore-the-project-folder)
- [7. Setup Github Pages](#7-setup-github-pages)
- [8. Register Your App](#8-register-your-app)
- [9. Launch Your App](#9-launch-your-app)
    - [9.1 Provider-facing EHR Launch](#91-provider-facing-ehr-launch)
    - [9.2 Patient Portal Launch](#92-patient-portal-launch)
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
- [16. Next Steps](#16-next-steps)
- [17. Useful Resources](#17-useful-resources)
        - [TODO:](#todo)

# 3. Prereqs
- [ ] Create a public GitHub account if you do not have one by going to www.github.com and clicking the `Sign up for Github` button.
  
- [ ] Create an account for the HSPC Sandbox by going to https://sandbox.hspconsortium.org/#/start and clicking the `Sign Up` button.

- [ ] Install a text editor for viewing and editing code. Some options:
    * [VS Code](https://code.visualstudio.com/)
    * [Sublime](https://www.sublimetext.com/)
    * [Atom](https://atom.io/)

- [ ] Install Git if you don't have it. Check out the [Git book install guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and the [download page](https://git-scm.com/downloads)
    
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
    - [ ] Make sure you're working off of the `gh-pages` branch by running `git checkout gh-pages`. You should get confirmation that you are on the `gh-pages` branch. 


3. Open your project folder in your text editor for this tutorial to be able to view and change the files. We'll be using VS Code; so if you're also using that editor, go to `File/Open Folder...` to accomplish this. 

# 6. Explore the Project Folder
Take a minute or two to explore the codebase. Here are some highlights:

- `example-smart-app`: This directory contains a simple client-side web application.
- `example-smart-app/lib/js/fhir-client.js`: The app uses uses the library to (1) communicate with our Sandbox using the FHIR API and (2) handle the SMART on FHIR authorization workflows. Check out more information about this client here: https://github.com/smart-on-fhir/client-js
  
- `example-smart-app/launch.html`: this webpage is the initial entry point into the SMART on FHIR application, called the `launch_url` in the SMART documentation. This page will be called by the HSPC sandbox when we launch our app. We'll cover the different launch patterns later in the tutorial.
  
- `example-smart-app/launch-smart-sandbox.html`: this page is similar to the previous launch, but will be used when we launch from the SMART on FHIR sandbox.
  
- `example-smart-app/launch-standalone.html`: this page is similar to the previous launch, but will demonstrate launching a stand-alone application - in this case from a patient context. 
  
- `example-smart-app/index.html`: this is the main web page for our application, and will be redirected to after Authorization succeeds.  

# 7. Setup Github Pages
You will be using [Github Pages](https://help.github.com/articles/what-is-github-pages/) as an easy way to host our app. Github pages can be used for static or client-side web applications. Your forked repo should have github pages set up, but you need to push an update to the code in order for them to be published. This is what you'll do in this step.

1. Edit `example-smart-app/index.html`
   - [ ] Open the target file in your text editor. 
   - [ ] In the `<head>` section, find the `<title>` tag and replace the text inside with something like: `<title>[Your Name]'s SMART App</title>`.

2. Commit and Push your change
    - [ ] Open your terminal or Github Bash window
    - [ ] Navigate to the project folder: `cd [path-to-project-folder]`
    - [ ] Stage all of your changes: `git add .`
    - [ ] Commit your changes and write a commit message describing your work: `git commit -m "[some commit message]"`

3. Test out your app
    - [ ] Go to `https://<your-github-username>.github.io/smart-on-fhir-tutorial/example-smart-app/health`. 
    - [ ] If you see a thumbs-up, good job!

# 8. Register Your App
In order for us to be able to launch our app from the HSCP Sandbox and access the FHIR resources, we need to register our app with the sandbox. 

1. Setup the HSPC Sandbox
    - [ ] Go to the [HSPC sandbox site](https://sandbox.hspconsortium.org/) 
    - [ ] Sign in with the HSPC account you should have made already :)
    - [ ] Select the "Create Sandbox" button on the bottom of the left column
    - [ ] Name your Sandbox something cool (or just UW FHIR WORKSHOP)
    - [ ] Select Sandbox Version "FHIR STU 3 (v3.0.1)"
    - [ ] Make sure both the "Allow Open FHIR Endpoint" and the "Apply Default Data Set" options are selected.
    - [ ] Add a description if you'd like. (i.e. This is for the UW FHIR Tutorial)
    - [ ] Click the `Create Sandbox` button. 
  
2. Setup your Application
    - [ ] Click the "+ Register Manually" button on the main dashboard
    - [ ] Fill out the following form fields:
        * App Type: `Public Client`
        * App Name: Anything your imagination desires!
        * App Launch URI: https://<your-github-username>.github.io/smart-on-fhir-tutorial/example-smart-app/launch.html
        * Redirect URI: https://<your-github-username>.github.io/smart-on-fhir-tutorial/example-smart-app/
        * Allow Offline Access: Unchecked
        * Patient Scoped App: Unchecked
    - [ ] Note and jot down the `App Client Id` from the popup that should show up on your screen.

We'll talk about what some of these configuration options mean later in the tutorial, but for now, congrats! Your app is now registered! You should see it show up on your Sandbox Dashboard. 

# 9. Launch Your App 
SMART on FHIR apps can be launched in a variety of ways. You can browse http://docs.smarthealthit.org/authorization/#ehr-launch-sequence and http://docs.smarthealthit.org/authorization/scopes-and-launch-context/#scopes-for-requesting-context-data for more information, but we'll present a quick summary. 

The SMART standard provides aims to provide an "App Platform for Healthcare", and as a result SMART on FHIR defines a couple of different launch patterns based on [four use cases](http://www.hl7.org/fhir/smart-app-launch/) defined by the [Argonaut Project](http://argonautwiki.hl7.org/index.php?title=Main_Page). You'll try out two of these in the main tutorial, and another one in the **Extra Credit** section. These are the scenarios you'll focus on:

1. A provider launches the app from inside the EHR. You'll explore this scenario in [section 9.1](#91-provider-facing-ehr-launch).

2. A patient launches the app from inside their patient portal. You'll take this approach in [section 9.2](#92-patient-portal-launch). 
   
3. A stand-alone app is launched externally by either a patient or provider, but uses SMART on FHIR to authorize with the EHR and access relevant data using FHIR resources. You'll see this type of launch in the [extra credit section]((#152-launch-app-using-a-stand-alone-launch) if you're the ambitious type =)

You'll create scenarios for the first two types of launches in the HSPC sandbox. [Click here](https://healthservices.atlassian.net/wiki/spaces/HSPC/pages/65011892/Sandbox+Launch+Scenarios) for more detail. 

First, we need to create a couple of personas:
- [ ] Click the `Personas` link on the left side of your sandbox dashboard.

You'll create one provider persona by clicking the `For Provider` button and one patient persona by clicking the `For Patient` button. Follow these steps for each:
- [ ] Click the appropriate button 
- [ ] Find an interesting patient or provider you'd like to use and click on them. 
- [ ] Confirm the patient details in the right-hand column, and click `Select this Patient` when done. 
- [ ] Chose any user id and password and jot them down. 
- [ ] Click the `Save` button. 

Now on to the scenarios, which you'll build two of. 
- [ ] Click the `Launch Scenarios` link on the left side of your sandbox dashboard
- [ ] Choose your provider persona for one scenario, and patient persona for the 2nd

For the provider scenario, you'll need to provide the patient context. In the `Select the Patient Context` screen:  
- [ ] Find your patient by name using the search function
- [ ] Click the `Select this Patient` button

Now, we need to select the app that will be launched:
- [ ] Click on the blue gear button on your app's tile
- [ ] Write a clever description for your launch scenario
- [ ] Check the `Launch Embedded` box
- [ ] Click the `Save` button

If you did most things right, you should see two new launch scenarios listed on the `Launch Scenario` dashboard. Yay!

## 9.1 Provider-facing EHR Launch
This type of launch would happen from inside of a provider-facing EHR UI. For example, a provider might be examining a patient's chart in Epic Hyperspace, and click a link on the chart to launch this application in the current EHR context. 

**App Launch Flow Overview**
![alt-text][ehr-flow]

<figcaption>source: <a href='https://engineering.cerner.com/smart-on-fhir-tutorial/images/ehr_launch_seq.png'>https://engineering.cerner.com/smart-on-fhir-tutorial/images/ehr_launch_seq.png</a></figcaption>

 
## 9.2 Patient Portal Launch
This type of launch would be initiated by a Patient from a patient-facing EHR portal like Epic MyChart. A patient would be logged into their portal, and click a link or button that would launch this app in their Patient context.

**App Launch Flow Overview**
![alt-text][patient-flow]

<figcaption>source: <a href='https://engineering.cerner.com/smart-on-fhir-tutorial/images/patient_launch_seq.png'>https://engineering.cerner.com/smart-on-fhir-tutorial/images/patient_launch_seq.png</a></figcaption>

# 10. Authorize Your App
Now that we have our launch scenarios created and app registered, let's talk about how SMART apps authorize with the EHR Authorization Server. 

When an app is launched, 

![alt-text][authorization-flow]

<figcaption>source: <a href='http://www.hl7.org/fhir/smart-app-launch/'>http://www.hl7.org/fhir/smart-app-launch/</a></figcaption>

The responsibility of launch.html is to redirect to the appropriate FHIR authorization server. As you can see in the code, fhir-client makes our job pretty easy. All we have to do is call FHIR.oauth2.authorize and supply the client_id generated by the code console during registration and the scopes we registered.

The client_id is found in the app details page that can be accessed by clicking on the application icon in the code console. Copy the client_id into the authorize call in launch.html, commit the changes back to your repo and redeploy your site.

For the purposed of this tutorial you don’t need to modify the scopes. This list should match the scopes that you registered the application with.

Below is some additional information about the scopes we’ve selected for our app.

Scope	Grants
patient/Patient.read	Permission to read Patient resource for the current patient.
patient/Observation.read	Permission to read Observation resource for the current patient.
openid, profile	Permission to retrieve information about the current logged-in user. Required for EHR launch.
launch	Permission to obtain launch context when app is launched from an EHR. Required for EHR launch.
launch/patient	Permission to have a patient be selected when performing a patient facing standalone launch. Required ONLY for patient standalone launch. Apps can choose to use user/Patient.read or user/Observation.read scopes and wouldn’t need launch scope at all. See this section: Standalone App Launch for Patient Access Workflow.
online_access	Request a refresh_token that can be used to obtain a new access token to replace an expired one, and that will be usable for as long as the end-user remains online. Required for EHR launch.

# 11. Retrieve the Access Token
** USE DIAGRAM!**
Now that the app has successfully been authenticated, it’s time to call a FHIR resource, but first we need to obtain an OAuth2 access token. We have an authorization code that was passed as a query param to the redirect URI (index.html) by the authorization server. The authorization code is exchanged for an access token through POST to the authorization server. Again, fhir-client.js makes this easy for us.

The index.html file includes a script which calls into the extractData function in example-smart-app.js.

extractData uses the FHIR.oauth2.ready() function to exchange the authorization code for the access token and stores it in session storage for later use.





# 12. Get Patient Data using FHIR
With access token in hand we’re ready to request a FHIR resource and again, we will be using fhir-client.js.

For the purposes of this tutorial we’ll be retrieving basic information about the patient and a couple of basic observations to display.

The fhir-client.js library defines several useful API’s we can use to retrieve this information.

smart.patient.read()
This will return the context for the patient the app was launched for.
smart.patient.api
fetchAll()
This will use the fhir.js API to retrieve a complete set of resources for the patient in context.
Both of these functions will return a jQuery deferred object which we unpack on success.

Unpacking is fairly straight forward. We’re taking the response from the patient and observation resources and placing it into a “patient” data structure.

The last function from fhir-client.js is the byCodes utility function that returns a function to search a given resource for specific codes returned from that response.

The fhir-client.js library defines several more API’s that will come in handy while developing smart app. Read about them here.





# 13. Display the Retrieved Data

The last remaining task for our application is displaying the resource information we’ve retrieved. In index.html we define a table with several id place holders. On a success from extractData we’ll call drawVisualization which will show the table div as well as filling out the relevant sections.

# 14. Test Your Application!

## 14.1 Provider Launch
Use the first launch scenario...

## 14.2 Patient Launch
Use the 2nd launch scenario...

# 15. Extra Credit

## 15.1 Launch App from the SMART Sandbox
A major goal of SMART on FHIR is interoperability. Any EHR that conforms to the SMART on FHIR standard should be able to launch our app with minimal modifications. To demonstrate interoperability, you'll try registering and launching our app in another popular sandbox made by [SMART Health IT](https://smarthealthit.org/) team. 

## 15.2 Launch App using a Stand-alone Launch
You'll use the SMART Health IT Sandbox to demonstrate a third app launch flow where we want to launch a standalone app that, despite being launched outside of the EHR or Patient Portal context, authenticates with the EHR and has access to the available FHIR resources.

## 15.3 Develop Your App Further
You can make anything you wan!

**App Launch Flow Overview**
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


### TODO: 
1. elaborate and update on text
2. update figures and use them to allow people to follow along with the flow
   