///////////////////////
//////Main update function
//////////////////////////////////////


function updateVizEngine(indicatorCode) {
 

     //process code
     selectedPage = $(".selectedPage").attr("id");
  if(selectedPage=="mviTab"){ 
  indicatorCode = "mvi-index-index";
  }else{
      indicatorGlobal=indicatorCode
  }
  if (indicatorCode == "Region") {
    indicatorCode = "hdr137506-compositeIndices";///temp so has something to attach to data
  }
  //choose index or indicator mode
  if (Object.keys(indexCodes).includes(indicatorCode)) {
    vizMode = "index";
    apiCode="indexData-" +indexCodes[indicatorCode]
    indexCode=indicatorCode
  } else {
    vizMode = "indicator";
    codeSplit = indicatorCode.split("-");
    apiCode="indicatorData-"+codeSplit[codeSplit.length - 1] 

  }
    updateVizSliders();
  //package selections
  indiSelections = {};
  indiSelections["viz"] = $(".selectedViz")[0].children[0].innerHTML;
  indiSelections["page"] = $(".selectedPage").attr("id");
  indiSelections["sortby"] = $(".selectedSortby")[0].children[0].innerHTML;
  indiSelections["year"] = "recentValue"; /// temp until year selector is in place
  indiSelections["mviPreset"] = $(".selectedMviPreset")[0].id;
  ///also selectedRegion, selected statType

    ///update all and page elements
    updateVizBlocks(indiSelections);
    updateLinesAndMap(indiSelections);
  ////////
  /////get indicator data,,proceed only once indicator data has been pulled



  d3.json(
    "https://sids-dashboard.github.io/api/data/"+  apiCode + ".json"
  ).then((dat) => {
    
    if(vizMode=="indicator"){
    indicatorData = dat[indicatorCode];
    indexData={}
    indexWeights={"subindices":{},"normalization":false}
    }
 else if(vizMode=="index"){
       indexData=getIndexValues(dat,indexCode,indiSelections)
       indicatorData=indexData["index"]

    //  if(indiSelections["viz"] == "Spider"){//add this in once the index processing layer hsa been added before spider processing
        ///abstract this
        indexWeights = JSON.parse(JSON.stringify(indexWeightsDict[indexCode]));//deep copy
        orderedCountryList=getIndexCountryList(indiSelections,indexWeights,indexData)
        indiSelections["countryOrder"]=orderedCountryList
        spiderData=processSpiderData(indexData,indexWeights,indiSelections,orderedCountryList)      
        console.log(spiderData)
        indiSelections["spiderData"]=spiderData//probably a bad idea, but used for now in index rect updates
        drawIndexSpider(spiderData,indexWeights)
    //  } 
   }

  //  console.log(indicatorData)
      quantize=quantizeData(indicatorData,indiSelections)
    noData=countriesWithNoData(indicatorData,indiSelections)

    if(firstIndicatorInit==0){
    initChoroLegend(quantize);// require data to be loaded
    initXAxis()//messes chorolegend if it is too soon
    firstIndicatorInit=1; }

    //main update functions////
    vizElementAttributes = processVizElementAttributes(indicatorData,indexData,indiSelections,indexWeights);
    ///////////
console.log(vizElementAttributes)
    //console.log(vizElementAttributes)

    updateCountrySvgColors(indicatorData, indicatorCode, quantize, indiSelections);//currently color data is computed here (quantize)
    updateCountryPositions(vizElementAttributes);
    updateCountryTitles( vizElementAttributes,indicatorCode, indiSelections, noData); 
    updateRectangles(vizElementAttributes);
    updateIndexRectangles(vizElementAttributes,indexWeights);
    updateLabels(vizElementAttributes, noData); //selectedPage, selectedViz, selectedYear,selectedSortby, indicatorData, noData)
    updateCircles(vizElementAttributes);
//    updateCountryLines(vizElementAttributes);
    updateChoroTooltips(indicatorData, indiSelections);
    updateChoroLegend(indicatorCode, indiSelections, quantize);
    updateBarAxis(indicatorData, indiSelections);
    updateYAxis(indicatorData, indiSelections);
    if (indiSelections["viz"] == "Time Series") {
        ///this could be updated
        timeData={}
        timeData[indicatorCode]=indicatorData
        dataset = parse(timeData);
        optionSelected = {
          countryGroupOption: tempTimeChartSelection,
          datasetOption: indicatorCode,
        };
        console.log({ dataset, optionSelected });
        updateTimeChart({ dataset, optionSelected });
      }

      updateVizSliders()//again, just for fun
  });

}

