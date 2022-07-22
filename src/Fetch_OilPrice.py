from zeep import Client
from datetime import datetime
from lxml import etree
import json

def GetOilPrice():
    products = {}
    time_now = datetime.now().strftime("%d:%m:%Y").split(":")
    client = Client('https://orapiweb.pttor.com/oilservice/OilPrice.asmx?wsdl')
    oil_price_raw = client.service.GetOilPrice("en", time_now[0], time_now[1], time_now[2])
    # print(oil_price_raw)
    root = etree.fromstring(oil_price_raw)
    for r in root.xpath("FUEL"):
        products[r.xpath("PRODUCT/text()")[0]] = r.xpath("PRICE/text()")[0]
    with open("./src/oil.json", "w") as oil:
        json.dump(products, oil, indent=4)
    oil.close()
GetOilPrice()
