(function() {
  var boxShadowMe, canvas, ctx, generateBoxShadow, imageLoader, loadImageToCanvas, stars, startStars, stopStars, youBoxShadowed;

  imageLoader = document.getElementById('image-loader');

  boxShadowMe = document.getElementById('box-shadow-me');

  canvas = document.getElementById('canvas');

  stars = document.querySelectorAll('.star');

  youBoxShadowed = document.getElementById('you-box-shadowed');

  ctx = canvas.getContext('2d');

  loadImageToCanvas = function(loadEvent) {
    var reader;
    reader = new FileReader();
    reader.onload = function(readerEvent) {
      var img;
      img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        return ctx.drawImage(img, 0, 0);
      };
      return img.src = readerEvent.target.result;
    };
    return reader.readAsDataURL(loadEvent.target.files[0]);
  };

  startStars = function() {
    var i, len, results, star;
    results = [];
    for (i = 0, len = stars.length; i < len; i++) {
      star = stars[i];
      results.push(star.style['display'] = 'block');
    }
    return results;
  };

  stopStars = function() {
    var i, len, results, star;
    results = [];
    for (i = 0, len = stars.length; i < len; i++) {
      star = stars[i];
      results.push(star.style['display'] = 'none');
    }
    return results;
  };

  generateBoxShadow = function() {
    var boxShadowStr, cd, color, i, idx, imgData, len, pos;
    startStars();
    boxShadowStr = '';
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    cd = imgData.data;
    pos = {
      x: 0,
      y: 0
    };
    for (idx = i = 0, len = cd.length; i < len; idx = i += 4) {
      color = cd[idx];
      if (cd[idx + 3] > 0) {
        boxShadowStr += pos.x + "px " + pos.y + "px rgb(" + cd[idx] + ", " + cd[idx + 1] + ", " + cd[idx + 2] + "), ";
      }
      pos.x += 1;
      if ((idx / 4) % canvas.width === 0) {
        pos.y += 1;
        pos.x = 0;
      }
    }
    return setTimeout(function() {
      youBoxShadowed.style['boxShadow'] = boxShadowStr.substring(0, boxShadowStr.length - 2);
      return stopStars();
    }, 3000);
  };

  imageLoader.addEventListener('change', loadImageToCanvas, false);

  boxShadowMe.addEventListener('click', generateBoxShadow, false);

}).call(this);
