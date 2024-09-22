# Vietnam College Entrance Exam Data Visualization

## Overview
This project visualizes data from Vietnam's College Entrance Exam, containing over 1,000,000 data of students. It includes the following visualizations:
- **Heatmap** of average scores across different regions.
- **Pie chart** representing the proportion of Natural Science and Social Science students.
- **Math score summary** showing distribution trends.
- **Literature score summary** for insights into language proficiency.
- **Bar charts** for each subject's score distribution.

The project is built using:
- **Recharts** - To draw bar charts and pie charts.
- **Shadcnui** - For basic UI Components.
- **D3.js** - To draw maps using GeoJSON and to build interactions.
- **Next.js** 
- **React.js**


## Demo

https://github.com/user-attachments/assets/c33fa8e6-d380-4236-bbd2-45787c8375ae

## How to Install

1. **Clone the repository:**
   ```bash
   git clone https://github.com/minhanhnguy/College-Entrance-Exam-Data-Visualization.git
   cd College-Entrance-Exam-Data-Visualization
   ```
2. Install dependencies: Ensure you have Node.js installed, then run:
   ```bash
   npm install
   npm run dev
   ```

## Errors and Drawbacks
- **Handling large datasets in Node.js for visualizations poses performance challenges.**
- **Processing over 1,000,000 rows can lead to slow rendering times and occasional timeouts.**
- **While optimizations have been implemented, there are still some errors due to the extensive data handling required for drawing charts.**

[Data Source](https://www.kaggle.com/datasets/quangdang1/college-entrance-exam-scores-in-vietnam-2024)
