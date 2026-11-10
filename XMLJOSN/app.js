async function loadResume() {
    try {
        // 1. Fetch the XML file
        const response = await fetch('resume.xml');
        const xmlText = await response.text();
        
        // 2. Parse XML into a DOM object
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        // 3. Build HTML
        let html = "";

        // Helper functions
        const getText = (parent, tagName) => parent.querySelector(tagName)?.textContent || "";
        const getItems = (parent, selector) => Array.from(parent.querySelectorAll(selector)).map(n => n.textContent);

        // --- IDENTITY ---
        const identity = xmlDoc.querySelector("identity");
        html += `
            <header>
                <h1>${getText(identity, "firstName")} ${getText(identity, "lastName")}</h1>
                <div class="subtitle">${getText(identity, "desiredJobTitle")}</div>
                <div class="contact-info">
                    ${getText(identity, "city")}, ${getText(identity, "country")} | 
                    ${getText(identity, "phone_number")} | 
                    <a href="mailto:${getText(identity, "email")}">${getText(identity, "email")}</a> | 
                    <a href="${getText(identity, "linkedin")}" target="_blank">LinkedIn</a>
                </div>
                <div class="about">${getText(identity, "about")}</div>
            </header>
        `;

        // --- EXPERIENCE ---
        html += `<h2>Experience</h2>`;
        const experiences = xmlDoc.querySelectorAll("experience");
        
        experiences.forEach(exp => {
            const start = getText(exp, "startDate");
            const end = getText(exp, "endDate");
            
            html += `
                <div class="job">
                    <div class="job-header">
                        <h3>${getText(exp, "jobTitle")}</h3>
                        <span class="date">${start} - ${end}</span>
                    </div>
                    <div class="company">${getText(exp, "employer")} <span style="font-weight:normal; color:#718096; font-size:0.9rem;">(${getText(exp, "location")})</span></div>
                    <div class="job-desc">${getText(exp, "description")}</div>
                    <div class="achievements-list">
            `;

            // Achievements Loop
            const achievements = exp.querySelectorAll("achievement");
            achievements.forEach(ach => {
                const techs = getItems(ach, "technologies > item").join(" • ");
                html += `
                    <div class="achievement">
                        <strong>${getText(ach, "title")}</strong><br>
                        ${getText(ach, "description")}
                        <div class="tech-tags">🛠 ${techs}</div>
                    </div>
                `;
            });

            html += `</div></div>`;
        });

        // --- EDUCATION ---
        html += `<h2>Education</h2>`;
        const eduItems = xmlDoc.querySelectorAll("education > item");
        eduItems.forEach(edu => {
            html += `
                <div class="job">
                    <div class="job-header">
                        <h3>${getText(edu, "degree")}</h3>
                    </div>
                    <div class="company">${getText(edu, "institution")}</div>
                    <div class="job-desc">${getText(edu, "description")}</div>
                </div>
            `;
        });

        // --- SKILLS ---
        html += `<h2>Skills</h2><div class="skills-grid">`;
        const skills = getItems(xmlDoc, "skills > items > item");
        skills.forEach(skill => {
            html += `<span class="skill-tag">${skill}</span>`;
        });
        html += `</div>`;

        // --- CERTIFICATIONS ---
        html += `<h2>Certifications</h2><ul>`;
        const certs = getItems(xmlDoc, "certifications > item");
        certs.forEach(cert => {
            html += `<li>${cert}</li>`;
        });
        html += `</ul>`;

        // --- PROJECTS ---
        html += `<h2>Personal Projects</h2>`;
        const projects = xmlDoc.querySelectorAll("projects > project");
        projects.forEach(proj => {
            const techs = getItems(proj, "technologies > item").join(" • ");
            const url = getText(proj, "repository_url");
            
            html += `
                <div class="project">
                    <h3>${getText(proj, "name")}</h3>
                    <div class="job-desc">${getText(proj, "description")}</div>
                    <div class="tech-tags">🛠 ${techs}</div>
                    ${url ? `<a href="${url}" target="_blank">View Repository &rarr;</a>` : ''}
                </div>
            `;
        });

        // 4. Inject into HTML
        document.getElementById('resume-container').innerHTML = html;
        
        // 5. Show content, hide loading
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('resume-container').classList.remove('hidden');

    } catch (error) {
        console.error("Error loading XML: ", error);
        document.getElementById('loading').innerText = "Failed to load resume data. Make sure you are running a local server.";
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', loadResume);