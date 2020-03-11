'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setBackground = function (element, data) {
    element.style.backgroundSize = 'cover';
    element.style.backgroundImage = 'url(' + data + ')';
  };

  var uploadPhoto = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (preview.tagName === 'IMG') {
          preview.src = reader.result;
        } else {
          setBackground(preview, reader.result);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  window.images = {
    uploadPhoto: uploadPhoto
  };

})();
