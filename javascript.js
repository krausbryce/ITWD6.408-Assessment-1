//-------------------------------------------------------- 
// Import Supabase API
//-------------------------------------------------------- 
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://rwyeddxvgvobwzfessde.supabase.co';
const supabaseKey = 'sb_publishable_Hlo9c6ugh0R9ZbFj5NkKzA_LLNaS3C8'; 
const supabase = createClient(supabaseUrl, supabaseKey);

//--------------------------------------------------------
// Navbar Functionality
//--------------------------------------------------------

window.toggleNav = function () {

    const sideNav = document.getElementById("sideNav");
    const backdrop = document.getElementById("overlayBackdrop");

    if (sideNav.style.width === "320px") {
        sideNav.style.width = "0";
        backdrop.classList.remove("show");
    } else {
        sideNav.style.width = "320px";
        backdrop.classList.add("show");
    }
};

window.closeNav = function () {

    document.getElementById("sideNav").style.width = "0";

    document
        .getElementById("overlayBackdrop")
        .classList.remove("show");
};

// Close sidebar when search opens
const searchCollapse = document.getElementById("collapseSearch");

if (searchCollapse) {
    searchCollapse.addEventListener("show.bs.collapse", function () {
        closeNav();
    });

}

//-------------------------------------------------------- 
// Handle form submission and insert data into Supabase 
//--------------------------------------------------------
//Get the form element by its name 
const form = document.forms['mobile-techno-form'];
//Add an event listener to the form for the 'submit' event
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
    
        //Get the values from the form fields 
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const line1 = document.getElementById('line1').value;
        const line2 = document.getElementById('line2').value;
        const city = document.getElementById('city').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const phoneType = document.querySelector('input[name="phoneType"]:checked')?.value;
        const provider = document.querySelector('select').value;
        const studyUse = document.getElementById('study').value;    
        
        console.log('data: ' + fname + ' ' + lname + ' ' + gender); 
            
        //Validate the form data (you can add more validation as needed) 
        if (!fname || !lname || !line1 || !line2 || !city || !gender || !phoneType || !provider || !studyUse) { 
            alert('Please fill in all fields.'); 
            return; 
        } 

        await insertData(
            fname,
            lname,
            line1,
            line2,
            city,
            gender,
            phoneType,
            provider,
            studyUse
        ); 
        });
    }

//-------------------------------------------------------- 
//Function to authenticate the user with Supabase using email and password 
//-------------------------------------------------------- 
async function authenticateUser(email, password) { 
    try { 
        // Attempt to sign in the user with the provided email and password 
        const { data, error } = await supabase.auth.signInWithPassword({ 
            email: email,
            password: password,
        });
        // Check for errors and log them to the console
        if (error) {
            console.error('Error authenticating user:', error);
            return null;
        }
        // Return the authenticated user data
        return data;
    } catch (error) {
        // Log any unexpected errors to the console
        console.error('Unexpected error during authentication:', error);
        return null;
    } 
}

//-------------------------------------------------------- 
//"InsertData" function to insert the form data into the 'mobiletechnologyform' table 
//-------------------------------------------------------- 
//Asynchronous function 
async function insertData(fname, lname, line1, line2, city, gender, phoneType, provider, studyUse) { 
    // Insert the data into the 'mobiletechnologyform' table in Supabase 
    const { data, error } = await supabase 
    .from('mobiletechnologyform') 
    .insert([{ fname: fname, lname: lname, gender: gender, line1: line1, line2: line2, city: city, phoneType: phoneType, provider: provider, studyUse: studyUse }]); 
    // Check for errors and log them to the console 
    if (error) {
        console.error('Error inserting form data:', error);
        alert('ERROR! INSERT FAILED!');
        return null;
    } 
    // Return the inserted data
    alert('Data (' + fname + ' ' + lname + ')' + ' inserted successfully!');
    return data;
}
//--------------------------------------------------------
//Comments
//--------------------------------------------------------

window.addComment = function () {

    const input = document.getElementById("commentInput");
    const comment = input.value.trim();

    if (comment === "") {
        alert("Please enter a review.");
        return;
    }

    const reviewList = document.getElementById("commentList");
    const newReview = document.createElement("li");
    newReview.className = "list-group-item";
    newReview.textContent = comment;
    reviewList.appendChild(newReview);
    input.value = "";
};


//--------------------------------------------------------
//REST API
//--------------------------------------------------------

