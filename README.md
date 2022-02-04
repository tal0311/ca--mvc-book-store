# ca-mvc-book-store
ca-bootcamp mvc and full CRUDL in vanilla ja 


### link to project
https://tal0311.github.io/ca-mvc-book-store/

### code pice
- this code is part of the service file. it sorts the book list by the user click event. 
- Because the object of a book returns several types of variables.
The function first determines what type of variable it is. Then, select the desired sort type.  
  
<!-- code  -->
function getBooksForDisplay() {  
  if (gSortBy !== 'bookName') {  
    gBooks.sort((a, b) => a[gSortBy] - b[gSortBy])  
    }    
    gBooks.sort((a, b) => (a[gSortBy] < b[gSortBy] ? -1 : 1))  
  return gBooks  
}
