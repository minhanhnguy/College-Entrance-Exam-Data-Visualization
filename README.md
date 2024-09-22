# Vietnam College Entrance Exam Data Visualization

## Overview
This project visualizes data from Vietnam's College Entrance Exam, containing over 1,000,000 lines of data. It includes the following visualizations:
- **Heatmap** of average scores across different regions.
- **Pie chart** representing the proportion of Natural Science and Social Science students.
- **Math score summary** showing distribution trends.
- **Literature score summary** for insights into language proficiency.
- **Bar charts** for each subject's score distribution.

The project is built using:
- **Recharts**
- **Shadcnui**
- **Next.js**
- **React.js**
- **D3.js**

## Demo
[Link to a demo video of the web application]

## How to Install

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies: Ensure you have Node.js installed, then run:
   ``bash
   npm install
   npm run dev
   ```

## Errors and Drawbacks
- **Handling large datasets in Node.js for visualizations poses performance challenges.**
- **Processing over 1,000,000 rows can lead to slow rendering times and occasional timeouts.**
- **While optimizations have been implemented, there are still some errors due to the extensive data handling required for drawing charts.**
