import { Component, ViewChild, ElementRef } from '@angular/core';
import {  NavController, NavParams, ToastController, Content } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('mapCanvas') mapElement: ElementRef;
    vendorDetails: any;
    lat: any;
    lng: any;

  constructor(public nav: NavController, public params: NavParams) {
      this.lat = params.data.lat;
      this.lng = params.data.lng;
  }

  ionViewDidLoad() {
      var name = 'Location';
      var lat = this.lat;
      var lan = this.lng;

      let mapEle = this.mapElement.nativeElement;
      let mapData = [{
          "name": name,
          "lat": lat,
          "lng": lan,
          "center": true
      }];
      let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 15
      });
      mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
              content: `<h5>${markerData.name}</h5>`
          });
          let marker = new google.maps.Marker({
              position: markerData,
              map: map,
              title: markerData.name
          });
          marker.addListener('click', () => {
              infoWindow.open(map, marker);
          });
      });
      google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
      });
  }

  goBack(){
    this.nav.pop();
  }
}
