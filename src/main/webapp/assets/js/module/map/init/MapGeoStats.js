var classSeries;
var classColors;
//color start from
var colorFrom ='FFFFFF';
//color end to
var colorTo = '1A8B16';
var defaultStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.3)'
  }),
  stroke: new ol.style.Stroke({
    color: 'rgba(0, 255, 0, 1)',
    width: 1
  }),
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    fill: new ol.style.Fill({
      color: '#000'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3
    })
  })
});

  //5,method_CJ
function getAndSetClassesFromData(data, numclasses, method, type) {
  var serie = new geostats(data);
  var legenLabel = ""; 
  if (method === "method_EI") {
    serie.getClassEqInterval(numclasses);
    methodLabel = "Equal Interval";
  } else if (method === "method_Q") {
    serie.getClassQuantile(numclasses);
    methodLabel = "Quantile";
  } else if (method === "method_SD") {
    serie.getClassStdDeviation(numclasses);
    methodLabel = "Standard Deviation ";
  } else if (method === "method_AP") {
    serie.getClassArithmeticProgression(numclasses);
    methodLabel = "Arithmetic Progression";
  } else if (method === "method_GP") {
    serie.getClassGeometricProgression(numclasses);
    methodLabel = "Geometric Progression ";
  } else if (method === "method_CJ") {
    serie.getClassJenks(numclasses);
    methodLabel = "Class Jenks";
  } else {
	  alert("error: no such method.")
  }
  
  
  var colors_x = "";
  if($.isNullString(type)){
	  colors_x =  chroma.scale('OrRd').colors(numclasses);	  
  }else if(type=="toolbar1"){
	  colors_x =  chroma.scale('OrRd').colors(numclasses);
  }else if(type=="toolbar2"){
	  colors_x =  chroma.scale(['yellow', '008ae5']).colors(numclasses);
  }else if(type=="toolbar3"){
	  colors_x =  chroma.scale(['yellow', 'navy']).colors(numclasses);
  }else if(type=="toolbar4"){
	  colors_x =  chroma.scale(['#f4c0be', '#a10d36']).colors(numclasses);
  }else if(type=="toolbar5"){
	  colors_x =  chroma.scale(['#e8cae7', '#50014f']).colors(numclasses);
  }
 
	serie.setColors(colors_x);
 	$('#mapLegend').empty();
 	$('#mapLegend').append(serie.getHtmlLegend(null,'범례', 1)) 
	classSeries = serie;
	classColors = colors_x;   
}  


/**
 * function to verify the style for the feature
 */
function geoSetStyle(feat,res) {
	
  var currVal = parseFloat(feat.get("count")); 
  var bounds = classSeries.bounds;
  var numRanges = new Array();
  for (var i = 0; i < bounds.length-1; i++) { 
  numRanges.push({
      min: parseFloat(bounds[i]),
      max: parseFloat(bounds[i+1])
    });  
  }  
  var classIndex = verifyClassFromVal(numRanges, currVal);
  var polyStyleConfig = {
    stroke: new ol.style.Stroke({
      color: 'rgba(255, 0, 0,0.3)',
      width: 1
    })
  };

  var textStyleConfig = {};
  var label = res < 10000 ? feat.get('name')+':'+feat.get("count") : '';
  if (classIndex !== -1) {
    polyStyleConfig = {
      stroke: new ol.style.Stroke({
        color: 'rgba(255,255,255, 0.5)', 
        width: 1
      }), 
      fill: new ol.style.Stroke({
        color: hexToRgbA(classColors[classIndex],0.8)
      })
    };
    textStyleConfig = {
      text: new ol.style.Text({
        text: label,
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
          color: "#000000"
        }),
        stroke: new ol.style.Stroke({
          color: "#FFFFFF",
          width: 2
        })
      }),
      geometry: function(feature) {
        var retPoint;
        if (feature.getGeometry().getType() === 'MultiPolygon') {
          retPoint = getMaxPoly(feature.getGeometry().getPolygons()).getInteriorPoint();
        } else if (feature.getGeometry().getType() === 'Polygon') {
          retPoint = feature.getGeometry().getInteriorPoint();
        }
        
        return retPoint;
      }
    }
  };

  var textStyle = new ol.style.Style(textStyleConfig);
  var style = new ol.style.Style(polyStyleConfig);
  return [style, textStyle];
}


function verifyClassFromVal(rangevals, val) {
  var retIndex = -1;
  for (var i = 0; i < rangevals.length; i++) {
    if (val >= rangevals[i].min && val <= rangevals[i].max) {
      retIndex = i;
    }
  }
  return retIndex;
}
//helper functions this point forward

/**
 *   get the user selected method
 */
function getMethod(){
var elem = document.getElementById("methodselector");
var val = elem.options[elem.selectedIndex].value;
return val;
}
 

/**
 * convert hex to rgba 
 *
 */
function hexToRgbA(hex,opacity) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ','+opacity+')';
  }
  throw new Error('Bad Hex');
}
/**
 *    get the maximum polygon out of the supllied  array of polygon
 *    used for labeling the bigger one
 */
function getMaxPoly(polys) {
  var polyObj = [];
  //now need to find which one is the greater and so label only this
  for (var b = 0; b < polys.length; b++) {
    polyObj.push({
      poly: polys[b],
      area: polys[b].getArea()
    });
  }
  polyObj.sort(function(a, b) {
    return a.area - b.area
  });

  return polyObj[polyObj.length - 1].poly;
}



// http://stackoverflow.com/questions/14484787/wrap-text-in-javascript
function wordWrap(str, maxWidth) {
    var newLineStr = "\n"; done = false; res = '';
    do {                    
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

        if (str.length < maxWidth)
            done = true;
    } while (!done);

    return res;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
};