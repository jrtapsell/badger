$(function() {
  var left = $("#left");
  var right = $("#right");
  var color = $("#color");
  var link = $("#link");
  var url_box = $("#url");
  var markdown_box = $("#markdown");
  var preview_box = $("#preview");

  function update_ui(left_text, right_text, color_text, link_text) {
    var image_url = "https://img.shields.io/badge/" + left_text + "-" + right_text + "-" + color_text + ".svg";
    url_box.text(image_url);
    markdown_box.text("[!\n  [" + left_text + "](" + image_url + ")\n](" + link_text + ")");
    preview_box.attr("src", image_url);
  }

  function update() {
    var left_text = left.val();
    var right_text = right.val();
    var color_text = color.val();
    var link_text = link.val();

    update_ui(left_text, right_text, color_text, link_text);
  }
  $("form :input").change(update);
  update();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
      reg.onupdatefound = function() {
        var installingWorker = reg.installing;

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                console.log('New or updated content is available.');
              } else {
                console.log('Content is now available offline!');
              }
              break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  });
}