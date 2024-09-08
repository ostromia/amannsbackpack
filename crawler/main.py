import json

import requests
from bs4 import BeautifulSoup


def get_cosmetic_urls():
    """
    save offical wiki URLs of all cosmetics in TF2 in cosmetics.json with data template
    e.g., for the Batter's Helmet the following object would be saved in cosmetics.json

    {
        "name": "",
        "class": "",
        "update": "",
        "restriction": "",
        "url": "https://wiki.teamfortress.com/wiki/Batter%27s_Helmet",
        "src": "",
        "date": ""
    }
    """

    with open("list_of_x_cosmetics.txt") as file:
        list_of_x_cosmetics = [i.strip("\n") for i in file.readlines()]

    urls = []

    for url in list_of_x_cosmetics:
        subdirectories = []
        html = requests.get(url)
        soup = BeautifulSoup(html.text, 'html.parser')

        navbox_cosmetic_table = soup.find("table", class_="navbox cosmetic-table")
        navbox_list = navbox_cosmetic_table.tbody.tr.td.table.tbody.contents[-1].td

        for table in navbox_list.findChildren("table", recursive=False):
            tr = table.tbody.tr.td.div.table.tbody.contents[-1].contents

            for td in tr:
                if td.a != None:
                    subdirectories.append(
                        "https://wiki.teamfortress.com" + td.a.get("href")
                    )

        urls.extend(subdirectories)

    cosmetics = []

    for i in urls:
        data = {
            "name": "",
            "class": "",
            "update": "",
            "restriction": "",
            "url": i,
            "src": "",
            "date": ""
        }

        cosmetics.append(data)

    with open("cosmetics.json", "w") as file:
        json.dump(cosmetics, file, indent=4)

if __name__ == "__main__":
    get_cosmetic_urls()