///////////////////////
//////Run all update functions
//////////////////////////////////////
//

function quantizeData(indicatorData,indiSelections){
    indicatorDataYear = indicatorData["data"][indiSelections["year"]];
    hueNum = getRandomInt(0, 3);

    max = Math.max(
        ...Object.values(indicatorDataYear).filter(function (el) {
          return !isNaN(parseFloat(el)) && isFinite(el);
        })
      );
      min = 0; 
         
      // Math.min(...Object.values(indicatorData).filter(function (el) { return !isNaN(parseFloat(el)) && isFinite(el);  }))

      //quantize is the scale used for the choropleth and the legend
      quantize = d3.scale
        .quantize()
        .domain([min, max])
        .range(
          d3.range(9).map(function (i) {
            return hues[hueNum] + i + "-9";
          })
        );

   return quantize
}

function countriesWithNoData(indicatorData, indiSelections) {
    /// make list of counties with no data (this should probably be refactored to create a list of countries with data)? Or just simplify this
    noData = [];
    d3.select(sidsMaps)
      .selectAll("path") /* Map  counties to  data */
      .each(function (d) {
        try {
          // console.log(this.id)
          iso = this.id;
          ////need to update this to indiSelections["year"] variable
          indiSelections["year"] = "recentValue";
          value = indicatorData["data"][indiSelections["year"]][iso];
          //console.log(value)
          if (value == "No Data" || typeof value != "number") {
            noData.push(iso);
          }
        } catch (error) {} //console.log(error)}//console.log(error) }
      });
    
return noData
}

///////////////////////
//////Element update functions
//////////////////////////////////////
//

function updateVizBlocks(indiSelections){
    
    if (indiSelections["viz"] == "Spider") {
        $("#indexSpider").css("display", "block");
 
      } else {
        $("#indexSpider").css("display", "none");
      }
    
      if (indiSelections["viz"] == "Time Series") {
        $("#timeSeriesContainer").css("display", "block");
      } else {
        $("#timeSeriesContainer").css("display", "none");
      }
    
      if (indiSelections["page"] == "countryDataTab") {
        if (indiSelections["viz"] == "Multi-indicator") {
          //     $("#indicatorSelectBox2").css("display", "block");
          $("#choroInfoBox").css("display", "none");
        } else {
          //      $("#indicatorSelectBox2").css("display", "none");
          $("#choroInfoBox").css("display", "block");
        }
      } else {
        //    $("#indicatorSelectBox2").css("display", "none");////need to figure out to hide the new menu
        $("#choroInfoBox").css("display", "none");
      }
      if (
        indiSelections["viz"] == "Info" ||
        indiSelections["viz"] == "Time Series"
      ) {
        $("#choro_map_container").css("display", "none"); //"opacity", "0");
      } else {
        //opacity so it doesn't mess with the titles
        $("#choro_map_container").css("display", "block"); //("opacity", "1");
    
        // $("#timeSeriesContainerPage").css("display", "none")
      }
      if (indiSelections["viz"] == "Info") {
        $("#mviInfoPage").show();
      } else {
        $("#mviInfoPage").hide();
      }

        ///hide or show Sortby Select 
  if (
    indiSelections["viz"] == "Bar Chart" ||
    indiSelections["viz"] == "Spider"
  ) {
    $("#sortbySelect").show();
  } else {
    $("#sortbySelect").hide();
  }

   ///hide vizselect slider if in "Region" mode (need a way to reactivate this mode in key indicators)
   if (indicatorGlobal == "Region"&&indiSelections["page"]=="countryDataTab") {
    document.getElementById("vizSelect").style.visibility = "hidden";
  } else {
    document.getElementById("vizSelect").style.visibility = "visible";
      }



}

