const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config();

const Registration = require('./models/Registration');

const bulkDataStr = `
Dreamers 2.0|Sushil Sakharam Giri|Problem statement 2-TCS
Quadratech|Mohan Kakani|Problem statement 2-TCS
Anant|Sahili Arvind Balpande|STUDENT INNOVATION
Falcons|Shaikh Mohammad Shaarif Mohammad Raees|Problem statement 2-TCS
Technova|Mandar Hade|Problem statement 2-TCS
Tech Syndicate|Vedant Vasant Pawase|Problem statement 1 -Webion
Tech Ninja's|Vansh Hedaoo|Problem statement 1 -Webion
Volt vixen|Damini Rajput|Problem statement 1 -Webion
TEam CholeBhature|Anand Chapke|STUDENT INNOVATION
VibeCoders|Aashi kohad|Problem statement 2-TCS
Catalyst Corps|Saniya Bhandarkar|Problem statement 2-TCS
Byte-Busters|Karan Bhoyar|Problem statement 2-TCS
Code Architects|Janhavi Warankar|Problem statement 2-TCS
Arjuna|Shreyas Prakash Dakhole|Problem statement 2-TCS
Debuggers|Chetan Santosh Janjalkar|Problem statement 1 -Webion
The Innovators|Tarang Sunil Chavhan|Problem statement 2-TCS
Code Pirates|Harshal Ganesh Kakad|Problem statement 2-TCS
Brogrammers|Sameer Shrikant Vasekar|Problem statement 1 -Webion
Craft Coders|Tejaswini Kokate|Problem statement 1 -Webion
Perseverance|Kunal B Patil|Problem statement 2-TCS
CodeCraze|Prathamesh Punkar|Problem statement 1 -Webion
Alpha Script|Anurag Shrikhandkar|Problem statement 1 -Webion
Team Nexus|Parth D. Deshmukh|STUDENT INNOVATION
Cloud Nine|Atharva Bodade|Problem statement 2-TCS
Chatboters|Ajit Prashant Pagar|STUDENT INNOVATION
Team Ignite|Krishna Satish Zurmure|STUDENT INNOVATION
TechnoBlitz|Shaikh Huzaif Shaikh Salim|Problem statement 2-TCS
Tech Titans|Nikhil Ramesh Sawale|Problem statement 1 -Webion
404 brain not found|Lucky Kishor Dongre|Problem statement 1 -Webion
CODEFury|Yatharth Donarkar|STUDENT INNOVATION
Team InnoVerse|Siddhesh Ratnaparkhi|STUDENT INNOVATION
DivaBuggers|Hemangi Chandrashekhar Nafade|STUDENT INNOVATION
Bitsquad|Harshadip umbarkar|Problem statement 1 -Webion
ECE WARRIORS|Sudarshan Vitthal Shinde|Problem statement 2-TCS
The Core4Coders|Pranav Dhanraj Shankarpale|STUDENT INNOVATION
D-coders|Shriyansh Rajendra Fasate|STUDENT INNOVATION
Zentrixa|Gorakh Tapdiya|Problem statement 2-TCS
Team Nishkarsh|Parth Desai|STUDENT INNOVATION
Dev Mavericks|Roshan Chandrakant Bhadane|Problem statement 1 -Webion
Binary brains|Riya Pramodrao Umekar|Problem statement 2-TCS
Team Pragyan|Sainath Chaudhari|STUDENT INNOVATION
Codenova|Arakta Ghormade|STUDENT INNOVATION
Fusion|Vallabh bhagat|STUDENT INNOVATION
Jay Gajanan|Jay Potdukhe|STUDENT INNOVATION
CypherOps|Pranav Bhagat|STUDENT INNOVATION
Garud_X|Chiranjeev Singh Sandhu|STUDENT INNOVATION
Solutioneers|Anushka Dongare|STUDENT INNOVATION
Garud_X|Chiranjeev Singh Sandhu|STUDENT INNOVATION
Tech Titans|Vinit Umesh Wankhade|STUDENT INNOVATION
Team cloud|Sahil ali|STUDENT INNOVATION
Simplifiant|Prem Baliram Dhamodkar|STUDENT INNOVATION
Hacker|Devashish Gadodia|Problem statement 2-TCS
Team AgriVision|Samruddhi Vidhale|STUDENT INNOVATION
InnovaCore|Renuka Vinay Nilajkar|Problem statement 1 -Webion
InnovaCore|Renuka Vinay Nilajkar|Problem statement 1 -Webion
Quantam Coders|Shweta Dattatray Gore|STUDENT INNOVATION
Script kiddos|Tejas patil|Problem statement 1 -Webion
Quantum Coders|Harshvardhan Vijay Hajgude|STUDENT INNOVATION
Tech Titans|Lavanya Dhoke|STUDENT INNOVATION
Combin College|Jai Jadhav|STUDENT INNOVATION
Life Ledger|Ruchita Devidas Borse|STUDENT INNOVATION
SortX|Khushi Tikhile|STUDENT INNOVATION
KrushiMitra|ATHARVA SHERKAR|STUDENT INNOVATION
Code Catalyst|Roshani Vikas Sonawane|Problem statement 1 -Webion
Elevate|Palak Lodam|STUDENT INNOVATION
TechVortex|Lobhas Gawande|Problem statement 2-TCS
GPAIT|Tanvi Hiswankar|Problem statement 1 -Webion
Echo squad|Prachi Prakash Bhise|Problem statement 1 -Webion
Dependency Syncers|Dongarsing Patil|STUDENT INNOVATION
Team munja's|Krushna jadhav|Problem statement 1 -Webion
Neural Coders|Anand Vinod Ingle|STUDENT INNOVATION
Innovator techies|Sayantani Neminath Gidde|STUDENT INNOVATION
The code|Kadambari deepak pawar|Problem statement 1 -Webion
Code Titans|Sahil Waghmare|STUDENT INNOVATION
CodeKarma|Kumar Gaurav|STUDENT INNOVATION
Vision X|Anup Boke|STUDENT INNOVATION
HackMatez|Mithilesh Watane|STUDENT INNOVATION
Avinya Gangurde|Vinay Shivdas|Problem statement 1 -Webion
Code X|Dolly Diwate|STUDENT INNOVATION
DevX|Sanket Thakare|STUDENT INNOVATION
The Code|Kadambari Deepak Pawar|STUDENT INNOVATION
Brainstormers|Atharva Mahulkar|STUDENT INNOVATION
Tech Sparks|Tanuja Chalge|STUDENT INNOVATION
GenZ Coders|Dnyaneshwar Keshav Pimpalkar|STUDENT INNOVATION
Codex|Shruti suryawanshi|STUDENT INNOVATION
Team.cion|Pragati Deshmukh|STUDENT INNOVATION
TEAM.CION 2.0|Pragati Deshmukh|STUDENT INNOVATION
Jay Gajanan|Jay Shrikant potdukhe|STUDENT INNOVATION
NeXuS|Parikshit Pravin Bhadange|Problem statement 1 -Webion
PS3 Quantam Coders|Parth Agarkar|STUDENT INNOVATION
Codevortex|Manish Sanjay Mali|STUDENT INNOVATION
Algo-Arena|Nayana Rayane|STUDENT INNOVATION
IgniteX|Krishna sanjay walke|STUDENT INNOVATION
Tech Syndicate|Vedant Pawase|Problem statement 1 -Webion
FourBytes|Dhiraj Rajendra Tekale|Problem statement 1 -Webion
CodeBlooded|Shashank Savalgi|Problem statement 1 -Webion
RUNTIME TERRORS|SWAPNIL ASHOK SAVALE|Problem statement 1 -Webion
CampusMind|Laxmikant Sugriv Yewatkar|Problem statement 1 -Webion
TEAM NUCLEUS|Rohit kakad|Problem statement 1 -Webion
MindMatrix|Pranjal Najukrao Rane|Problem statement 1 -Webion
TEAM CION|Nitesh Mukesh Gavande|Problem statement 2-TCS
PrimeX|Pranay Ramdas More|Problem statement 2-TCS
MedQueue|Anurag Dinesh Rokade|STUDENT INNOVATION
Tech Titans|Nikhil Ramesh Sawale|Problem statement 1 -Webion
Team orion|Aryan Deshmukh|Problem statement 1 -Webion
AIoT Titans|Soham Vilayatkar|STUDENT INNOVATION
Team InnoVerse|Siddhesh Ratnaparkhi|STUDENT INNOVATION
Data Wizards|Amay Sandip Chinchmalatpure|Problem statement 2-TCS
CampusMind|Laxmikant Sugriv Yewatkar|Problem statement 1 -Webion
ANANT|Sahili Arvind Balpande|Problem statement 1 -Webion
Jay gajanan|Jay Shrikant Potdukhe|STUDENT INNOVATION
`;

