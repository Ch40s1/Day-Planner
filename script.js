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
  //select text box
  const description = $('.description');
  console.log(description[0]);
  //select save button
  const saveBtns = $('.saveBtn');

  saveBtns.each(function() {
  //save button evetn click 
  $(this).on("click", () => {
    //target is the number associated with the description 
    const target = $(this).data('target');
    //this combines the class description with the number (target) 
    const description = $('.description[data-target="' + target + '"]');
    console.log(description);
    //value is what is written in text box
    const value = description.val();
    console.log(value);
    value !== '' ? localStorage.setItem(target, value) : console.log('empty');
  });
});
/*get description from local storage 
description x. text = localstorage get item that matches x.
find corresponding class based on local storage name
write text to text area. */

// console.log(localStorage.getItem('description1'));



  // const saveBtns = $('.saveBtn');
  // saveBtns.each(function() {
  //   $(this).on("click", () => {
  //     const value = description[0].value;
  //     value !== '' ? localStorage.setItem("Description", value) : console.log('empty');
  //   });
  // });
// if(description[0].value !==  ''){
    //   localStorage.setItem("Description", description.val());
    // } else {
    //   console.log('empty');
    // }
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