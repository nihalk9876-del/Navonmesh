# Google Apps Script for Auto Email Confirmation

**IMPORTANT: Your form fields have spaces or special characters in the titles. The code below accounts for that.**

## 1. Quick Install
1. Open your Google Form.
2. Click the three dots -> **Script editor**.
3. Replace all code in `Code.gs` with the below code.

```javascript
// --- CONFIGURATION ---
const EMAIL_SUBJECT = "Registration Confirmed - Navonmesh Srijan Hackathon";
const SENDER_NAME = "Navonmesh Team";

function onFormSubmit(e) {
  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();
    
    let teamName = "";
    let leaderName = "";
    let leaderEmail = "";
    
    // Iterate through responses
    for (let i = 0; i < itemResponses.length; i++) {
        const itemResponse = itemResponses[i];
        const title = itemResponse.getItem().getTitle();
        const answer = itemResponse.getResponse();
        
        // Exact matching based on your Google Form field titles
        // These MUST match what is on your live form
        if (title.indexOf("Team Name") !== -1) {
            teamName = answer;
        } 
        else if (title.indexOf("Team member 1(Leader)") !== -1) {
            leaderName = answer;
        } 
        else if (title.indexOf("Member 1 email address") !== -1) {
            leaderEmail = answer;
        }
    }
    
    if (leaderEmail) {
        sendConfirmation(leaderEmail, leaderName, teamName);
    } else {
        Logger.log("No email found. Check field titles.");
    }
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
  }
}

function sendConfirmation(email, name, teamName) {
  const body = `
    Hi ${name},
    
    Congratulations! Your team "${teamName}" has been successfully registered for Srijan (Hackathon) at Navonmesh.
    
    We are excited to have you with us. Further details regarding the schedule and rules will be shared shortly.
    
    Best Regards,
    Team Navonmesh
  `;
  
  GmailApp.sendEmail(email, EMAIL_SUBJECT, body, {
    name: SENDER_NAME
  });
}
```

## 2. Set Trigger (CRITICAL)
1. Click the **Alarm Clock (Triggers)** icon on the left.
2. Click `+ Add Trigger`.
3. Select `onFormSubmit` -> `From form` -> `On form submit`.
4. Save and authorize.

## 3. Verify
Submit a test form. If no email arrives, check the **Executions** tab in the Script Editor to see errors.
