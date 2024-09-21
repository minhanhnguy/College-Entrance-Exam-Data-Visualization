import csv
import json

# Initialize counts
math_counts = {"greater_than_9": 0, "greater_than_8": 0, "greater_than_7": 0, "greater_than_6": 0, 
               "greater_than_5": 0, "greater_than_4": 0, "greater_than_3": 0, "greater_than_2": 0, "others": 0}

literature_counts = {"greater_than_9": 0, "greater_than_8": 0, "greater_than_7": 0, "greater_than_6": 0, 
                     "greater_than_5": 0, "greater_than_4": 0, "greater_than_3": 0, "greater_than_2": 0, "others": 0}

# Function to classify and count scores
def classify_score(score, counts):
    if score > 9:
        counts["greater_than_9"] += 1
    elif score > 8:
        counts["greater_than_8"] += 1
    elif score > 7:
        counts["greater_than_7"] += 1
    elif score > 6:
        counts["greater_than_6"] += 1
    elif score > 5:
        counts["greater_than_5"] += 1
    elif score > 4:
        counts["greater_than_4"] += 1
    elif score > 3:
        counts["greater_than_3"] += 1
    elif score > 2:
        counts["greater_than_2"] += 1
    else:
        counts["others"] += 1

# Read and process CSV file
with open('./public/CollegeEntranceExamData.csv', mode='r') as file:
    csv_reader = csv.DictReader(file)
    
    for row in csv_reader:
        try:
            math_score = float(row['Math'])
            classify_score(math_score, math_counts)
        except ValueError:
            # Handle missing or invalid math scores
            pass
        
        try:
            literature_score = float(row['Literature'])
            classify_score(literature_score, literature_counts)
        except ValueError:
            # Handle missing or invalid literature scores
            pass

# Prepare result in JSON format
result = {
    "Math": math_counts,
    "Literature": literature_counts
}

# Write result to a JSON file
with open('score_summary.json', 'w') as json_file:
    json.dump(result, json_file, indent=4)

print("Result saved to score_summary.json")
