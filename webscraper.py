from bs4 import BeautifulSoup
import requests

url = 'https://everydaypower.com/mental-health-quotes/'
response = requests.get(url ,timeout = 5)
content = BeautifulSoup(response.content, "html.parser")
quoteArr = []

f = open('output4.txt','w')
for quote in content.findAll('p'):
    data = str(quote.text)
    # f.write(data)
    # f.write("\n")
    if(data and data[0] >= '1' and data[0] <= '9'):
        try:
            f.write(data[data.index('“') : data.index('”')])
            f.write(data)
            f.write("\n")
        except ValueError:
            continue




f.close()
    

