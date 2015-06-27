imageLoader = document.getElementById 'image-loader'
boxShadowMe = document.getElementById 'box-shadow-me'
canvas = document.getElementById 'canvas'
stars = document.querySelectorAll '.star'
youBoxShadowed = document.getElementById 'you-box-shadowed'
ctx = canvas.getContext '2d'

loadImageToCanvas = (loadEvent) ->
  reader = new FileReader()
  reader.onload = (readerEvent) ->
    img = new Image()
    img.onload = ->
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage img, 0, 0

    img.src = readerEvent.target.result
  reader.readAsDataURL loadEvent.target.files[0]

startStars = ->
  for star in stars
    star.style['display'] = 'block'

stopStars = ->
  for star in stars
    star.style['display'] = 'none'

generateBoxShadow = ->
  startStars()
  boxShadowStr = ''
  imgData = ctx.getImageData 0, 0, canvas.width, canvas.height
  cd = imgData.data
  pos = {x: 0, y: 0}
  for color, idx in cd by 4
    boxShadowStr += "#{pos.x}px #{pos.y}px rgb(#{cd[idx]}, #{cd[idx + 1]}, #{cd[idx + 2]}), " if cd[idx + 3] > 0
    pos.x += 1
    if (idx/4) % canvas.width == 0
      pos.y += 1
      pos.x = 0

  setTimeout ->
    youBoxShadowed.style['boxShadow'] = boxShadowStr.substring(0, boxShadowStr.length - 2)
    stopStars()
  , 3000

imageLoader.addEventListener 'change', loadImageToCanvas, false
boxShadowMe.addEventListener 'click', generateBoxShadow, false
