
    // Get references to HTML elements
const form = document.getElementById("resume-form");
const generateButton = document.getElementById("generate-button");
const resumeContainer = document.getElementById("resume");

// Event listener for Generate Resume button
generateButton.addEventListener("click", generateResume);

// Function to add a new education entry
function addEducationEntry() {
    const educationEntries = document.getElementById("education-entries");
    const entry = document.querySelector("#education-entries .entry").cloneNode(true);
    educationEntries.appendChild(entry);


    const deleteButton = entry.querySelector(".delete-entry");
    deleteButton.style.display = "inline-block"; // Show the delete button
    deleteButton.addEventListener("click", () => {
        educationEntries.removeChild(entry);
    });
}

// Function to add a new work experience entry
function addExperienceEntry() {
    const experienceEntries = document.getElementById("experience-entries");
    const entry = document.querySelector("#experience-entries .entry").cloneNode(true);
    experienceEntries.appendChild(entry);
    const deleteButton = entry.querySelector(".delete-entry");
    deleteButton.style.display = "inline-block"; // Show the delete button
    deleteButton.addEventListener("click", () => {
        experienceEntries.removeChild(entry);
    });
}

// Event listeners for adding education and work experience entries
document.getElementById("add-education").addEventListener("click", addEducationEntry);
document.getElementById("add-experience").addEventListener("click", addExperienceEntry);


// ...

// Function to generate the resume
/////////////////////////////////////////////////////////////////////////////////////
function generateResume() {
    const personalInfo = {  
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
    };

//   // Get the selected image file
//   const imageInput = document.getElementById("image");
//     const selectedImage = imageInput.files[0];

    // Retrieve all education entries
    const educationEntries = document.querySelectorAll("#education-entries .entry");
    const educationList = [];
    educationEntries.forEach(entry => {
        const university = entry.querySelector(".university").value;
        const degree = entry.querySelector(".degree").value;
        const graduationYear = entry.querySelector(".graduationYear").value;
        educationList.push({ university, degree, graduationYear });
    });

    // Retrieve all work experience entries
    const experienceEntries = document.querySelectorAll("#experience-entries .entry");
    const experienceList = [];
    experienceEntries.forEach(entry => {
        const company = entry.querySelector(".company").value;
        const position = entry.querySelector(".position").value;
        const duration = entry.querySelector(".duration").value;
        experienceList.push({ company, position, duration });
    });

    const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim());

    // Validate inputs (basic validation)
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone || !personalInfo.address ||
        educationList.some(education => !education.university || !education.degree || !education.graduationYear) ||
        experienceList.some(experience => !experience.company || !experience.position || !experience.duration) ||
        skills.length === 0) {
        alert("Please fill in all required fields.");
        return;
    }

     // Display the selected image on the resume (without storing it)
    //  if (selectedImage) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(selectedImage);
    //     reader.onload = function (event) {
    //         const imageSource = event.target.result;
    //         const imageElement = document.createElement("img");
    //         imageElement.src = imageSource;
    //         imageElement.classList.add("profile-image"); // You can add CSS styles to this class
    //         document.getElementById("resume").appendChild(imageElement);
    //     };
    // }

        // Create a unique ID for the resume
     const resumeId = generateUniqueId();

     // Check if the generated ID already exists in local storage
    const existingResumes = JSON.parse(localStorage.getItem("resumes")) || [];
    const idExists = existingResumes.some(resume => resume.id === resumeId);


     // If the ID already exists, regenerate it until it's unique
     while (idExists) {
        resumeId = generateUniqueId();
    }

    // Create a resume object
    const resumeData = {
        id: resumeId,
        personalInfo,
        education: educationList,
        experience: experienceList,
        skills,
    };

      // Push the new resume data into the array
      existingResumes.push(resumeData);
    //   console.log(existingResumes);

    // Store the updated array in local storage
    // console.log(existingResumes);
    localStorage.setItem("resumes", JSON.stringify(existingResumes));


    // Display the generated resume
    displayResume(resumeData);
}

// Function to generate a unique ID
function generateUniqueId() {
    return Math.floor(Math.random() * 1000);  
}
////////////////////////////////////////////////////////////////////////////////

// Function to display the generated resume
function togglepage(){
    // console.log("hello")
    const togglebtn=document.getElementById("return-home-btn").style.display="none";
    const toggleresume=document.getElementById("resume").style.display="none";
    const editresumebtn= document.getElementById("edit-resume-btn").style.display="none";

      // Clear form fields
      document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    
     // Clear education and work experience entries
     const educationEntries = document.querySelectorAll("#education-entries .entry");
    const experienceEntries = document.querySelectorAll("#experience-entries .entry");
    
    educationEntries.forEach(entry => {
        entry.querySelector(".university").value = "";
        entry.querySelector(".degree").value = "";
        entry.querySelector(".graduationYear").value = "";
    });
    
    experienceEntries.forEach(entry => {
        entry.querySelector(".company").value = "";
        entry.querySelector(".position").value = "";
        entry.querySelector(".duration").value = "";
    });
    document.getElementById("skills").value = "";


    form.style.display="block";

}


