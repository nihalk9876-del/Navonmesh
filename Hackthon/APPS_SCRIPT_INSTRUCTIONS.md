# Google Apps Script for Auto Email Confirmation

Use this script in your Google Form/Sheet to automatically send confirmation emails upon registration.

## Troubleshooting: Error 400 (Bad Request)

If you see a generic "Error 400" or cannot open the script editor:
1. **Use Incognito Mode**: Open a new Incognito/Private window (`Ctrl+Shift+N`), log in to ONLY the Google account that owns the form, and try again. This is the most common fix (caused by multiple logged-in accounts).
2. **Use Google Sheets**: If step 1 fails, open the **Google Sheet** linked to your form responses, go to `Extensions > Apps Script`, and use the "Alternative Script for Google Sheets" below.

---

## Method 1: Form Script (Recommended)

1. **Open Script Editor**:
   - Open your Google Form.
   - Click the three dots (More) -> **Script editor**.

2. **Paste the Code**:
   - Replace any existing code in `Code.gs` with the following:

```javascript
/*
  Auto-Email Confirmation Script for Google Forms
*/

const EMAIL_SUBJECT = "Registration Confirmed - Navonmesh Srijan Hackathon";
const SENDER_NAME = "Navonmesh Team"; 

function onFormSubmit(e) {
  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();
    
    let teamName = "";
    let leaderName = "";
    let leaderEmail = "";
    
    for (let i = 0; i < itemResponses.length; i++) {
        const itemResponse = itemResponses[i];
        const title = itemResponse.getItem().getTitle(); // Exact question title
        const answer = itemResponse.getResponse();
        
        // Matches based on the exact form labels we extracted
        if (title.includes("Team Name")) { 
            teamName = answer;
        } else if (title.includes("Team member 1(Leader)") || title.includes("Full Name")) {
            leaderName = answer;
        } else if (title.includes("Member 1 email address") || title.includes("Email")) {
            leaderEmail = answer;
        }
    }
    
    if (leaderEmail) {
        sendConfirmation(leaderEmail, leaderName, teamName);
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
  
  GmailApp.sendEmail(email, EMAIL_SUBJECT, body, { name: SENDER_NAME });
}
```

3. **Set up Trigger**:
   - Triggers (alarm icon) -> **+ Add Trigger**.
   - `onFormSubmit`, `From form`, `On form submit`.
   - Save & Authorize.

---

## Method 2: Alternative Script for Google Sheets

Use this method if the Form script editor is giving errors.

1. Open the **Google Sheet** where responses are saved.
2. Go to **Extensions > Apps Script**.
3. Clear `Code.gs` and paste this code:

```javascript
/*
  Auto-Email Script for Google Sheets (Linked to Form)
*/

const EMAIL_SUBJECT = "Registration Confirmed - Navonmesh Srijan Hackathon";
const SENDER_NAME = "Navonmesh Team";

function onFormSubmit(e) {
  try {
    // In Sheets, e.namedValues uses the Column Headers as keys
    // Be careful: Headers must match EXACTLY (including spaces)
    
    const namedValues = e.namedValues;
    
    // Adjust these keys to match your Sheet's top row exactly
    const teamName = namedValues['Team Name '] ? namedValues['Team Name '][0] : "Team";
    const leaderName = namedValues['Team member 1(Leader)'] ? namedValues['Team member 1(Leader)'][0] : "Participant";
    // Tries multiple common variations just in case
    const email = namedValues['Member 1 email address (leader)'] ? namedValues['Member 1 email address (leader)'][0] : 
                  (namedValues['Email Address'] ? namedValues['Email Address'][0] : "");

    if (email) {
      sendConfirmation(email, leaderName, teamName);
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
  
  GmailApp.sendEmail(email, EMAIL_SUBJECT, body, { name: SENDER_NAME });
}
```

4. **Set up Trigger**:
   - Triggers (alarm icon) -> **+ Add Trigger**.
   - `onFormSubmit`, `From spreadsheet`, `On form submit`.
   - Save & Authorize.
