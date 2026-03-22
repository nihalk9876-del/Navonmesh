const fs = require('fs');

try {
    const html = fs.readFileSync('form_debug.html', 'utf8');

    console.log("Checking for email collection...");
    const collectEmail = html.includes('name="emailAddress"');
    console.log(`Collect Email Address (hidden field): ${collectEmail}`);

    const regex = /FB_PUBLIC_LOAD_DATA_\s*=\s*(\[[\s\S]*?\])\s*;/;
    const match = html.match(regex);

    if (match && match[1]) {
        const data = JSON.parse(match[1]);
        const items = data[1][1];

        console.log("\nForm Questions:");
        if (items) {
            items.forEach(item => {
                const title = item[1];
                const meta = item[4]; // meta contains ID and validation
                if (meta && meta[0]) {
                    const entryId = meta[0][0];
                    const isRequired = meta[0][2] === 1;
                    console.log(`- "${title}" (ID: ${entryId}) [Required: ${isRequired}]`);
                }
            });
        }
    } else {
        console.log("Could not parse JSON data.");
    }
} catch (e) {
    console.error(e);
}
