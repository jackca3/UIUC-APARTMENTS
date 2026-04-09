const fs = require('fs');
const path = require('path');
const https = require('https');

const MOCK_DATA_PATH = path.join(__dirname, 'src', 'lib', 'mock-data.ts');
const SEED_SQL_PATH = path.join(__dirname, 'supabase', 'seed.sql');

const mockDataContent = fs.readFileSync(MOCK_DATA_PATH, 'utf-8');
const seedSqlContent = fs.readFileSync(SEED_SQL_PATH, 'utf-8');

function getStreetViewUrl(address) {
    if (!address) return null;
    return `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${encodeURIComponent(address + ', Champaign, IL')}`;
}

// Function to fetch and extract og:image or a main hero image
async function fetchImageFromUrl(url) {
    if (!url || !url.startsWith('https')) return null;

    return new Promise((resolve) => {
        https.get(url, { timeout: 3000 }, (res) => {
            if (res.statusCode !== 200) {
                res.resume();
                resolve(null);
                return;
            }
            
            let data = '';
            res.on('data', chunk => {
                data += chunk;
                // Once we have a decent chunk, try matching to save time
                if (data.length > 50000) {
                     const match = data.match(/<meta property="og:image" content="([^"]+)"/i);
                     if (match) {
                         resolve(match[1]);
                         res.destroy(); // stop downloading
                     }
                }
            });
            
            res.on('end', () => {
                const match = data.match(/<meta property="og:image" content="([^"]+)"/i);
                resolve(match ? match[1] : null);
            });
        }).on('error', () => {
            resolve(null);
        }).on('timeout', () => {
            resolve(null);
        });
    });
}

async function processMockData() {
    console.log('Processing mock-data.ts...');
    const objects = [];
    const blockRegex = /\{[^}]*"id":\s*"([^"]+)",[^}]*"address":\s*"([^"]+)"[^{}]*"official_website":\s*(?:"([^"]+)"|null)[^{}]*"image_url":\s*(?:"([^"]+)"|null)[^}]*\}/g;

    let updatedMockData = mockDataContent;
    let match;
    
    // Quick regex to find all apt blocks and process them
    while ((match = blockRegex.exec(mockDataContent)) !== null) {
        const fullMatch = match[0];
        const id = match[1];
        const address = match[2];
        const website = match[3];
        const currentImageUrl = match[4];

        if (currentImageUrl) {
            continue; // Already has an image
        }

        let newImageUrl = null;
        if (website) {
            console.log(`Fetching image for ${id} from ${website}`);
            newImageUrl = await fetchImageFromUrl(website);
        }
        
        if (!newImageUrl) {
            newImageUrl = getStreetViewUrl(address);
        }
        
        if (newImageUrl) {
             console.log(`Setting image for ${id} to ${newImageUrl}`);
             const replaceBlock = fullMatch.replace(/"image_url":\s*null/, `"image_url": "${newImageUrl}"`);
             updatedMockData = updatedMockData.replace(fullMatch, replaceBlock);
        }
    }
    
    fs.writeFileSync(MOCK_DATA_PATH, updatedMockData);
    console.log('Finished processing mock-data.ts');
}


async function processSeedSql() {
    console.log('Processing seed.sql...');
    let updatedSeed = seedSqlContent;
    
    // Match the insert row format: ('id', 'name', 'slug', 'address', 'city', 'state', 'zip', 'desc', lat, lng, 'mgmt', 'website', 'image')
    const sqlRowRegex = /\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*([0-9.-]+),\s*([0-9.-]+),\s*'([^']+)',\s*(?:'([^']+)'|null),\s*(?:'([^']+)'|null)\)/g;
    
    let match;
    while ((match = sqlRowRegex.exec(seedSqlContent)) !== null) {
        const fullMatch = match[0];
        const id = match[1];
        const address = match[4];
        const website = match[12];
        const currentImage = match[13];
        
        if (currentImage && currentImage.includes('images1.apartments.com')) {
           // Skip if it already has a fine image.
           continue; 
        }

        if (!currentImage || currentImage.includes('unsplash.com')) {
            let newImageUrl = null;
            if (website) {
                 newImageUrl = await fetchImageFromUrl(website);
            }
            if (!newImageUrl) {
                newImageUrl = getStreetViewUrl(address);
            }
            
            if (newImageUrl) {
                // Determine if website was null or string
                const websitePart = website ? `'${website}'` : `null`;
                // Build the new row matching exactly the captured groups to avoid breaking SQL syntax
                const newRow = `('${id}', '${match[2]}', '${match[3]}', '${address}', '${match[5]}', '${match[6]}', '${match[7]}', '${match[8]}', ${match[9]}, ${match[10]}, '${match[11]}', ${websitePart}, '${newImageUrl}')`;
                
                updatedSeed = updatedSeed.replace(fullMatch, newRow);
                console.log(`Updated SQL row for ${id}`);
            }
        }
    }
    
    fs.writeFileSync(SEED_SQL_PATH, updatedSeed);
    console.log('Finished processing seed.sql');
}

async function main() {
    await processMockData();
    await processSeedSql();
}

main().catch(console.error);
