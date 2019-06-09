import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Vector } from 'ol/source';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-positioning',
  templateUrl: './positioning.component.html',
  styleUrls: ['./positioning.component.scss']
})
export class PositioningComponent implements OnInit {
  map: Map;
  source: XYZ;
  layer: TileLayer;
  view: View;
  currLng = 0;
  currLat = 0;
  markerSource: Vector;
  mlayer: VectorLayer;

  constructor() {}

  ngOnInit() {
    this.markerSource = new Vector();

    this.source = new XYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new TileLayer({
      source: this.source
    });

    this.view = new View({
      center: fromLonLat([6.661594, 50.433237]),
      zoom: 10
    });

    this.map = new Map({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });

    this.mlayer = new VectorLayer({ source: this.markerSource });

    this.map.addLayer(this.mlayer);

    this.map.on('click', this.onClick.bind(this));
  }

  onClick(event: any) {
    const lonLat = toLonLat(event.coordinate);
    this.SetMarker(lonLat[1], lonLat[0]);
  }

  SetMarker(currLng: number, currLat: number) {
    this.onClearSettings();

    if (currLng !== 0 && currLat !== 0) {
      let marker2 = new Feature({
        geometry: new Point(fromLonLat([currLat, currLng]))
      });

      this.markerSource.addFeature(marker2);

      var view = this.map.getView();
      view.setCenter(fromLonLat([currLat, currLng]));
      view.setZoom(10);
    }
  }
  onShowCurrentPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.currLat = position.coords.latitude;
          this.currLng = position.coords.longitude;
        },
        error => {
          alert('ERROR: ' + error.message);
        },
        options
      );
    } else {
      alert('Geolocation is not supported!.');
    }

    this.SetMarker(this.currLat, this.currLng);
  }

  onClearSettings() {
    let layers = this.map.getLayers();

    let features = this.markerSource.getFeatures();

    features.forEach(feature => {
      this.markerSource.removeFeature(feature);
    });
  }

  OnSetHome() {}
  OnSetDestination() {}
}