function updateVizSliders() {
  
    if (vizMode=="index") {
        $("#infoLi").show();
        $("#choroLiLi").text("Spider");
        
      } else {
        $("#infoLi").hide();
        $("#choroLiLi").text("Choropleth");
      }

    x = $(".selectedViz");
  $(".vizShader")
    .stop()
    .animate(
      {
        width: x.width() + 32,
        left: x.position().left,
      },
      400
    );

  x = $(".selectedMviPreset");
  $(".mviPresetShader")
    .stop()
    .animate(
      {
        width: x.width() + 32,
        left: x.position().left,
      },
      400
    );

  x = $(".selectedSortby");

  $(".sortbyShader")
    .stop()
    .animate(
      {
        width: x.width() + 32,
        left: x.position().left,
      },
      400
    );
}

function updateCountrySvgColors( indicatorData,indicatorCode,quantize,indiSelections) {
  indicatorDataYear = indicatorData["data"][indiSelections["year"]];

  ///draw choropleth scale
  if (indiSelections["page"] == "countryDataTab") {
    /* break the data values into 9 ranges of €100 each   */


    d3.select(sidsMaps)
      .selectAll("path") /* Map  counties to  data */
      .attr("class", function (d) {
        try {
          value = indicatorDataYear[this.id];
          if (value == "No Data" || typeof value != "number") {
            //hide country name
            if (indicatorCode == "Region") {
              //console.log("region",this.id)
              return (
                regionColors(
                  countryJson[this.id].Region,
                  countryJson[this.id]["Member State (Y/N)"]
                ) + " shadow countrySvg"
              );
            } else {
              //console.log("nodata",this.id)
              return "nodata countrySvg";
            }
          } else {
           if (
              indiSelections["viz"] == "Multi-indicator" ||
              indiSelections["viz"] == "Bar Chart" ||
              indiSelections["viz"] == "Spider" ||
              indiSelections["viz"] == "Global View" ||
              indicatorCode == "Region"
            ) {
              return (                  
                regionColors(countryJson[this.id].Region, "Y") +" shadow countrySvg"
              );
            } else {
              return quantize(value) + " shadow countrySvg";
            }
          }
        } catch (error) {
          console.log("broken?", this.id);
          return "nodata";
        }
      })
      .on("mouseout", function (d) {
        if (d3.select(this).classed("countryActive")) return;
        d3.select(this).attr("class", function (da) {
          /* reset county color to quantize range */ stat =
            indicatorDataYear[this.id];

          if (indicatorCode == "Region") {
            return (
              regionColors(countryJson[this.id].Region, "Y") +
              " shadow countrySvg"
            );
          } else {
            if (typeof stat == "undefined" || stat == "No Data") {
              //hide country name
              return "nodata countrySvg";
            } else {
              //show country name
              return quantize(stat) + " shadow countrySvg";
            }
          }
        });
      });
  } else {
    d3.select("#choro_map_container")
      .selectAll("path") /* Map  counties to  data */
      .attr("class", function (d) {
        try {
          return (
            regionColors(countryJson[this.id].Region, "Y") +
            " shadow countrySvg"
          );
        } catch (error) {}
      });
  }
}

function updateCountryPositions(vizElementAttributes) {
  //update country svg positions
  d3.select(sidsMaps)
    .selectAll(".countrySvg")
    .transition()
    .duration(1200) //make transition time relative to to/from viz
    .attr("transform", function (d) {
      VTz = vizElementAttributes[this.id]["VT"];
      try {
        return (
          "scale(" +
          VTz["scale"] +
          "," +
          VTz["scale"] +
          ")translate(" +
          VTz["x"] +
          "," +
          VTz["y"] +
          ")"
        );
      } catch (error) {
        return "";
      }
    });
}

