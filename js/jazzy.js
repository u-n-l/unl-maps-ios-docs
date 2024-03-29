window.jazzy = {'docset': false}
if (typeof window.dash != 'undefined') {
  document.documentElement.className += ' dash'
  window.jazzy.docset = true
}
if (navigator.userAgent.match(/xcode/i)) {
  document.documentElement.className += ' xcode'
  window.jazzy.docset = true
}

// On doc load, toggle the URL hash discussion if present
$(document).ready(function() {
  if (!window.jazzy.docset) {
    var linkToHash = $('a[href="' + window.location.hash +'"]');
    linkToHash.trigger("click");
  }
});

// On token click, toggle its discussion and animate token.marginLeft
$(".token").click(function(event) {
  if (window.jazzy.docset) {
    return;
  }
  var link = $(this);
  var linkIcon = link.find('.token-icon');
  var animationDuration = 300;
  var tokenOffset = "0px";
  var original = link.css('marginLeft') == tokenOffset;
  linkIcon.toggleClass('token-icon-minus');
  link.animate({'margin-left':original ? "0px" : tokenOffset}, animationDuration);
  $content = link.parent().parent().next();
  $content.slideToggle(animationDuration);

  // Keeps the document from jumping to the hash.
  var href = $(this).attr('href');
  if (history.pushState) {
    history.pushState({}, '', href);
  } else {
    location.hash = href;
  }
  event.preventDefault();
});


