// we create this event listener so we don't care where is the script tag link in the html file
document.addEventListener("DOMContentLoaded", () => {
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

        //loop to create dynamically our pages links
        for(let i = 0; i < totalPages; i++){
            let pageNumber = i + 1;
            const pageLi = createElement('li');
            const pageLink = createElement('a', 'textContent', pageNumber);

            if(pageNumber === 1){
                pageLink.className = 'active';
            }

            //eventlistener to go in the other pages and active the right links when clicked
            pageLink.addEventListener('click', (e)=> {
                const clickedLink = e.target;
                const nbrPage = parseInt(clickedLink.textContent);
                const activeLink = document.querySelector('.active');

                activeLink.className = '';
                clickedLink.className = 'active';

                showPage(studentList, nbrPage);
            });
            
            pageLi.appendChild(pageLink);
            pageUl.appendChild(pageLi);
        }
        pageDiv.appendChild(pageUl);
        page.appendChild(pageDiv);
    };

    // Creation of the search input
    const searchForm = () => {
        const header = document.querySelector(".page-header");
        const searchDiv = createElement('div', 'className', 'student-search');
        const searchInput = createElement('input', 'type', 'text');
        searchInput.placeholder = "Search for students...";
        const searchButton = createElement('button', 'textContent', 'search');


        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton);
        header.appendChild(searchDiv);

        searchButton.addEventListener('click', (e) =>{
            e.preventDefault();
            search(searchInput);
        });

        searchInput.addEventListener("keyup", (e) =>{
            e.preventDefault();
            search(searchInput);
        });

    }

    const search = (searchInput) => {
        const noResult = createElement('div', 'textContent', 'No result');
        const students = document.querySelectorAll('.student-item');
        const userInput = searchInput.value.toLowerCase();
        let results = [];

        for(let i = 0; i < students.length; i++){
            const listResult = students[i].querySelector("h3");
            const textValue = listResult.textContent.toLowerCase();
            if(textValue.includes(userInput)){
                students[i].style.display = '';
                results.push(students[i]);
            }else{
                students[i].style.display ='none';
            }
        }

        if(results.length === 0){
            noResult.textContent = 'No result';
            page.appendChild(noResult);
        }
        restore(results);
    }

    const restore = (results) => {
        const pageLinks = document.querySelector('.pagination');
        page.removeChild(pageLinks);
        showPage(results,1);
        appendPageLinks(results)
    }


    showPage(studentList,1);
    searchForm();
    appendPageLinks(studentList);
});





