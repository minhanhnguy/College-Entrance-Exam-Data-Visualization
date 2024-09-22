import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

// Define the type of each province data
interface ProvinceData {
  average_score: number;
  student_count: number;
}

// Define the type for the entire province object
const provinceData: Record<string, ProvinceData> = {
  "Ha Noi": {
    average_score: 6.906787216355944,
    student_count: 107867,
  },
  "Ho Chi Minh": {
    average_score: 6.754162238611117,
    student_count: 87322,
  },
  "Hai Phong": {
    average_score: 7.101282347564957,
    student_count: 25530,
  },
  "Da Nang": {
    average_score: 6.457449306694499,
    student_count: 13414,
  },
  "Ha Giang": {
    average_score: 5.685848265895954,
    student_count: 6920,
  },
  "Cao Bang": {
    average_score: 6.050894781450539,
    student_count: 5506,
  },
  "Lai Chau": {
    average_score: 6.194847182425979,
    student_count: 4188,
  },
  "Lao Cai": {
    average_score: 6.5930339476623585,
    student_count: 8356,
  },
  "Tuyen Quang": {
    average_score: 6.7231226810626294,
    student_count: 8984,
  },
  "Lang Son": {
    average_score: 6.339799785264195,
    student_count: 9469,
  },
  "Bac Kan": {
    average_score: 6.337916666666667,
    student_count: 3174,
  },
  "Thai Nguyen": {
    average_score: 6.455669488821077,
    student_count: 16713,
  },
  "Yen Bai": {
    average_score: 6.335111852960362,
    student_count: 8687,
  },
  "Son La": {
    average_score: 6.258269230769231,
    student_count: 12584,
  },
  "Phu Tho": {
    average_score: 7.062996988564684,
    student_count: 16382,
  },
  "Vinh Phuc": {
    average_score: 7.378815783800099,
    student_count: 15461,
  },
  "Quang Ninh": {
    average_score: 6.612508404303004,
    student_count: 17848,
  },
  "Bac Giang": {
    average_score: 6.8266184402053165,
    student_count: 21755,
  },
  "Bac Ninh": {
    average_score: 7.176205149313047,
    student_count: 17614,
  },
  "Hai Duong": {
    average_score: 6.907223779565751,
    student_count: 23366,
  },
  "Hung Yen": {
    average_score: 6.455088084593871,
    student_count: 16329,
  },
  "Hoa Binh": {
    average_score: 6.4136153245783705,
    student_count: 9823,
  },
  "Ha Nam": {
    average_score: 7.008497664854315,
    student_count: 9564,
  },
  "Nam Dinh": {
    average_score: 7.270730392156862,
    student_count: 21760,
  },
  "Thai Binh": {
    average_score: 6.907406997342782,
    student_count: 22580,
  },
  "Ninh Binh": {
    average_score: 7.305750844043464,
    student_count: 11749,
  },
  "Thanh Hoa": {
    average_score: 6.7796697982629155,
    student_count: 38532,
  },
  "Nghe An": {
    average_score: 6.927437061540836,
    student_count: 36729,
  },
  "Ha Tinh": {
    average_score: 7.045017740923704,
    student_count: 17004,
  },
  "Quang Binh": {
    average_score: 6.5706761104656355,
    student_count: 11189,
  },
  "Quang Tri": {
    average_score: 6.263064262072816,
    student_count: 8359,
  },
  "Thua Thien Hue": {
    average_score: 6.703347685402641,
    student_count: 12774,
  },
  "Quang Nam": {
    average_score: 6.281523295936464,
    student_count: 17292,
  },
  "Quang Ngai": {
    average_score: 6.396413311039896,
    student_count: 14354,
  },
  "Kon Tum": {
    average_score: 6.41997105332804,
    student_count: 5038,
  },
  "Binh Dinh": {
    average_score: 6.623970461517251,
    student_count: 19342,
  },
  "Gia Lai": {
    average_score: 6.299784389184922,
    student_count: 15201,
  },
  "Phu Yen": {
    average_score: 6.348598270884328,
    student_count: 10622,
  },
  "Dak Lak": {
    average_score: 6.105856777697899,
    student_count: 20865,
  },
  "Khanh Hoa": {
    average_score: 6.465967936243166,
    student_count: 14388,
  },
  "Lam Dong": {
    average_score: 6.695765948911441,
    student_count: 15372,
  },
  "Binh Phuoc": {
    average_score: 6.601037317173862,
    student_count: 11304,
  },
  "Binh Duong": {
    average_score: 7.208864700220924,
    student_count: 15239,
  },
  "Ninh Thuan": {
    average_score: 6.189612489397795,
    student_count: 6288,
  },
  "Tay Ninh": {
    average_score: 6.425814339754594,
    student_count: 10486,
  },
  "Binh Thuan": {
    average_score: 6.564339386786466,
    student_count: 13133,
  },
  "Dong Nai": {
    average_score: 6.443799802761341,
    student_count: 33800,
  },
  "Long An": {
    average_score: 6.587718703104855,
    student_count: 15771,
  },
  "Dong Thap": {
    average_score: 6.646943280288306,
    student_count: 16464,
  },
  "An Giang": {
    average_score: 6.967739700097114,
    student_count: 20251,
  },
  "Ba Ria - Vung Tau": {
    average_score: 6.821056588840523,
    student_count: 12635,
  },
  "Tien Giang": {
    average_score: 6.833800262192999,
    student_count: 16273,
  },
  "Kien Giang": {
    average_score: 6.583766323024055,
    student_count: 15035,
  },
  "Can Tho": {
    average_score: 6.662947200373803,
    student_count: 12841,
  },
  "Ben Tre": {
    average_score: 6.5584007135995614,
    student_count: 12145,
  },
  "Vinh Long": {
    average_score: 6.738855569809707,
    student_count: 10913,
  },
  "Tra Vinh": {
    average_score: 6.549921278133389,
    student_count: 9686,
  },
  "Soc Trang": {
    average_score: 6.462695295370544,
    student_count: 10642,
  },
  "Bac Lieu": {
    average_score: 6.8039434523809526,
    student_count: 6384,
  },
  "Ca Mau": {
    average_score: 6.329390700423604,
    student_count: 10151,
  },
  "Dien Bien": {
    average_score: 6.17614271526238,
    student_count: 7216,
  },
  "Dak Nong": {
    average_score: 6.3469329672245465,
    student_count: 1912,
  },
};

