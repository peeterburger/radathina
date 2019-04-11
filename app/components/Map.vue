<template>
    <GridLayout rows="auto,auto">
        <Label class="message" text="TEST" col="0" row="0" />
        <Mapbox
            accessToken="pk.eyJ1IjoicGVldGVyYnVyZ2VyIiwiYSI6ImNqdWQzdmxsYTBlMHE0M3J5ZjB3OGR3dzMifQ.Yigck3lKL1Vg41zYYQeUoQ"
            mapStyle="traffic_day"
            latitude="37.7397"
            longitude="-121.4252"
            hideCompass="true"
            zoomLevel="12"
            showUserLocation="false"
            disableZoom="false"
            disableRotation="false"
            disableScroll="false"
            disableTilt="false"
            @mapReady="onMapReady($event)" >
        </Mapbox>
	</GridLayout>
</template>

<script>
    import * as utils from "utils/utils";
    export default {
        data () {
            return { };
        },
        methods: {
            onMapReady(args) {
                args.map.addMarkers([
                    {
                        lat: 37.7397,
                        lng: -121.4252,
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    }
                ]);
            }
        }
    };
</script>