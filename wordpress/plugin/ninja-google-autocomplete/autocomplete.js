jQuery(document).ready(function ($) {

    let mapsLoaded = false;
    let mapsLoading = false;

    function mapsAvailable() {
        return (
            window.google &&
            google.maps &&
            google.maps.places &&
            typeof google.maps.places.Autocomplete === 'function'
        );
    }

    function loadGoogleMaps(callback) {

        // Reuse existing Maps
        if (mapsAvailable()) {
            mapsLoaded = true;
            callback();
            return;
        }

        if (mapsLoading) {
            return;
        }

        mapsLoading = true;

        const script = document.createElement('script');
        script.src =
            'https://maps.googleapis.com/maps/api/js?key=' +
            NF_GMAPS.apiKey +
            '&libraries=places';
        script.async = true;
        script.defer = true;

        script.onload = function () {
            mapsLoaded = true;
            callback();
        };

        document.head.appendChild(script);
    }

    function initAutocomplete() {

        if (!mapsLoaded || !mapsAvailable()) {
            return;
        }

        $('.nf-google-address').each(function () {

            // ✅ Ensure real text input
            if (
                this.tagName !== 'INPUT' ||
                this.type !== 'text'
            ) {
                return;
            }

            if ($(this).data('autocomplete-loaded')) {
                return;
            }

            // Placeholder
            if (!this.placeholder) {
                this.placeholder = NF_GMAPS.placeholder;
            }

            const autocomplete =
                new google.maps.places.Autocomplete(this, {
                    types: ['geocode']
                });

            $(this).data('autocomplete-loaded', true);

            autocomplete.addListener('place_changed', function () {
                const place = autocomplete.getPlace();
                // console.log(place);
            });

        });
    }

    function start() {
        loadGoogleMaps(initAutocomplete);
    }

    // Initial load
    start();

    // Ninja Forms AJAX / multi-step support
    $(document).on('nfFormReady nfAfterFieldAdded', function () {
        start();
    });

});
