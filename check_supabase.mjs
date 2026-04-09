const url = 'https://zwmdhfdagvvaotojidmm.supabase.co';
const key = 'sb_publishable_hVh71mwnULkg4MvHVGW3jA_VdApjQSZ';

async function check() {
    const aptRes = await fetch(`${url}/rest/v1/apartments?select=id,name&limit=5`, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    });
    const apts = await aptRes.json();

    const revRes = await fetch(`${url}/rest/v1/reviews?select=id,written_review&limit=5`, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    });
    const revs = await revRes.json();

    console.log('--- Apartments (first 5) ---');
    console.log(JSON.stringify(apts, null, 2));
    console.log('--- Reviews (first 5) ---');
    console.log(JSON.stringify(revs, null, 2));
    console.log(`\nApartment status: ${aptRes.status}, Review status: ${revRes.status}`);
}

check().catch(console.error);
