// grab everything we need
const btn = document.querySelector('.mobile-menu-button');
const sidebar = document.querySelector('.sidebar');
let isSidebarOpen = false;

// add our event listener for the click
btn.addEventListener('click', () => {
  sidebar.classList.toggle('-translate-x-full');
  closeSideNav();
});

// close sidebar if user clicks outside of the sidebar
function closeSideNav() {
  const isButtonClick = btn === event.target && btn.contains(event.target);
  const isOutsideClick =
    sidebar !== event.target && !sidebar.contains(event.target);

  // bail out if sidebar isn't open
  if (sidebar.classList.contains('-translate-x-full')) {
    console.log('contains and return');
    return;
  }

  // if the user clicks the button, then toggle the class
  //   if (isButtonClick) {
  //     sidebar.classList.add('-translate-x-full');
  //     console.log('does not contain');
  //     return;
  //   }

  // check to see if user clicks outside the sidebar
  if (!isButtonClick && isOutsideClick) {
    console.log('outside click');
    sidebar.classList.add('-translate-x-full');
    return;
  }
}

// document.addEventListener('DOMContentLoaded', function () {
//   var elems = document.querySelectorAll('.sidenav');
//   M.Sidenav.init(elems, {});
// });
