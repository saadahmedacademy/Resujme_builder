"use strict";
//  To access all id of the forms
let personalInfo = document.querySelector("#personalInfo");
let education = document.querySelector("#Education");
let workExperience = document.querySelector("#workExperience");
// To access all the inputs of all forms
let candidateName = document.querySelector("#candidateName");
let contect = document.querySelector("#contactDetail");
let institute = document.querySelector("#institute");
let degree = document.querySelector("#degree");
let grade = document.querySelector("#grade");
let jobTitle = document.querySelector("#jobTitle");
let companyName = document.querySelector("#companyName");
let experience = document.querySelector("#experience");
let image = document.querySelector("#image");
let resumeMain = document.querySelector("#resumeMain");
let imageBase64 = "";
// To store the image after converting it to base64
function imageTracker(event) {
    var _a;
    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            imageBase64 = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
let ResumeDataObject = {};
function nextButton(btnNumber) {
    if (btnNumber === 1) {
        personalInfo.classList.add("hidden");
        education.classList.remove("hidden");
        ResumeDataObject.candidateName = candidateName.value;
        ResumeDataObject.contect = contect.value;
        ResumeDataObject.image = imageBase64;
    }
    else if (btnNumber === 2) {
        personalInfo.classList.add("hidden");
        workExperience.classList.remove("hidden");
        education.classList.add("hidden");
        ResumeDataObject.institute = institute.value;
        ResumeDataObject.degree = degree.value;
        ResumeDataObject.grade = grade.value;
    }
    else if (btnNumber === 3) {
        console.log("This is btnNumber", btnNumber);
        ResumeDataObject.jobTitle = jobTitle.value;
        ResumeDataObject.companyName = companyName.value;
        ResumeDataObject.experience = experience.value;
        // To clear the previous storage
        localStorage.removeItem("resume");
        // To store all new information
        const resumeStorage = JSON.stringify(ResumeDataObject);
        localStorage.setItem("resume", resumeStorage || "{}");
        window.location.href = "resume.html";
    }
}
function skipButton(btnNumber) {
    if (btnNumber === 1) {
        personalInfo.classList.add("hidden");
        education.classList.add("hidden");
        workExperience.classList.remove("hidden");
    }
    if (btnNumber === 2) {
        const resumeStorage = JSON.stringify(ResumeDataObject);
        localStorage.setItem("resume", resumeStorage || "{}");
        window.location.href = "resume.html";
    }
}
function showResumeData() {
    const resumeStorage = localStorage.getItem("resume");
    const resumeData = JSON.parse(resumeStorage || "{}");
    console.log("resumeData", resumeData);
    let resumeAllSection = ``;
    // Create resume container
    // To create resume container
    // Create resume container
    const creatediv = document.createElement("div");
    creatediv.setAttribute("class", "resumeContainer");
    // Build personal info section if all required fields exist
    if (resumeData.candidateName &&
        resumeData.contect &&
        resumeData.image &&
        resumeData.institute &&
        resumeData.degree &&
        resumeData.grade &&
        resumeData.jobTitle &&
        resumeData.companyName &&
        resumeData.experience) {
        resumeAllSection += `
      <div class="resumeParts">
        <h2>Personal Information</h2>
        <img src="${resumeData.image}" width="210rem" height="200" alt="Profile Picture"/>
        <div><span>Candidate Name:</span> <p>${resumeData.candidateName}</p></div>
        <div><span>Contact:</span> <p>${resumeData.contect}</p></div>
      </div>
      
      <div class="resumeParts">
        <h2>Education</h2>
        <div><span>Institution Name:</span> <p>${resumeData.institute}</p></div>
        <div><span>Degree:</span> <p>${resumeData.degree}</p></div>
        <div><span>Achieved Grade:</span> <p>${resumeData.grade}</p></div>
      </div>
      
      <div class="resumeParts">
        <h2>Work Experience</h2>
        <div><span>Job Title:</span> <p>${resumeData.jobTitle}</p></div>
        <div><span>Company Name:</span> <p>${resumeData.companyName}</p></div>
        <div><span>Experience:</span> <p>${resumeData.experience}</p></div>
      </div>
    `;
    }
    // Build sections if education data is missing, but work experience is present
    else if (!resumeData.institute ||
        !resumeData.degree ||
        (!resumeData.grade &&
            resumeData.jobTitle &&
            resumeData.companyName &&
            resumeData.experience)) {
        resumeAllSection += `
      <div class="resumeParts">
        <h2>Personal Information</h2>
        <img src="${resumeData.image}" width="210rem" height="200"  alt="Profile Picture"/>
        <div><span>Candidate Name:</span> <p>${resumeData.candidateName}</p></div>
        <div><span>Contact:</span> <p>${resumeData.contact}</p></div>
      </div>
      
      <div class="resumeParts">
        <h2>Work Experience</h2>
        <div><span>Job Title:</span> <p>${resumeData.jobTitle}</p></div>
        <div><span>Company Name:</span> <p>${resumeData.companyName}</p></div>
        <div><span>Experience:</span> <p>${resumeData.experience}</p></div>
      </div>
    `;
    }
    // Build sections if work experience is missing, but education is present
    else if (resumeData.institute ||
        resumeData.degree ||
        (resumeData.grade &&
            !resumeData.jobTitle &&
            !resumeData.companyName &&
            !resumeData.experience)) {
        resumeAllSection += `
      <div class="resumeParts">
        <h2>Personal Information</h2>
        <img src="${resumeData.image}" width="210rem" height="200"  alt="Profile Picture"/>
        <div><span>Candidate Name:</span> <p>${resumeData.candidateName}</p></div>
        <div><span>Contact:</span> <p>${resumeData.contact}</p></div>
      </div>
      
      <div class="resumeParts">
        <h2>Education</h2>
        <div><span>Institution Name:</span> <p>${resumeData.institute}</p></div>
        <div><span>Degree:</span> <p>${resumeData.degree}</p></div>
        <div><span>Achieved Grade:</span> <p>${resumeData.grade}</p></div>
      </div>
    `;
    }
    // Fallback for personal information only
    else {
        resumeAllSection += `
      <div class="resumeParts">
        <h2>Personal Information</h2>
        <img src="${resumeData.image}" width="210rem" height="200"  alt="Profile Picture"/>
        <div><span>Candidate Name:</span> <p>${resumeData.candidateName}</p></div>
        <div><span>Contact:</span> <p>${resumeData.contact}</p></div>
      </div>
    `;
    }
    creatediv.innerHTML = resumeAllSection;
    // Ensure the resumeMain div exists before appending
    const resumeMain = document.getElementById("resumeMain");
    if (!resumeMain) {
        console.log("resumeMain div not found");
        return;
    }
    resumeMain.appendChild(creatediv);
}
function editResume() {
    const resumeStorage = localStorage.getItem("resume");
    let resumeData = JSON.parse(resumeStorage || "{}");
    ResumeDataObject = Object.assign({}, resumeData);
    console.log("ResumeDataObject", ResumeDataObject);
    if (candidateName)
        candidateName.value = ResumeDataObject.candidateName || "";
    if (contect)
        contect.value = ResumeDataObject.contect || "";
    if (image)
        image.value = ResumeDataObject.image || "";
    if (institute)
        institute.value = ResumeDataObject.institute || "";
    if (degree)
        degree.value = ResumeDataObject.degree || "";
    if (grade)
        grade.value = ResumeDataObject.grade || "";
    if (jobTitle)
        jobTitle.value = ResumeDataObject.jobTitle || "";
    if (companyName)
        companyName.value = ResumeDataObject.companyName || "";
    if (experience)
        experience.value = ResumeDataObject.experience || "";
    window.location.href = "index.html";
}
//  To delete the resume
function deleteResume() {
    localStorage.clear();
    window.location.href = "index.html";
}
function printResume() {
    const resumeformatingButtons = document.getElementById("resumeformatingButtons");
    resumeformatingButtons.style.display = "none";
    window.print();
    resumeformatingButtons.style.display = "block";
}
function darkMode() {
    const btnText = document.querySelector('.btnText');
    if (document.body.style.backgroundColor === "black" && document.body.style.color === "white") {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        btnText.innerText = "Light";
        btnText.style.color = "white";
        btnText.style.backgroundColor = "black";
    }
    else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        btnText.innerText = "Dark";
        btnText.style.color = "black";
        btnText.style.backgroundColor = "white";
    }
}
showResumeData();