function updateCountryTitles(
  vizElementAttributes,
  indicatorCode,
  indiSelections,
  noData
) {
  //indicatorCode,indiSelections["page"], indiSelections["viz"], indiSelections["sortby"],indiSelections["year"], indicatorData,vizElementAttributes,noData) {

  d3.select(sidsMaps)
    .selectAll(".choroText")
    .transition()
    .duration(1200) //make transition time relative to to/from viz
    .attr("transform", function (d) {
      var country = getIsoByName(this.innerHTML);

      // var bBox = getBoundingBox(d3.select(this.parentNode).select("path"))
      // textBBox = this.getBBox()
      // TT = textTransform(country, bBox, textBBox, indiSelections["viz"], indicatorData);//, indicatorData2);
      //console.log(country)
      try {
        return vizElementAttributes[country]["TT"];
      } catch (error) {
        console.log("broken", this.innerHTML);
      }
    });

  d3.select(sidsMaps).selectAll(".choroText2").style("pointer-events", "none");
  d3.select(sidsMaps).selectAll(".choroText3").style("pointer-events", "none");
  d3.select(sidsMaps)
    .selectAll(".countryLabel")
    .style("pointer-events", "none");

  if (indiSelections["viz"] == "Global View") {
    $(".choroText").each(function (d) {
      $(this).css("fill-opacity", 0);
    });
    $(".choroText2").each(function (d) {
      $(this).css("fill-opacity", 0);
    });
    $(".choroText3").each(function (d) {
      $(this).css("fill-opacity", 1);
    });
  } else {
    //huh?
    $(".choroText2").each(function (d) {
      $(this).css("fill-opacity", 0);
    });
    $(".choroText3").each(function (d) {
      $(this).css("fill-opacity", 0);
    });
  }

    if (indiSelections["viz"] == "Time Series") {
      $(".choroText").each(function (d) {
        $(this).css("fill-opacity", 0);
      });
    } else {
      $(".choroText").each(function (d) {
        var country = getIsoByName(this.innerHTML);
        //   console.log(this.innerHTML)
        if (
          indicatorCode == "Region" &&
          indiSelections["viz"] == "Choropleth"
        ) {
          $(this).css("fill-opacity", 1);
        } else {
          if (
            noData.includes(country) ||
            indiSelections["viz"] == "Global View"
          ) {
            $(this).css("fill-opacity", 0);
            if (indiSelections["viz"] == "Bar Chart") {
              scale = 1;
            } //.05
            else if (indiSelections["viz"] == "Choropleth") {
              scale = 1;
            }
            d3.select(this)
              .transition()
              .duration(1200)
              .attr("transform", "scale(" + scale + "," + scale + ")");
          } else {
            $(this).css("fill-opacity", 1);
          }
        }
      });
    }
  if (indiSelections["viz"] == "Multi-indicator") {
    d3.select(".yAxisTitle")
      .transition()
      .duration(1000)
      .attr("fill-opacity", 1);
  } else {
    d3.select(".yAxisTitle")
      .transition()
      .duration(1000)
      .attr("fill-opacity", 0);
  }
}

function updateLabels(vizElementAttributes, noData) {
  //indiSelections["page"], indiSelections["viz"], indiSelections["year"],indiSelections["sortby"],indicatorData, noData) {

    // labelTransformData = {}
    // $(".countryLabel").each(function () {
    //     var country = this.parentNode.id
    //     bBox=bboxDict[country]
    //     dat = labelTransform(country, bBox, indiSelections["viz"], indiSelections["year"],indiSelections["sortby"],indicatorData,indiSelections["page"])//, indicatorData2)
    //     labelTransformData[country] = dat

    // });

    d3.select(sidsMaps)
      .selectAll(".countryLabel")
      .transition()
      .duration(1200)
      .attr("x", function () {
        return vizElementAttributes[this.parentNode.id]["LT"]["x"] + 170;
      })
      .attr("y", function () {
        return vizElementAttributes[this.parentNode.id]["LT"]["y"];
      })
      .attr("fill-opacity", function () {
        if (
          noData.includes(this.parentNode.id) ||
          indiSelections["viz"] != "Bar Chart"
        ) {
          return 0;
        } else {
          return 1;
        }
      })
      .text(function () {
        var country = this.parentNode.id;
        return nFormatter(
          indicatorData["data"][indiSelections["year"]][country],
          3
        );
      });
  
}