const mapPS = (str) => {
    const s = str.toLowerCase();
    if (s.includes('statement 1')) return 'Problem Statement 1';
    if (s.includes('statement 2')) return 'Problem Statement 2';
    if (s.includes('innovation')) return 'Student Innovation';
    return 'Student Innovation';
};

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const updates = bulkDataStr.trim().split('\n').map(line => {
            const parts = line.split('|');
            return {
                teamName: parts[0].trim(),
                leaderName: parts[1].trim(),
                ps: mapPS(parts[2].trim())
            };
        });
        const allSrijan = await Registration.find({ event: 'Srijan (Hackathon)' });
        const foundIds = new Set();
        for (const update of updates) {
            let reg = allSrijan.find(r => r.teamName.toLowerCase().trim() === update.teamName.toLowerCase().trim());
            if (!reg) reg = allSrijan.find(r => r.leaderName.toLowerCase().trim() === update.leaderName.toLowerCase().trim());
            if (reg) foundIds.add(reg._id.toString());
        }
        const didNotFill = allSrijan.filter(r => !foundIds.has(r._id.toString()));
        process.stdout.write(didNotFill.map(r => `${r.teamName} - ${r.leaderName} (${r.leaderEmail})`).join('\n'));
        mongoose.connection.close();
    } catch (err) { }
}
run();
