import { useRef, useEffect, memo } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '@hooks/use-map';
import { Offer } from '@type/offer';
import { City } from '@type/city';
import URL_MARKER_DEFAULT from '@assets/pin.svg';
import URL_MARKER_CURRENT from '@assets/pin-active.svg';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  extraClass: string;
  city: City;
  offers: Offer[];
  selectedOfferId?: string | null;
};

const defaultMarkerIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentMarkerIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map(props: MapProps): JSX.Element {
  const {extraClass, city, offers, selectedOfferId} = props;
  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

  useEffect(() => {
    if (map && city) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            offer.id === selectedOfferId ? currentMarkerIcon : defaultMarkerIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [extraClass, map, offers, selectedOfferId]);

  return <section className={`${extraClass}__map map`} ref={mapRef} data-testid='map'/>;
}

const MemorizedMap = memo(Map);
export default MemorizedMap;