function updateRectangles(vizElementAttributes,indexWeights) {
  d3.select(sidsMaps)
    .selectAll(".choroRect")
    .transition()
    .duration(1200)
    .attr("x", function () {
      return vizElementAttributes[this.parentNode.id]["RT"]["x"];
    })
    .attr("y", function () {
      return vizElementAttributes[this.parentNode.id]["RT"]["y"];
    })
    .attr("width", function () {
        if(vizMode=="indicator"){
      return vizElementAttributes[this.parentNode.id]["RT"]["width"];
        }
        if(vizMode=="index"){
            return 0;
        }
    })
    .attr("height", function () {
      return vizElementAttributes[this.parentNode.id]["RT"]["height"];
    });
}

function updateIndexRectangles(vizElementAttributes,indexWeights){
  subindexList=Object.keys(indexWeights["subindices"])
  for(i=0;i<subindexList.length;i++){
   d3.select(sidsMaps)
      .selectAll(".choroRect"+(i))
      .transition()
      .duration(1200)
      .attr("x", function () {
        return vizElementAttributes[this.parentNode.id]["MRT"+(i)]["x"];
      })
      .attr("y", function () {
        return vizElementAttributes[this.parentNode.id]["MRT"+(i)]["y"];
      })
      .attr("width", function () {
              return vizElementAttributes[this.parentNode.id]["MRT"+(i)]["width"];
      })
      .attr("height", function () {
        return vizElementAttributes[this.parentNode.id]["MRT"+(i)]["height"];
      });
    
}
for(i=subindexList.length;i<totalIndexRectangles;i++){
  d3.select(sidsMaps)
     .selectAll(".choroRect"+(i))
     .transition()
     .duration(1200)
     .attr("x", function () {
       return vizElementAttributes[this.parentNode.id]["RT"]["x"];
     })
     .attr("y", function () {
       return vizElementAttributes[this.parentNode.id]["RT"]["y"];
     })
     .attr("width", function () {
             return vizElementAttributes[this.parentNode.id]["RT"]["width"];
     })
     .attr("height", function () {
       return 0;
     });
   
}


}


function updateCircles(vizElementAttributes) {
  d3.select(sidsMaps)
    .selectAll(".choroCircle")
    .transition()
    .duration(1200)
    .attr("cx", function () {
      return vizElementAttributes[this.parentNode.id]["CT"]["x"];
    })
    .attr("cy", function () {
      return vizElementAttributes[this.parentNode.id]["CT"]["y"];
    })
    .attr("r", function () {
      return vizElementAttributes[this.parentNode.id]["CT"]["r"];
    });
}

function updateCountryLines(vizElementAttributes) {
  d3.select(sidsMaps).selectAll(".countryLine");
  // .transition()
  // .duration(1200)
  // .attr("cx", function () { return vizElementAttributes[this.parentNode.id]["CT"]["x"] })
  // .attr("cy", function () { return vizElementAttributes[this.parentNode.id]["CT"]["y"] })
  // .attr("r", function () { return vizElementAttributes[this.parentNode.id]["CT"]["r"] })
}

function updateLinesAndMap(indiSelections) {
  if (indiSelections["viz"] == "Choropleth") {
    main_chart_svg
      .selectAll("line")
      .transition()
      .duration(1000)
      .style("opacity", 1);
  } else {
    main_chart_svg
      .selectAll("line")
      .transition()
      .duration(1000)
      .style("opacity", 0);
  }

  d3.selectAll(".choroMap")
    .transition()
    .duration(1200) //make transition time relative to to/from viz
    .attr("opacity", function (d) {
      if (indiSelections["viz"] == "Global View") {
        return 0.7;
      } else {
        return 0;
      }
    });
}

