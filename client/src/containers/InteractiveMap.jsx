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
    // let { height, lat, long, type } = allTrees
    let coordinatesArray = []
    let geoJsonSources = []
    let treeLayers = []

    let treeMap = () => {
      trees.map( (tree) => {
        let treeObj = {...allTrees[tree]}
        // could also store treeObj.height etc
        coordinatesArray.push([treeObj.long, treeObj.lat])
      })
    }

    let treeMaker = () => {
      coordinatesArray.forEach( (latlong, index) => {
        let newCoordinates = [parseFloat(latlong[0]), parseFloat(latlong[1])]
        let options = {name: 'Circle'};
        let treeCircle = turf.point(newCoordinates, options);
        let geoJSON =  <Sources> <GeoJSON key={ index } id={ index.toString() } data={ treeCircle } /> </Sources>
        geoJsonSources.push(geoJSON)

        let treeLayer =   <Layer key={index} id={ index.toString() } type="circle" paint={{'circle-radius': 5, 'circle-color': 'white', 'circle-stroke-color': 'black', 'circle-opacity': 0.8,}}
          source={geoJSON.props.children[1].props.id}
        />
        treeLayers.push(treeLayer)
      })
    };

    let interpolatedColorArray = [];
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

    interpolateColors("rgb(255,255,255)", "rgb(0,100,0)", 70);
    console.log(interpolatedColorArray[1][0]);

    const boundingFeature = turf.polygon([[
      [bounding.left, bounding.top],
      [bounding.right, bounding.top],
      [bounding.right, bounding.bottom],
      [bounding.left, bounding.bottom],
      [bounding.left, bounding.top]
    ]], { name: 'Bounding Area' });


    treeMap();
    treeMaker();
    // there is a way to simplify treeMap and treeMaker into one function, or not have a function at all and simply do these mappings directly inside the return function and return the Source and Layer jsx objects
    return (
      <Map { ...this.props }>
          <Sources>
            <GeoJSON id="bounding-box" data={ boundingFeature } />
          </Sources>
          { geoJsonSources.map( (geojsontree, index) => {
            // console.log(geojsontree.props.children[1])
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
            'fill-opacity': 0.5,
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
