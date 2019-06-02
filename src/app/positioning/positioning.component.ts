import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private toastr: ToastrService) {}

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

    // navigator.geolocation.getCurrentPosition(this.onMapSuccess, this.onMapError, { enableHighAccuracy: true });
  }

  onShowCurrentPosition() {
    this.toastr.info('Hello!', 'Thanks!');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    alert('lat: ' + this.currLat + ', ' + 'lon: ' + this.currLng);

    let marker2 = new Feature({
      geometry: new Point(fromLonLat([this.currLng, this.currLat]))
    });

    this.markerSource.addFeature(marker2);

    this.mlayer = new VectorLayer({ source: this.markerSource });

    this.map.addLayer(this.mlayer);

    var view = this.map.getView();
    view.setCenter(fromLonLat([this.currLng, this.currLat]));
    view.setZoom(10);
  }
}