function updateBarAxis(indicatorData, indiSelections) {
  indicatorDataYear = indicatorData["data"][indiSelections["year"]];

  barAxis = d3.select(".barAxis");
  const x = d3.scaleLinear();
  var margin = { left: 160, right: 5 };
  var xAxis = d3.axisTop(x);
  var width = 440;
  var height = 90;

  max = Math.max(
    ...Object.values(indicatorDataYear).filter(function (el) {
      return !isNaN(parseFloat(el)) && isFinite(el);
    })
  );
  min = 0;

  if (indiSelections["viz"] == "Multi-indicator") {
    margin.left = 60;
    width = 440;
    min = Math.min(
      ...Object.values(indicatorDataYear).filter(function (el) {
        return !isNaN(parseFloat(el)) && isFinite(el);
      })
    );
  }

  xAxis.tickFormat(d3.format(".2s"));
  x.domain([min, max]).range([0, width]);

  if (
    indiSelections["viz"] == "Choropleth" ||
    indiSelections["viz"] == "Global View" ||
    indiSelections["viz"] == "Spider" ||
    indiSelections["viz"] == "Info" ||
    indiSelections["viz"] == "Time Series"
  ) {
    x.range([0, 0]);
    setTimeout(function () {
      barAxis.attr("visibility", "hidden");
    }, 1100);
  } else if (indiSelections["viz"] == "Bar Chart"||indiSelections["viz"] == "Multi-indicator") {
    barAxis.attr("visibility", "visible");
  }

  barAxis
    .transition()
    .duration(1200)
    .attr("transform", `translate(${margin.left}, ${height / 2})`)
    .call(xAxis);
}

function updateYAxis(indicatorData, indiSelections) {
  indicatorDataYear = indicatorData["data"][indiSelections["year"]];

  yAxisContainer = d3.select(".multiYAxis");
  const yScale = d3.scaleLinear();
  var yAxis = d3.axisLeft(yScale);
  yAxis.tickFormat(d3.format(".2s"));

  var margin = { left: 45, right: 5, top: 245 };

  if (
    indiSelections["viz"] == "Choropleth" ||
    indiSelections["viz"] == "Bar Chart" ||
    indiSelections["viz"] == "Spider" ||
    indiSelections["viz"] == "Time Series"
  ) {
    yScale.range([0, 0]);
    //setTimeout(function(){
    yAxisContainer.attr("visibility", "hidden");
    //},900)
  } else if (indiSelections["viz"] == "Global View") {
    var height = 180;
    var margin = { left: 45, right: 5, top: 245 };

    // indicatorData2 = wdiFull[indicator2]["data"]//[indiSelections["year"]]

    max = Math.max(
      ...Object.values(indicatorDataYear).filter(function (el) {
        return !isNaN(parseFloat(el)) && isFinite(el);
      })
    );
    // min = Math.min(...Object.values(indicatorData2).filter(function (el) { return !isNaN(parseFloat(el)) && isFinite(el); }))
    min = 0;

    yScale.domain([min, max]).range([height, 0]);

    yAxisContainer.attr("visibility", "visible");
    // }
    // else {
    //   yScale.range([0, 0]);
    //   //setTimeout(function(){
    //   yAxisContainer.attr("visibility", "hidden")
    // }
  }
  //else if (indiSelections["viz"] == "Multi-indicator") {
  //     var margin = { left: 45, right: 5, top: 10 };
  //     var height = 460
  //     try {
  //         indicator2 = $(".indiActive2")[0].id
  //     }
  //     catch (error) { indicator2 = "HumanDevelopmentIndex" }
  //     indicatorData2 = wdiFull[indicator2]["data"]//[indiSelections["year"]]

  //     max = Math.max(...Object.values(indicatorData2).filter(function (el) {
  //         return !isNaN(parseFloat(el)) && isFinite(el);
  //     }))
  //     min = Math.min(...Object.values(indicatorData2).filter(function (el) { return !isNaN(parseFloat(el)) && isFinite(el); }))

  //     yScale
  //         .domain([min, max])
  //         .range([height, 0]);

  //     yAxisContainer.attr("visibility", "visible")
  // }

  yAxisContainer
    .transition()
    .duration(1200)
    .call(yAxis)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // main_chart_svg.selectAll(".yAxisTitle")
  //     .text(function (d, i) {
  //         return wdiMeta[indicator2]["Indicator Name"]//["name"];//.toFixed(2))//extent[0].toFixed(2) + " - " +
  //     })
}

