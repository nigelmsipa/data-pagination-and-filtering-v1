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
const itemsPerPage = 9;

// function that will access the content  stored in the data array and dynamicaly display it on the page
function showPage(list, page) {
  let StartIndex = page * itemsPerPage - itemsPerPage;
  let EndIndex = page * itemsPerPage;
  let studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';

  // this loop will iterate through the data array
  for (let i = 0; i < list.length; i += 1) {
    // this conditional ensures the output is within the desired range
    if ([i] >= StartIndex && [i] < EndIndex) {
      let studentItem = list[i];
      // this will dynamicaly insert that data contained in the data object in the HTML
      studentList.innerHTML += ` <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src=${studentItem.picture.thumbnail} alt="Profile Picture">
        <h3>${studentItem.name.first}</h3>
        <span class="email">${studentItem.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${studentItem.registered.date}</span>
      </div>
    </li>`;
    }
  }
}

// This function will create and display pagination obuttons
function addPagination(list) {
  let linklist = document.querySelector('.link-list');
  linklist.innerHTML = '';
  for (let i = 1; i <= Math.ceil(list.length / itemsPerPage); i++) {
    linklist.innerHTML += `<li>
    <button type="button">${i}</button>
  </li>`;
  }
  linklist.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      //ensures that the acttive class is appliedd to last clicked butttoon
      var elems = document.querySelector('.active');
      if (elems !== null) {
        elems.classList.remove('active');
      }
      e.target.className = 'active';
      showPage(list, e.target.textContent);
    }
  });
}

// Call functions
showPage(data, 1);
addPagination(data);
