$().ready(function () {
    vueFountains();
});

function vueFountains() {
    Vue.component('demo-grid', {
        template: '#grid-template',
        props: {
            data: Array,
        },
    })

    // bootstrap the demo
    var validfountains = new Vue({
        el: '#validfountains',
        data: {
            Fountains: []
        },
        mounted: function ()
        {
            var self = this;
            $.ajax
                    ({
                        url: './pages/ajaxCall.php',
                        type: 'post',
                        data: {getFountainsAdmin: 1, active: 1},
                        success: function (data)
                        {
                            self.Fountains = JSON.parse(data);
                        }
                    });
        }
    })

    // bootstrap the demo
    var unvalidfountains = new Vue({
        el: '#unvalidfountains',
        data: {
            Fountains: []
        },
        mounted: function ()
        {
            var self = this;
            $.ajax
                    ({
                        url: './pages/ajaxCall.php',
                        type: 'post',
                        data: {getFountainsAdmin: 1, active: 0},
                        success: function (data)
                        {
                            self.Fountains = JSON.parse(data);
                        }
                    });
        }
    })
}