"use client";
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const provinceAverageScores = {
  "Ha Noi": 6.906787216355944,
  "Ho Chi Minh": 6.754162238611117,
  "Hai Phong": 7.101282347564957,
  "Da Nang": 6.457449306694499,
  "Ha Giang": 5.685848265895954,
  "Cao Bang": 6.050894781450539,
  "Lai Chau": 6.194847182425979,
  "Lao Cai": 6.5930339476623585,
  "Tuyen Quang": 6.7231226810626294,
  "Lang Son": 6.339799785264195,
  "Bac Kan": 6.337916666666667,
  "Thai Nguyen": 6.455669488821077,
  "Yen Bai": 6.335111852960362,
  "Son La": 6.258269230769231,
  "Phu Tho": 7.062996988564684,
  "Vinh Phuc": 7.378815783800099,
  "Quang Ninh": 6.612508404303004,
  "Bac Giang": 6.8266184402053165,
  "Bac Ninh": 7.176205149313047,
  "Hai Duong": 6.907223779565751,
  "Hung Yen": 6.455088084593871,
  "Hoa Binh": 6.4136153245783705,
  "Ha Nam": 7.008497664854315,
  "Nam Dinh": 7.270730392156862,
  "Thai Binh": 6.907406997342782,
  "Ninh Binh": 7.305750844043464,
  "Thanh Hoa": 6.7796697982629155,
  "Nghe An": 6.927437061540836,
  "Ha Tinh": 7.045017740923704,
  "Quang Binh": 6.5706761104656355,
  "Quang Tri": 6.263064262072816,
  "Thua Thien Hue": 6.703347685402641,
  "Quang Nam": 6.281523295936464,
  "Quang Ngai": 6.396413311039896,
  "Kon Tum": 6.41997105332804,
  "Binh Dinh": 6.623970461517251,
  "Gia Lai": 6.299784389184922,
  "Phu Yen": 6.348598270884328,
  "Dak Lak": 6.105856777697899,
  "Khanh Hoa": 6.465967936243166,
  "Lam Dong": 6.695765948911441,
  "Binh Phuoc": 6.601037317173862,
  "Binh Duong": 7.208864700220924,
  "Ninh Thuan": 6.189612489397795,
  "Tay Ninh": 6.425814339754594,
  "Binh Thuan": 6.564339386786466,
  "Dong Nai": 6.443799802761341,
  "Long An": 6.587718703104855,
  "Dong Thap": 6.646943280288306,
  "An Giang": 6.967739700097114,
  "Ba Ria - Vung Tau": 6.821056588840523,
  "Tien Giang": 6.833800262192999,
  "Kien Giang": 6.583766323024055,
  "Can Tho": 6.662947200373803,
  "Ben Tre": 6.5584007135995614,
  "Vinh Long": 6.738855569809707,
  "Tra Vinh": 6.549921278133389,
  "Soc Trang": 6.462695295370544,
  "Bac Lieu": 6.8039434523809526,
  "Ca Mau": 6.329390700423604,
  "Dien Bien": 6.17614271526238,
  "Dak Nong": 6.3469329672245465,
};

interface ProvinceFeature extends GeoJSON.Feature<GeoJSON.GeometryObject> {
  properties: {
    province_name?: string;
  } | null;
}

const GeoPathMeasures: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [averageScores, setAverageScores] = useState(provinceAverageScores);

  useEffect(() => {
    const projection = d3
      .geoMercator()
      .scale(4000)
      .translate([200, 280])
      .center([104, 19.8]);

    const geoGenerator = d3.geoPath().projection(projection);

    // Create a color scale with more fluctuation (lighter and darker reds based on scores)
    const colorScale = d3
      .scaleLinear<string>()
      .domain([5.5, 7.5]) // Narrowed the domain to capture small fluctuations more effectively
      .range(["#ffe5e5", "#800000"]) // Light red to dark red, with a wider gradient
      .interpolate(d3.interpolateRgb); // Ensure smooth interpolation between the colors

    // Function to get color based on average score
    function getColor(provinceName: string | undefined) {
      if (
        !provinceName ||
        !(averageScores as Record<string, number>)[provinceName]
      )
        return "#cccccc"; // Default gray if no province name

      const score = (averageScores as Record<string, number>)[provinceName];
      return colorScale(score || 0); // Default to 0 if score is not found
    }

    function handleMouseover(d: ProvinceFeature) {
      if (!d.properties || !d.properties.province_name) {
        console.error("No properties or province_name found for this feature");
        return;
      }

      const provinceName = d.properties.province_name;
      const averageScore =
        (averageScores as Record<string, number>)[provinceName] || "No data";

      // Update info with both the province name and the average score
      d3.select("#info").text(
        `${provinceName}: Average Score - ${averageScore}`
      );

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
    <div>
      <div id="content" className="text-gray-800 flex justify-center">
        <div
          id="info"
          className="absolute left-3/4 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-lg z-10 rounded-xl"
        >
          Hover over a province
        </div>
        <svg ref={svgRef} width="1400" height="1250" className="">
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
