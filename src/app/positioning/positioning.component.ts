import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

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

  constructor() {}

  ngOnInit() {
    this.source = new XYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new TileLayer({
      source: this.source
    });

    this.view = new View({
      center: fromLonLat([6.661594, 50.433237]),
      zoom: 3
    });

    this.map = new Map({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }
}