function updateChoroLegend(indicatorCode, indiSelections,quantize) {
   
  
    // hueNum=2
  
    //     quantize = d3.scale.quantize()
    //     .domain([min,max])
    //     .range(d3.range(9).map(function (i) { return hues[hueNum] + i + "-9"; }));

  var choro_legend_container = d3
      .select("#choro_legend_container")
    var choroLegend = d3
      .select("#choro_legend_container")
      .selectAll("g.choroLegendEntry");
  
    choroLegend.data(quantize.range());
  
    //var choroLegend = d3.select("#choro_legend_container").selectAll('g.choroLegendEntry')
  
    choro_legend_container.select(".choroLegendTitle").text(function () {
  
      return indicatorMeta[indicatorCode]["Indicator"]; //["name"];//.toFixed(2))//extent[0].toFixed(2) + " - " +
    
    });
  
    choroLegend.selectAll("rect").attr("class", function (d) {
      return d;
    });
  if(indicatorGlobal=="Region"){ hideChoroLegend(choroLegend);}
    // console.log("info?", indiSelections["viz"])
    if (indiSelections["viz"] == "Choropleth" ) {
      showChoroLegend(choroLegend);
    } else if (
      indiSelections["viz"] == "Bar Chart" ||
      indiSelections["viz"] == "Multi-indicator" ||
      indiSelections["viz"] == "Info" ||
      indiSelections["viz"] == "Time Series" ||
      indiSelections["viz"] == "Spider" ||
      indiSelections["viz"] == "Global View"
    ) {
      hideChoroLegend(choroLegend);//only hide rectangles and labels
    }
    if (
      indiSelections["viz"] == "Info" ||
      indiSelections["viz"] == "Global View"
    ) {
        choro_legend_container
        .selectAll(".choroLegendTitle")
        .transition().duration(1200)
        .attr("fill-opacity", 0);
    } else {
        choro_legend_container
        .selectAll(".choroLegendTitle")
        .transition().duration(1200)
        .attr("fill-opacity", 1);
    }
  }

