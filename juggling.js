
const hx=20, hw=50, hh=20, hsep = 150;  // hand width,height,separation

const // frozen initial state (so we can reset later)
  hands0 = [{x:hx, y:100, a:15},
            {x:hx+hsep, y:100, a:-15}],
  balls0 = [{x:hx+15, y:95, c:'red'},
            {x:hx+hsep+25, y:95, c:'gold'},
            {x:hx+hsep+35, y:95, c:'lime'}];

let hands = [], balls=[]; // mutable copies

function copy(x) { return JSON.parse(JSON.stringify(x)); }

function reset(){

  // reset the scene:
  hands = copy(hands0); balls = copy(balls0);

  // draw the balls
  let svg = d3.select('svg');
  svg.selectAll('circle').data(balls).enter().append('circle')
    .attrs({cx:d=>d.x, cy:d=>d.y, r:10, fill:d=>d.c, stroke:'black'});

  // draw the hands
  svg.selectAll('rect').data(hands).enter().append('rect')
    .attrs({x:d=>d.x, y:d=>d.y, width:hw, height:hh, stroke:'black', fill:'#33ccff',
      transform: function(d){
        let cx = d.x+(hw/2), cy = d.y+(hh/2);  // rotate around center of rectangle
        return 'rotate(' + [d.a, cx, cy].join(',') + ')';
      }
    });
}

function tossRight() { console.log('tossRight!'); }

function tossLeft() { console.log('tossLeft!'); }

function cross(){ console.log('cross!'); }

function juggle(){ console.log('juggle!'); }

d3.select('#buttons').selectAll('button')
  .data([reset, tossRight, tossLeft, cross, juggle]).enter()
  .append('button').text(d=>d.name).each(function(d){
    d3.select(this).on('click', function(e){
      d(e); // call the actual function
    })
  });

reset();
