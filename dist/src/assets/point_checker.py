from PIL import Image, ImageDraw

image = Image.open("cat01.png")
WIDTH, HEIGHT = image.size

red = []
orange = []
yellow = []
green = []

for x in range(WIDTH):
	for y in range(HEIGHT):
		c = image.getpixel((x,y))
		if c == (255, 0, 0, 255):
			red.append((x,y))
		elif c == (255, 127, 0, 255):
			orange.append((x,y))
		elif c == (255, 255, 0, 255):
			yellow.append((x,y))
		elif c == (0, 255, 0, 255):
			green.append((x,y))

print('"perfect": [', end='')
print(','.join([f'[{(x/WIDTH)-0.5:.3f},{(-1+y/HEIGHT):.3f}]' for x,y in red]), end='')
print('],')

print('"good": [', end='')
print(','.join([f'[{(x/WIDTH)-0.5:.3f},{(-1+y/HEIGHT):.3f}]' for x,y in orange]), end='')
print('],')

print('"ok": [', end='')
print(','.join([f'[{(x/WIDTH)-0.5:.3f},{(-1+y/HEIGHT):.3f}]' for x,y in yellow]), end='')
print('],')

print('"bad": [', end='')
print(','.join([f'[{(x/WIDTH)-0.5:.3f},{(-1+y/HEIGHT):.3f}]' for x,y in green]), end='')
print('],')