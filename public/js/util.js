(function() {
    function distance(p1, p2) {
        return Math.sqrt(square(p1.x - p2.x) + square(p1.y - p2.y));
    }
    function square(x) {
        x = x * 1;
        return x * x;
    }
    function die(x) {
        var arr = [];
        for (var i = 0; i < x; i++) {
            arr.push(Math.floor(Math.random() * 6) + 1);
        }
        return arr;
    }
    module.exports.distance = distance;
    module.exports.square = square;
    module.exports.die = die;
})();
