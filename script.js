// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let currentDayBox = $('#currentDay');
let currentDay = dayjs();
currentDayBox.text(currentDay.format("dddd, MMM DD"));
// .text("hi!");


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  /* Think of every problem as input and outputs
    make pseudocode for problem
    use docs to fill in pseudocode
    test every line with console.log 
    if messed up look up solutions
    repeat */

  // Select text box
const userText = $('.description');

// Select save buttons
const saveBtns = $('.saveBtn');

saveBtns.each(function() {
  // Save button event click
  $(this).on("click", () => {
    // Value is equal to the description value. This refers to the button. 
    //so essentially the buttons sibling or (description) is selected
    const description = $(this).siblings('.description');
    const value = description.val();
    // Get the ID of the closest ancestor div
    const storageID = $(this).closest('div').prop('id');
    console.log(storageID);

    // If value has text, set it in local storage
    value !== '' ? localStorage.setItem(storageID, value) : console.log('empty');
  });
});

userText.each(function () {
  //figure out whats the current id of dexription box
  let currentId = $(this).closest('div').prop('id');
  // given the current id we should be able to get the stored value based on name of current id
  let storedValue = localStorage.getItem(currentId);
  $(this).text(storedValue);
});

//  // Get the ID of the closest ancestor div
//  const storageID = $('.description').closest('div').prop('id');
//  // Page is reloaded, retrieve the value from local storage
//  var storedValue = localStorage.getItem(storageID);
//  console.log(storedValue);
//  $('.description').text(storedValue);

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
