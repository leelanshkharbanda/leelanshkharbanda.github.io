(function(){
  'use strict';
  var c=document.getElementById('trace-canvas');
  if(!c||!c.getContext) return;
  var ctx=c.getContext('2d',{alpha:false});
  if(!ctx) return;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  var w=0,h=0,phase=0,target=0,raf=0,visible=false;
  function size(){
    var dpr=Math.min(window.devicePixelRatio||1,2);
    w=Math.max(1,window.innerWidth); h=Math.max(1,window.innerHeight);
    c.width=Math.round(w*dpr); c.height=Math.round(h*dpr);
    c.style.width=w+'px'; c.style.height=h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    draw();
  }
  function draw(){
    ctx.fillStyle='#0b0d0f'; ctx.fillRect(0,0,w,h);
    var base=h*.62,i,x,u,env,y;
    ctx.beginPath();
    for(i=0;i<=w;i+=4){
      x=i; u=x/w;
      env=Math.exp(-Math.abs(u-.5)*5);
      y=base+Math.sin(u*22+phase)*34*env+Math.sin(u*7-phase*.6)*12;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(255,122,86,.22)'; ctx.lineWidth=1; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w*target,0); ctx.lineTo(w*target,h);
    ctx.strokeStyle='rgba(242,239,232,.13)'; ctx.stroke();
  }
  function tick(){ phase+=.012; draw(); raf=window.requestAnimationFrame(tick); }
  function start(){ if(!raf&&!reduce.matches&&visible) raf=window.requestAnimationFrame(tick); }
  function stop(){ if(raf){window.cancelAnimationFrame(raf);raf=0;} }
  function scroll(){
    var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    target=Math.min(1,Math.max(0,window.scrollY/max));
    phase=target*6.283;
    if(!raf) draw();
  }
  function motion(){ if(reduce.matches){stop();draw();} else start(); }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){ visible=entries[0].isIntersecting; if(visible) start(); else stop(); },{threshold:0});
    io.observe(c);
  } else { visible=true; }
  window.addEventListener('resize',size,{passive:true});
  window.addEventListener('scroll',scroll,{passive:true});
  if(reduce.addEventListener) reduce.addEventListener('change',motion);
  else if(reduce.addListener) reduce.addListener(motion);
  size(); scroll(); motion();
})();
