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
  - [9.1 Create Launch Scenarios](#91-create-launch-scenarios)
  - [9.2 App Launch Flow Overview](#92-app-launch-flow-overview)
- [10. Authorize Your App](#10-authorize-your-app)
  - [10.1 A Quick Intro to Scopes](#101-a-quick-intro-to-scopes)
- [11. Get Patient Data using FHIR](#11-get-patient-data-using-fhir)
  - [11.1 Modify `example-smart-app.js` to grab desired data](#111-modify-example-smart-appjs-to-grab-desired-data)
- [12. Test Your Application!](#12-test-your-application)
  - [12.1 Provider Launch](#121-provider-launch)
  - [12.2 Patient Launch](#122-patient-launch)
  - [12.3 Embedded Launch](#123-embedded-launch)
  - [12.4 EHR Simulator Launch](#124-ehr-simulator-launch)
- [13. Extra Credit](#13-extra-credit)
  - [13.1 Launch App from the SMART Sandbox (Easy)](#131-launch-app-from-the-smart-sandbox-easy)
  - [13.2 Launch App using a Stand-alone Launch (Advanced)](#132-launch-app-using-a-stand-alone-launch-advanced)
  - [13.3 Create a Confidential Client App using the SMART Python Client (Incredibly Advanced)](#133-create-a-confidential-client-app-using-the-smart-python-client-incredibly-advanced)
- [14. Next Steps](#14-next-steps)

# 3. Prereqs

- [ ] Create a public GitHub account if you do not have one by going to www.github.com and clicking the `Sign up for Github` button.

- [ ] Create an account for the HSPC Sandbox by going to https://sandbox.hspconsortium.org/#/start and clicking the `Sign Up` button.

- [ ] Install a text editor for viewing and editing code. Some options:

  - [VS Code](https://code.visualstudio.com/)
  - [Sublime](https://www.sublimetext.com/)
  - [Atom](https://atom.io/)

- [ ] Install Git if you don't have it. Check out the [Git book install guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and the [download page](https://git-scm.com/downloads)
      **Note: if you're unfamiliar with git or Github, check these out:**
  - [Github Guides - Hello World](https://guides.github.com/activities/hello-world/)
  - [Github Bootcamp](https://help.github.com/categories/bootcamp/)
  - [Getting Started - Git Book](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

# 4. Learning Objectives

## 4.1 Main

- **Create** and **Register** a SMART on FHIR App in the HSPC sandbox.
- **Launch** app as a patient _and_ as a provider from the HSPC sandbox using the [SMART on FHIR Javascript Client](https://github.com/smart-on-fhir/client-js).

## 4.2 Extra Credit

- Demonstrate interoperability by launching app from **SMART on FHIR** sandbox.
- Set up a standalone patient access app.
- Build on the provided code to make something useful!

# 5. First Steps

1. Fork the SMART on FHIR app from Github.

   - [ ] Create an account on Github if you have not already.
   - [ ] Log in to your [Github account](https://github.com/login).
   - [ ] Navigate to https://github.com/uw-fhir/smart-on-fhir-tutorial.git.
   - [ ] Click on the `Fork` button in the top right corner of the page.
   - [ ] Wait a few seconds, and you should see a copy of the repo in your github account.

2. Clone your project to your computer.
   - [ ] Open a terminal or Git Bash.
   - [ ] Navigate to a folder where you want to keep your project. For example:
         `cd C:/Users/Piotr/code`.
   - [ ] Find the project url by clicking the `Clone or download` green button on your Github project page and copying it to your clipboard.
   - [ ] Run the following command in the terminal to clone this project into the chosen folder: `git clone https://github.com/pmanko/smart-on-fhir-tutorial.git`.
   - [ ] When you open your chosen folder, you should see the project files in a directory called `smart-on-fhir-tutorial`.
   - [ ] Make sure you're working off of the `gh-pages` branch by running `git checkout gh-pages`. You should get confirmation that you are on the `gh-pages` branch.

3) Open your project folder in your text editor for this tutorial to be able to view and change the files. We'll be using VS Code; so if you're also using that editor, go to `File/Open Folder...` to accomplish this.

# 6. Explore the Project Folder

Take a minute or two to explore the codebase. Here are some highlights:

- `example-smart-app`: This directory contains a simple client-side web application.
- `example-smart-app/lib/js/fhir-client.js`: The app uses uses the library to (1) communicate with our Sandbox using the FHIR API and (2) handle the SMART on FHIR authorization workflows. Check out more information about this client here: https://github.com/smart-on-fhir/client-js.

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

1. Setup the HSPC Sandbox.

   - [ ] Go to the [HSPC sandbox site](https://sandbox.hspconsortium.org/).
   - [ ] Sign in with the HSPC account you should have made already :)
   - [ ] Select the "Create Sandbox" button on the bottom of the left column.
   - [ ] Name your Sandbox something cool (or just UW FHIR WORKSHOP).
   - [ ] Select Sandbox Version "FHIR STU 3 (v3.0.1)".
   - [ ] Make sure both the "Allow Open FHIR Endpoint" and the "Apply Default Data Set" options are selected.
   - [ ] Add a description if you'd like. (i.e. This is for the UW FHIR Tutorial).
   - [ ] Click the `Create Sandbox` button.

2. Setup your Application.

   - [ ] Click the "+ Register Manually" button on the main dashboard.
   - [ ] Fill out the following form fields:
     - App Type: `Public Client`
     - App Name: Anything your imagination desires!
     - App Launch URI: https://\<your-github-username>.github.io/smart-on-fhir-tutorial/example-smart-app/launch.html
     - Redirect URI: https://\<your-github-username>.github.io/smart-on-fhir-tutorial/example-smart-app/
     - Allow Offline Access: Unchecked
     - Patient Scoped App: Unchecked
   - [ ] Note and jot down the `App Client Id` from the popup that should show up on your screen.

We'll talk about what some of these configuration options mean later in the tutorial, but for now, congrats! Your app is now registered! You should see it show up on your Sandbox Dashboard.

# 9. Launch Your App

SMART on FHIR apps can be launched in a variety of ways. You can browse http://docs.smarthealthit.org/authorization/#ehr-launch-sequence and http://docs.smarthealthit.org/authorization/scopes-and-launch-context/#scopes-for-requesting-context-data for more information, but we'll present a quick summary.

The SMART standard provides aims to provide an "App Platform for Healthcare", and as a result SMART on FHIR defines a couple of different launch patterns based on [four use cases](http://www.hl7.org/fhir/smart-app-launch/) defined by the [Argonaut Project](http://argonautwiki.hl7.org/index.php?title=Main_Page). You'll try out two of these in the main tutorial, and another one in the **Extra Credit** section. These are the scenarios you'll focus on:

1. A Provider-facing EHR Launch: This type of launch would happen from inside of a provider-facing EHR UI. For example, a provider might be examining a patient's chart in Epic Hyperspace, and click a link on the chart to launch this application in the current EHR context.

2. A Patient Portal Launch: This type of launch would be initiated by a Patient from a patient-facing EHR portal like Epic MyChart. A patient would be logged into their portal, and click a link or button that would launch this app in their Patient context.

3. A stand-alone app is launched externally by either a patient or provider, but uses SMART on FHIR to authorize with the EHR and access relevant data using FHIR resources. You'll see this type of launch in the [extra credit section](#152-launch-app-using-a-stand-alone-launch) if you're the ambitious type =)

## 9.1 Create Launch Scenarios

You'll create scenarios for the first two types of launches in the HSPC sandbox. [Click here](https://healthservices.atlassian.net/wiki/spaces/HSPC/pages/65011892/Sandbox+Launch+Scenarios) for more detail.

First, we need to create a couple of personas for the providers and patients that we will be simulating in this scenario:

- [ ] Click the `Personas` link on the left side of your sandbox dashboard.

You'll create one provider persona by clicking the `For Provider` button and one patient persona by clicking the `For Patient` button. Follow these steps for each:

- [ ] Click the appropriate button.

- [ ] Find or create an interesting patient or provider you'd like to use and click on them.
      _Note: Use the `Open Patient Data Manager` button to dive deeper into the patients and their associated resources_.

- [ ] Confirm the patient details in the right-hand column, and click `Select this Patient` when done.

- [ ] Chose any user id and password and jot them down.

- [ ] Click the `Save` button.

Now on to the scenarios, which you'll build two of.

- [ ] Click the `Launch Scenarios` link on the left side of your sandbox dashboard.

- [ ] Choose your provider persona for one scenario, and patient persona for the 2nd.

For the provider scenario, you'll need to provide the patient context. In the `Select the Patient Context` screen:

- [ ] Find your patient by name using the search function.

- [ ] Click the `Select this Patient` button.

Now, we need to select the app that will be launched:

- [ ] Click on the blue gear button on your app's tile.

- [ ] Write a clever description for your launch scenario.

- [ ] Check the `Launch Embedded` box.

- [ ] Click the `Save` button.

If you did most things right, you should see two new launch scenarios listed on the `Launch Scenario` dashboard. Yay!

## 9.2 App Launch Flow Overview

![alt-text][smart-ehr-sequence]

<figcaption>source: <a href='http://docs.smarthealthit.org/authorization/'>http://docs.smarthealthit.org/authorization/</a></figcaption>

![alt-text][ehr-flow]

<figcaption>source: <a href='https://engineering.cerner.com/smart-on-fhir-tutorial/images/ehr_launch_seq.png'>https://engineering.cerner.com/smart-on-fhir-tutorial/images/ehr_launch_seq.png</a></figcaption>

<br />

The EHR or Patient Portal sends request to `launch.html` with the following parameters:

- `iss`: Identifies the EHR's FHIR endpoint, which the app can use to obtain additional details about the EHR, including its authorization URL.
- `launch`: Identifies this specific launch and the associated EHR context. This identifier has to be communicated back to the EHR with the authorization request.

The SMART on FHIR javascript client library (`fhir-client.js`) takes care of all of the heavy lifting. This bit of code makes our job pretty easy. All we have to do is call `FHIR.oauth2.authorize()` and supply the `client_id` generated by the code console during registration and the scopes we registered.

# 10. Authorize Your App

Now that we have our launch scenarios created and app registered, let's talk about how SMART apps authorize with the EHR Authorization Server.

![alt-text][authorization-flow]

<figcaption>source: <a href='http://www.hl7.org/fhir/smart-app-launch/'>http://www.hl7.org/fhir/smart-app-launch/</a></figcaption>

1. Your app accesses the conformance statement using the server url sent with the `iss` parameter and recieves an url for the authorization server.

2. Your app sends a request to the authorization server that includes a couple of parameters that you can look over here: http://docs.smarthealthit.org/authorization/#1-app-asks-for-authorization.

3. If authorization succeeds, the App receives an authorization code from the authorization server.

4. The app exchanges this code for an access token by sending a request back to the server.

5. This access token is stored by the app and used to retrieve protected FHIR resources allowed by the scopes.

The `index.html` file includes a script which calls into the `extractData()` function in `example-smart-app.js`. `extractData()` uses the `FHIR.oauth2.ready()` function to exchange the authorization code for the access token and stores it in session storage for later use.

Again of these exchanges are facilitated by `fhir-client.js` - which is much easier for us!

## 10.1 A Quick Intro to Scopes

http://docs.smarthealthit.org/authorization/scopes-and-launch-context/

`launch.html` is configured by default with a very basic set of scopes. For now, leave this set of scopes as is, but make sure to update your app registration to match:

- [ ] In the HSPC Sandbox - App Dashboard, click on the blue gear button on your app's tile.
- [ ] Fill out the `Scopes` section with the same contents as the `scope` field in launch.html

# 11. Get Patient Data using FHIR

We now have a valid access token, and can use it to send requests to the FHIR endpoint to retrieve our patient's data. See http://docs.smarthealthit.org/authorization/#4-app-accesses-clinical-data-via-fhir-api.

We will depend on the `fhir-client.js` library to retrieve these resources using a couple of the available APIs:

- `smart.patient.read()`: This returns the context for the patient the app was launched for.
- `smart.patient.api.fetchAll()`: This will use the fhir.js API to retrieve a complete set of resources for the patient in context.
- `smart.byCodes()`: A utility function that returns a function to search a given resource for specific codes returned from that response.

Here's the relevant code in `example-smart-app.js`:

```javascript
// Starts at Line 12
var patient = smart.patient;
var pt = patient.read();
var obv = smart.patient.api.fetchAll({
            type: 'Observation',
            query: {
                code: {
                $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
                        'http://loinc.org|8480-6', 'http://loinc.org|2085-9',
                        'http://loinc.org|2089-1', 'http://loinc.org|55284-4']
                }
            }
        });

...

$.when(pt, obv).done(function(patient, obv) {
    var byCodes = smart.byCodes(obv, 'code');
    ...
```

We'll walk through the code first, and then modify it to retrieve the data you require for your specific patient.

As an aside, the `fhir-client.js` library defines several more API’s that will come in handy while developing smart app. Check them out here: http://docs.smarthealthit.org/clients/javascript/.

## 11.1 Modify `example-smart-app.js` to grab desired data

- [ ] Open up the `Patient Data Manager` for the patient you chose for you scenarios and click on the `Observation` tab in the left column.

- [ ] Find an observation or set of observations that you'd like to access and display in your app and note their observation codes.

- [ ] Update the FHIR query in `example-smart-app.js` to match this code or list of codes by updating the following section:
  ```javascript
  query: {
    code: {
      $or: [
        "http://loinc.org|8302-2",
        "http://loinc.org|8462-4",
        "http://loinc.org|8480-6",
        "http://loinc.org|2085-9",
        "http://loinc.org|2089-1",
        "http://loinc.org|55284-4"
      ];
    }
  }
  ```
- [ ] Check if your Observation(s) are being correctly fetched by updating this code block with the codes you're using and inspecting the output in the Chrome javascript console:

  ```javascript
  console.log("byCodes:");
  console.log(byCodes("26478-8"));
  console.log(byCodes("2345-7"));
  ```

- [ ] Read and parse the fetched Observation(s) to access their values and units by modifying the following code block:

  ```javascript
  // Observations
  yourObservation = byCodes("<your-observation-loinc-code>");
  ```

- [ ] Modify the layout of `index.html` and the `deafault_patient()` function to display your observation values:

  ```javascript
  function defaultPatient(){
      return {
      fname: {value: ''},
      lname: {value: ''},
      gender: {value: ''},
      birthdate: {value: ''},
      <new-label-for-your-observation>: {value: ''}

      };
  }
  ```

  ```html
  <h2>Observation Resource</h2>
    <table>
      <tr>
        <th>[readable-text-describing-your-observation]</th>
        <td id='<new-label-for-your-observation>'></td>
      </tr>
    </table>
  ```

- [ ] Add a new attribute to the patient object `p` that is used to update the `index.html` page content by modifying the following code block:

  ```javascript
  // Observations
  p.<new-label-for-your-observation> = getQuantityValueAndUnit(yourObservation[0]);
  ```

- [ ] Inspect the patient object `p` in the Chrome javascript console to make sure the data is showing up correctly.

# 12. Test Your Application!

## 12.1 Provider Launch

- [ ] Go to `Launch Scenarios` and launch using the corresponding scenario.

## 12.2 Patient Launch

- [ ] Go to `Launch Scenarios` and launch using the corresponding scenario.

## 12.3 Embedded Launch

- [ ] Go to `Launch Scenarios` and click on the row of the scenario you want to launch in the EHR simulator
- [ ] Click the `Launch Embedded` checkbox
- [ ] Launch the Scenario!

## 12.4 EHR Simulator Launch

- [ ] Click on the `EHR Simulator` in the left-hand column.
- [ ] Select a provider and patient for the context of your EHR session.
- [ ] Click on your app's tile to launch the app inside the EHR session.

# 13. Extra Credit

## 13.1 Launch App from the SMART Sandbox (Easy)

A major goal of SMART on FHIR is interoperability. Any EHR that conforms to the SMART on FHIR standard should be able to launch our app with minimal modifications. To demonstrate interoperability, you'll try registering and launching our app in another popular sandbox made by [SMART Health IT](https://smarthealthit.org/) team.

Think about what settings were specific to the HSPC Sandbox, figure out if you need to change anything in launch-smart-sandbox.html to make it work with the [SMART Health IT Launcher](http://docs.smarthealthit.org/sandbox/) sandbox, and test your app out!

## 13.2 Launch App using a Stand-alone Launch (Advanced)

You'll use the SMART Health IT Sandbox to demonstrate a third app launch flow where we want to launch a standalone app that, despite being launched outside of the EHR or Patient Portal context, authenticates with the EHR and has access to the available FHIR resources.

Check out the documentation for the [Standalone Launch Sequence](http://docs.smarthealthit.org/authorization/#standalone-launch-sequence) and think through how this flow.

## 13.3 Create a Confidential Client App using the SMART Python Client (Incredibly Advanced)

If you've got tons of time and motivation - or just want to write a Python web application that uses SMART on FHIR - check out the documentation for [Confidential Clients](http://docs.smarthealthit.org/authorization/#support-for-public-and-confidential-apps) and for the [Python Client Library](https://github.com/smart-on-fhir/client-py).

Think about:

1. Why you would want to develop a confidential app instead of a public one.
2. How would the ability to protect a `client_secret` increase authorization security.
3. Why a client-side web application is unable to protect a `client_secret`.
4. How including a `client_secret` affects the authorization sequence and subsequent access to FHIR resource.

# 14. Next Steps

This is a very simple client-side web app that pulls in a patient and their observations only to... do basically nothing with it except displaying it on the screen. You can use this app as a starting point for anything you come up with - so use your imagination!

[smart-ehr-sequence]: images/smart-docs-ehr-launch.png "EHR Launch Sequence"
[ehr-flow]: https://engineering.cerner.com/smart-on-fhir-tutorial/images/ehr_launch_seq.png "EHR Launch Flow Diagram"
[patient-flow]: https://engineering.cerner.com/smart-on-fhir-tutorial/images/patient_launch_seq.png "Patient Launch Flow Diagram"
[standalone-flow]: images/standalone_launch_sequence.png "Standalone Launch Flow Diagram"
[authorization-flow]: images/authorization_sequence.png "SMART Authorization Sequence Diagram"
