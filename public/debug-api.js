document.getElementById('test-btn').addEventListener('click', fetchData);

async function fetchData() {
    const output = document.getElementById('output');
    output.innerHTML = 'Loading...';
    
    try {
        // Fetch from the local Strapi instance
        const response = await fetch('http://localhost:1337/api/global?populate=*');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Success: Display formatted JSON
        output.innerHTML = `
            <div class="card" style="background:#e6fffa; border:1px solid #b2f5ea">
                <h3 style="margin-top:0">✅ Connection Successful!</h3>
                <p><strong>Site Name:</strong> ${data.data?.siteName || data.data?.attributes?.siteName || 'Not found in response'}</p>
                <hr>
                <strong>Raw Response:</strong>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    } catch (err) {
        // Error: Display helpful message
        output.innerHTML = `
            <div class="error">
                <h3>❌ Connection Failed</h3>
                <p>${err.message}</p>
                <p><strong>Common Fixes:</strong></p>
                <ul>
                    <li>Is Strapi running? (<code>npm run dev</code>)</li>
                    <li>Are permissions enabled?
                        <ol>
                            <li>Go to <a href="http://localhost:1337/admin" target="_blank">Admin Panel</a></li>
                            <li>Settings > Users & Permissions > Roles > Public</li>
                            <li>Click "Global" and check "find"</li>
                            <li>Click Save</li>
                        </ol>
                    </li>
                </ul>
            </div>
        `;
    }
}