// Function to edit the resume
function editResume() {
    const togglebtn = document.getElementById("return-home-btn").style.display = "none";
    const toggleresume = document.getElementById("resume").style.display = "none";
    const editresumebtn= document.getElementById("edit-resume-btn").style.display="none";

    form.style.display = "block";
}


function displayResume(resumeData) {
    const resumeshowdata=document.getElementById("resume").style.display="block";
    const displayresumebtn= document.getElementById("return-home-btn").style.display="block";
    const editresumebtn= document.getElementById("edit-resume-btn").style.display="block";
    form.style.display="none";

    // Create HTML content for the resume
    const resumeHTML = `
        <!-- Personal Information -->
        <div class="personal-info">
            
            <h2>${resumeData.personalInfo.name}</h2>
            <p>Email: ${resumeData.personalInfo.email}</p>
            <p>Phone: ${resumeData.personalInfo.phone}</p>
            <p>Address: ${resumeData.personalInfo.address}</p>
        </div>
        <hr>

        
        <!-- Educational Background -->
        <div class="education">
            <h3 id="head">Educational Background</h3>
            <ul>
                ${resumeData.education.map(education => `
                    <li>
                        <strong> University: ${education.university}</strong> - 
                        <br> degree: ${education.degree}, 
                        <br> graduation year: (${education.graduationYear})
                    </li>
                `).join("")}
            </ul>
        </div>
        <hr>

        <!-- Work Experience -->
        <div class="experience">
            <h3 id="head">Work Experience</h3>
            <ul>
                ${resumeData.experience.map(exp => `
                    <li>
                        <strong>Company: ${exp.company}</strong> -
                        <br> Position: ${exp.position}, <br> 
                        Duration: (${exp.duration})
                    </li>
                `).join("")}
            </ul>
        </div>
        <hr>
        <!-- Skills -->
        <div class="skills">
            <h3 id="head">Skills</h3>
            <ul>
                ${resumeData.skills.map(skill => `<li>${skill}</li>`).join("")}
            </ul>
        </div>
    `;

    // Display the generated resume
    resumeContainer.innerHTML = resumeHTML;
}

// Load the saved resume from local storage on page load
window.addEventListener("load", () => {
    const savedResume = localStorage.getItem("resume") || [];
    if (savedResume) {
        const parsedResume = JSON.parse(savedResume);

        // Fill input fields with saved data
        document.getElementById("name").value = parsedResume.personalInfo.name;
        document.getElementById("email").value = parsedResume.personalInfo.email;
        document.getElementById("phone").value = parsedResume.personalInfo.phone;
        document.getElementById("address").value = parsedResume.personalInfo.address;

        parsedResume.education.forEach(education => {
            addEducationEntry();
            const educationEntries = document.querySelectorAll("#education-entries .entry");
            const lastEntry = educationEntries[educationEntries.length - 1];
            lastEntry.querySelector(".university").value = education.university;
            lastEntry.querySelector(".degree").value = education.degree;
            lastEntry.querySelector(".graduationYear").value = education.graduationYear;
        });

        parsedResume.experience.forEach(experience => {
            addExperienceEntry();
            const experienceEntries = document.querySelectorAll("#experience-entries .entry");
            const lastEntry = experienceEntries[experienceEntries.length - 1];
            lastEntry.querySelector(".company").value = experience.company;
            lastEntry.querySelector(".position").value = experience.position;
            lastEntry.querySelector(".duration").value = experience.duration;
        });

        document.getElementById("skills").value = parsedResume.skills.join(", ");
    }
});

     // Function to display a resume by index
     function displayResumeByIndex(index) {
            const existingResumes = JSON.parse(localStorage.getItem("resumes")) || [];

            if (index >= 0 && index < existingResumes.length) {
                const foundResume = existingResumes[index];
                displayResume(foundResume);
            } else {
                alert("Invalid index. Please enter a valid index.");
            }
        }

         // Function to extract URL parameters
         function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
            const results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return "";
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // Check if an index parameter is present in the URL
        const indexParam = getParameterByName("index");
        if (indexParam !== null) {
            // If the index parameter is present, display the corresponding resume
            const index = parseInt(indexParam);
            displayResumeByIndex(index);
        } 

        /////////////////////////////////////////////////////////////
        
        // Add an event listener to the form
form.addEventListener("click", (event) => {
    const target = event.target;

    // Check if the clicked element is an input field
    if (target.tagName === "INPUT") {
        
        const fieldsets = document.querySelectorAll("fieldset");
        fieldsets.forEach((fieldset) => {
            fieldset.classList.remove("selected");
        });

        // Add the "selected" class to the parent fieldset
        const fieldset = target.closest("fieldset");
        if (fieldset) {
            fieldset.classList.add("selected");
        }
    }
});
        

      
