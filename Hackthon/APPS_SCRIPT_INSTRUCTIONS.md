# Google Apps Script for Auto Email Confirmation

**IMPORTANT: Your form fields have spaces or special characters in the titles. The code below accounts for that.**

## 1. Quick Install
1. Open your Google Form.
2. Click the three dots -> **Script editor**.
3. Replace all code in `Code.gs` with the below code.

```javascript
const EMAIL_SUBJECT = "Registration Confirmed - Navonmesh Srijan Hackathon";
const SENDER_NAME = "Navonmesh Team";

function onFormSubmit(e) {
  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();
    
    let teamName = "";
    let leaderName = "";
    let leaderEmail = "";
    let member2 = "";
    let member3 = "";
    let member4 = "";
    
    // Iterate through responses
    for (let i = 0; i < itemResponses.length; i++) {
        const itemResponse = itemResponses[i];
        const title = itemResponse.getItem().getTitle();
        const answer = itemResponse.getResponse();
        
        // Exact matching based on your Google Form field titles
        if (title.indexOf("Team Name") !== -1) {
            teamName = answer;
        } 
        else if (title.indexOf("Team member 1(Leader)") !== -1) {
            leaderName = answer;
        } 
        else if (title.indexOf("Member 1 email address") !== -1) {
            leaderEmail = answer;
        }
        // Match other members (looking for "Member X" and "Name")
        else if (title.indexOf("Member 2") !== -1 && (title.indexOf("Name") !== -1 || title.indexOf("name") !== -1)) {
            member2 = answer;
        }
        else if (title.indexOf("Member 3") !== -1 && (title.indexOf("Name") !== -1 || title.indexOf("name") !== -1)) {
            member3 = answer;
        }
        else if (title.indexOf("Member 4") !== -1 && (title.indexOf("Name") !== -1 || title.indexOf("name") !== -1)) {
            member4 = answer;
        }
    }
    
    if (leaderEmail) {
        sendConfirmation(leaderEmail, leaderName, teamName, member2, member3, member4);
    } else {
        Logger.log("No email found. Check field titles.");
    }
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
  }
}

function sendConfirmation(email, name, teamName, m2, m3, m4) {
  let membersList = name; // Leader
  if (m2) membersList += `, ${m2}`;
  if (m3) membersList += `, ${m3}`;
  if (m4) membersList += `, ${m4}`;

  const body = `
    Hi ${name},
    
    Congratulations! Your team "${teamName}" has been successfully registered for Srijan (Hackathon) at Navonmesh.
    
    Team Members:
    ${membersList}

    We are excited to have you with us. Further details regarding the schedule and rules will be shared shortly.
    
    For any queries, please contact:
    Dolly Bhutada: +91 8459701982
    Atharva Sonone: +91 9834428773
    
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