//Async function to fetch data from the 'mobiletechnologyform' table in Supabase 
async function getData() { 
    // Fetch data from the 'mobiletechnologyform' table and order by 'created_at' in descending order 
    const { data, error } = await supabase 
    .from('mobiletechnologyform') 
    .select('*') 
    .order('created_at', { ascending: false }); 
    // Check for errors and return an empty array if there is an error 
    if (error) { 
    console.error('Error fetching data:', error); 
    alert('Error Fetching Data'); 
    return []; 
    } 
    // Return the fetched data 
    return data; 
}
// Javascript Async Promise: handle the return Promise 
getData().then(data => {
    mobileRecords = data;
    displayMobileRecords(mobileRecords);
    const searchBar =
        document.getElementById('mobile-search');
    searchBar.addEventListener('input', () => {
        const searchTerm =
            searchBar.value.toLowerCase();
        const filteredRecords =
            mobileRecords.filter(record =>
                Object.values(record).some(value =>
                    String(value)
                        .toLowerCase()
                        .includes(searchTerm)
                )
            );
        displayMobileRecords(filteredRecords);
    });
});

//--------------------------------------------------------
//JSON RULES
//--------------------------------------------------------

//Async function to fetch data from the 'jsonrule' table in Supabase
async function getJsonData() {
    // Fetch data from the 'jsonrule' table and order by 'created_at' in descending order
    const { data, error } = await supabase
    .from('jsonrule')
    .select('*')
    .order('created_at', { ascending: true });
    // Check for errors and return an empty array if there is an error
    if (error) {
    console.error('Error fetching data:', error);
    alert('Error Fetching Data');
    return [];
    }
    // Return the fetched data 
    return data; 
}
// Javascript Async Promise: handle the return Promise 
getJsonData().then(data => { 
    // Get the HTML element where the data will be displayed 
    const outputElement = document.getElementById('jsonrule-data'); 
    //Debug: Display the fetched data as a formatted JSON string in the output element 
    console.log(JSON.stringify(data, null, 2)); 
    //Loop through the data and display each record in a formatted way 
    data.forEach(record => {
        // Create a new div element for each record 
        const recordElement = document.createElement('div'); 
        //add class to each record
        recordElement.classList.add('record-card');
        recordElement.innerHTML = ` 
            <h2>${record.rule}</h2>
            <p>Description: ${record.description}</p>
            <p style= "border: #1e293b; border-style: dashed; color: red; padding: 5px;">Example: ${record.example}</p>
            `; 
        // Append the record element to the output element 
        outputElement.appendChild(recordElement); 
    }); 
});

//--------------------------------------------------------
//SEARCH
//--------------------------------------------------------

let mobileRecords = [];
function displayMobileRecords(records) {
    const outputElement =
        document.getElementById('mobiletechnologyform-data');
    outputElement.innerHTML = '';
    records.forEach(record => {
        const recordElement = document.createElement('div');
        recordElement.classList.add('record-card');
        recordElement.innerHTML = `
            <p><b>Firstname</b>: ${record.fname}</p>
            <p><b>Lastname</b>: ${record.lname}</p>
            <p><b>Gender</b>: ${record.gender}</p>
            <p><b>Address</b>: ${record.line1}, ${record.line2}</p>
            <p><b>City</b>: ${record.city}</p>
            <p><b>Phone Type</b>: ${record.phoneType}</p>
            <p><b>Study Use</b>: ${record.studyUse}</p>
            <p><b>Provider</b>: ${record.provider}</p>
        `;
        outputElement.appendChild(recordElement);
    });

    if (records.length === 0) {
        outputElement.innerHTML =
            '<p>No matching records found.</p>';
    }
}
//--------------------------------------------------------
// CUSTOMIZATION
//--------------------------------------------------------

const slideshowSection =
    document.getElementById('slideshow-section');

const fontSizeSelect =
    document.getElementById('fontSizeSelect');

const backgroundSelect =
    document.getElementById('backgroundSelect');

if (slideshowSection && fontSizeSelect && backgroundSelect) {
    fontSizeSelect.addEventListener('change', () => {
        slideshowSection.classList.remove(
            'font-small',
            'font-medium',
            'font-large'
        );
        slideshowSection.classList.add(
            `font-${fontSizeSelect.value}`
        );

    });

    backgroundSelect.addEventListener('change', () => {
        slideshowSection.classList.remove(
            'theme-dark',
            'theme-blue',
            'theme-green'
        );
        switch (backgroundSelect.value) {
            case 'dark':
                slideshowSection.classList.add('theme-dark');
                break;
            case 'blue':
                slideshowSection.classList.add('theme-blue');
                break;
            case 'green':
                slideshowSection.classList.add('theme-green');
                break;
        }

    });

}