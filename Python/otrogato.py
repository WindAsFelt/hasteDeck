import qrcode

url =input("Enter la wea:").strip()
file_have="D:\\MyStffffff\\Proyectos\\ionic\\IGottaDoItFast\\Python\\losQR\\ELqr.png"

qr= qrcode.QRCode()
qr.add_data(url)
img = qr.make_image()
img.save(file_have)

print("qr code listo pana ")