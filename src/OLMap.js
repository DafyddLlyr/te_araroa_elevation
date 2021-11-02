import Map from 'ol/Map'
import View from 'ol/View'
import './map.css';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GPX from 'ol/format/GPX';

import { Stroke, Style } from 'ol/style';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef, useState } from 'react';
// import gpxFile from './data/te_araroa.gpx';

function OLMap() {

  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const mapElement = useRef()

  useEffect(() => {

  const initalFeaturesLayer = new VectorLayer({
    source: new VectorSource({
      url: 'https://raw.githubusercontent.com/DafyddLlyr/te_araroa_elevation/dist/data/te_araroa.gpx',
      format: new GPX(),
    }),
    style: new Style({
      stroke: new Stroke({
        color: '#00008b',
        width: 2,
      }),
    })
  });

  const xyz = new TileLayer({
    source: new XYZ({
      url: 'http://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=65ab1b168fd9462989598e6d7c5405b3/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png',
    })
  });

  const initialMap  = new Map({
    target: mapElement.current,
    layers: [
      xyz,
      initalFeaturesLayer,
    ],
    view: new View({
      // projection: 'EPSG:3857',
      center: [0, 0],
      zoom: 2
    }),
  })
  setMap(initialMap)
  setFeaturesLayer(initalFeaturesLayer)
  }, [])

  useEffect(() => {
    if (featuresLayer) {
      featuresLayer.getSource().on('addfeature', function(){
        map.getView().fit(featuresLayer.getSource().getExtent(), {padding: [30, 30, 40, 30]});
      });
    }

  })

  return (
    <div ref={mapElement} id="map"></div>
  )
}

export default OLMap;