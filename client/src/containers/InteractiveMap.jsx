import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as turf from '@turf/turf';

import Map, { Layer, Sources, GeoJSON } from '../components/map';

import { centerMapOnSite, mapSetCenter, mapSetZoom } from '../model/map';

class InteractiveMap extends Component {
  render() {
    const { bounding } = this.props.currentSite;
    const { trees } = this.props.currentSite

    let treeMap = () => {
      trees.map( (tree) => {
        let treeObj = {...allTrees[tree]}
        console.log(treeObj.lat);
        return treeObj.lat
      })
    }
    // console.log(trees)

    const allTrees = {...this.props.trees};
    let { height, lat, long, type } = allTrees
    // console.log({...allTrees[1975].lat});


    const boundingFeature = turf.polygon([[
      [bounding.left, bounding.top],
      [bounding.right, bounding.top],
      [bounding.right, bounding.bottom],
      [bounding.left, bounding.bottom],
      [bounding.left, bounding.top]
    ]], { name: 'Bounding Area' });

    let coordinates = [-123.18727286009813, 49.38710261999775]
    let radius =  2;
    let options = {name: 'Circle'};

    let treeFeature = turf.point(
      coordinates, options );

    treeMap();

    // let treeMap = this.props.trees.map( tree => {

      return (
        <Map { ...this.props }>
          <Sources>
            <GeoJSON id="bounding-box" data={ boundingFeature } />
            <GeoJSON id="tree-objects" data={ treeFeature } />
            {/* <GeoJSON id="tree-objects" data={ [tree.longitude, tree.latitude] } /> */}
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
            source="tree-objects"
          />
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
    // })
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
