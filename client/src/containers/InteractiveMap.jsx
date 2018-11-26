import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as turf from '@turf/turf';

import Map, { Layer, Sources, GeoJSON } from '../components/map';

import { centerMapOnSite, mapSetCenter, mapSetZoom } from '../model/map';

class InteractiveMap extends Component {
  render() {
    const { bounding } = this.props.currentSite;
    const { trees } = this.props.currentSite
    const allTrees = {...this.props.trees};
    let treeProperties = []
    let geoJsonSources = []
    let treeLayers = []
    let interpolatedColorArray = [];

    // 1. simplify treeMap and treeMaker into one function (DONE) => 2. try to have the method appar in the return function
    // if I could change redux so that tree items get passed in the currentSite props would be much easier
    let treeCircleMaker = () => {
      trees.map( (treeID) => {
        // this maps an individial tree object to an object in allTrees found by the index of the id found in trees
        let treeObj = {...allTrees[treeID]}
        let treeColor = interpolatedColorArray.find((color, index) => index === treeObj.height)
        let color = ("rgb(" + treeColor[0] + "," + treeColor[1] + "," + treeColor[2] + ")")
        let options = {name: 'Tree Circle'};
        let treeCircle = turf.point([treeObj.long, treeObj.lat], options);

        let geoJSON =  <Sources> <GeoJSON key={ treeObj.id } id={ treeObj.id.toString() } data={ treeCircle } /> </Sources>
        geoJsonSources.push(geoJSON)

        let treeLayer =   <Layer key={ treeObj.id } id={ treeObj.id.toString() } type="circle" paint={{'circle-radius': 5, 'circle-color': color, 'circle-stroke-color': 'black', 'circle-opacity': 1,}}
          source={geoJSON.props.children[1].props.id}
        />
        treeLayers.push(treeLayer)
      })
    }
    // pulled the following interpolate functions from here: https://graphicdesign.stackexchange.com/questions/83866/generating-a-series-of-colors-between-two-colors
    function interpolateColor(color1, color2, factor) {
      if (arguments.length < 3) {
          factor = 0.5;
      }
      var result = color1.slice();
      for (var i = 0; i < 3; i++) {
          result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
      }
      return result;
    };
    function interpolateColors(color1, color2, steps) {
      var stepFactor = 1 / (steps - 1),
      color1 = color1.match(/\d+/g).map(Number);
      color2 = color2.match(/\d+/g).map(Number);

      for(var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
      }
    }


    const boundingFeature = turf.polygon([[
      [bounding.left, bounding.top],
      [bounding.right, bounding.top],
      [bounding.right, bounding.bottom],
      [bounding.left, bounding.bottom],
      [bounding.left, bounding.top]
    ]], { name: 'Bounding Area' });

    // the order of these function calls matters
    interpolateColors("rgb(255,255,255)", "rgb(0,100,0)", 70);
    treeCircleMaker();
    // getting an error logged to console when changing between sights and is related to this post:
    // https://github.com/alex3165/react-mapbox-gl/pull/500
    // https://github.com/alex3165/react-mapbox-gl/pull/530
    return (
      <Map { ...this.props }>
          <Sources>
            <GeoJSON id="bounding-box" data={ boundingFeature } />
          </Sources>
          { geoJsonSources.map( (geojsontree, index) => {
            return [geojsontree.props.children[1]]
          })}
          { treeLayers.map( (tree) => {
            return [tree]
          })}
        <Layer
          id="bounding-box"
          type="line"
          paint={{
            'line-width': 2,
            'line-color': '#fff',
            'line-opacity': 1,
          }}
          source="bounding-box"
        />
        <Layer
          id="bounding-fill"
          type="fill"
          paint={{
            'fill-color': 'grey',
            'fill-opacity': 0.3,
          }}
          source="bounding-box"
        />

      </Map>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSite: state.sites.byId[state.sites.selected],
    trees: state.trees.byId,
    center: state.map.center,
    zoom: state.map.zoom
  };
}

const mapDispatchToProps = {
  centerMapOnSite,
  mapSetCenter,
  mapSetZoom
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMap);
