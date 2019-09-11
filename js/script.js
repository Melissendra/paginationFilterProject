// we create this event listener so we don't care where is the script tag link in the html file
document.addEventListener("DOMContentLoaded", () => {
    // global variables for the project
    const studentList = document.querySelectorAll(".student-item");
    const nbrItems = 10;

    const showPage = (list, page) => {
        const startIndex = (page * nbrItems) - nbrItems;
        const endIndex = (page - nbrItems) - 1;

        for(let i = 0; i < list.length; i++){
            if(i >= startIndex && i < endIndex){
                list[i].style.display = '';
            }else {
                list[i].style.display = 'none';
            }
        }
    };

    showPage(studentList,1);
});



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.