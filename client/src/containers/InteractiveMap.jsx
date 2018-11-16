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

    let treeMap = () => {
      trees.map( (tree) => {
        let treeObj = {...allTrees[tree]}
        // console.log([treeObj.long, treeObj.lat]);
        coordinatesArray.push([treeObj.long, treeObj.lat])
        // console.log(coordinatesArray)
      })
    }

    const boundingFeature = turf.polygon([[
      [bounding.left, bounding.top],
      [bounding.right, bounding.top],
      [bounding.right, bounding.bottom],
      [bounding.left, bounding.bottom],
      [bounding.left, bounding.top]
    ]], { name: 'Bounding Area' });

    let coordinates = [-123.18727286009813, 49.38710261999775]
    let coordinates2 = [-123.18463152343836, 49.38604381672198]
    // let options = {name: 'Circle'};

    let treeFeature = turf.point( coordinates );
    let treeFeature2 = turf.point( coordinates2 );

    let treeMaker = () => {
      coordinatesArray.forEach( (latlong, index) => {
        // console.log([parseFloat(latlong[0]), parseFloat(latlong[1])])
        let newCoordinates = [parseFloat(latlong[0]), parseFloat(latlong[1])]
        let options = {name: 'Circle'};
        let treeCircle = turf.point(newCoordinates, options);
        // console.log(treeCircle)
        let geoJSON =  <GeoJSON id="tree-objects" data={ treeCircle } />

        console.log(geoJSON.props.id)


        // return geoJSON.props.id
        return <Layer key={index} id="treeCircle" type="circle" paint={{'circle-radius': 5, 'circle-color': 'white', 'circle-stroke-color': 'black', 'circle-opacity': 0.8,}} source={geoJSON.props.id} />
      })
    };
    console.log(treeMaker());
    treeMap();

    return (
      <Map { ...this.props }>
          <Sources>
            <GeoJSON id="bounding-box" data={ boundingFeature } />
            <GeoJSON id="tree-object" data={ treeFeature } />
            <GeoJSON id="tree-object2" data={ treeFeature2 } />
          </Sources>
        <Layer
          id="treeCircle"
          type="circle"
          paint={{
            'circle-radius': 5,
            'circle-color': 'white',
            'circle-stroke-color': 'black',
            'circle-opacity': 0.8,
          }}
          source="tree-object"
        />
        <Layer
          id="treeCircle2"
          type="circle"
          paint={{
            'circle-radius': 5,
            'circle-color': 'white',
            'circle-stroke-color': 'black',
            'circle-opacity': 0.8,
          }}
          source="tree-object2"
        />
        { treeMaker() }
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