function updateChoroTooltips(indicatorData, indiSelections) {
  const countryMaps = $("#allSids path, .regionTitle");
  regionAverages = {};
  regionRank = {};
  indicatorDataYear = indicatorData["data"][indiSelections["year"]];

//   if (indiSelections["page"] == "countryDataTab") {
    indiMax = Math.max(
      ...Object.values(indicatorDataYear).filter(
        (val) => typeof val == "number"
      )
    );
    countryMaps.each(function (index) {
      if (countryMaps[index].id.includes("RegionTitle")) {
        region = countryMaps[index].id.replace("RegionTitle", "");
        regionTitles = {
          ais: "AIS",
          pacific: "Pacific",
          caribbean: "Caribbean",
        };
        regionLists = {
          ais: regionCountries["ais"],
          pacific: regionCountries["pacific"],
          caribbean: regionCountries["caribbean"],
        };
        tooltipTitle = regionTitles[region] + " Region";
        total = 0;

        for (countryIndex in regionLists[region]) {
          val = indicatorDataYear[regionLists[region][countryIndex]];
          if (typeof val == "number") {
            total += val;
          }
        }
        regionColor = regionColor = regionColors(region, "Y").substring(1);

        regionValuesLength = Object.values(
          filterObject(indicatorDataYear, regionLists[region])
        ).filter((val) => typeof val == "number").length;
        if (regionValuesLength == 0) {
          regionValuesLength = 1;
        }
        regionVal = total / regionValuesLength;
        regionRank[region] = 1;
        allVals = Object.values(indicatorDataYear).filter(
          (val) => typeof val == "number"
        );
        for (val in allVals) {
          //console.log(allVals[val],regionVal)
          if (allVals[val] > regionVal) {
            regionRank[region]++;
          }
        }
        // console.log(regionValuesLength)
        content = "Average: " + nFormatter(regionVal, 3);
        regionAverages[region] = regionVal;
      } else {
        iso = countryMaps[index].id;
        country = sidsDict[iso];
        tooltipTitle = country;
        try {
          secondLine = "Value: " + indicatorDataYear[iso].toFixed(2);
        } catch (error) {
          secondLine = "No Data";
        }
        if ((indiSelections["year"] = "recentValue")) {
         try{ year = indicatorData["data"]["recentYear"][iso];}
         catch(error){year="Most recent value"}///for indices, tempporary until improve
        } else {
          year = indiSelections["year"];
        }
        thirdLine = "Year: " + year;
        content = secondLine + "</h6><h6>" + thirdLine;
        regionColor = regionColors(countryJson[iso].Region, "Y").substring(1);
      }
      $("#tooltipChoro" + index.toString()).html(
        '<h4 style="color:#' +
          regionColor +
          '">' +
          tooltipTitle +
          "</h4><h6>" +
          content +
          "</h6></div>"
      ); //<div class="arrow" data-popper-arrow></div>
      // console.log(index+": yo");
    });

  if (
    indiSelections["viz"] == "Choropleth" ||
    indiSelections["viz"] == "Time Series"
  ) {
    regionTitleVals = {
      opacity: 1,
      pacificX: 775,
      pacificY: 460,
      caribbeanX: 760,
      caribbeanY: 130,
      aisX: 785,
      aisY: 335,
    };
  } else if (
    indiSelections["viz"] == "Bar Chart" ||
    indiSelections["viz"] == "Multi-indicator"
  ) {
    if (indiSelections["sortby"] == "Rank") {
      regionTitleVals = {
        opacity: 1,
        pacificX: 775,
        pacificY: 330,
        caribbeanX: 760,
        caribbeanY: 170,
        aisX: 785,
        aisY: 250,
      };
      regionTitleHeight = 400;
   
      countryListLength = allVals.length;
      if (countryListLength > 0) {
        regionTitleVals = {
          opacity: 1,
          pacificX: 715,
          pacificY:
            regionTitleHeight * (regionRank["pacific"] / countryListLength) +
            60,
          caribbeanX: 700,
          caribbeanY:
            regionTitleHeight * (regionRank["caribbean"] / countryListLength) +
            60,
          aisX: 725,
          aisY:
            regionTitleHeight * (regionRank["ais"] / countryListLength) + 60,
        };
      } else {
        regionTitleVals = {
          opacity: 1,
          pacificX: 715,
          pacificY: 450,
          caribbeanX: 700,
          caribbeanY: 110,
          aisX: 725,
          aisY: 300,
        };
      }
      // }
    } else if (indiSelections["sortby"] == "Region") {
      regionTitleVals = {
        opacity: 1,
        pacificX: 715,
        pacificY: 450,
        caribbeanX: 700,
        caribbeanY: 110,
        aisX: 725,
        aisY: 300,
      };
    }
  } else if (indiSelections["viz"] == "Global View") {
    regionTitleVals = {
      opacity: 1,
      pacificX: 675,
      pacificY: 70,
      caribbeanX: 30,
      caribbeanY: 115,
      aisX: 370,
      aisY: 85,
    };
  } else if (indiSelections["viz"] == "Spider") {
    if (indiSelections["sortby"] == "Rank") {
      regionTitleVals = {
        opacity: 1,
        pacificX: 775,
        pacificY: 330,
        caribbeanX: 760,
        caribbeanY: 170,
        aisX: 785,
        aisY: 250,
      };
    } else {
      regionTitleVals = {
        opacity: 1,
        pacificX: 20,
        pacificY: 100,
        caribbeanX: 670,
        caribbeanY: 90,
        aisX: 530,
        aisY: 530,
      };
    }
  }

  // console.log( regionTitleHeight, regionRank["pacific"], countryListLength)
  d3.select("#pacificRegionTitle")
    .transition()
    .duration(1000)
    .attr("x", regionTitleVals["pacificX"])
    .attr("y", regionTitleVals["pacificY"])
    .attr("fill-opacity", regionTitleVals["opacity"]);
  d3.select("#caribbeanRegionTitle")
    .transition()
    .duration(1000)
    .attr("x", regionTitleVals["caribbeanX"])
    .attr("y", regionTitleVals["caribbeanY"])
    .attr("fill-opacity", regionTitleVals["opacity"]);
  d3.select("#aisRegionTitle")
    .transition()
    .duration(1000)
    .attr("x", regionTitleVals["aisX"])
    .attr("y", regionTitleVals["aisY"])
    .attr("fill-opacity", regionTitleVals["opacity"]);
}



