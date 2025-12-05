import csv
import json

csv_file_path = "nsf_terminations.csv"
json_file_path = "nsf_terminations.json"

num_fields = [
    "nsf_total_budget",
    "nsf_obligated",
    "usasp_total_obligated",
    "usasp_total_obligated_corrected",
    "usasp_outlaid",
    "estimated_budget",
    "estimated_outlays",
    "estimated_remaining",
    "post_termination_deobligation"
]

bool_fields = ["terminated", "suspended", "reinstated"]

data = []

with open(csv_file_path, mode='r', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        for field in num_fields:
            try:
                row[field] = float(row[field])
            except ValueError:
                row[field] = None
        for field in bool_fields:
            row[field] = True if row[field] == "TRUE" else False
        data.append(row)

with open(json_file_path, mode='w', newline='', encoding='utf-8') as jsonfile:
    json.dump(data, jsonfile, indent=4)