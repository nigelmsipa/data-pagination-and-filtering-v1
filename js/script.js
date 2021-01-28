/**
 * /*
 * Treehouse Techdegree:
 * FSJS Project 2 - Data Pagination and Filtering
 *
 * @format
 */

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//variable to dynamicaly hold number of itemsPerPage

let ItemsPerPage = 9;
// function that will access the content  stored in the data array and dynamicaly display it on the page

function showPage(data, page) {
  const StartIndex = page * ItemsPerPage - ItemsPerPage;
  const EndIndex = page * ItemsPerPage;
  let studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';

  //this loop will loop through the data array and return the information that passes the conditoinal

  for (let i = 0; i < data.length; i += 1) {
    if ([i] >= StartIndex && [i] < EndIndex) {
      // this conditional ensures the output is within the desired range

      let studentItem = data[i];
      // this will dynamicaly insert that data contained in the data object in the HTML
      studentList.insertAdjacentHTML(
        'beforeend',
        ` <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src=${studentItem.picture.thumbnail} alt="Profile Picture">
        <h3>${studentItem.name.first}</h3>
        <span class="email">${studentItem.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${studentItem.registered.date}</span>
      </div>
    </li>`
      );
    }
  }
}
// This function will create and display pagination obuttons

function addPagination(list) {
  let linklist = document.querySelector('.link-list');
  linklist.innerHTML = '';
  for (let i = 1; i <= Math.ceil(list.length / ItemsPerPage); i++) {
    linklist.innerHTML += `<li>
    <button type="button">${i}</button>
  </li>`;
  }
  linklist.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      //ensures that the acttive class is appliedd to last clicked butttoon
      var active = document.querySelector('.active');
      if (active !== null) {
        active.classList.remove('active');
      }
      e.target.className = 'active';
      showPage(list, e.target.textContent);
    }
  });
}

// Display Search
const StudentSearch = document.querySelector('.student-search');
StudentSearch.innerHTML = `<label for="search" class="student-search">
<input id="search" placeholder="Search by name...">
<button type="button" id ='submit'><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
const submit = document.querySelector('#submit');
const Search = document.querySelector('#search');

//Add Functionality to the Search Component
submit.addEventListener('click', (event) => {
  event.preventDefault();

  const searchInput = search.value;
  const newListArr = [];

  for (let i = 0; i < data.length; i++) {
    let firstNames = data[i].name.first.toLowerCase();
    let lastNames = data[i].name.last.toLowerCase();

    if (
      firstNames.includes(searchInput.toLowerCase()) ||
      lastNames.includes(searchInput.toLowerCase())
    ) {
      newListArr.push(data[i]);
      showPage(newListArr, 1);
      addPagination(newListArr);
    }
  }
  //if the search result is empty
  if (newListArr.length === 0) {
    let studentList = document.querySelector('.student-list');
    studentList.innerHTML = ` <div class="no-results"><h1> No results found 😢 </h1><div>`;
  }
  console.log('Submit button is functional!');
});
search.addEventListener('keyup', () => {
  const searchInput = search.value;
  console.log(searchInput);
  //create a new student list based on the search matches
  const newListArr = [];
  //use that new list as an argument when calling the already existing function to display the students.

  for (let i = 0; i < data.length; i++) {
    let firstNames = data[i].name.first.toLowerCase();
    let lastNames = data[i].name.last.toLowerCase();

    if (
      firstNames.includes(searchInput.toLowerCase()) ||
      lastNames.includes(searchInput.toLowerCase())
    ) {
      newListArr.push(data[i]);
      showPage(newListArr, 1);
      addPagination(newListArr);
    }
    if (newListArr.length === 0) {
      let studentList = document.querySelector('.student-list');
      studentList.innerHTML = `    <div class="no-results"><h1> No results found 😢 </h1><div>`;
    }
  }
});
// Call functions
showPage(data, 1);
addPagination(data);
