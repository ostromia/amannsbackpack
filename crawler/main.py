import requests
from bs4 import BeautifulSoup


def get_cosmetic_urls():
    """save offical wiki URLs of all cosmetics in TF2 in cosmetics_urls.txt"""

    with open("list_of_x_cosmetics.txt") as file:
        URLS = [i.strip("\n") for i in file.readlines()]

    cosmetics = []

    for url in URLS:
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

        cosmetics.extend(subdirectories)

    with open("cosmetics_urls.txt", "w") as file:
        for i in cosmetics:
            file.write(i + "\n")

get_cosmetic_urls()
