// we create this event listener so we don't care where is the script tag link in the html file
document.addEventListener("DOMContentLoaded", () => {
    // global variables for the project
    const studentList = document.querySelectorAll(".student-item");
    const nbrItems = 10;

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
        //function to create elements
        const createElement = (elementName, prop, value) => {
            const element = document.createElement(elementName);
            element[prop] = value;
            return element;
        };

        const totalPages = Math.ceil(studentList.length / nbrItems);
        const page = document.querySelector('.page');
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

    showPage(studentList,1);
    appendPageLinks(studentList);
});
