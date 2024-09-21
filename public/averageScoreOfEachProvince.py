import csv
import json
from collections import defaultdict

province_codes = {
    '01': "Ha Noi", '02': "Ho Chi Minh", '03': "Hai Phong", '04': "Da Nang",
    '05': "Ha Giang", '06': "Cao Bang", '07': "Lai Chau", '08': "Lao Cai",
    '09': "Tuyen Quang", '10': "Lang Son", '11': "Bac Kan", '12': "Thai Nguyen",
    '13': "Yen Bai", '14': "Son La", '15': "Phu Tho", '16': "Vinh Phuc",
    '17': "Quang Ninh", '18': "Bac Giang", '19': "Bac Ninh", '21': "Hai Duong",
    '22': "Hung Yen", '23': "Hoa Binh", '24': "Ha Nam", '25': "Nam Dinh",
    '26': "Thai Binh", '27': "Ninh Binh", '28': "Thanh Hoa", '29': "Nghe An",
    '30': "Ha Tinh", '31': "Quang Binh", '32': "Quang Tri", '33': "Thua Thien Hue",
    '34': "Quang Nam", '35': "Quang Ngai", '36': "Kon Tum", '37': "Binh Dinh",
    '38': "Gia Lai", '39': "Phu Yen", '40': "Dak Lak", '41': "Khanh Hoa",
    '42': "Lam Dong", '43': "Binh Phuoc", '44': "Binh Duong", '45': "Ninh Thuan",
    '46': "Tay Ninh", '47': "Binh Thuan", '48': "Dong Nai", '49': "Long An",
    '50': "Dong Thap", '51': "An Giang", '52': "Ba Ria - Vung Tau", '53': "Tien Giang",
    '54': "Kien Giang", '55': "Can Tho", '56': "Ben Tre", '57': "Vinh Long",
    '58': "Tra Vinh", '59': "Soc Trang", '60': "Bac Lieu", '61': "Ca Mau",
    '62': "Dien Bien", '63': "Dak Nong", '64': "Hau Giang"
}

def calculate_average(scores):
    valid_scores = [float(score) for score in scores if score != '' and score != '0']
    if valid_scores:
        return sum(valid_scores) / len(valid_scores)
    return 0

province_scores = defaultdict(list)

def create_province_code(x):
    if len(str(x)) == 7:
        return '0' + str(x)[0]
    return str(x)[:2]

with open('./public/CollegeEntranceExamData.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        province_code = create_province_code(row['Number'])
        
        subjects = ['Math', 'Foreign Language', 'Literature', 'Physic', 
                    'Chemistry', 'Biology', 'History', 'Geography', 'Civic Education']
        scores = [row[subject] for subject in subjects]
        
        average_score = calculate_average(scores)
        
        if province_code in province_codes:
            province_scores[province_codes[province_code]].append(average_score)

province_average_scores = {province: sum(scores) / len(scores) if scores else 0 
                           for province, scores in province_scores.items()}

with open('./public/province_average_scores.json', 'w') as jsonfile:
    json.dump(province_average_scores, jsonfile, indent=4)

print("Average scores have been saved to 'province_average_scores.json'.")
