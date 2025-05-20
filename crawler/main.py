import json
import os
import time
from datetime import datetime

import requests
from bs4 import BeautifulSoup


def get_cosmetics_urls():
    """
    save all cosmetics in TF2 as objects inside cosmetics.json
    e.g., for the Batter's Helmet the following object would be saved

    {
        "name": "",
        "class": "",
        "update": "",
        "restriction": "",
        "url": "https://wiki.teamfortress.com/wiki/Batter%27s_Helmet",
        "src": "",
        "quality": "",
        "date": ""
    }
    """

    with open("cosmetics.json", "r") as file:
        cosmetics = json.load(file)
        cosmeticsExistingURLs = [i["url"] for i in cosmetics]

    with open("list_of_x_cosmetics.txt") as file:
        list_of_x_cosmetics = [i.strip("\n") for i in file.readlines()]

    for url in list_of_x_cosmetics:
        html = requests.get(url)
        soup = BeautifulSoup(html.text, 'html.parser')

        navbox_cosmetic_table = soup.find("table", class_="navbox cosmetic-table")
        navbox_list = navbox_cosmetic_table.tbody.tr.td.table.tbody.contents[-1].td

        for table in navbox_list.findChildren("table", recursive=False):
            tr = table.tbody.tr.td.div.table.tbody.contents[-1].contents

            for td in tr:
                if td.a != None:
                    # get wiki url of cosmetic
                    url = "https://wiki.teamfortress.com" + td.a.get("href")
                    cosmeticsExistingURLs = [i["url"] for i in cosmetics]

                    # add url with data template to cosmetics if not already
                    if url not in cosmeticsExistingURLs:
                        print(url)

                        data = {
                            "name": "",
                            "class": "",
                            "update": "",
                            "restriction": "",
                            "url": url,
                            "src": "",
                            "quality": "",
                            "date": ""
                        }

                        cosmetics.append(data)

    with open("cosmetics.json", "w") as file:
        json.dump(cosmetics, file, indent=4)


def get_cosmetics_data():
    """
    update data for cosmetic objects in cosmetics.json
    e.g., for the Batter's Helmet the following object would be saved

    {
        "name": "Batter's Helmet",
        "class": [
            "Scout"
        ],
        "update": [
            "May 21, 2009 Patch",
            "Sniper vs. Spy Update"
        ],
        "restriction": "",
        "url": "https://wiki.teamfortress.com/wiki/Batter%27s_Helmet",
        "src": "https://wiki.teamfortress.com//w/images/thumb/e/e0/Backpack_Batter%27s_Helmet.png/90px-Backpack_Batter%27s_Helmet.png",
        "quality": [
            "qua_unique"
        ],
        "date": ""
    },
    """

    with open("cosmetics.json", "r") as file:
        cosmetics = json.load(file)

    for i in cosmetics:
        if i["name"] == "":
            print(i["url"])

            html = requests.get(i["url"])
            soup = BeautifulSoup(html.text, 'html.parser')

            # get name
            i["name"] = soup.find(id="firstHeading").text


            if i["url"] == "https://wiki.teamfortress.com/wiki/Something_Special_For_Someone_Special":
                i["class"] = ["All classes"]
            else:
                # get class
                anchors = soup.find(class_="infobox-label", string="Worn by:").find_next_sibling().find_all("a")
                i["class"] = [a.text.strip() for a in anchors]

            # get update
            anchors = soup.find(class_="infobox-label", string="Released:").find_next_sibling().find_all("a")
            i["update"] = [a.text.strip() for a in anchors]

            # get restriction
            span = soup.find(class_="att_negative", string="Holiday Restriction: Halloween / Full Moon")
            if span:
                i["restriction"] = span.text
            else:
                i["restriction"] = ""

            # get src
            subdirectory = soup.find(class_="tfwiki-backpack-item").find(class_="image").find("img").get("src")
            i["src"] = r"https://wiki.teamfortress.com/" + subdirectory

            # get quality
            i["quality"] = soup.find(class_="tfwiki-backpack-item").find_all(recursive=False)[1].find("p").find_all(recursive=False)[0].get("class")

            with open("cosmetics.json", "w") as file:
                json.dump(cosmetics, file, indent=4)

            time.sleep(1)

def update_cosmetics_data():
    with open("cosmetics.json", "r") as file:
        cosmetics = json.load(file)

    with open("grades.json", "r") as file:
        grades = json.load(file)

    for i in cosmetics:
        parts = i["update"][0].split(" ")
        i["date"] = f"{parts[1][:-1]} {parts[0]} {parts[2]}"

        if "quality" in i:
            if isinstance(i["quality"], list):
                quality = grades[i["quality"][0]]["name"]
                qualityColor = grades[i["quality"][0]]["color"]

                i["quality"] = quality
                i["qualityColor"] = qualityColor
            else:
                for j in grades.values():
                    if j.get("name") == i["quality"]:
                        i["qualityColor"] = j.get("color")

            i["grade"] = i.pop("quality")
            i["gradeColor"] = i.pop("qualityColor")

        if i["class"] == ["All classes"]:
            i["class"] = ["Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy"]

    sorted_cosmetics = sorted(
        cosmetics,
        key=lambda x: datetime.strptime(x["date"], "%d %B %Y"),
        reverse = True
    )

    with open("cosmetics.json", "w") as file:
        json.dump(sorted_cosmetics, file, indent=4)

def download_cosmetics_images():
    with open("cosmetics.json", "r") as file:
        cosmetics = json.load(file)

    for i in cosmetics:
        path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'cosmetics', i['name'] + '.png')

        if not os.path.isfile(path):
            print(path)

            src = i["src"]

            response = requests.get(src)

            with open(path, 'wb') as file:
                file.write(response.content)


if __name__ == "__main__":
    # get_cosmetics_urls()
    # get_cosmetics_data()
    update_cosmetics_data()
    # download_cosmetics_images()