// Define the ProvinceFeature interface that extends GeoJSON
interface ProvinceFeature extends GeoJSON.Feature<GeoJSON.GeometryObject> {
  properties: {
    province_name?: string;
  } | null;
}

const GeoPathMeasures: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [averageScores, setAverageScores] = useState(provinceData);

  useEffect(() => {
    const projection = d3
      .geoMercator()
      .scale(3400)
      .translate([5.6, 7.5])
      .center([101, 23.4]);

    const geoGenerator = d3.geoPath().projection(projection);

    const colorScale = d3
      .scaleLinear<string>()
      .domain([5.5, 7.6])
      .range(["#fad025", "#db2e1d"])
      .interpolate(d3.interpolateRgb);

    // Function to get color based on average score
    function getColor(provinceName: string | undefined) {
      if (!provinceName || !averageScores[provinceName]) return "#fad025";

      const score = averageScores[provinceName]?.average_score || 0;
      return colorScale(score);
    }

    function handleMouseover(d: ProvinceFeature) {
      if (!d.properties || !d.properties.province_name) {
        console.error("No properties or province_name found for this feature");
        return;
      }

      const provinceName = d.properties.province_name;
      const averageScore =
        averageScores[provinceName]?.average_score.toFixed(4) || "No data";
      const numberOfStudents =
        averageScores[provinceName]?.student_count || "No data";

      // Update info with both the province name and the average score
      d3.select("#info").html(`<h1 class="info-heading">${provinceName}</h1>
                                <p class="info-content">Average Score: ${averageScore}</p>
                                <p class="info-content">Number of Students: ${numberOfStudents}</p>
        `);

      const bounds = geoGenerator.bounds(d);
      const centroid = geoGenerator.centroid(d);

      d3.select("#bounding-box rect")
        .attr("x", bounds[0][0])
        .attr("y", bounds[0][1])
        .attr("width", bounds[1][0] - bounds[0][0])
        .attr("height", bounds[1][1] - bounds[0][1]);

      d3.select("#centroid")
        .style("display", "inline")
        .attr("transform", `translate(${centroid})`);
    }

    function update(
      geojson: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>
    ) {
      const u = d3
        .select(svgRef.current)
        .select("g.map")
        .selectAll("path")
        .data(geojson.features);

      u.enter()
        .append("path")
        .attr("d", geoGenerator)
        .attr("fill", (d: ProvinceFeature) =>
          getColor(d.properties?.province_name)
        ) // Apply color based on score
        .on("mouseover", function (event, d: ProvinceFeature) {
          handleMouseover(d);
        });
    }

    // Fetch the geojson data
    d3.json("VietnamProvinceTerritory.geojson").then((json) => {
      update(json as GeoJSON.FeatureCollection<GeoJSON.GeometryObject>);
    });
  }, [averageScores]);

  return (
    <div className="">
      <div id="content" className="text-gray-800 flex justify-center relative">
        <div
          id="info"
          className="absolute left-2/3 top-1/3 transform -translate-y-1/2 bg-white p-2 shadow-lg z-10 rounded-xl"
        >
          Hover over a province
        </div>
        <svg ref={svgRef} height="1050" className="w-screen">
          <g className="map"></g>
          <g id="bounding-box" className="bounding-box">
            <rect className="stroke-gray-800" fill="none"></rect>
          </g>
          <g id="centroid" className="centroid" style={{ display: "none" }}>
            <circle r="4" fill="red"></circle>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default GeoPathMeasures;
