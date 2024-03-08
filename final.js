
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.navigation').addEventListener('click', function(event) {
        var target = event.target;
        if (target.tagName.toLowerCase() === 'a') {
            var heading = target.textContent.trim();
            changeContent(heading, target.id); // Pass target.id for link color change
        }
    });

    document.getElementById('calculate-salary').addEventListener('click', calculateAnnualSalary);
});

function calculateAnnualSalary() {
    var hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
    var hoursPerWeek = parseFloat(document.getElementById('hours-per-week').value);
    var salaryOutput = document.getElementById('calculated-salary');
    var annualSalary;

    // Ensure both inputs are numbers and above 0
    if (!isNaN(hourlyRate) && !isNaN(hoursPerWeek) && hourlyRate > 0 && hoursPerWeek > 0) {
        annualSalary = hourlyRate * hoursPerWeek * 52;
    } else {
        salaryOutput.textContent = 'Please enter valid numbers for both hourly rate and hours per week.';
        return; // Exit the function if inputs are invalid
    }

    // The message variable is initially undefined
    var message;

    // Create the if…else if…else statement to assign a value to message based on the salary amount
    if (annualSalary < 20000) {
        message = "The salary is $" + annualSalary.toFixed(2) + ". The salary is too little.";
    } else if (annualSalary >= 20000 && annualSalary <= 25000) {
        message = "The salary is $" + annualSalary.toFixed(2) + ". The salary is almost enough. Let us negotiate";
    } else {
        message = "The salary is $" + annualSalary.toFixed(2) + ". The salary is enough.";
    }

    // Update the DOM with the appropriate message
    salaryOutput.textContent = message;
}

function changeContent(heading, selectedLinkId) {
    var contentArea = document.getElementById('content-area');
    var salaryCalculatorSection = document.getElementById('salary-calculator-section');

    contentArea.style.display = heading === 'Salary Calculator' ? 'none' : 'flex';
    salaryCalculatorSection.style.display = heading === 'Salary Calculator' ? 'block' : 'none';

    contentArea.innerHTML = ''; // Clear the content area

    if (heading === 'Work Experience') {
        loadWorkExperience(contentArea);
    } else if (heading === 'Education Experience') {
        loadEducationExperience(contentArea);
    } else if (heading === 'Related Awards and Skills') {
        loadAwardsAndSkills(contentArea);
    }
}

const workExperiences = [
    {
        companyName: "McDonalds",
        companyUrl: "https://www.mcdonalds.com",
        jobTitle: "Department Manager",
        dates: "Nov 28, 2018 - Aug 5, 2020",
        logoUrl: "mcd.jpeg", // Ensure you have correct paths for your images
        duties: ["Oversee Daily Operations", "Staff Management","Customer Satisfaction","Inventory and Supply Management","Compliance and Safety"]
    },
    {
        companyName: "Motivate Bike Share Company (Citi Bike)",
        companyUrl: "https://www.citibikenyc.com",
        jobTitle: "Sales Associate",
        dates: "March 26, 2017 - August 22, 2017",
        logoUrl: "cb.jpeg",
        duties: ["Customer Service", "Membership Promotion", "Maintenance and Reporting","Operational Support","Market Research and Feedback"]
    },
    {
        companyName: "Duane Reade Pharmacy",
        companyUrl: "https://www.walgreens.com",
        jobTitle: "Cashier",
        dates: "November 12, 2016 - March 15, 2017",
        logoUrl: "dr.jpeg",
        duties: ["Process Transactionsf", "Customer Service", "Inventory Management","Maintain Cleanliness","Pharmacy Assistance"]
    }
];

function loadWorkExperience(contentArea) {
    workExperiences.forEach(function(exp, index) {
        const expDiv = document.createElement('div');
        expDiv.innerHTML = `
            <strong>${exp.companyName}</strong> <br>
            <a href="${exp.companyUrl}" target="_blank">Company Site</a> <br>
            ${exp.jobTitle} <br>
            ${exp.dates} <br>
            <img src="${exp.logoUrl}" alt="Logo" style="width: 50px; height: 50px;"><br>
            Number of duties to show: <input type="number" class="duties-number" min="1" max="${exp.duties.length}" value="0"><br>
            <button class="view-duties" data-index="${index}">View Duties</button>
            <div class="duties-container" style="display: none;"></div>
        `;
        contentArea.appendChild(expDiv);
    });

    attachViewDutiesListeners();
}

function attachViewDutiesListeners() {
    document.querySelectorAll('.view-duties').forEach(button => {
        button.addEventListener('click', function() {
            const parentDiv = this.parentNode;
            const dutiesNumberInput = parentDiv.querySelector('.duties-number'); // Find the input within the same parent
            const numOfDuties = parseInt(dutiesNumberInput.value) || 1; // Use 5 as default if parsing fails
            
            const index = this.getAttribute('data-index');
            showJobDuties(index, numOfDuties, parentDiv);
        });
    });
}

function showJobDuties(index, numOfDuties, parentDiv) {
    const dutiesContainer = parentDiv.querySelector('.duties-container');
    const duties = workExperiences[index].duties.slice(0, numOfDuties);

    dutiesContainer.innerHTML = duties.map(duty => `<p>${duty}</p>`).join('');
    dutiesContainer.style.display = 'block';

}

function loadEducationExperience(contentArea) {
    const educationExperiences = [
        {
            schoolName: "State University of New York at Albany",
            schoolUrl: "https://www.albany.edu",
            period: "Fall 2017 - Present"
        },
        {
            schoolName: "Urban Dove Team Charter High School",
            schoolUrl: "https://urbandove.org",
            period: "2013 - 2017"
        },
        {
            schoolName: "Excellence Boys Charter School",
            schoolUrl: "https://excellenceboys.uncommonschools.org",
            period: "2005 - 2013"
        }
    ];
    educationExperiences.forEach(function(edu) {
        var eduDiv = document.createElement('div');
        eduDiv.classList.add('content-block');
        eduDiv.innerHTML = `
            <strong>${edu.schoolName}</strong> <br>
            <a href="${edu.schoolUrl}" target="_blank" style="color: blue;">School Site</a> <br>
            ${edu.period}
        `;
        contentArea.appendChild(eduDiv);
    });
}

function loadAwardsAndSkills(contentArea) {
    const skillsAwards = {
        skills: [
            "Inventory Management",
            "Leadership and Management",
            "Customer Service Excellence"
        ],
        awards: [
            "Employee of the Year 2019 - McDonald's",
            "Top Sales Associate - Citi Bike, August 2017"
        ]
    };
    var containerDiv = document.createElement('div');
    containerDiv.classList.add('content-block');
    containerDiv.style.display = 'flex';
    containerDiv.style.justifyContent = 'space-between';
    
    var skillsDiv = document.createElement('div');
    skillsDiv.innerHTML = '<strong>Skills:</strong><br>' + skillsAwards.skills.join('<br>');

    var awardsDiv = document.createElement('div');
    awardsDiv.innerHTML = '<strong>Awards:</strong><br>' + skillsAwards.awards.join('<br>');

    containerDiv.appendChild(skillsDiv);
    containerDiv.appendChild(awardsDiv);
    contentArea.appendChild(containerDiv);
}

