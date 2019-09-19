
// global variables for the project
const studentList = document.querySelectorAll(".student-item");
const nbrItems = 10;
const page = document.querySelector('.page');

//function to create elements
const createElement = (elementName, prop, value) => {
    const element = document.createElement(elementName);
    element[prop] = value;
    return element;
};

const errorVerification = (elementName) =>{
    const element = document.getElementsByClassName(elementName);
    if(element){
        element.parentNode.removeChild(elementName);
    }
}

//Function to determine how many students we want per page
const showPage = (list, page) => {
    const startIndex = (page * nbrItems) - nbrItems;
    const endIndex = page * nbrItems;

    for(let i = 0; i < list.length; i++){
        if(i >= startIndex && i < endIndex){
            list[i].style.display = '';
        }else {
            list[i].style.display = 'none';
        }
    }
};

//function creating pages buttons dynamically
const appendPageLinks = (list) => {
    const totalPages = Math.ceil(studentList.length / nbrItems);
    const pageDiv = createElement('div', 'className', 'pagination');
    const pageUl = createElement('ul');

    errorVerification('pagination');

    //loop to create dynamically our pages links
    for(let i = 0; i < totalPages; i++){
        let pageNumber = i + 1;
        const pageLi = createElement('li');
        const pageLink = createElement('a', 'textContent', pageNumber);

        if(pageNumber === 1){
            pageLink.className = 'active';
        }

        //event listener to go in the other pages and active the right links when clicked
        pageLink.addEventListener('click', (e)=> {
            const clickedLink = e.target;
            const nbrPage = parseInt(clickedLink.textContent);
            const activeLink = document.querySelector('.active');

            activeLink.className = '';
            clickedLink.className = 'active';

            showPage(studentList,nbrPage);
        });
        
        pageLi.appendChild(pageLink);
        pageUl.appendChild(pageLi);
    }
    pageDiv.appendChild(pageUl);
    page.appendChild(pageDiv);
};

const searchForm = () => {
    const header = document.querySelector(".page-header");
    const searchDiv = createElement('div', 'className', 'student-search');
    const searchInput = createElement('input', 'type', 'text');
    searchInput.placeholder = "Search for students...";
    const searchButton = createElement('button', 'textContent', 'search');

    errorVerification("student-search");

    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
    header.appendChild(searchDiv);

    searchButton.addEventListener('click', (e) =>{
        e.preventDefault();
        search(searchInput, studentList);
    });

    searchInput.addEventListener("keyup", () =>{
        search(searchInput, studentList);
    });
};

const search = (search, student) => {
    const userInput = search.value.toLowerCase();
    let results = [];

    for(let i = 0; i < student.length; i++){
        student[i].style.display = "none";
        const name = student[i].textContent.toLowerCase();

        if(userInput !== 0 && name.includes(userInput)){
            results.push(student[i]);
        }

        if(results.length === 0 && userInput.length !== 0){
            const noResult = createElement("span", "className", "error");
            errorVerification("error");
            noResult.textContent = "No result found";
            page.appendChild(noResult);
        }else {
            showPage(results, 1);
            appendPageLinks(results);
        }    
    }
}

showPage(studentList, 1);
appendPageLinks(studentList);
searchForm();
