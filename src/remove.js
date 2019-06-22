$(document).ready(function () {
  $('#button').click(function (event) {
    event.preventDefault();
    let hiddenElements = $('.hidden');
    const numberOfElementsToAppear = Math.min(8, hiddenElements.length);
    for (let i = 0; i < numberOfElementsToAppear; i++) {
      hiddenElements[i].removeClass('hidden');
      hiddenElements[i].css('display', 'block');
    }
  });
});
