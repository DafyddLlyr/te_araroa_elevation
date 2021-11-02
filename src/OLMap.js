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

function OLMap() {

  const vector = new VectorLayer({
    source: new VectorSource({
      url: '../data/te_araroa.gpx',
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

  vector.getSource().on('addfeature', function(){
    map.getView().fit(vector.getSource().getExtent(), {padding: [30, 30, 40, 30]});
  });

  const map = new Map({
    target: 'map',
    layers: [
      xyz,
      vector,
    ],
    view: new View({
      // projection: 'EPSG:3857',
      center: [0, 0],
      zoom: 2
    }),
  })
  

  return (
    <div id="map"></div>
  )
}

export default OLMap;