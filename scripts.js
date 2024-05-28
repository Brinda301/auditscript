// checkUrls.js
const urls = require('./urls');

async function checkUrlsLastModified(urls) {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const updatedUrls = [];

    for (const url of urls) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                const lastModified = response.headers.get('Last-Modified');
                if (lastModified) {
                    const lastModifiedDate = new Date(lastModified);
                    if (lastModifiedDate > twoWeeksAgo) {
                        updatedUrls.push(url);
                    }
                }
            } else {
                console.error(`Failed to fetch ${url}: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching ${url}: ${error}`);
        }
    }

    return updatedUrls.length > 0 ? updatedUrls : 'No updates';
}

checkUrlsLastModified(urls).then(result => console.log(result));
