const mongoose = require('mongoose');
const Registration = require('./Navonmesh/Hackthon/server/models/Registration');
require('dotenv').config({ path: './Navonmesh/Hackthon/server/.env' });

async function run() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.error('MONGO_URI not found in .env');
            process.exit(1);
        }

        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const utr = "523830978165";
        const existing = await Registration.findOne({ utrNumber: utr });
        if (existing) {
            console.log('Registration with this UTR already exists:', existing.teamName);
            process.exit(0);
        }

        const teamData = {
            event: 'Ankur (Project Expo)',
            teamName: 'EnviroMINI',
            studentCategory: 'Degree Students',
            teamSize: 4,
            leaderName: 'Komal Utane',
            leaderEmail: 'komalgutane@gmail.com',
            leaderPhone: '8459342415',
            college: 'government college of engineering amravati',
            members: [
                {
                    name: 'Niharika Sanjay Rode',
                    email: 'niharikarode16@gmail.com',
                    phone: '9518517244',
                    college: 'government college of engineering amravati'
                },
                {
                    name: 'Kiran Anil Patil',
                    email: 'kiranpatil78840@gmail.com',
                    phone: '9404871985',
                    college: 'government college of engineering amravati'
                },
                {
                    name: 'Markand Somraj Urkude',
                    email: 'urkudemarkand@gmail.com',
                    phone: '9881937419',
                    college: 'government college of engineering amravati'
                }
            ],
            utrNumber: utr,
            agreed: true,
            paymentVerified: true
        };

        const newReg = new Registration(teamData);
        await newReg.save();
        console.log('Team EnviroMINI registered successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

run();

