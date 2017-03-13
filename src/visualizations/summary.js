"use strict";

const d3 = require("d3");
const Color = require("color");
const _ = require("lodash");

import color from "../util/color.js";

var time = require("../util/time.js");

function renderSummary(el, apps) {
  // Clear element
  el.innerHTML = "";

  // Function for hover animation
  var script = document.createElement("script");
  script.text =  'function set_color(elem_id, color) {'
  script.text += '  var rect = document.getElementById(elem_id).children[0];'
  script.text += '  rect.style.fill = color;'
  script.text += '};'
  el.appendChild(script);

  let svg = d3.select(el).append("svg");
  svg.attr("width", "100%");

  var curr_y = 0;
  var longest_duration = apps[0].duration
  _.each(apps, function(app, i) {
    // TODO: Expand on click and list titles
    let eg = svg.append("g")
      .attr("id", "summary_app_"+i);

    // Variables
    var width = (app.duration/longest_duration)*80+"%";
    let barHeight = 50;
    let textSize = 15;
    var appcolor = color.getAppColor(app.name);
    var hovercolor = Color(appcolor).darken(0.4).rgbString();

    // Color box background
    eg.append("rect")
     .attr("x", 0)
     .attr("y", curr_y)
     .attr("rx", 5)
     .attr("ry", 5)
     .attr("width", width)
     .attr("height", barHeight)
     .style("fill", appcolor)

    // App name
    eg.append("text")
     .attr("x", 5)
     .attr("y", curr_y + 5 + textSize)
     .text(app.name)
     .attr("font-family", "sans-serif")
     .attr("font-size", textSize + "px")
     .attr("fill", "black")

    // Duration
    eg.append("text")
     .attr("x", 5)
     .attr("y", curr_y + 5 + textSize + 5 + textSize)
     .text(time.seconds_to_duration(app.duration))
     .attr("font-family", "sans-serif")
     .attr("font-size", textSize + "px")
     .attr("fill", "black")

    // Invisible hover animaiton rect
    eg.append("rect")
     .attr("x", 0)
     .attr("y", curr_y)
     .attr("width", "100%")
     .attr("height", barHeight)
     .style("fill", "rgba(1, 1, 1, 0)")
     .attr("onmouseover", "set_color('summary_app_"+i+"', '"+hovercolor+"');")
     .attr("onmouseout", "set_color('summary_app_"+i+"', '"+appcolor+"')");

    curr_y += barHeight + 5;
  });
  curr_y -= 5;

  svg.attr("height", curr_y);

  return svg;
}

module.exports = renderSummary;
