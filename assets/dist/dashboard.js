/*! pace 0.4.16 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q=[].slice,R={}.hasOwnProperty,S=function(a,b){function c(){this.constructor=a}for(var d in b)R.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},T=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};s={catchupTime:500,initialRate:.03,minTime:500,ghostTime:500,maxProgressPerFrame:10,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!1}},A=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance?"function"==typeof performance.now?performance.now():void 0:void 0)?a:+new Date},C=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,r=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==C&&(C=function(a){return setTimeout(a,50)},r=function(a){return clearTimeout(a)}),E=function(a){var b,c;return b=A(),c=function(){var d;return d=A()-b,d>=33?(b=A(),a(d,function(){return C(c)})):setTimeout(c,33-d)},c()},D=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?Q.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},t=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?Q.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)R.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?t(b[a],e):b[a]=e);return b},o=function(a){var b,c,d,e,f;for(c=b=0,e=0,f=a.length;f>e;e++)d=a[e],c+=Math.abs(d),b++;return c/b},v=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},null==window.Pace&&(window.Pace={}),B=Pace.options=t(s,window.paceOptions,v()),h=function(a){function b(){return O=b.__super__.constructor.apply(this,arguments)}return S(b,a),b}(Error),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;if(null==this.el){if(a=document.querySelector(B.target),!a)throw new h;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace("pace-done",""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)}return this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(a){h=a}return this.el=void 0},a.prototype.render=function(){var a,b;return null==document.querySelector(B.target)?!1:(a=this.getElement(),a.children[0].style.width=""+this.progress+"%",(!this.lastRenderedProgress||0|(this.lastRenderedProgress|0!==this.progress))&&(a.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?b="99":(b=this.progress<10?"0":"",b+=0|this.progress),a.children[0].setAttribute("data-progress",""+b)),this.lastRenderedProgress=this.progress)},a.prototype.done=function(){return this.progress>=100},a}(),g=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),L=window.XMLHttpRequest,K=window.XDomainRequest,J=window.WebSocket,u=function(a,b){var c,d,e,f;f=[];for(d in b.prototype)try{e=b.prototype[d],null==a[d]&&"function"!=typeof e?f.push(a[d]=e):f.push(void 0)}catch(g){c=g}return f},y=[],Pace.ignore=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?Q.call(arguments,1):[],y.unshift("ignore"),c=b.apply(null,a),y.shift(),c},Pace.track=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?Q.call(arguments,1):[],y.unshift("track"),c=b.apply(null,a),y.shift(),c},G=function(a){var b;if(null==a&&(a="GET"),"track"===y[0])return"force";if(!y.length&&B.ajax){if("socket"===a&&B.ajax.trackWebSockets)return!0;if(b=a.toUpperCase(),T.call(B.ajax.trackMethods,b)>=0)return!0}return!1},i=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){return G(d)&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new L(b),a(c),c},u(window.XMLHttpRequest,L),null!=K&&(window.XDomainRequest=function(){var b;return b=new K,a(b),b},u(window.XDomainRequest,K)),null!=J&&B.ajax.trackWebSockets&&(window.WebSocket=function(a,b){var d;return d=new J(a,b),G("socket")&&c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d},u(window.WebSocket,J))}return S(b,a),b}(g),M=null,w=function(){return null==M&&(M=new i),M},w().on("request",function(b){var c,d,e,f;return f=b.type,e=b.request,Pace.running||B.restartOnRequestAfter===!1&&"force"!==G(f)?void 0:(d=arguments,c=B.restartOnRequestAfter||0,"boolean"==typeof c&&(c=0),setTimeout(function(){var b,c,g,h,i,j,k;if(c="socket"===f?e.readyState<2:0<(i=e.readyState)&&4>i){for(Pace.restart(),j=Pace.sources,k=[],g=0,h=j.length;h>g;g++){if(b=j[g],b instanceof a){b.watch.apply(b,d);break}k.push(void 0)}return k}},c))}),a=function(){function a(){var a=this;this.elements=[],w().on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d;return d=a.type,b=a.request,c="socket"===d?new l(b):new m(b),this.elements.push(c)},a}(),m=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2}),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100});else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),l=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100})}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},B.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d,e,f=this;this.progress=0,a=0,e=[],d=0,c=A(),b=setInterval(function(){var g;return g=A()-c-50,c=A(),e.push(g),e.length>B.eventLag.sampleCount&&e.shift(),a=o(e),++d>=B.eventLag.minSamples&&a<B.eventLag.lagThreshold?(f.progress=100,clearInterval(b)):f.progress=100*(3/(a+3))},50)}return a}(),k=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=B.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=D(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=D(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/B.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,B.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+B.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),H=null,F=null,p=null,I=null,n=null,q=null,Pace.running=!1,x=function(){return B.restartOnPushState?Pace.restart():void 0},null!=window.history.pushState&&(N=window.history.pushState,window.history.pushState=function(){return x(),N.apply(window.history,arguments)}),null!=window.history.replaceState&&(P=window.history.replaceState,window.history.replaceState=function(){return x(),P.apply(window.history,arguments)}),j={ajax:a,elements:d,document:c,eventLag:f},(z=function(){var a,c,d,e,f,g,h,i,l;for(Pace.sources=H=[],h=["ajax","elements","document","eventLag"],d=0,f=h.length;f>d;d++)c=h[d],B[c]!==!1&&H.push(new j[c](B[c]));for(l=null!=(i=B.extraSources)?i:[],e=0,g=l.length;g>e;e++)a=l[e],H.push(new a(B));return Pace.bar=p=new b,F=[],I=new k})(),Pace.stop=function(){return Pace.running=!1,p.destroy(),q=!0,null!=n&&("function"==typeof r&&r(n),n=null),z()},Pace.restart=function(){return Pace.stop(),Pace.start()},Pace.go=function(){return Pace.running=!0,p.render(),q=!1,n=E(function(a,b){var c,d,e,f,g,h,i,j,l,m,n,o,r,s,t,u,v,w;for(j=100-p.progress,d=r=0,e=!0,h=s=0,u=H.length;u>s;h=++s)for(n=H[h],m=null!=F[h]?F[h]:F[h]=[],g=null!=(w=n.elements)?w:[n],i=t=0,v=g.length;v>t;i=++t)f=g[i],l=null!=m[i]?m[i]:m[i]=new k(f),e&=l.done,l.done||(d++,r+=l.tick(a));return c=r/d,p.update(I.tick(a,c)),o=A(),p.done()||e||q?(p.update(100),setTimeout(function(){return p.finish(),Pace.running=!1},Math.max(B.ghostTime,Math.min(B.minTime,A()-o)))):b()})},Pace.start=function(a){t(B,a),Pace.running=!0;try{p.render()}catch(b){h=b}return document.querySelector(".pace")?Pace.go():setTimeout(Pace.start,50)},"function"==typeof define&&define.amd?define(function(){return Pace}):"object"==typeof exports?module.exports=Pace:B.startOnPageLoad&&Pace.start()}).call(this);;(function(){(function(e,c,a){var b,f,d;d="shapeshift";f={selector:"*",enableDrag:true,enableCrossDrop:true,enableResize:true,enableTrash:false,align:"center",colWidth:null,columns:null,minColumns:1,autoHeight:true,maxHeight:null,minHeight:100,gutterX:10,gutterY:10,paddingX:10,paddingY:10,animated:true,animateOnInit:false,animationSpeed:225,animationThreshold:100,dragClone:false,deleteClone:true,dragRate:100,dragWhitelist:"*",crossDropWhitelist:"*",cutoffStart:null,cutoffEnd:null,handle:false,cloneClass:"ss-cloned-child",activeClass:"ss-active-child",draggedClass:"ss-dragged-child",placeholderClass:"ss-placeholder-child",originalContainerClass:"ss-original-container",currentContainerClass:"ss-current-container",previousContainerClass:"ss-previous-container"};b=(function(){function g(i,h){this.element=i;this.options=e.extend({},f,h);this.globals={};this.$container=e(i);if(this.errorCheck()){this.init()}}g.prototype.errorCheck=function(){var h,j,k,i;i=this.options;k=false;j="Shapeshift ERROR:";if(i.colWidth===null){h=this.$container.children(i.selector);if(h.length===0){k=true;console.error(""+j+" option colWidth must be specified if Shapeshift is initialized with no active children.")}}return !k};g.prototype.init=function(){this.createEvents();this.setGlobals();this.setIdentifier();this.setActiveChildren();this.enableFeatures();this.gridInit();this.render();return this.afterInit()};g.prototype.createEvents=function(){var i,h,j=this;h=this.options;i=this.$container;i.off("ss-arrange").on("ss-arrange",function(l,k){if(k==null){k=false}return j.render(false,k)});i.off("ss-rearrange").on("ss-rearrange",function(){return j.render(true)});i.off("ss-setTargetPosition").on("ss-setTargetPosition",function(){return j.setTargetPosition()});return i.off("ss-destroy").on("ss-destroy",function(){return j.destroy()})};g.prototype.setGlobals=function(){return this.globals.animated=this.options.animateOnInit};g.prototype.afterInit=function(){return this.globals.animated=this.options.animated};g.prototype.setIdentifier=function(){this.identifier="shapeshifted_container_"+Math.random().toString(36).substring(7);return this.$container.addClass(this.identifier)};g.prototype.enableFeatures=function(){if(this.options.enableResize){this.enableResize()}if(this.options.enableDrag||this.options.enableCrossDrop){return this.enableDragNDrop()}};g.prototype.setActiveChildren=function(){var s,p,h,j,o,q,t,r,m,l,n,k;t=this.options;s=this.$container.children(t.selector);p=t.activeClass;r=s.length;for(o=m=0;0<=r?m<r:m>r;o=0<=r?++m:--m){e(s[o]).addClass(p)}this.setParsedChildren();j=t.columns;k=[];for(o=l=0,n=this.parsedChildren.length;0<=n?l<n:l>n;o=0<=n?++l:--l){h=this.parsedChildren[o].colspan;q=t.minColumns;if(h>j&&h>q){t.minColumns=h;k.push(console.error("Shapeshift ERROR: There are child elements that have a larger colspan than the minimum columns set through options.\noptions.minColumns has been set to "+h))}else{k.push(void 0)}}return k};g.prototype.setParsedChildren=function(){var m,h,o,j,n,k,l;h=this.$container.find("."+this.options.activeClass).filter(":visible");k=h.length;n=[];for(j=l=0;0<=k?l<k:l>k;j=0<=k?++l:--l){m=e(h[j]);o={i:j,el:m,colspan:parseInt(m.attr("data-ss-colspan"))||1,height:m.outerHeight()};n.push(o)}return this.parsedChildren=n};g.prototype.gridInit=function(){var i,h,k,j,l;j=this.options.gutterX;if(!(this.options.colWidth>=1)){k=this.parsedChildren[0];h=k.el.outerWidth();i=k.colspan;l=(h-((i-1)*j))/i;return this.globals.col_width=l+j}else{return this.globals.col_width=this.options.colWidth+j}};g.prototype.render=function(i,h){if(i==null){i=false}this.setGridColumns();return this.arrange(i,h)};g.prototype.setGridColumns=function(){var p,o,j,l,i,n,h,m,q,k;l=this.globals;q=this.options;o=l.col_width;n=q.gutterX;k=q.paddingX;h=this.$container.innerWidth()-(k*2);m=q.minColumns;j=q.columns||Math.floor((h+n)/o);if(m&&m>j){j=m}l.columns=j;p=this.parsedChildren.length;if(j>p){j=p}l.child_offset=k;switch(q.align){case"center":i=(j*o)-n;return l.child_offset+=(h-i)/2;case"right":i=(j*o)-n;return l.child_offset+=h-i}};g.prototype.arrange=function(m,y){var z,v,x,h,r,o,s,q,n,w,j,u,B,p,A,t,l,k;if(m){this.setParsedChildren()}n=this.globals;p=this.options;v=this.$container;o=this.getPositions();A=this.parsedChildren;l=A.length;x=n.animated&&l<=p.animationThreshold;h=p.animationSpeed;q=p.draggedClass;for(w=k=0;0<=l?k<l:k>l;w=0<=l?++k:--k){z=A[w].el;r=o[w];j=z.hasClass(q);if(j){t=p.placeholderClass;z=z.siblings("."+t)}if(x&&!j){z.stop(true,false).animate(r,h,function(){})}else{z.css(r)}}if(y){if(x){setTimeout((function(){return v.trigger("ss-drop-complete")}),h)}else{v.trigger("ss-drop-complete")}}v.trigger("ss-arranged");if(p.autoHeight){s=n.container_height;u=p.maxHeight;B=p.minHeight;if(B&&s<B){s=B}else{if(u&&s>u){s=u}}return v.height(s)}};g.prototype.getPositions=function(v){var n,y,q,o,l,z,h,w,m,t,B,p,A,x,s,k,j,r,u=this;if(v==null){v=true}l=this.globals;m=this.options;h=m.gutterY;t=m.paddingY;o=m.draggedClass;B=this.parsedChildren;k=B.length;n=[];for(w=j=0,r=l.columns;0<=r?j<r:j>r;w=0<=r?++j:--j){n.push(t)}x=function(I){var D,H,C,G,E,F,i;D=I.col;H=I.colspan;G=(I.col*l.col_width)+l.child_offset;E=n[D];p[I.i]={left:G,top:E};n[D]+=I.height+h;if(H>=1){i=[];for(C=F=1;1<=H?F<H:F>H;C=1<=H?++F:--F){i.push(n[D+C]=n[D])}return i}};y=function(i){var N,E,C,M,I,D,H,L,J,K,G,F;J=n.length-i.colspan+1;L=n.slice(0).splice(0,J);N=void 0;for(H=G=0;0<=J?G<J:G>J;H=0<=J?++G:--G){E=u.lowestCol(L,H);C=i.colspan;M=n[E];I=true;for(K=F=1;1<=C?F<C:F>C;K=1<=C?++F:--F){D=n[E+K];if(M<D){I=false;break}}if(I){N=E;break}}return N};s=[];A=function(){var J,i,E,I,K,G,D,H,C,F;K=[];for(I=G=0,H=s.length;0<=H?G<H:G>H;I=0<=H?++G:--G){E=s[I];E.col=y(E);if(E.col>=0){x(E);K.push(I)}}F=[];for(i=D=C=K.length-1;D>=0;i=D+=-1){J=K[i];F.push(s.splice(J,1))}return F};p=[];(q=function(){var D,C,i;i=[];for(w=C=0;0<=k?C<k:C>k;w=0<=k?++C:--C){D=B[w];if(!(!v&&D.el.hasClass(o))){if(D.colspan>1){D.col=y(D)}else{D.col=u.lowestCol(n)}if(D.col===void 0){s.push(D)}else{x(D)}i.push(A())}else{i.push(void 0)}}return i})();if(m.autoHeight){z=n[this.highestCol(n)]-h;l.container_height=z+t}return p};g.prototype.enableDragNDrop=function(){var p,v,n,y,l,t,o,w,q,z,m,s,j,x,r,k,i,h,u=this;j=this.options;v=this.$container;l=j.activeClass;m=j.draggedClass;r=j.placeholderClass;x=j.originalContainerClass;o=j.currentContainerClass;k=j.previousContainerClass;w=j.deleteClone;z=j.dragRate;q=j.dragClone;t=j.cloneClass;y=n=p=h=i=null;s=false;if(j.enableDrag){v.children("."+l).filter(j.dragWhitelist).draggable({addClasses:false,containment:"document",handle:j.handle,zIndex:9999,start:function(C,B){var A;y=e(C.target);if(q){p=y.clone(true).insertBefore(y).addClass(t)}y.addClass(m);A=y.prop("tagName");n=e("<"+A+" class='"+r+"' style='height: "+(y.height())+"px; width: "+(y.width())+"'></"+A+">");y.parent().addClass(x).addClass(o);h=y.outerHeight()/2;return i=y.outerWidth()/2},drag:function(B,A){if(!s&&!(q&&w&&e("."+o)[0]===e("."+x)[0])){n.remove().appendTo("."+o);e("."+o).trigger("ss-setTargetPosition");s=true;c.setTimeout((function(){return s=false}),z)}A.position.left=B.pageX-y.parent().offset().left-i;return A.position.top=B.pageY-y.parent().offset().top-h},stop:function(){var A,C,B;C=e("."+x);A=e("."+o);B=e("."+k);y.removeClass(m);e("."+r).remove();if(q){if(w&&e("."+o)[0]===e("."+x)[0]){p.remove();e("."+o).trigger("ss-rearrange")}else{p.removeClass(t)}}if(C[0]===A[0]){A.trigger("ss-rearranged",y)}else{C.trigger("ss-removed",y);A.trigger("ss-added",y)}C.trigger("ss-arrange").removeClass(x);A.trigger("ss-arrange",true).removeClass(o);B.trigger("ss-arrange").removeClass(k);return y=n=null}})}if(j.enableCrossDrop){return v.droppable({accept:j.crossDropWhitelist,tolerance:"intersect",over:function(A){e("."+k).removeClass(k);e("."+o).removeClass(o).addClass(k);return e(A.target).addClass(o)},drop:function(E,B){var A,D,C;if(u.options.enableTrash){D=e("."+x);A=e("."+o);C=e("."+k);y=e(B.helper);A.trigger("ss-trashed",y);y.remove();D.trigger("ss-rearrange").removeClass(x);A.trigger("ss-rearrange").removeClass(o);return C.trigger("ss-arrange").removeClass(k)}}})}};g.prototype.setTargetPosition=function(){var C,A,k,t,j,y,u,n,p,m,B,w,z,o,s,q,r,v,x,h,l,i;m=this.options;if(!m.enableTrash){p=m.draggedClass;C=e("."+p);A=C.parent();B=this.parsedChildren;j=this.getPositions(false);x=j.length;s=C.offset().left-A.offset().left+(this.globals.col_width/2);q=C.offset().top-A.offset().top+(C.height()/2);r=9999999;v=0;if(x>1){u=m.cutoffStart+1||0;y=m.cutoffEnd||x;for(z=i=u;u<=y?i<y:i>y;z=u<=y?++i:--i){t=j[z];if(t){l=s-t.left;h=q-t.top;if(l>0&&h>0){n=Math.sqrt((h*h)+(l*l));if(n<r){r=n;v=z;if(z===x-1){if(l>B[z].height/2){v++}}}}}}if(v===B.length){k=B[v-1].el;C.insertAfter(k)}else{k=B[v].el;C.insertBefore(k)}}else{if(x===1){t=j[0];if(t.left<s){this.$container.append(C)}else{this.$container.prepend(C)}}else{this.$container.append(C)}}this.arrange(true);if(A[0]!==C.parent()[0]){o=m.previousContainerClass;return e("."+o).trigger("ss-rearrange")}}else{w=this.options.placeholderClass;return e("."+w).remove()}};g.prototype.enableResize=function(){var i,j,h,k=this;i=this.options.animationSpeed;h=false;j="resize."+this.identifier;return e(c).on(j,function(){if(!h){h=true;setTimeout((function(){return k.render()}),i/3);setTimeout((function(){return k.render()}),i/3);return setTimeout(function(){h=false;return k.render()},i/3)}})};g.prototype.lowestCol=function(j,i){var h;if(i==null){i=0}h=j.map(function(l,k){return[l,k]});h.sort(function(l,k){var m;m=l[0]-k[0];if(m===0){m=l[1]-k[1]}return m});return h[i][1]};g.prototype.highestCol=function(h){return e.inArray(Math.max.apply(c,h),h)};g.prototype.destroy=function(){var h,j,i;j=this.$container;j.off("ss-arrange");j.off("ss-rearrange");j.off("ss-setTargetPosition");j.off("ss-destroy");i=this.options.activeClass;h=j.find("."+i);if(this.options.enableDrag){h.draggable("destroy")}if(this.options.enableCrossDrop){j.droppable("destroy")}h.removeClass(i);return j.removeClass(this.identifier)};return g})();return e.fn[d]=function(g){return this.each(function(){var j,h,i;h=(i=e(this).attr("class").match(/shapeshifted_container_\w+/))!=null?i[0]:void 0;if(h){j="resize."+h;e(c).off(j);e(this).removeClass(h)}return e.data(this,"plugin_"+d,new b(this,g))})}})(jQuery,window,document)}).call(this);;/*! nanoScrollerJS - v0.8.0 - 2014
* http://jamesflorentino.github.com/nanoScrollerJS/
* Copyright (c) 2014 James Florentino; Licensed MIT */
(function($, window, document) {
  "use strict";
  var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, cAF, defaults, getBrowserScrollbarWidth, hasTransform, isFFWithBuggyScrollbar, rAF, transform, _elementStyle, _prefixStyle, _vendor;
  defaults = {

    /**
      a classname for the pane element.
      @property paneClass
      @type String
      @default 'nano-pane'
     */
    paneClass: 'nano-pane',

    /**
      a classname for the slider element.
      @property sliderClass
      @type String
      @default 'nano-slider'
     */
    sliderClass: 'nano-slider',

    /**
      a classname for the content element.
      @property contentClass
      @type String
      @default 'nano-content'
     */
    contentClass: 'nano-content',

    /**
      a setting to enable native scrolling in iOS devices.
      @property iOSNativeScrolling
      @type Boolean
      @default false
     */
    iOSNativeScrolling: false,

    /**
      a setting to prevent the rest of the page being
      scrolled when user scrolls the `.content` element.
      @property preventPageScrolling
      @type Boolean
      @default false
     */
    preventPageScrolling: false,

    /**
      a setting to disable binding to the resize event.
      @property disableResize
      @type Boolean
      @default false
     */
    disableResize: false,

    /**
      a setting to make the scrollbar always visible.
      @property alwaysVisible
      @type Boolean
      @default false
     */
    alwaysVisible: false,

    /**
      a default timeout for the `flash()` method.
      @property flashDelay
      @type Number
      @default 1500
     */
    flashDelay: 1500,

    /**
      a minimum height for the `.slider` element.
      @property sliderMinHeight
      @type Number
      @default 20
     */
    sliderMinHeight: 20,

    /**
      a maximum height for the `.slider` element.
      @property sliderMaxHeight
      @type Number
      @default null
     */
    sliderMaxHeight: null,

    /**
      an alternate document context.
      @property documentContext
      @type Document
      @default null
     */
    documentContext: null,

    /**
      an alternate window context.
      @property windowContext
      @type Window
      @default null
     */
    windowContext: null
  };

  /**
    @property SCROLLBAR
    @type String
    @static
    @final
    @private
   */
  SCROLLBAR = 'scrollbar';

  /**
    @property SCROLL
    @type String
    @static
    @final
    @private
   */
  SCROLL = 'scroll';

  /**
    @property MOUSEDOWN
    @type String
    @final
    @private
   */
  MOUSEDOWN = 'mousedown';

  /**
    @property MOUSEMOVE
    @type String
    @static
    @final
    @private
   */
  MOUSEMOVE = 'mousemove';

  /**
    @property MOUSEWHEEL
    @type String
    @final
    @private
   */
  MOUSEWHEEL = 'mousewheel';

  /**
    @property MOUSEUP
    @type String
    @static
    @final
    @private
   */
  MOUSEUP = 'mouseup';

  /**
    @property RESIZE
    @type String
    @final
    @private
   */
  RESIZE = 'resize';

  /**
    @property DRAG
    @type String
    @static
    @final
    @private
   */
  DRAG = 'drag';

  /**
    @property UP
    @type String
    @static
    @final
    @private
   */
  UP = 'up';

  /**
    @property PANEDOWN
    @type String
    @static
    @final
    @private
   */
  PANEDOWN = 'panedown';

  /**
    @property DOMSCROLL
    @type String
    @static
    @final
    @private
   */
  DOMSCROLL = 'DOMMouseScroll';

  /**
    @property DOWN
    @type String
    @static
    @final
    @private
   */
  DOWN = 'down';

  /**
    @property WHEEL
    @type String
    @static
    @final
    @private
   */
  WHEEL = 'wheel';

  /**
    @property KEYDOWN
    @type String
    @static
    @final
    @private
   */
  KEYDOWN = 'keydown';

  /**
    @property KEYUP
    @type String
    @static
    @final
    @private
   */
  KEYUP = 'keyup';

  /**
    @property TOUCHMOVE
    @type String
    @static
    @final
    @private
   */
  TOUCHMOVE = 'touchmove';

  /**
    @property BROWSER_IS_IE7
    @type Boolean
    @static
    @final
    @private
   */
  BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;

  /**
    @property BROWSER_SCROLLBAR_WIDTH
    @type Number
    @static
    @default null
    @private
   */
  BROWSER_SCROLLBAR_WIDTH = null;
  rAF = window.requestAnimationFrame;
  cAF = window.cancelAnimationFrame;
  _elementStyle = document.createElement('div').style;
  _vendor = (function() {
    var i, transform, vendor, vendors, _i, _len;
    vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
    for (i = _i = 0, _len = vendors.length; _i < _len; i = ++_i) {
      vendor = vendors[i];
      transform = vendors[i] + 'ransform';
      if (transform in _elementStyle) {
        return vendors[i].substr(0, vendors[i].length - 1);
      }
    }
    return false;
  })();
  _prefixStyle = function(style) {
    if (_vendor === false) {
      return false;
    }
    if (_vendor === '') {
      return style;
    }
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
  };
  transform = _prefixStyle('transform');
  hasTransform = transform !== false;

  /**
    Returns browser's native scrollbar width
    @method getBrowserScrollbarWidth
    @return {Number} the scrollbar width in pixels
    @static
    @private
   */
  getBrowserScrollbarWidth = function() {
    var outer, outerStyle, scrollbarWidth;
    outer = document.createElement('div');
    outerStyle = outer.style;
    outerStyle.position = 'absolute';
    outerStyle.width = '100px';
    outerStyle.height = '100px';
    outerStyle.overflow = SCROLL;
    outerStyle.top = '-9999px';
    document.body.appendChild(outer);
    scrollbarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);
    return scrollbarWidth;
  };
  isFFWithBuggyScrollbar = function() {
    var isOSXFF, ua, version;
    ua = window.navigator.userAgent;
    isOSXFF = /(?=.+Mac OS X)(?=.+Firefox)/.test(ua);
    if (!isOSXFF) {
      return false;
    }
    version = /Firefox\/\d{2}\./.exec(ua);
    if (version) {
      version = version[0].replace(/\D+/g, '');
    }
    return isOSXFF && +version > 23;
  };

  /**
    @class NanoScroll
    @param element {HTMLElement|Node} the main element
    @param options {Object} nanoScroller's options
    @constructor
   */
  NanoScroll = (function() {
    function NanoScroll(el, options) {
      this.el = el;
      this.options = options;
      BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
      this.$el = $(this.el);
      this.doc = $(this.options.documentContext || document);
      this.win = $(this.options.windowContext || window);
      this.$content = this.$el.children("." + options.contentClass);
      this.$content.attr('tabindex', this.options.tabIndex || 0);
      this.content = this.$content[0];
      if (this.options.iOSNativeScrolling && (this.el.style.WebkitOverflowScrolling != null)) {
        this.nativeScrolling();
      } else {
        this.generate();
      }
      this.createEvents();
      this.addEvents();
      this.reset();
    }


    /**
      Prevents the rest of the page being scrolled
      when user scrolls the `.nano-content` element.
      @method preventScrolling
      @param event {Event}
      @param direction {String} Scroll direction (up or down)
      @private
     */

    NanoScroll.prototype.preventScrolling = function(e, direction) {
      if (!this.isActive) {
        return;
      }
      if (e.type === DOMSCROLL) {
        if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
          e.preventDefault();
        }
      } else if (e.type === MOUSEWHEEL) {
        if (!e.originalEvent || !e.originalEvent.wheelDelta) {
          return;
        }
        if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
          e.preventDefault();
        }
      }
    };


    /**
      Enable iOS native scrolling
      @method nativeScrolling
      @private
     */

    NanoScroll.prototype.nativeScrolling = function() {
      this.$content.css({
        WebkitOverflowScrolling: 'touch'
      });
      this.iOSNativeScrolling = true;
      this.isActive = true;
    };


    /**
      Updates those nanoScroller properties that
      are related to current scrollbar position.
      @method updateScrollValues
      @private
     */

    NanoScroll.prototype.updateScrollValues = function() {
      var content;
      content = this.content;
      this.maxScrollTop = content.scrollHeight - content.clientHeight;
      this.prevScrollTop = this.contentScrollTop || 0;
      this.contentScrollTop = content.scrollTop;
      if (!this.iOSNativeScrolling) {
        this.maxSliderTop = this.paneHeight - this.sliderHeight;
        this.sliderTop = this.maxScrollTop === 0 ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
      }
    };


    /**
      Updates CSS styles for current scroll position.
      Uses CSS 2d transfroms and `window.requestAnimationFrame` if available.
      @method setOnScrollStyles
      @private
     */

    NanoScroll.prototype.setOnScrollStyles = function() {
      var cssValue;
      if (hasTransform) {
        cssValue = {};
        cssValue[transform] = "translate(0, " + this.sliderTop + "px)";
      } else {
        cssValue = {
          top: this.sliderTop
        };
      }
      if (rAF) {
        if (!this.scrollRAF) {
          this.scrollRAF = rAF((function(_this) {
            return function() {
              _this.scrollRAF = null;
              _this.slider.css(cssValue);
            };
          })(this));
        }
      } else {
        this.slider.css(cssValue);
      }
    };


    /**
      Creates event related methods
      @method createEvents
      @private
     */

    NanoScroll.prototype.createEvents = function() {
      this.events = {
        down: (function(_this) {
          return function(e) {
            _this.isBeingDragged = true;
            _this.offsetY = e.pageY - _this.slider.offset().top;
            _this.pane.addClass('active');
            _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
            return false;
          };
        })(this),
        drag: (function(_this) {
          return function(e) {
            _this.sliderY = e.pageY - _this.$el.offset().top - _this.offsetY;
            _this.scroll();
            if (_this.contentScrollTop >= _this.maxScrollTop && _this.prevScrollTop !== _this.maxScrollTop) {
              _this.$el.trigger('scrollend');
            } else if (_this.contentScrollTop === 0 && _this.prevScrollTop !== 0) {
              _this.$el.trigger('scrolltop');
            }
            return false;
          };
        })(this),
        up: (function(_this) {
          return function(e) {
            _this.isBeingDragged = false;
            _this.pane.removeClass('active');
            _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]);
            return false;
          };
        })(this),
        resize: (function(_this) {
          return function(e) {
            _this.reset();
          };
        })(this),
        panedown: (function(_this) {
          return function(e) {
            _this.sliderY = (e.offsetY || e.originalEvent.layerY) - (_this.sliderHeight * 0.5);
            _this.scroll();
            _this.events.down(e);
            return false;
          };
        })(this),
        scroll: (function(_this) {
          return function(e) {
            _this.updateScrollValues();
            if (_this.isBeingDragged) {
              return;
            }
            if (!_this.iOSNativeScrolling) {
              _this.sliderY = _this.sliderTop;
              _this.setOnScrollStyles();
            }
            if (e == null) {
              return;
            }
            if (_this.contentScrollTop >= _this.maxScrollTop) {
              if (_this.options.preventPageScrolling) {
                _this.preventScrolling(e, DOWN);
              }
              if (_this.prevScrollTop !== _this.maxScrollTop) {
                _this.$el.trigger('scrollend');
              }
            } else if (_this.contentScrollTop === 0) {
              if (_this.options.preventPageScrolling) {
                _this.preventScrolling(e, UP);
              }
              if (_this.prevScrollTop !== 0) {
                _this.$el.trigger('scrolltop');
              }
            }
          };
        })(this),
        wheel: (function(_this) {
          return function(e) {
            var delta;
            if (e == null) {
              return;
            }
            delta = e.delta || e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail || (e.originalEvent && -e.originalEvent.detail);
            if (delta) {
              _this.sliderY += -delta / 3;
            }
            _this.scroll();
            return false;
          };
        })(this)
      };
    };


    /**
      Adds event listeners with jQuery.
      @method addEvents
      @private
     */

    NanoScroll.prototype.addEvents = function() {
      var events;
      this.removeEvents();
      events = this.events;
      if (!this.options.disableResize) {
        this.win.bind(RESIZE, events[RESIZE]);
      }
      if (!this.iOSNativeScrolling) {
        this.slider.bind(MOUSEDOWN, events[DOWN]);
        this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
      }
      this.$content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };


    /**
      Removes event listeners with jQuery.
      @method removeEvents
      @private
     */

    NanoScroll.prototype.removeEvents = function() {
      var events;
      events = this.events;
      this.win.unbind(RESIZE, events[RESIZE]);
      if (!this.iOSNativeScrolling) {
        this.slider.unbind();
        this.pane.unbind();
      }
      this.$content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
    };


    /**
      Generates nanoScroller's scrollbar and elements for it.
      @method generate
      @chainable
      @private
     */

    NanoScroll.prototype.generate = function() {
      var contentClass, cssRule, currentPadding, options, paneClass, sliderClass;
      options = this.options;
      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
      if (!this.$el.find("." + paneClass).length && !this.$el.find("." + sliderClass).length) {
        this.$el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
      }
      this.pane = this.$el.children("." + paneClass);
      this.slider = this.pane.find("." + sliderClass);
      if (BROWSER_SCROLLBAR_WIDTH === 0 && isFFWithBuggyScrollbar()) {
        currentPadding = window.getComputedStyle(this.content, null).getPropertyValue('padding-right').replace(/\D+/g, '');
        cssRule = {
          right: -14,
          paddingRight: +currentPadding + 14
        };
      } else if (BROWSER_SCROLLBAR_WIDTH) {
        cssRule = {
          right: -BROWSER_SCROLLBAR_WIDTH
        };
        this.$el.addClass('has-scrollbar');
      }
      if (cssRule != null) {
        this.$content.css(cssRule);
      }
      return this;
    };


    /**
      @method restore
      @private
     */

    NanoScroll.prototype.restore = function() {
      this.stopped = false;
      if (!this.iOSNativeScrolling) {
        this.pane.show();
      }
      this.addEvents();
    };


    /**
      Resets nanoScroller's scrollbar.
      @method reset
      @chainable
      @example
          $(".nano").nanoScroller();
     */

    NanoScroll.prototype.reset = function() {
      var content, contentHeight, contentPosition, contentStyle, contentStyleOverflowY, paneBottom, paneHeight, paneOuterHeight, paneTop, parentMaxHeight, right, sliderHeight;
      if (this.iOSNativeScrolling) {
        this.contentHeight = this.content.scrollHeight;
        return;
      }
      if (!this.$el.find("." + this.options.paneClass).length) {
        this.generate().stop();
      }
      if (this.stopped) {
        this.restore();
      }
      content = this.content;
      contentStyle = content.style;
      contentStyleOverflowY = contentStyle.overflowY;
      if (BROWSER_IS_IE7) {
        this.$content.css({
          height: this.$content.height()
        });
      }
      contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
      parentMaxHeight = parseInt(this.$el.css("max-height"), 10);
      if (parentMaxHeight > 0) {
        this.$el.height("");
        this.$el.height(content.scrollHeight > parentMaxHeight ? parentMaxHeight : content.scrollHeight);
      }
      paneHeight = this.pane.outerHeight(false);
      paneTop = parseInt(this.pane.css('top'), 10);
      paneBottom = parseInt(this.pane.css('bottom'), 10);
      paneOuterHeight = paneHeight + paneTop + paneBottom;
      sliderHeight = Math.round(paneOuterHeight / contentHeight * paneOuterHeight);
      if (sliderHeight < this.options.sliderMinHeight) {
        sliderHeight = this.options.sliderMinHeight;
      } else if ((this.options.sliderMaxHeight != null) && sliderHeight > this.options.sliderMaxHeight) {
        sliderHeight = this.options.sliderMaxHeight;
      }
      if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
        sliderHeight += BROWSER_SCROLLBAR_WIDTH;
      }
      this.maxSliderTop = paneOuterHeight - sliderHeight;
      this.contentHeight = contentHeight;
      this.paneHeight = paneHeight;
      this.paneOuterHeight = paneOuterHeight;
      this.sliderHeight = sliderHeight;
      this.slider.height(sliderHeight);
      this.events.scroll();
      this.pane.show();
      this.isActive = true;
      if ((content.scrollHeight === content.clientHeight) || (this.pane.outerHeight(true) >= content.scrollHeight && contentStyleOverflowY !== SCROLL)) {
        this.pane.hide();
        this.isActive = false;
      } else if (this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL) {
        this.slider.hide();
      } else {
        this.slider.show();
      }
      this.pane.css({
        opacity: (this.options.alwaysVisible ? 1 : ''),
        visibility: (this.options.alwaysVisible ? 'visible' : '')
      });
      contentPosition = this.$content.css('position');
      if (contentPosition === 'static' || contentPosition === 'relative') {
        right = parseInt(this.$content.css('right'), 10);
        if (right) {
          this.$content.css({
            right: '',
            marginRight: right
          });
        }
      }
      return this;
    };


    /**
      @method scroll
      @private
      @example
          $(".nano").nanoScroller({ scroll: 'top' });
     */

    NanoScroll.prototype.scroll = function() {
      if (!this.isActive) {
        return;
      }
      this.sliderY = Math.max(0, this.sliderY);
      this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
      this.$content.scrollTop((this.paneHeight - this.contentHeight + BROWSER_SCROLLBAR_WIDTH) * this.sliderY / this.maxSliderTop * -1);
      if (!this.iOSNativeScrolling) {
        this.updateScrollValues();
        this.setOnScrollStyles();
      }
      return this;
    };


    /**
      Scroll at the bottom with an offset value
      @method scrollBottom
      @param offsetY {Number}
      @chainable
      @example
          $(".nano").nanoScroller({ scrollBottom: value });
     */

    NanoScroll.prototype.scrollBottom = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL);
      this.stop().restore();
      return this;
    };


    /**
      Scroll at the top with an offset value
      @method scrollTop
      @param offsetY {Number}
      @chainable
      @example
          $(".nano").nanoScroller({ scrollTop: value });
     */

    NanoScroll.prototype.scrollTop = function(offsetY) {
      if (!this.isActive) {
        return;
      }
      this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
      this.stop().restore();
      return this;
    };


    /**
      Scroll to an element
      @method scrollTo
      @param node {Node} A node to scroll to.
      @chainable
      @example
          $(".nano").nanoScroller({ scrollTo: $('#a_node') });
     */

    NanoScroll.prototype.scrollTo = function(node) {
      if (!this.isActive) {
        return;
      }
      this.scrollTop(this.$el.find(node).get(0).offsetTop);
      return this;
    };


    /**
      To stop the operation.
      This option will tell the plugin to disable all event bindings and hide the gadget scrollbar from the UI.
      @method stop
      @chainable
      @example
          $(".nano").nanoScroller({ stop: true });
     */

    NanoScroll.prototype.stop = function() {
      if (cAF && this.scrollRAF) {
        cAF(this.scrollRAF);
        this.scrollRAF = null;
      }
      this.stopped = true;
      this.removeEvents();
      if (!this.iOSNativeScrolling) {
        this.pane.hide();
      }
      return this;
    };


    /**
      Destroys nanoScroller and restores browser's native scrollbar.
      @method destroy
      @chainable
      @example
          $(".nano").nanoScroller({ destroy: true });
     */

    NanoScroll.prototype.destroy = function() {
      if (!this.stopped) {
        this.stop();
      }
      if (!this.iOSNativeScrolling && this.pane.length) {
        this.pane.remove();
      }
      if (BROWSER_IS_IE7) {
        this.$content.height('');
      }
      this.$content.removeAttr('tabindex');
      if (this.$el.hasClass('has-scrollbar')) {
        this.$el.removeClass('has-scrollbar');
        this.$content.css({
          right: ''
        });
      }
      return this;
    };


    /**
      To flash the scrollbar gadget for an amount of time defined in plugin settings (defaults to 1,5s).
      Useful if you want to show the user (e.g. on pageload) that there is more content waiting for him.
      @method flash
      @chainable
      @example
          $(".nano").nanoScroller({ flash: true });
     */

    NanoScroll.prototype.flash = function() {
      if (this.iOSNativeScrolling) {
        return;
      }
      if (!this.isActive) {
        return;
      }
      this.reset();
      this.pane.addClass('flashed');
      setTimeout((function(_this) {
        return function() {
          _this.pane.removeClass('flashed');
        };
      })(this), this.options.flashDelay);
      return this;
    };

    return NanoScroll;

  })();
  $.fn.nanoScroller = function(settings) {
    return this.each(function() {
      var options, scrollbar;
      if (!(scrollbar = this.nanoscroller)) {
        options = $.extend({}, defaults, settings);
        this.nanoscroller = scrollbar = new NanoScroll(this, options);
      }
      if (settings && typeof settings === "object") {
        $.extend(scrollbar.options, settings);
        if (settings.scrollBottom != null) {
          return scrollbar.scrollBottom(settings.scrollBottom);
        }
        if (settings.scrollTop != null) {
          return scrollbar.scrollTop(settings.scrollTop);
        }
        if (settings.scrollTo) {
          return scrollbar.scrollTo(settings.scrollTo);
        }
        if (settings.scroll === 'bottom') {
          return scrollbar.scrollBottom(0);
        }
        if (settings.scroll === 'top') {
          return scrollbar.scrollTop(0);
        }
        if (settings.scroll && settings.scroll instanceof $) {
          return scrollbar.scrollTo(settings.scroll);
        }
        if (settings.stop) {
          return scrollbar.stop();
        }
        if (settings.destroy) {
          return scrollbar.destroy();
        }
        if (settings.flash) {
          return scrollbar.flash();
        }
      }
      return scrollbar.reset();
    });
  };
  $.fn.nanoScroller.Constructor = NanoScroll;
})(jQuery, window, document);

//# sourceMappingURL=jquery.nanoscroller.js.map
;var hljs=new function(){function j(v){return v.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(v){return v.nodeName.toLowerCase()}function h(w,x){var v=w&&w.exec(x);return v&&v.index==0}function r(w){var v=(w.className+" "+(w.parentNode?w.parentNode.className:"")).split(/\s+/);v=v.map(function(x){return x.replace(/^lang(uage)?-/,"")});return v.filter(function(x){return i(x)||x=="no-highlight"})[0]}function o(x,y){var v={};for(var w in x){v[w]=x[w]}if(y){for(var w in y){v[w]=y[w]}}return v}function u(x){var v=[];(function w(y,z){for(var A=y.firstChild;A;A=A.nextSibling){if(A.nodeType==3){z+=A.nodeValue.length}else{if(t(A)=="br"){z+=1}else{if(A.nodeType==1){v.push({event:"start",offset:z,node:A});z=w(A,z);v.push({event:"stop",offset:z,node:A})}}}}return z})(x,0);return v}function q(w,y,C){var x=0;var F="";var z=[];function B(){if(!w.length||!y.length){return w.length?w:y}if(w[0].offset!=y[0].offset){return(w[0].offset<y[0].offset)?w:y}return y[0].event=="start"?w:y}function A(H){function G(I){return" "+I.nodeName+'="'+j(I.value)+'"'}F+="<"+t(H)+Array.prototype.map.call(H.attributes,G).join("")+">"}function E(G){F+="</"+t(G)+">"}function v(G){(G.event=="start"?A:E)(G.node)}while(w.length||y.length){var D=B();F+=j(C.substr(x,D[0].offset-x));x=D[0].offset;if(D==w){z.reverse().forEach(E);do{v(D.splice(0,1)[0]);D=B()}while(D==w&&D.length&&D[0].offset==x);z.reverse().forEach(A)}else{if(D[0].event=="start"){z.push(D[0].node)}else{z.pop()}v(D.splice(0,1)[0])}}return F+j(C.substr(x))}function m(y){function v(z){return(z&&z.source)||z}function w(A,z){return RegExp(v(A),"m"+(y.cI?"i":"")+(z?"g":""))}function x(D,C){if(D.compiled){return}D.compiled=true;D.k=D.k||D.bK;if(D.k){var z={};var E=function(G,F){if(y.cI){F=F.toLowerCase()}F.split(" ").forEach(function(H){var I=H.split("|");z[I[0]]=[G,I[1]?Number(I[1]):1]})};if(typeof D.k=="string"){E("keyword",D.k)}else{Object.keys(D.k).forEach(function(F){E(F,D.k[F])})}D.k=z}D.lR=w(D.l||/\b[A-Za-z0-9_]+\b/,true);if(C){if(D.bK){D.b="\\b("+D.bK.split(" ").join("|")+")\\b"}if(!D.b){D.b=/\B|\b/}D.bR=w(D.b);if(!D.e&&!D.eW){D.e=/\B|\b/}if(D.e){D.eR=w(D.e)}D.tE=v(D.e)||"";if(D.eW&&C.tE){D.tE+=(D.e?"|":"")+C.tE}}if(D.i){D.iR=w(D.i)}if(D.r===undefined){D.r=1}if(!D.c){D.c=[]}var B=[];D.c.forEach(function(F){if(F.v){F.v.forEach(function(G){B.push(o(F,G))})}else{B.push(F=="self"?D:F)}});D.c=B;D.c.forEach(function(F){x(F,D)});if(D.starts){x(D.starts,C)}var A=D.c.map(function(F){return F.bK?"\\.?("+F.b+")\\.?":F.b}).concat([D.tE,D.i]).map(v).filter(Boolean);D.t=A.length?w(A.join("|"),true):{exec:function(F){return null}};D.continuation={}}x(y)}function c(S,L,J,R){function v(U,V){for(var T=0;T<V.c.length;T++){if(h(V.c[T].bR,U)){return V.c[T]}}}function z(U,T){if(h(U.eR,T)){return U}if(U.eW){return z(U.parent,T)}}function A(T,U){return !J&&h(U.iR,T)}function E(V,T){var U=M.cI?T[0].toLowerCase():T[0];return V.k.hasOwnProperty(U)&&V.k[U]}function w(Z,X,W,V){var T=V?"":b.classPrefix,U='<span class="'+T,Y=W?"":"</span>";U+=Z+'">';return U+X+Y}function N(){if(!I.k){return j(C)}var T="";var W=0;I.lR.lastIndex=0;var U=I.lR.exec(C);while(U){T+=j(C.substr(W,U.index-W));var V=E(I,U);if(V){H+=V[1];T+=w(V[0],j(U[0]))}else{T+=j(U[0])}W=I.lR.lastIndex;U=I.lR.exec(C)}return T+j(C.substr(W))}function F(){if(I.sL&&!f[I.sL]){return j(C)}var T=I.sL?c(I.sL,C,true,I.continuation.top):e(C);if(I.r>0){H+=T.r}if(I.subLanguageMode=="continuous"){I.continuation.top=T.top}return w(T.language,T.value,false,true)}function Q(){return I.sL!==undefined?F():N()}function P(V,U){var T=V.cN?w(V.cN,"",true):"";if(V.rB){D+=T;C=""}else{if(V.eB){D+=j(U)+T;C=""}else{D+=T;C=U}}I=Object.create(V,{parent:{value:I}})}function G(T,X){C+=T;if(X===undefined){D+=Q();return 0}var V=v(X,I);if(V){D+=Q();P(V,X);return V.rB?0:X.length}var W=z(I,X);if(W){var U=I;if(!(U.rE||U.eE)){C+=X}D+=Q();do{if(I.cN){D+="</span>"}H+=I.r;I=I.parent}while(I!=W.parent);if(U.eE){D+=j(X)}C="";if(W.starts){P(W.starts,"")}return U.rE?0:X.length}if(A(X,I)){throw new Error('Illegal lexeme "'+X+'" for mode "'+(I.cN||"<unnamed>")+'"')}C+=X;return X.length||1}var M=i(S);if(!M){throw new Error('Unknown language: "'+S+'"')}m(M);var I=R||M;var D="";for(var K=I;K!=M;K=K.parent){if(K.cN){D+=w(K.cN,D,true)}}var C="";var H=0;try{var B,y,x=0;while(true){I.t.lastIndex=x;B=I.t.exec(L);if(!B){break}y=G(L.substr(x,B.index-x),B[0]);x=B.index+y}G(L.substr(x));for(var K=I;K.parent;K=K.parent){if(K.cN){D+="</span>"}}return{r:H,value:D,language:S,top:I}}catch(O){if(O.message.indexOf("Illegal")!=-1){return{r:0,value:j(L)}}else{throw O}}}function e(y,x){x=x||b.languages||Object.keys(f);var v={r:0,value:j(y)};var w=v;x.forEach(function(z){if(!i(z)){return}var A=c(z,y,false);A.language=z;if(A.r>w.r){w=A}if(A.r>v.r){w=v;v=A}});if(w.language){v.second_best=w}return v}function g(v){if(b.tabReplace){v=v.replace(/^((<[^>]+>|\t)+)/gm,function(w,z,y,x){return z.replace(/\t/g,b.tabReplace)})}if(b.useBR){v=v.replace(/\n/g,"<br>")}return v}function p(z){var y=b.useBR?z.innerHTML.replace(/\n/g,"").replace(/<br>|<br [^>]*>/g,"\n").replace(/<[^>]*>/g,""):z.textContent;var A=r(z);if(A=="no-highlight"){return}var v=A?c(A,y,true):e(y);var w=u(z);if(w.length){var x=document.createElementNS("http://www.w3.org/1999/xhtml","pre");x.innerHTML=v.value;v.value=q(w,u(x),y)}v.value=g(v.value);z.innerHTML=v.value;z.className+=" hljs "+(!A&&v.language||"");z.result={language:v.language,re:v.r};if(v.second_best){z.second_best={language:v.second_best.language,re:v.second_best.r}}}var b={classPrefix:"hljs-",tabReplace:null,useBR:false,languages:undefined};function s(v){b=o(b,v)}function l(){if(l.called){return}l.called=true;var v=document.querySelectorAll("pre code");Array.prototype.forEach.call(v,p)}function a(){addEventListener("DOMContentLoaded",l,false);addEventListener("load",l,false)}var f={};var n={};function d(v,x){var w=f[v]=x(this);if(w.aliases){w.aliases.forEach(function(y){n[y]=v})}}function k(){return Object.keys(f)}function i(v){return f[v]||f[n[v]]}this.highlight=c;this.highlightAuto=e;this.fixMarkup=g;this.highlightBlock=p;this.configure=s;this.initHighlighting=l;this.initHighlightingOnLoad=a;this.registerLanguage=d;this.listLanguages=k;this.getLanguage=i;this.inherit=o;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BNR="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\[\\s\\S]",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE]};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE]};this.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/};this.CLCM={cN:"comment",b:"//",e:"$",c:[this.PWM]};this.CBCM={cN:"comment",b:"/\\*",e:"\\*/",c:[this.PWM]};this.HCM={cN:"comment",b:"#",e:"$",c:[this.PWM]};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BNM={cN:"number",b:this.BNR,r:0};this.CSSNM={cN:"number",b:this.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0};this.RM={cN:"regexp",b:/\//,e:/\/[gim]*/,i:/\n/,c:[this.BE,{b:/\[/,e:/\]/,r:0,c:[this.BE]}]};this.TM={cN:"title",b:this.IR,r:0};this.UTM={cN:"title",b:this.UIR,r:0}}();hljs.registerLanguage("coffeescript",function(c){var b={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",reserved:"case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",built_in:"npm require console print module global window document"};var a="[A-Za-z$_][0-9A-Za-z$_]*";var f=c.inherit(c.TM,{b:a});var e={cN:"subst",b:/#\{/,e:/}/,k:b};var d=[c.BNM,c.inherit(c.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[c.BE]},{b:/'/,e:/'/,c:[c.BE]},{b:/"""/,e:/"""/,c:[c.BE,e]},{b:/"/,e:/"/,c:[c.BE,e]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[e,c.HCM]},{b:"//[gim]*",r:0},{b:"/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"}]},{cN:"property",b:"@"+a},{b:"`",e:"`",eB:true,eE:true,sL:"javascript"}];e.c=d;return{aliases:["coffee","cson","iced"],k:b,c:d.concat([{cN:"comment",b:"###",e:"###"},c.HCM,{cN:"function",b:"("+a+"\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",e:"[-=]>",rB:true,c:[f,{cN:"params",b:"\\(",rB:true,c:[{b:/\(/,e:/\)/,k:b,c:["self"].concat(d)}]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:true,i:/[:="\[\]]/,c:[f]},f]},{cN:"attribute",b:a+":",e:":",rB:true,eE:true,r:0}])}});hljs.registerLanguage("nginx",function(c){var b={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+c.UIR}]};var a={eW:true,l:"[a-z/_]+",k:{built_in:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[c.HCM,{cN:"string",c:[c.BE,b],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{cN:"url",b:"([a-z]+):/",e:"\\s",eW:true,eE:true},{cN:"regexp",c:[c.BE,b],v:[{b:"\\s\\^",e:"\\s|{|;",rE:true},{b:"~\\*?\\s+",e:"\\s|{|;",rE:true},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},b]};return{aliases:["nginxconf"],c:[c.HCM,{b:c.UIR+"\\s",e:";|{",rB:true,c:[{cN:"title",b:c.UIR,starts:a}],r:0}],i:"[^\\s\\}]"}});hljs.registerLanguage("json",function(a){var e={literal:"true false null"};var d=[a.QSM,a.CNM];var c={cN:"value",e:",",eW:true,eE:true,c:d,k:e};var b={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:true,eE:true,c:[a.BE],i:"\\n",starts:c}],i:"\\S"};var f={b:"\\[",e:"\\]",c:[a.inherit(c,{cN:null})],i:"\\S"};d.splice(d.length,0,b,f);return{c:d,k:e,i:"\\S"}});hljs.registerLanguage("http",function(a){return{i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:true,e:"$",c:[{cN:"string",b:" ",e:" ",eB:true,eE:true}]},{cN:"attribute",b:"^\\w",e:": ",eE:true,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:true}}]}});hljs.registerLanguage("javascript",function(a){return{aliases:["js"],k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"},c:[{cN:"pi",b:/^\s*('|")use strict('|")/,r:10},a.ASM,a.QSM,a.CLCM,a.CBCM,a.CNM,{b:"("+a.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[a.CLCM,a.CBCM,a.RM,{b:/</,e:/>;/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:true,c:[a.inherit(a.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[a.CLCM,a.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+a.IR,r:0}]}});hljs.registerLanguage("sql",function(a){var b={cN:"comment",b:"--",e:"$"};return{cI:true,i:/[<>]/,c:[{cN:"operator",bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup",e:/;/,eW:true,k:{keyword:"abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text"},c:[{cN:"string",b:"'",e:"'",c:[a.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[a.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[a.BE]},a.CNM,a.CBCM,b]},a.CBCM,b]}});hljs.registerLanguage("php",function(b){var e={cN:"variable",b:"(\\$|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"};var a={cN:"preprocessor",b:/<\?(php)?|\?>/};var c={cN:"string",c:[b.BE,a],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},b.inherit(b.ASM,{i:null}),b.inherit(b.QSM,{i:null})]};var d={v:[b.BNM,b.CNM]};return{aliases:["php3","php4","php5","php6"],cI:true,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[b.CLCM,b.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"},a]},{cN:"comment",b:"__halt_compiler.+?;",eW:true,k:"__halt_compiler",l:b.UIR},{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[b.BE]},a,e,{cN:"function",bK:"function",e:/[;{]/,eE:true,i:"\\$|\\[|%",c:[b.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",e,b.CBCM,c,d]}]},{cN:"class",bK:"class interface",e:"{",eE:true,i:/[:\(\$"]/,c:[{bK:"extends implements",r:10},b.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[b.UTM]},{bK:"use",e:";",c:[b.UTM]},{b:"=>"},c,d]}});hljs.registerLanguage("makefile",function(a){var b={cN:"variable",b:/\$\(/,e:/\)/,c:[a.BE]};return{aliases:["mk","mak"],c:[a.HCM,{b:/^\w+\s*\W*=/,rB:true,r:0,starts:{cN:"constant",e:/\s*\W*=/,eE:true,starts:{e:/$/,r:0,c:[b]}}},{cN:"title",b:/^[\w]+:\s*$/},{cN:"phony",b:/^\.PHONY:/,e:/$/,k:".PHONY",l:/[\.\w]+/},{b:/^\t+/,e:/$/,c:[a.QSM,b]}]}});hljs.registerLanguage("bash",function(b){var a={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)\}/}]};var d={cN:"string",b:/"/,e:/"/,c:[b.BE,a,{cN:"variable",b:/\$\(/,e:/\)/,c:[b.BE]}]};var c={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\.]+/,k:{keyword:"if then else elif fi for break continue while in do done exit return set declare case esac export exec",literal:"true false",built_in:"printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",operator:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"shebang",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:true,c:[b.inherit(b.TM,{b:/\w[\w\d_]*/})],r:0},b.HCM,b.NM,d,c,a]}});hljs.registerLanguage("cpp",function(a){var b={keyword:"false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",built_in:"std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"};return{aliases:["c","h","c++","h++"],k:b,i:"</",c:[a.CLCM,a.CBCM,a.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},a.CNM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line pragma",c:[{b:'include\\s*[<"]',e:'[>"]',k:"include",i:"\\n"},a.CLCM]},{cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:b,c:["self"]},{b:a.IR+"::"}]}});hljs.registerLanguage("perl",function(c){var d="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when";var f={cN:"subst",b:"[$@]\\{",e:"\\}",k:d};var g={b:"->{",e:"}"};var a={cN:"variable",v:[{b:/\$\d/},{b:/[\$\%\@](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/},{b:/[\$\%\@][^\s\w{]/,r:0}]};var e={cN:"comment",b:"^(__END__|__DATA__)",e:"\\n$",r:5};var h=[c.BE,f,a];var b=[a,c.HCM,e,{cN:"comment",b:"^\\=\\w",e:"\\=cut",eW:true},g,{cN:"string",c:h,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[c.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[c.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+c.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[c.HCM,e,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[c.BE],r:0}]},{cN:"sub",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",r:5},{cN:"operator",b:"-\\w\\b",r:0}];f.c=b;g.c=b;return{aliases:["pl"],k:d,c:b}});hljs.registerLanguage("ini",function(a){return{cI:true,i:/\S/,c:[{cN:"comment",b:";",e:"$"},{cN:"title",b:"^\\[",e:"\\]"},{cN:"setting",b:"^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",e:"$",c:[{cN:"value",eW:true,k:"on off true false yes no",c:[a.QSM,a.NM],r:0}]}]}});hljs.registerLanguage("apache",function(a){var b={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:true,c:[a.HCM,{cN:"tag",b:"</?",e:">"},{cN:"keyword",b:/\w+/,r:0,k:{common:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"sqbracket",b:"\\s\\[",e:"\\]$"},{cN:"cbracket",b:"[\\$%]\\{",e:"\\}",c:["self",b]},b,a.QSM]}}],i:/\S/}});hljs.registerLanguage("java",function(b){var a="false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";return{aliases:["jsp"],k:a,i:/<\//,c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",c:[{cN:"javadoctag",b:"(^|\\s)@[A-Za-z]+"}],r:10},b.CLCM,b.CBCM,b.ASM,b.QSM,{bK:"protected public private",e:/[{;=]/,k:a,c:[{cN:"class",bK:"class interface",eW:true,eE:true,i:/[:"\[\]]/,c:[{bK:"extends implements",r:10},b.UTM]},{b:b.UIR+"\\s*\\(",rB:true,c:[b.UTM]}]},b.CNM,{cN:"annotation",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("xml",function(a){var c="[A-Za-z0-9\\._:-]+";var d={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"};var b={eW:true,i:/</,r:0,c:[d,{cN:"attribute",b:c,r:0},{b:"=",r:0,c:[{cN:"value",v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:true,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[b],starts:{e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[b],starts:{e:"<\/script>",rE:true,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},d,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ /><]+",r:0},b]}]}});hljs.registerLanguage("markdown",function(a){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|\t)",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].+?[\\)\\]]",rB:true,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:true,rE:true,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:true,eE:true},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:true,eE:true}],r:10},{b:"^\\[.+\\]:",e:"$",rB:true,c:[{cN:"link_reference",b:"\\[",e:"\\]",eB:true,eE:true},{cN:"link_url",b:"\\s",e:"$"}]}]}});hljs.registerLanguage("cs",function(b){var a="abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";return{aliases:["csharp"],k:a,i:/::/,c:[{cN:"comment",b:"///",e:"$",rB:true,c:[{cN:"xmlDocTag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]},b.CLCM,b.CBCM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line region endregion pragma checksum"},{cN:"string",b:'@"',e:'"',c:[{b:'""'}]},b.ASM,b.QSM,b.CNM,{bK:"protected public private internal",e:/[{;=]/,k:a,c:[{bK:"class namespace interface",starts:{c:[b.TM]}},{b:b.IR+"\\s*\\(",rB:true,c:[b.TM]}]}]}});hljs.registerLanguage("ruby",function(f){var j="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";var i="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor";var b={cN:"yardoctag",b:"@[A-Za-z]+"};var c={cN:"value",b:"#<",e:">"};var k={cN:"comment",v:[{b:"#",e:"$",c:[b]},{b:"^\\=begin",e:"^\\=end",c:[b],r:10},{b:"^__END__",e:"\\n$"}]};var d={cN:"subst",b:"#\\{",e:"}",k:i};var e={cN:"string",c:[f.BE,d],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:"%[qw]?\\(",e:"\\)"},{b:"%[qw]?\\[",e:"\\]"},{b:"%[qw]?{",e:"}"},{b:"%[qw]?<",e:">"},{b:"%[qw]?/",e:"/"},{b:"%[qw]?%",e:"%"},{b:"%[qw]?-",e:"-"},{b:"%[qw]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]};var a={cN:"params",b:"\\(",e:"\\)",k:i};var h=[e,c,k,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[f.inherit(f.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+f.IR+"::)?"+f.IR}]},k]},{cN:"function",bK:"def",e:" |$|;",r:0,c:[f.inherit(f.TM,{b:j}),a,k]},{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:":",c:[e,{b:j}],r:0},{cN:"symbol",b:f.UIR+"(\\!|\\?)?:",r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+f.RSR+")\\s*",c:[c,k,{cN:"regexp",c:[f.BE,d],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}],r:0}];d.c=h;a.c=h;var g=[{r:1,cN:"output",b:"^\\s*=> ",e:"$",rB:true,c:[{cN:"status",b:"^\\s*=>"},{b:" ",e:"$",c:h}]},{r:1,cN:"input",b:"^[^ ][^=>]*>+ ",e:"$",rB:true,c:[{cN:"prompt",b:"^[^ ][^=>]*>+"},{b:" ",e:"$",c:h}]}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:i,c:g.concat(h)}});hljs.registerLanguage("diff",function(a){return{aliases:["patch"],c:[{cN:"chunk",r:10,v:[{b:/^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"header",v:[{b:/Index: /,e:/$/},{b:/=====/,e:/=====$/},{b:/^\-\-\-/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+\+\+/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]}});hljs.registerLanguage("objectivec",function(a){var d={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView NSView NSViewController NSWindow NSWindowController NSSet NSUUID NSIndexSet UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"};var c=/[a-zA-Z@][a-zA-Z0-9_]*/;var b="@interface @class @protocol @implementation";return{aliases:["m","mm","objc","obj-c"],k:d,l:c,i:"</",c:[a.CLCM,a.CBCM,a.CNM,a.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[a.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"preprocessor",b:"#",e:"$",c:[{cN:"title",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+b.split(" ").join("|")+")\\b",e:"({|$)",eE:true,k:b,l:c,c:[a.UTM]},{cN:"variable",b:"\\."+a.UIR,r:0}]}});hljs.registerLanguage("css",function(a){var b="[a-zA-Z-][a-zA-Z0-9_-]*";var c={cN:"function",b:b+"\\(",rB:true,eE:true,e:"\\("};return{cI:true,i:"[=/|']",c:[a.CBCM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:true,eE:true,r:0,c:[c,a.ASM,a.QSM,a.CSSNM]}]},{cN:"tag",b:b,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[a.CBCM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[c,a.CSSNM,a.QSM,a.ASM,a.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]}]}]}});hljs.registerLanguage("python",function(a){var f={cN:"prompt",b:/^(>>>|\.\.\.) /};var b={cN:"string",c:[a.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[f],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[f],r:10},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},a.ASM,a.QSM]};var d={cN:"number",r:0,v:[{b:a.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:a.CNR+"[lLjJ]?"}]};var e={cN:"params",b:/\(/,e:/\)/,c:["self",f,d,b]};var c={e:/:/,i:/[${=;\n]/,c:[a.UTM,e]};return{aliases:["py","gyp"],k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},i:/(<\/|->|\?)/,c:[f,d,b,a.HCM,a.inherit(c,{cN:"function",bK:"def",r:10}),a.inherit(c,{cN:"class",bK:"class"}),{cN:"decorator",b:/@/,e:/$/},{b:/\b(print|exec)\(/}]}});;/**
* Copyright (c) 2013, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* reMarked.js - HTML > markdown
*/

reMarked = function(opts) {

	var links = [];
	var cfg = {
		link_list:	false,			// render links as references, create link list as appendix
	//  link_near:					// cite links immediately after blocks
		h1_setext:	true,			// underline h1 headers
		h2_setext:	true,			// underline h2 headers
		h_atx_suf:	false,			// header suffixes (###)
	//	h_compact:	true,			// compact headers (except h1)
		gfm_code:	false,			// gfm code blocks (```)
		li_bullet:	"*-+"[0],		// list item bullet style
	//	list_indnt:					// indent top-level lists
		hr_char:	"-_*"[0],		// hr style
		indnt_str:	["    ","\t","  "][0],	// indentation string
		bold_char:	"*_"[0],		// char used for strong
		emph_char:	"*_"[1],		// char used for em
		gfm_del:	true,			// ~~strikeout~~ for <del>strikeout</del>
		gfm_tbls:	true,			// markdown-extra tables
		tbl_edges:	false,			// show side edges on tables
		hash_lnks:	false,			// anchors w/hash hrefs as links
		br_only:	false,			// avoid using "  " as line break indicator
		col_pre:	"col ",			// column prefix to use when creating missing headers for tables
		nbsp_spc:	false,			// convert &nbsp; entities in html to regular spaces
		span_tags:	true,			// output spans (ambiguous) using html tags
		div_tags:	true,			// output divs (ambiguous) using html tags
	//	comp_style: false,			// use getComputedStyle instead of hardcoded tag list to discern block/inline
		unsup_tags: {				// handling of unsupported tags, defined in terms of desired output style. if not listed, output = outerHTML
			// no output
			ignore: "script style noscript",
			// eg: "<tag>some content</tag>"
			inline: "span sup sub i u b center big",
			// eg: "\n<tag>\n\tsome content\n</tag>"
		//	block1: "",
			// eg: "\n\n<tag>\n\tsome content\n</tag>"
			block2: "div form fieldset dl header footer address article aside figure hgroup section",
			// eg: "\n<tag>some content</tag>"
			block1c: "dt dd caption legend figcaption output",
			// eg: "\n\n<tag>some content</tag>"
			block2c: "canvas audio video iframe"
		},
		tag_remap: {				// remap of variants or deprecated tags to internal classes
			"i": "em",
			"b": "strong"
		}
	};

	// detect and tweak some stuff for IE 7 & 8
	// http://www.pinlady.net/PluginDetect/IE/
	var isIE = eval("/*@cc_on!@*/!1"),
		docMode = document.documentMode,
		ieLt9 = isIE && (!docMode || docMode < 9),
		textContProp = ieLt9 ? "innerText" : "textContent";

	extend(cfg, opts);

	function extend(a, b) {
		if (!b) return a;
		for (var i in a) {
			if (typeOf(b[i]) == "Object")
				extend(a[i], b[i]);
			else if (typeof b[i] !== "undefined")
				a[i] = b[i];
		}
	}

	function typeOf(val) {
		return Object.prototype.toString.call(val).slice(8,-1);
	}

	function rep(str, num) {
		var s = "";
		while (num-- > 0)
			s += str;
		return s;
	}

	function trim12(str) {
		var	str = str.replace(/^\s\s*/, ''),
			ws = /\s/,
			i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	}

	function lpad(targ, padStr, len) {
		return rep(padStr, len - targ.length) + targ;
	}

	function rpad(targ, padStr, len) {
		return targ + rep(padStr, len - targ.length);
	}

	function otag(tag, e) {
		if (!tag) return "";

		var buf = "<" + tag;

		for (var attr, i = 0; i < e.attributes.length; i++) {
			attr = e.attributes.item(i);
			buf += " " + attr.nodeName + '="' + attr.nodeValue + '"';
		}

		return buf + ">";
	}

	function ctag(tag) {
		if (!tag) return "";
		return "</" + tag + ">";
	}

	function pfxLines(txt, pfx)	{
		return txt.replace(/^/gm, pfx);
	}

	function nodeName(e) {
		return (e.nodeName == "#text" ? "txt" : e.nodeName).toLowerCase();
	}

	function wrap(str, opts) {
		var pre, suf;

		if (opts instanceof Array) {
			pre = opts[0];
			suf = opts[1];
		}
		else
			pre = suf = opts;

		pre = pre instanceof Function ? pre.call(this, str) : pre;
		suf = suf instanceof Function ? suf.call(this, str) : suf;

		return pre + str + suf;
	}

	// http://stackoverflow.com/a/3819589/973988
	function outerHTML(node) {
		// if IE, Chrome take the internal method otherwise build one
		return node.outerHTML || (
		  function(n){
			  var div = document.createElement('div'), h;
			  div.appendChild( n.cloneNode(true) );
			  h = div.innerHTML;
			  div = null;
			  return h;
		  })(node);
	}

	this.render = function(ctr) {
		links = [];

		if (typeof ctr == "string") {
			var htmlstr = ctr;
			ctr = document.createElement("div");
			ctr.innerHTML = htmlstr;
		}
		var s = new lib.tag(ctr, null, 0);
		var re = s.rend().replace(/^[\t ]+\n/gm, "\n");
		if (cfg.link_list && links.length > 0) {
			// hack
			re += "\n\n";
			var maxlen = 0;
			// get longest link href with title, TODO: use getAttribute?
			for (var y = 0; y < links.length; y++) {
				if (!links[y].e.title) continue;
				var len = links[y].e.href.length;
				if (len && len > maxlen)
					maxlen = len;
			}

			for (var k = 0; k < links.length; k++) {
				var title = links[k].e.title ? rep(" ", (maxlen + 2) - links[k].e.href.length) + '"' + links[k].e.title + '"' : "";
				re += "  [" + (+k+1) + "]: " + (nodeName(links[k].e) == "a" ? links[k].e.href : links[k].e.src) + title + "\n";
			}
		}

		return re.replace(/^[\t ]+\n/gm, "\n");
	};

	var lib = {};

	lib.tag = klass({
		wrap: "",
		lnPfx: "",		// only block
		lnInd: 0,		// only block
		init: function(e, p, i)
		{
			this.e = e;
			this.p = p;
			this.i = i;
			this.c = [];
			this.tag = nodeName(e);

			this.initK();
		},

		initK: function()
		{
			var i;
			if (this.e.hasChildNodes()) {
				// inline elems allowing adjacent whitespace text nodes to be rendered
				var inlRe = cfg.unsup_tags.inline, n, name;

				// if no thead exists, detect header rows or make fake cols
				if (nodeName(this.e) == "table") {
					if (this.e.hasChildNodes() && !this.e.tHead) {
						var thead = document.createElement("thead");

						var tbody0 = this.e.tBodies[0],
							row0 = tbody0.rows[0],
							cell0 = row0.cells[0];

						if (nodeName(cell0) == "th")
							thead.appendChild(row0);
						else {
							var hcell,
								i = 0,
								len = row0.cells.length,
								hrow = thead.insertRow();

							while (i++ < len) {
								hcell = document.createElement("th");
								hcell[textContProp] = cfg.col_pre + i;
								hrow.appendChild(hcell);
							}
						}

						this.e.insertBefore(thead, tbody0);
					}
				}

				for (i in this.e.childNodes) {
					if (!/\d+/.test(i)) continue;

					n = this.e.childNodes[i];
					name = nodeName(n);

					// remap of variants
					if (name in cfg.tag_remap)
						name = cfg.tag_remap[name];

					// ignored tags
					if (cfg.unsup_tags.ignore.test(name))
						continue;

					// empty whitespace handling
					if (name == "txt" && !nodeName(this.e).match(inlRe) && /^\s+$/.test(n[textContProp])) {
						// ignore if first or last child (trim)
						if (i == 0 || i == this.e.childNodes.length - 1)
							continue;

						// only ouput when has an adjacent inline elem
						var prev = this.e.childNodes[i-1],
							next = this.e.childNodes[i+1];
						if (prev && !nodeName(prev).match(inlRe) || next && !nodeName(next).match(inlRe))
							continue;
					}

					var wrap = null;

					if (!lib[name]) {
						var unsup = cfg.unsup_tags;

						if (unsup.inline.test(name)) {
							if (name == "span" && !cfg.span_tags)
								name = "inl";
							else
								name = "tinl";
						}
						else if (unsup.block2.test(name)) {
							if (name == "div" && !cfg.div_tags)
								name = "blk";
							else
								name = "tblk";
						}
						else if (unsup.block1c.test(name))
							name = "ctblk";
						else if (unsup.block2c.test(name)) {
							name = "ctblk";
							wrap = ["\n\n", ""];
						}
						else
							name = "rawhtml";
					}

					var node = new lib[name](n, this, this.c.length);

					if (wrap)
						node.wrap = wrap;

					if (node instanceof lib.a && n.href || node instanceof lib.img) {
						node.lnkid = links.length;
						links.push(node);
					}

					this.c.push(node);
				}
			}
		},

		rend: function()
		{
			return this.rendK().replace(/\n{3,}/gm, "\n\n");		// can screw up pre and code :(
		},

		rendK: function()
		{
			var n, buf = "";
			for (var i = 0; i < this.c.length; i++) {
				n = this.c[i];
				buf += (n.bef || "") + n.rend() + (n.aft || "");
			}
			return buf.replace(/^\n+|\n+$/, "");
		}
	});

	lib.blk = lib.tag.extend({
		wrap: ["\n\n", ""],
		wrapK: null,
		tagr: false,
		lnInd: null,
		init: function(e, p ,i) {
			this.supr(e,p,i);

			// kids indented
			if (this.lnInd === null) {
				if (this.p && this.tagr && this.c[0] instanceof lib.blk)
					this.lnInd = 4;
				else
					this.lnInd = 0;
			}

			// kids wrapped?
			if (this.wrapK === null) {
				if (this.tagr && this.c[0] instanceof lib.blk)
					this.wrapK = "\n";
				else
					this.wrapK = "";
			}
		},

		rend: function()
		{
			return wrap.call(this, (this.tagr ? otag(this.tag, this.e) : "") + wrap.call(this, pfxLines(pfxLines(this.rendK(), this.lnPfx), rep(" ", this.lnInd)), this.wrapK) + (this.tagr ? ctag(this.tag) : ""), this.wrap);
		},

		rendK: function()
		{
			var kids = this.supr();
			// remove min uniform leading spaces from block children. marked.js's list outdent algo sometimes leaves these
			if (this.p instanceof lib.li) {
				var repl = null, spcs = kids.match(/^[\t ]+/gm);
				if (!spcs) return kids;
				for (var i = 0; i < spcs.length; i++) {
					if (repl === null || spcs[i][0].length < repl.length)
						repl = spcs[i][0];
				}
				return kids.replace(new RegExp("^" + repl), "");
			}
			return kids;
		}
	});

	lib.tblk = lib.blk.extend({tagr: true});

	lib.cblk = lib.blk.extend({wrap: ["\n", ""]});

		lib.ctblk = lib.cblk.extend({tagr: true});

	lib.inl = lib.tag.extend({
		rend: function()
		{
			var kids = this.rendK(),
				parts = kids.match(/^((?: |\t|&nbsp;)*)(.*?)((?: |\t|&nbsp;)*)$/) || [kids, "", kids, ""];

			return parts[1] + wrap.call(this, parts[2], this.wrap) + parts[3];
		}
	});

		lib.tinl = lib.inl.extend({
			tagr: true,
			rend: function()
			{
				return otag(this.tag, this.e) + wrap.call(this, this.rendK(), this.wrap) + ctag(this.tag);
			}
		});

		lib.p = lib.blk.extend({
			rendK: function() {
				return this.supr().replace(/^\s+/gm, "");
			}
		});

		lib.list = lib.blk.extend({
			expn: false,
			wrap: [function(){return this.p instanceof lib.li ? "\n" : "\n\n";}, ""]
		});

		lib.ul = lib.list.extend({});

		lib.ol = lib.list.extend({});

		lib.li = lib.cblk.extend({
			wrap: ["\n", function(kids) {
				return this.p.expn || kids.match(/\n{2}/gm) ? "\n" : "";			// || this.kids.match(\n)
			}],
			wrapK: [function() {
				return this.p.tag == "ul" ? cfg.li_bullet + " " : (this.i + 1) + ".  ";
			}, ""],
			rendK: function() {
				return this.supr().replace(/\n([^\n])/gm, "\n" + cfg.indnt_str + "$1");
			}
		});

		lib.hr = lib.blk.extend({
			wrap: ["\n\n", rep(cfg.hr_char, 3)]
		});

		lib.h = lib.blk.extend({});

		lib.h_setext = lib.h.extend({});

			cfg.h1_setext && (lib.h1 = lib.h_setext.extend({
				wrapK: ["", function(kids) {
					return "\n" + rep("=", kids.length);
				}]
			}));

			cfg.h2_setext && (lib.h2 = lib.h_setext.extend({
				wrapK: ["", function(kids) {
					return "\n" + rep("-", kids.length);
				}]
			}));

		lib.h_atx = lib.h.extend({
			wrapK: [
				function(kids) {
					return rep("#", this.tag[1]) + " ";
				},
				function(kids) {
					return cfg.h_atx_suf ? " " + rep("#", this.tag[1]) : "";
				}
			]
		});
			!cfg.h1_setext && (lib.h1 = lib.h_atx.extend({}));

			!cfg.h2_setext && (lib.h2 = lib.h_atx.extend({}));

			lib.h3 = lib.h_atx.extend({});

			lib.h4 = lib.h_atx.extend({});

			lib.h5 = lib.h_atx.extend({});

			lib.h6 = lib.h_atx.extend({});

		lib.a = lib.inl.extend({
			lnkid: null,
			rend: function() {
				var kids = this.rendK(),
					href = this.e.getAttribute("href"),
					title = this.e.title ? ' "' + this.e.title + '"' : "";

				if (!href || href == kids || href[0] == "#" && !cfg.hash_lnks)
					return kids;

				if (cfg.link_list)
					return "[" + kids + "] [" + (this.lnkid + 1) + "]";

				return "[" + kids + "](" + href + title + ")";
			}
		});

		// almost identical to links, maybe merge
		lib.img = lib.inl.extend({
			lnkid: null,
			rend: function() {
				var kids = this.e.alt,
					src = this.e.getAttribute("src");

				if (cfg.link_list)
					return "![" + kids + "] [" + (this.lnkid + 1) + "]";

				var title = this.e.title ? ' "'+ this.e.title + '"' : "";

				return "![" + kids + "](" + src + title + ")";
			}
		});


		lib.em = lib.inl.extend({wrap: cfg.emph_char});

		lib.del = cfg.gfm_del ? lib.inl.extend({wrap: "~~"}) : lib.tinl.extend();

		lib.br = lib.inl.extend({
			wrap: ["", function() {
				var end = cfg.br_only ? "<br>" : "  ";
				// br in headers output as html
				return this.p instanceof lib.h ? "<br>" : end + "\n";
			}]
		});

		lib.strong = lib.inl.extend({wrap: rep(cfg.bold_char, 2)});

		lib.blockquote = lib.blk.extend({
			lnPfx: "> ",
			rend: function() {
				return this.supr().replace(/>[ \t]$/gm, ">");
			}
		});

		// can render with or without tags
		lib.pre = lib.blk.extend({
			tagr: true,
			wrapK: "\n",
			lnInd: 0
		});

		// can morph into inline based on context
		lib.code = lib.blk.extend({
			tagr: false,
			wrap: "",
			wrapK: function(kids) {
				return kids.indexOf("`") !== -1 ? "``" : "`";	// esc double backticks
			},
			lnInd: 0,
			init: function(e, p, i) {
				this.supr(e, p, i);

				if (this.p instanceof lib.pre) {
					this.p.tagr = false;

					if (cfg.gfm_code) {
						var cls = this.e.getAttribute("class");
						cls = (cls || "").split(" ")[0];

						if (cls.indexOf("lang-") === 0)			// marked uses "lang-" prefix now
							cls = cls.substr(5);

						this.wrapK = ["```" + cls + "\n", "\n```"];
					}
					else {
						this.wrapK = "";
						this.p.lnInd = 4;
					}
				}
			}
		});

		lib.table = cfg.gfm_tbls ? lib.blk.extend({
			cols: [],
			init: function(e, p, i) {
				this.supr(e, p, i);
				this.cols = [];
			},
			rend: function() {
				// run prep on all cells to get max col widths
				for (var tsec = 0; tsec < this.c.length; tsec++)
					for (var row = 0; row < this.c[tsec].c.length; row++)
						for (var cell = 0; cell < this.c[tsec].c[row].c.length; cell++)
							this.c[tsec].c[row].c[cell].prep();

				return this.supr();
			}
		}) : lib.tblk.extend();

		lib.thead = cfg.gfm_tbls ? lib.cblk.extend({
			wrap: ["\n", function(kids) {
				var buf = "";
				for (var i = 0; i < this.p.cols.length; i++) {
					var col = this.p.cols[i],
						al = col.a[0] == "c" ? ":" : " ",
						ar = col.a[0] == "r" || col.a[0] == "c" ? ":" : " ";

					buf += (i == 0 && cfg.tbl_edges ? "|" : "") + al + rep("-", col.w) + ar + (i < this.p.cols.length-1 || cfg.tbl_edges ? "|" : "");
				}
				return "\n" + trim12(buf);
			}]
		}) : lib.ctblk.extend();

		lib.tbody = cfg.gfm_tbls ? lib.cblk.extend() : lib.ctblk.extend();

		lib.tfoot = cfg.gfm_tbls ? lib.cblk.extend() : lib.ctblk.extend();

		lib.tr = cfg.gfm_tbls ? lib.cblk.extend({
			wrapK: [cfg.tbl_edges ? "| " : "", cfg.tbl_edges ? " |" : ""]
		}) : lib.ctblk.extend();

		lib.th = cfg.gfm_tbls ? lib.inl.extend({
			guts: null,
			// TODO: DRY?
			wrap: [function() {
				var col = this.p.p.p.cols[this.i],
					spc = this.i == 0 ? "" : " ",
					pad, fill = col.w - this.guts.length;

				switch (col.a[0]) {
					case "r": pad = rep(" ", fill); break;
					case "c": pad = rep(" ", Math.floor(fill/2)); break;
					default:  pad = "";
				}

				return spc + pad;
			}, function() {
				var col = this.p.p.p.cols[this.i],
					edg = this.i == this.p.c.length - 1 ? "" : " |",
					pad, fill = col.w - this.guts.length;

				switch (col.a[0]) {
					case "r": pad = ""; break;
					case "c": pad = rep(" ", Math.ceil(fill/2)); break;
					default:  pad = rep(" ", fill);
				}

				return pad + edg;
			}],
			prep: function() {
				this.guts = this.rendK();					// pre-render
				this.rendK = function() {return this.guts};

				var cols = this.p.p.p.cols;
				if (!cols[this.i])
					cols[this.i] = {w: null, a: ""};		// width and alignment
				var col = cols[this.i];
				col.w = Math.max(col.w || 0, this.guts.length);

				var align = this.e.align || this.e.style.textAlign;
				if (align)
					col.a = align;
			}
		}) : lib.ctblk.extend();

			lib.td = lib.th.extend();

		lib.txt = lib.inl.extend({
			initK: function()
			{
				this.c = this.e.textContent.split(/^/gm);
			},
			rendK: function()
			{
				var kids = this.c.join("").replace(/\r/gm, "");

				// this is strange, cause inside of code, inline should not be processed, but is?
				if (!(this.p instanceof lib.code || this.p instanceof lib.pre)) {
					kids = kids
					.replace(/^\s*([#*])/gm, function(match, $1) {
						return match.replace($1, "\\" + $1);
					});
				}

				if (this.i == 0)
					kids = kids.replace(/^\n+/, "");
				if (this.i == this.p.c.length - 1)
					kids = kids.replace(/\n+$/, "");

				return kids.replace(/\u00a0/gm, cfg.nbsp_spc ? " " : "&nbsp;");
			}
		});

		lib.rawhtml = lib.blk.extend({
			initK: function()
			{
				this.guts = outerHTML(this.e);
			},
			rendK: function()
			{
				return this.guts;
			}
		});

		// compile regexes
		for (var i in cfg.unsup_tags)
			cfg.unsup_tags[i] = new RegExp("^(?:" + (i == "inline" ? "a|em|strong|img|code|del|" : "") + cfg.unsup_tags[i].replace(/\s/g, "|") + ")$");
};

/*!
  * klass: a classical JS OOP façade
  * https://github.com/ded/klass
  * License MIT (c) Dustin Diaz 2014
  */
!function(e,t,n){typeof define=="function"?define(n):typeof module!="undefined"?module.exports=n():t[e]=n()}("klass",this,function(){function i(e){return a.call(s(e)?e:function(){},e,1)}function s(e){return typeof e===t}function o(e,t,n){return function(){var i=this.supr;this.supr=n[r][e];var s={}.fabricatedUndefined,o=s;try{o=t.apply(this,arguments)}finally{this.supr=i}return o}}function u(e,t,i){for(var u in t)t.hasOwnProperty(u)&&(e[u]=s(t[u])&&s(i[r][u])&&n.test(t[u])?o(u,t[u],i):t[u])}function a(e,t){function n(){}function c(){this.init?this.init.apply(this,arguments):(t||a&&i.apply(this,arguments),f.apply(this,arguments))}n[r]=this[r];var i=this,o=new n,a=s(e),f=a?e:this,l=a?{}:e;return c.methods=function(e){return u(o,e,i),c[r]=o,this},c.methods.call(c,l).prototype.constructor=c,c.extend=arguments.callee,c[r].implement=c.statics=function(e,t){return e=typeof e=="string"?function(){var n={};return n[e]=t,n}():e,u(this,e,i),this},c}var e=this,t="function",n=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,r="prototype";return i})
;/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.4.1
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowPast: true,
      allowFuture: false,
      localeTitle: false,
      cutoff: 0,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        inPast: 'any moment now',
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },

    inWords: function(distanceMillis) {
      if(!this.settings.allowPast && ! this.settings.allowFuture) {
          throw 'timeago allowPast and allowFuture settings can not both be set to false.';
      }

      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      if(!this.settings.allowPast && distanceMillis >= 0) {
        return this.settings.strings.inPast;
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },

    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      s = s.replace(/([\+\-]\d\d)$/," $100"); // +09 -> +0900
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  // functions that can be called via $(el).timeago('action')
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function(){
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis > 0) {
        this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(time){
      var parsedTime = $t.parse(time);
      $(this).data('timeago', { datetime: parsedTime });
      if($t.settings.localeTitle) $(this).attr("title", parsedTime.toLocaleString());
      refresh.apply(this);
    },
    updateFromDOM: function(){
      $(this).data('timeago', { datetime: $t.parse( $t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title") ) });
      refresh.apply(this);
    },
    dispose: function () {
      if (this._timeagoInterval) {
        window.clearInterval(this._timeagoInterval);
        this._timeagoInterval = null;
      }
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if(!fn){
      throw new Error("Unknown function name '"+ action +"' for timeago");
    }
    // each over objects here and call the requested function
    this.each(function(){
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    var data = prepareData(this);
    var $s = $t.settings;

    if (!isNaN(data.datetime)) {
      if ( $s.cutoff == 0 || Math.abs(distance(data.datetime)) < $s.cutoff) {
        $(this).text(inWords(data.datetime));
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if ($t.settings.localeTitle) {
        element.attr("title", element.data('timeago').datetime.toLocaleString());
      } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));
;/*!
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 */

;(function($) {

  var readmore = 'readmore',
      defaults = {
        speed: 100,
        maxHeight: 200,
        heightMargin: 16,
        moreLink: '<a href="#">Read More</a>',
        lessLink: '<a href="#">Close</a>',
        embedCSS: true,
        sectionCSS: 'display: block; width: 100%;',
        startOpen: false,
        expandedClass: 'readmore-js-expanded',
        collapsedClass: 'readmore-js-collapsed',

        // callbacks
        beforeToggle: function(){},
        afterToggle: function(){}
      },
      cssEmbedded = false;

  function Readmore( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options);

    $(this.element).data('max-height', this.options.maxHeight);
    $(this.element).data('height-margin', this.options.heightMargin);

    delete(this.options.maxHeight);

    if(this.options.embedCSS && ! cssEmbedded) {
      var styles = '.readmore-js-toggle, .readmore-js-section { ' + this.options.sectionCSS + ' } .readmore-js-section { overflow: hidden; }';

      (function(d,u) {
        var css=d.createElement('style');
        css.type = 'text/css';
        if(css.styleSheet) {
            css.styleSheet.cssText = u;
        }
        else {
            css.appendChild(d.createTextNode(u));
        }
        d.getElementsByTagName('head')[0].appendChild(css);
      }(document, styles));

      cssEmbedded = true;
    }

    this._defaults = defaults;
    this._name = readmore;

    this.init();
  }

  Readmore.prototype = {

    init: function() {
      var $this = this;

      $(this.element).each(function() {
        var current = $(this),
            maxHeight = (current.css('max-height').replace(/[^-\d\.]/g, '') > current.data('max-height')) ? current.css('max-height').replace(/[^-\d\.]/g, '') : current.data('max-height'),
            heightMargin = current.data('height-margin');

        if(current.css('max-height') != 'none') {
          current.css('max-height', 'none');
        }

        $this.setBoxHeight(current);

        if(current.outerHeight(true) <= maxHeight + heightMargin) {
          // The block is shorter than the limit, so there's no need to truncate it.
          return true;
        }
        else {
          current.addClass('readmore-js-section ' + $this.options.collapsedClass).data('collapsedHeight', maxHeight);

          var useLink = $this.options.startOpen ? $this.options.lessLink : $this.options.moreLink;
          current.after($(useLink).on('click', function(event) { $this.toggleSlider(this, current, event) }).addClass('readmore-js-toggle'));

          if(!$this.options.startOpen) {
            current.css({height: maxHeight});
          }
        }
      });

      $(window).on('resize', function(event) {
        $this.resizeBoxes();
      });
    },

    toggleSlider: function(trigger, element, event)
    {
      event.preventDefault();

      var $this = this,
          newHeight = newLink = sectionClass = '',
          expanded = false,
          collapsedHeight = $(element).data('collapsedHeight');

      if ($(element).height() <= collapsedHeight) {
        newHeight = $(element).data('expandedHeight') + 'px';
        newLink = 'lessLink';
        expanded = true;
        sectionClass = $this.options.expandedClass;
      }

      else {
        newHeight = collapsedHeight;
        newLink = 'moreLink';
        sectionClass = $this.options.collapsedClass;
      }

      // Fire beforeToggle callback
      $this.options.beforeToggle(trigger, element, expanded);

      $(element).animate({'height': newHeight}, {duration: $this.options.speed, complete: function() {
          // Fire afterToggle callback
          $this.options.afterToggle(trigger, element, expanded);

          $(trigger).replaceWith($($this.options[newLink]).on('click', function(event) { $this.toggleSlider(this, element, event) }).addClass('readmore-js-toggle'));

          $(this).removeClass($this.options.collapsedClass + ' ' + $this.options.expandedClass).addClass(sectionClass);
        }
      });
    },

    setBoxHeight: function(element) {
      var el = element.clone().css({'height': 'auto', 'width': element.width(), 'overflow': 'hidden'}).insertAfter(element),
          height = el.outerHeight(true);

      el.remove();

      element.data('expandedHeight', height);
    },

    resizeBoxes: function() {
      var $this = this;

      $('.readmore-js-section').each(function() {
        var current = $(this);

        $this.setBoxHeight(current);

        if(current.height() > current.data('expandedHeight') || (current.hasClass($this.options.expandedClass) && current.height() < current.data('expandedHeight')) ) {
          current.css('height', current.data('expandedHeight'));
        }
      });
    },

    destroy: function() {
      var $this = this;

      $(this.element).each(function() {
        var current = $(this);

        current.removeClass('readmore-js-section ' + $this.options.collapsedClass + ' ' + $this.options.expandedClass).css({'max-height': '', 'height': 'auto'}).next('.readmore-js-toggle').remove();

        current.removeData();
      });
    }
  };

  $.fn[readmore] = function( options ) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if ($.data(this, 'plugin_' + readmore)) {
          var instance = $.data(this, 'plugin_' + readmore);
          instance['destroy'].apply(instance);
        }

        $.data(this, 'plugin_' + readmore, new Readmore( this, options ));
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + readmore);
        if (instance instanceof Readmore && typeof instance[options] === 'function') {
          instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
        }
      });
    }
  }
})(jQuery);
;var Analytics = {

	/**
	 * CiiMS's data information
	 * @var array ciims
	 */
	ciims : {},

	/**
	 * The change timeout
	 * @var timeout changeTimeout
	 */
	changeTimeout : null,

	/**
	 * Init bootstrap method
	 */
	init : function() {

		this.ciims = CiiMSDashboard.getAuthData();

		this.nanoscroller();

		this.centerAlignImages();

		this.providerClickBehavior();

		this.changeBehavior();
	},

	/**
	 * Provider click behavior
	 */
	providerClickBehavior: function() {
		var self = this;

		$(".provider").click(function(e) {
			e.preventDefault();
			$(".provider").removeClass("active");
			$(this).addClass("active");

			var name = $(this).attr("data-attr-name");
			$(".options-panel").hide();
			$(".options-panel."+name).show();

			self.nanoscroller();
		})
	},

	/**
	 * Tricky Js to actually center align images
	 */
	centerAlignImages: function() {
		setTimeout(function() {
			$(".providers img").each(function() {
				var height = $(this).height(),
					top = (50 - ( height / 2 ));
			    $(this).css("padding-top", top);
			});
		}, 500);
	},

	/**
	 * Ajax Before send parent
	 */
	ajaxBeforeSend: function() {
		$("#nav-icon").removeClass("fa-ellipsis-v");

		if ($("#nav-icon").find("span").length == 0)
		{
			var element = $("<span>").addClass("fa fa-spinner fa-spin active");
			$("#nav-icon").append($(element));
		}

		// Remove all the previous success messages
		$(".alert-show").remove();
	},

	/**
	 * Ajax completed callback
	 */
	ajaxCompleted: function() {
		setTimeout(function() {
			$("#nav-icon").addClass("fa-ellipsis-v");
			$("#nav-icon").find("span").remove(); 
		}, 500);
	},

	/**
	 * Ajax success callback
	 */
	ajaxSuccess: function(message) {
		var self = this;
		self.nanoscroller();
	},

	/**
	 * Handles triggering the ajax change request.
	 */
	changeBehavior : function() {
		var self = this;
		$("input").change(function() {
			clearTimeout(self.changeTimeout);
			self.changeTimeout = setTimeout(function() {
				self.submitAjaxChangeRequest();
			}, 250);			
		});

		$("input").keyup(function() {
			clearTimeout(self.changeTimeout);
			self.changeTimeout = setTimeout(function() {
				self.submitAjaxChangeRequest();
			}, 250);			
		});
	},

	/**
	 * Submits an ajax change request
	 */
	submitAjaxChangeRequest : function() {

		var self = this,
			data = $("form").serialize();

		$.ajax({
			url: window.location.origin + '/api/setting/analytics',
			type: 'POST',
			headers: {
				'X-Auth-Email': self.ciims.email,
				'X-Auth-Token': self.ciims.token
			},
			data: data,
			beforeSend: function() {
				self.ajaxBeforeSend();
			},
			success: function(data, textStatus, jqXHR) {
				self.ajaxSuccess(data.success);
			},
			completed: self.ajaxCompleted()
		});
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		return $(".nano").nanoScroller({ iOSNativeScrolling: true }); 
	},
};;// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};;var Categories = {

	/**
	 * CiiMS data from localStorage
	 */
	ciims : {},

	/**
	 * The current page
	 */
	page : 1,

	/**
	 * Search query, if any
	 */
	query : null,

	/**
	 * Categories that we have currently loaded
	 * Ajax response should store their information here to prevent having to fire off an Ajax
	 * Request to display the data
	 */
	categories : [],

	/**
	 * Search timeout
	 */
	searchTimeout : null,

	registerCategories : function() {
		this.ciims = CiiMSDashboard.getAuthData();

		// Load the initial categories list
		this.list(false, this.query, this.page);

		// Bind the search form functionality
		this.bindSearch();

		// Binds the creation form functionality
		this.bindCreate();

		$("#NewCategoryButton").click(function() {
			$("#create_form").show();
			$("#edit_form").hide();
			$(".paginated_results ul li").removeClass("active");
		});
	},

	// Create stuff
	bindCreate : function() {

		var self = this;
		$("#CategoryCreate_Submit").click(function() {
			return $("#category-form").submit();
		});
 
		$("#category-form").submit(function(e) {
			var data = {};
			$("#category-form :input").not("#CategoryCreate_Submit").each(function() {
				var el = this,
					name = $(this).attr("id").replace("Categories_", ""),
					val = $(this).val();
				data[name] = val;
			});

			$.ajax({
				url: window.location.origin + '/api/category',
				type: 'POST',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				data: data,
				beforeSend: function() {
					$("#category-form :input").removeClass("error");
					$("#category-form").find(".alert").remove();
					self.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");


					$.each(json.response, function(k, v) { 
						$("#Categories_" + k).addClass("error");
						alert.append($("<p>").text(v));
					});

					$("#category-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					// Clear the field
					$("#category-form :input").not("#CategoryCreate_Submit").val('');
					$("#Categories_parent_id").val(1);
					self.renderLi(data.response, $(".paginated_results ul"), true);

					self.ajaxSuccess(data.success);
				},
				completed: self.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Ajax Before send parent
	 */
	ajaxBeforeSend: function() {
		$("#nav-icon").removeClass("fa-ellipsis-v");

		if ($("#nav-icon").find("span").length == 0)
		{
			var element = $("<span>").addClass("fa fa-spinner fa-spin active");
			$("#nav-icon").append($(element));
		}

		// Remove all the previous success messages
		$(".alert-show").remove();
	},

	/**
	 * Ajax completed callback
	 */
	ajaxCompleted: function() {
		setTimeout(function() {
			$("#nav-icon").addClass("fa-ellipsis-v");
			$("#nav-icon").find("span").remove(); 
		}, 1000);
	},

	/**
	 * Ajax success callback
	 */
	ajaxSuccess: function(message) {

		var self = this,
			alert = $("<section>").addClass("settings_container alert-show"),
			fieldset = $("<fieldset>"),
			divOverflow = $("<div>"),
			div = $("<div>").addClass("alert alert-success").css("width", "auto").css("margin-bottom", "0px").text(message);

		$(divOverflow).append($(div));
		$(fieldset).append($(divOverflow));
		$(alert).append($(fieldset));

		if (message != null)
		{
			$("main .paginated_results").after(alert);

			// Automatically hide the alert after 5s
			setTimeout(function() {
				$(".alert-show").remove();
			}, 5000);
		}

		// Bind behaviors
		self.clickBehavior();
		self.nanoscroller();
	},

	/**
	 * Renders an LI element
	 * @param object data
	 * @param DOM ul
	 * @param boolean prepend
	 */
	renderLi: function(data, ul, prepend) {
		var self = this;
		self.categories[data.id] = data;

		if (prepend == undefined)
			prepend = false;

		var li = $("<li>").attr('category_id', data.id),
			info = $("<div>");

		// Build the info object
		$(info).addClass("user-info");
		$(info).append($("<h6>").text(data.name));
		$(info).append($("<span>").text(data.parent.name)).attr('title', data.parent.name);

		$(li).append($(info));
		
		// Append it to the list
		if (prepend)
			$(ul).prepend($(li));
		else
			$(ul).append($(li));

	},

	/**
	 * Binds search functionality to the list view
	 */
	bindSearch : function() {
		// When the search field changes
		var self = this;
		$("#search").keyup(function() {
			// Set a timeout to perform the search
			clearTimeout(self.searchTimeout);
			self.searchTimeout = setTimeout(function() {
				self.query = $("#search").val();
				self.list(true, self.query, 1);
			}, 500);
		});
	},
	
	/**
	 * Populates the category-form with the data provided from Categories.categories[]
	 * @param object data
	 */
	populate : function(data) {
		$.each(data, function(k, v) {
			$("#m-category-form :input#Categories_"+k).val(v);
		});
		$("#edit_form").show();
	},

	/**
	 * Rebinds the click behavior to the appropriate elements
	 */
	clickBehavior : function() {
		var self = this;
		$(".paginated_results ul li").unbind("click");
		$(".paginated_results ul li").click(function() {

			// Remove the active class from the other attributes
			$(".paginated_results ul li").removeClass("active");

			$("#create_form").hide();

			self.populate(Categories.categories[$(this).attr('category_id')]);

			$(this).addClass("active");

			self.deleteBehavior();
			self.updateBehavior();
		});
	},

	deleteBehavior: function() {
		var self = this;
		$("#CategoryDelete_Submit").click(function(e) {
			e.preventDefault();
			$.ajax({
				url: window.location.origin + '/api/category/' + $("#m-category-form #Categories_id").val(),
				type: 'DELETE',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				beforeSend: function() {
					self.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");

					$("#category-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					self.ajaxSuccess(data.success);

					var id = $("#m-category-form #Categories_id").val();
					self.categories.remove(id);

					$(".paginated_results ul li[category_id=" + id + "]").remove();

					// Reutilize the click to transition the view
					$("#NewCategoryButton").click();
				},
				completed: self.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Updates a category
	 */
	updateBehavior: function() {
		var self = this;
		$("#CategoryUpdate_Submit").click(function() {
			return $("#m-category-form").submit();
		});
 
		$("#m-category-form").submit(function(e) {
			var data = {};
			$("#m-category-form :input").not("#CategoryUpdate_Submit").each(function() {
				var el = this,
					name = $(this).attr("id").replace("Categories_", ""),
					val = $(this).val();
				data[name] = val;
			});

			$.ajax({
				url: window.location.origin + '/api/category/' + $("#m-category-form #Categories_id").val(),
				type: 'POST',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				data: data,
				beforeSend: function() {
					$("#m-category-form :input").removeClass("error");
					$("#m-category-form").find(".alert").remove();
					self.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");


					$.each(json.response, function(k, v) { 
						$("#Categories_" + k).addClass("error");
						alert.append($("<p>").text(v));
					});

					$("#category-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {

					//self.renderLi(data.response, $(".paginated_results ul"), true);

					self.ajaxSuccess(data.success);

					// Update the information we have on record
					self.categories[data.response.id] = data.response;

					// Reutilize the click to transition the view
					$("#NewCategoryButton").click();
				},
				completed: self.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Performs an AJAX GET query to load the available categories
	 * @param boolean clear
	 * @param string query
	 * @param int page
	 */
	list : function(clear, query, page) {
		var self = this;
		$.ajax({
			url: window.location.origin + '/api/category/index?page=' + page + (query == null ? '' : '&Categories[name]='+query),
			type: 'GET',
			headers: {
				'X-Auth-Email': self.ciims.email,
				'X-Auth-Token': self.ciims.token
			},
			beforeSend: function() {
				// Clear the results on before send, if requested
				if (clear)
					$(".paginated_results ul").empty();

				self.page = page;

				self.ajaxBeforeSend();
			},
			error: function(data) {
				var json = $.parseJSON(data.responseText);

				// unbind the scrolling event to prevent unecessary requests to the API
				if (json.status == 404)
					$(".paginated_results .nano .nano-content").unbind("scroll");
			},
			success: function(data, textStatus, jqXHR) {
				var ul = $(".paginated_results ul");
				$(data.response).each(function() {
					self.renderLi(this, ul);
				});

				self.ajaxSuccess(null);
			},
			completed: self.ajaxCompleted()
		});
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		// Froce nanoscroller to rebuild itself
		var self = this;
		
		$(".paginated_results .nano").nanoScroller({ destroy: true });
		$(".paginated_results .nano").nanoScroller({ iOSNativeScrolling: true }); 

		// Rebind the scrollend behavior
		$(".paginated_results .nano .nano-content").unbind("scroll");
		$(".paginated_results .nano .nano-content").bind("scroll", function(e) {
			if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight - 1)
		    	self.list(false, self.query, ++self.page);
		});
	},
};;var CiiMSDashboard = {
	
	/**
	 * Authentication data for the API
	 * @var authData
	 */
	authData : false,

	/**
	 * Rerieves the authdata
	 * @return object
	 */
	getAuthData : function() {
		if (this.authData == false)
			this.setAuthData();

		return this.authData;
	},

	/**
	 * Sets the authdata
	 */
	setAuthData : function() {
		this.authData = $.parseJSON(localStorage.getItem('ciims'));
	}
};;var Content = {

	/**
	 * CiiMS data from localStorage
	 */
	ciims : {},

	/**
	 * The current page
	 */
	page : 1,

	/**
	 * Search query, if any
	 */
	query : null,

	/**
	 * Filters that should be applied
	 */
	filter : null,

	/**
	 * Order that results should be displayed in
	 */
	order : null,

	/**
	 * Content that we have currently loaded
	 * Ajax response should store their information here to prevent having to fire off an Ajax
	 * Request to display the data
	 */
	content : [],
	contentCopy: [],

	/**
	 * Search timeout
	 */
	searchTimeout : null,

	init : function() {
		this.ciims = CiiMSDashboard.getAuthData();

		// Load the initial content list
		this.list(false, this.query, this.page);

		// Bind the search form functionality
		this.bindSearch();
		this.bindFilter();
		this.bindSorting();
	},

	/**
	 * Ajax Before send parent
	 */
	ajaxBeforeSend: function() {
		$("#nav-icon").removeClass("fa-ellipsis-v");

		if ($("#nav-icon").find("span").length == 0)
		{
			var element = $("<span>").addClass("fa fa-spinner fa-spin active");
			$("#nav-icon").append($(element));
		}

		// Remove all the previous success messages
		$(".alert-show").remove();
	},

	/**
	 * Ajax completed callback
	 */
	ajaxCompleted: function() {
		setTimeout(function() {
			$("#nav-icon").addClass("fa-ellipsis-v");
			$("#nav-icon").find("span").remove(); 
		}, 1000);
	},

	/**
	 * Ajax success callback
	 */
	ajaxSuccess: function(message) {

		var self = this,
			alert = $("<section>").addClass("settings_container alert-show"),
			fieldset = $("<fieldset>"),
			divOverflow = $("<div>"),
			div = $("<div>").addClass("alert alert-success").css("width", "auto").css("margin-bottom", "0px").text(message);

		$(divOverflow).append($(div));
		$(fieldset).append($(divOverflow));
		$(alert).append($(fieldset));

		if (message != null)
		{
			$("main .paginated_results").after(alert);

			// Automatically hide the alert after 5s
			setTimeout(function() {
				$(".alert-show").remove();
			}, 5000);
		}

		// Bind behaviors
		self.clickBehavior();
		self.nanoscroller();
	},

	/**
	 * Render wrapper
	 * @param array data
	 */
	render : function(data) {
		var self = this;

		var ul = $(".paginated_results ul");
		$(data).each(function() {
			self.renderLi(this, ul);
			$(".timeago").timeago();
			// Render the comment counts
			CMSComments.commentCount()

			// Wait until the data has finished loading before calling completed
			self.ajaxCompleted();
		});
	},

	/**
	 * Renders an LI element
	 * @param object data
	 * @param DOM ul
	 * @param boolean prepend
	 */
	renderLi: function(data, ul, prepend) {
		var self = this;
		self.content[data.id] = data;

		if (prepend == undefined)
			prepend = false;

		var li = $("<li>").attr('content_id', data.id),
			info = $("<div>"),
			side = $("<div>").addClass("icons");

		// Build the info object
		$(info).addClass("user-info");
		$(info).append($("<h6>").text(data.title));
		var name = data.author.firstName + " " + data.author.lastName;
		$(info).append($("<span>").text(name)).attr('title', name);

		if (data.status == 0)
		{
			$(li).addClass("draft");
			var text = $(".draft-text").text();
			$(info).append($("<span>").addClass("draft").text(text).attr('title', text));
		}
		else if (data.status == 1)
		{
			var currentUnixTime = Math.round(new Date().getTime() / 1000);
			if (currentUnixTime < data.published)
			{
				$(li).addClass("scheduled");
				var dateTime = new Date( (data.published * 1000) ),
					dateTime = dateTime.format('F d, Y @ H:i'),
					text = $(".scheduled-text").text().replace('{{date}}', dateTime);

				$(info).append($("<span>").addClass("scheduled").text(text).attr('title', text));
			}
			else
			{
				// Date time
				var dateTime = new Date( (data.created * 1000) ),
					titleTime = dateTime.format('F d, Y @ H:i'),
					dateTime = dateTime.format('c');

				$(info).append($("<span>").addClass("timeago").attr('datetime', dateTime).attr('title', titleTime));

				// Comment Icons
				$(side).append($("<span>").addClass("comment-container comment-count").attr('data-attr-slug', "/"+data.slug).attr('data-attr-id', data.id));
				$(side).append($("<span>").addClass("likes-container").append(data.like_count));
			}
		}

		$(li).append($(info)).append($(side));
		
		// Append it to the list
		if (prepend)
			$(ul).prepend($(li));
		else
			$(ul).append($(li));

	},

	/**
	 * Binds search functionality to the list view
	 */
	bindSearch : function() {
		// When the search field changes
		var self = this;
		$("#search").keyup(function() {
			// Set a timeout to perform the search
			clearTimeout(self.searchTimeout);
			self.searchTimeout = setTimeout(function() {
				self.query = $("#search").val();
				self.list(true, self.query, 1);
			}, 500);
		});
	},
	
	/**
	 * Populates the content-form with the data provided from content.content[]
	 * @param object data
	 */
	populate : function(data) {

		console.log(data);

	},

	/**
	 * Rebinds the click behavior to the appropriate elements
	 */
	clickBehavior : function() {
		var self = this;
		$(".paginated_results ul li").unbind("click");
		$(".paginated_results ul li").click(function() {

			// Remove the active class from the other attributes
			$(".paginated_results ul li").removeClass("active");

			self.populate(self.content[$(this).attr('content_id')]);

			$(this).addClass("active");

			self.deleteBehavior();
		});
	},

	deleteBehavior: function() {
		var self = this;
		$("#ContentDelete_Submit").click(function(e) {
			e.preventDefault();
			$.ajax({
				url: window.location.origin + '/api/content/' + $("#m-content-form #content_id").val(),
				type: 'DELETE',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				beforeSend: function() {
					self.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");

					$("#content-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					self.ajaxSuccess(data.success);

					var id = $("#m-content-form #content_id").val();
					self.content.remove(id);

					$(".paginated_results ul li[content_id=" + id + "]").remove();

					// Reutilize the click to transition the view
					$("#NewContentButton").click();
				},
				completed: self.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Binds the filter behavior to the page
	 */
	bindFilter : function() {
		var self = this;

		$(".filter-container ul.filter li").click(function() {
			if ($(this).hasClass("active"))
			{
				$(this).removeClass("active");
				self.filter = null;
				self.list(true, self.query, 1);
			}
			else
			{
				$(".filter-container ul.filter li").removeClass("active");
				$(this).addClass("active");
				self.filter = $(this).attr('data-attr-param');
				self.list(true, self.query, 1);
			}
		});
	},

	/**
	 * Binds the sorting behavior to the page
	 */
	bindSorting : function() {
		var self = this;

		$(".order-container ul.order li").click(function() {

			var name = $(this).attr('name');

			// Create a deep copy of the content array
			if (self.contentCopy == null)
				self.contentCopy = self.content.reverse();

			// Retrieve the order
			var order = $(this).hasClass('asc') ? 'asc' : ($(this).hasClass('dsc') ? 'dsc' : false);

			$(".order-container ul.order li").removeClass("active").removeClass("asc").removeClass("dsc");
			$(this).addClass("active");

			if (order == false)
			{
				// Transition from an undefined state to an ASC sort by this attribute
				$(this).addClass("asc").removeClass("dsc");
				self.content = self.sortByKey(self.content, name, 1);
			}
			else if (order == 'asc')
			{
				$(this).removeClass("asc").addClass("dsc");
				self.content = self.sortByKey(self.content, name, -1);
			}
			else if (order == 'dsc')
			{
				$(this).removeClass("dsc").removeClass("asc").removeClass("active");

				// Clear the content out
				self.content = [];

				// And remove the leading key that is used for identification so it can be redisplayed without issue
				$.each(self.contentCopy, function(k, v) {
					if (v != undefined)
						self.content.push(v);
				});
			}

			// Clear the displayed results
			self.ajaxBeforeSend();
			$(".paginated_results ul").empty();

			var copy = self.content;
			self.content = [];

			self.render(copy);

			self.ajaxSuccess(null);
		});
	},

	/**
	 * Sorts the content array by a given key
	 * http://stackoverflow.com/a/8175221
	 * @param array array
	 * @param string key
	 * @return array
	 */
	sortByKey : function(array, key, order) {
		var copy = [];

		$.each(array, function(k, v) {
			if (v != undefined)
				copy.push(v);
		});

	    return copy.sort(function(a, b) {
	        var x = a[key]; var y = b[key];
	        return ((x < y) ? (order * -1) : ((x > y) ? order : 0));
	    });
	},

	/**
	 * Performs an AJAX GET query to load the available content
	 * @param boolean clear
	 * @param string query
	 * @param int page
	 */
	list : function(clear, query, page) {
		var self = this;
		// Null the copy
		self.contentCopy = null;

		$.ajax({
			url: window.location.origin + '/api/content/index?page=' + page + 
				(self.query == null ? '' : '&Content[content]='+self.query) + 
				(self.filter == null ? '' : '&' + self.filter),
			type: 'GET',
			headers: {
				'X-Auth-Email': self.ciims.email,
				'X-Auth-Token': self.ciims.token
			},
			beforeSend: function() {
				// Clear the results on before send, if requested
				if (clear)
					$(".paginated_results ul").empty();

				self.page = page;

				self.ajaxBeforeSend();
			},
			error: function(data) {
				var json = $.parseJSON(data.responseText);

				// unbind the scrolling event to prevent unecessary requests to the API
				if (json.status == 404)
					$(".paginated_results .nano .nano-content").unbind("scroll");
			},
			success: function(data, textStatus, jqXHR) {
				self.render(data.response);
				self.ajaxSuccess(null);
			}
		});
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		// Froce nanoscroller to rebuild itself
		var self = this;
		
		$(".paginated_results .nano").nanoScroller({ destroy: true });
		$(".paginated_results .nano").nanoScroller({ iOSNativeScrolling: true }); 

		// Rebind the scrollend behavior
		$(".paginated_results .nano .nano-content").unbind("scroll");
		$(".paginated_results .nano .nano-content").bind("scroll", function(e) {
			if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight - 1)
		    	self.list(false, self.query, ++self.page);
		});
	},
};;/*
Copyright (c) 2010 Ryan Schuft (ryan.schuft@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
  This code is based in part on the work done in Ruby to support
  infection as part of Ruby on Rails in the ActiveSupport's Inflector
  and Inflections classes.  It was initally ported to Javascript by
  Ryan Schuft (ryan.schuft@gmail.com) in 2007.

  The code is available at http://code.google.com/p/inflection-js/

  The basic usage is:
    1. Include this script on your web page.
    2. Call functions on any String object in Javascript

  Currently implemented functions:

    String.pluralize(plural) == String
      renders a singular English language noun into its plural form
      normal results can be overridden by passing in an alternative

    String.singularize(singular) == String
      renders a plural English language noun into its singular form
      normal results can be overridden by passing in an alterative

    String.camelize(lowFirstLetter) == String
      renders a lower case underscored word into camel case
      the first letter of the result will be upper case unless you pass true
      also translates "/" into "::" (underscore does the opposite)

    String.underscore() == String
      renders a camel cased word into words seperated by underscores
      also translates "::" back into "/" (camelize does the opposite)

    String.humanize(lowFirstLetter) == String
      renders a lower case and underscored word into human readable form
      defaults to making the first letter capitalized unless you pass true

    String.capitalize() == String
      renders all characters to lower case and then makes the first upper

    String.dasherize() == String
      renders all underbars and spaces as dashes

    String.titleize() == String
      renders words into title casing (as for book titles)

    String.demodulize() == String
      renders class names that are prepended by modules into just the class

    String.tableize() == String
      renders camel cased singular words into their underscored plural form

    String.classify() == String
      renders an underscored plural word into its camel cased singular form

    String.foreign_key(dropIdUbar) == String
      renders a class name (camel cased singular noun) into a foreign key
      defaults to seperating the class from the id with an underbar unless
      you pass true

    String.ordinalize() == String
      renders all numbers found in the string into their sequence like "22nd"
*/

/*
  This sets up a container for some constants in its own namespace
  We use the window (if available) to enable dynamic loading of this script
  Window won't necessarily exist for non-browsers.
*/
if (window && !window.InflectionJS)
{
    window.InflectionJS = null;
}

/*
  This sets up some constants for later use
  This should use the window namespace variable if available
*/
InflectionJS =
{
    /*
      This is a list of nouns that use the same form for both singular and plural.
      This list should remain entirely in lower case to correctly match Strings.
    */
    uncountable_words: [
        'equipment', 'information', 'rice', 'money', 'species', 'series',
        'fish', 'sheep', 'moose', 'deer', 'news'
    ],

    /*
      These rules translate from the singular form of a noun to its plural form.
    */
    plural_rules: [
        [new RegExp('(m)an$', 'gi'),                 '$1en'],
        [new RegExp('(pe)rson$', 'gi'),              '$1ople'],
        [new RegExp('(child)$', 'gi'),               '$1ren'],
        [new RegExp('^(ox)$', 'gi'),                 '$1en'],
        [new RegExp('(ax|test)is$', 'gi'),           '$1es'],
        [new RegExp('(octop|vir)us$', 'gi'),         '$1i'],
        [new RegExp('(alias|status)$', 'gi'),        '$1es'],
        [new RegExp('(bu)s$', 'gi'),                 '$1ses'],
        [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'],
        [new RegExp('([ti])um$', 'gi'),              '$1a'],
        [new RegExp('sis$', 'gi'),                   'ses'],
        [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'),  '$1$2ves'],
        [new RegExp('(hive)$', 'gi'),                '$1s'],
        [new RegExp('([^aeiouy]|qu)y$', 'gi'),       '$1ies'],
        [new RegExp('(x|ch|ss|sh)$', 'gi'),          '$1es'],
        [new RegExp('(matr|vert|ind)ix|ex$', 'gi'),  '$1ices'],
        [new RegExp('([m|l])ouse$', 'gi'),           '$1ice'],
        [new RegExp('(quiz)$', 'gi'),                '$1zes'],
        [new RegExp('s$', 'gi'),                     's'],
        [new RegExp('$', 'gi'),                      's']
    ],

    /*
      These rules translate from the plural form of a noun to its singular form.
    */
    singular_rules: [
        [new RegExp('(m)en$', 'gi'),                                                       '$1an'],
        [new RegExp('(pe)ople$', 'gi'),                                                    '$1rson'],
        [new RegExp('(child)ren$', 'gi'),                                                  '$1'],
        [new RegExp('([ti])a$', 'gi'),                                                     '$1um'],
        [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi'), '$1$2sis'],
        [new RegExp('(hive)s$', 'gi'),                                                     '$1'],
        [new RegExp('(tive)s$', 'gi'),                                                     '$1'],
        [new RegExp('(curve)s$', 'gi'),                                                    '$1'],
        [new RegExp('([lr])ves$', 'gi'),                                                   '$1f'],
        [new RegExp('([^fo])ves$', 'gi'),                                                  '$1fe'],
        [new RegExp('([^aeiouy]|qu)ies$', 'gi'),                                           '$1y'],
        [new RegExp('(s)eries$', 'gi'),                                                    '$1eries'],
        [new RegExp('(m)ovies$', 'gi'),                                                    '$1ovie'],
        [new RegExp('(x|ch|ss|sh)es$', 'gi'),                                              '$1'],
        [new RegExp('([m|l])ice$', 'gi'),                                                  '$1ouse'],
        [new RegExp('(bus)es$', 'gi'),                                                     '$1'],
        [new RegExp('(o)es$', 'gi'),                                                       '$1'],
        [new RegExp('(shoe)s$', 'gi'),                                                     '$1'],
        [new RegExp('(cris|ax|test)es$', 'gi'),                                            '$1is'],
        [new RegExp('(octop|vir)i$', 'gi'),                                                '$1us'],
        [new RegExp('(alias|status)es$', 'gi'),                                            '$1'],
        [new RegExp('^(ox)en', 'gi'),                                                      '$1'],
        [new RegExp('(vert|ind)ices$', 'gi'),                                              '$1ex'],
        [new RegExp('(matr)ices$', 'gi'),                                                  '$1ix'],
        [new RegExp('(quiz)zes$', 'gi'),                                                   '$1'],
        [new RegExp('s$', 'gi'),                                                           '']
    ],

    /*
      This is a list of words that should not be capitalized for title case
    */
    non_titlecased_words: [
        'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
        'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
        'with', 'for'
    ],

    /*
      These are regular expressions used for converting between String formats
    */
    id_suffix: new RegExp('(_ids|_id)$', 'g'),
    underbar: new RegExp('_', 'g'),
    space_or_underbar: new RegExp('[\ _]', 'g'),
    uppercase: new RegExp('([A-Z])', 'g'),
    underbar_prefix: new RegExp('^_'),
    
    /*
      This is a helper method that applies rules based replacement to a String
      Signature:
        InflectionJS.apply_rules(str, rules, skip, override) == String
      Arguments:
        str - String - String to modify and return based on the passed rules
        rules - Array: [RegExp, String] - Regexp to match paired with String to use for replacement
        skip - Array: [String] - Strings to skip if they match
        override - String (optional) - String to return as though this method succeeded (used to conform to APIs)
      Returns:
        String - passed String modified by passed rules
      Examples:
        InflectionJS.apply_rules("cows", InflectionJs.singular_rules) === 'cow'
    */
    apply_rules: function(str, rules, skip, override)
    {
        if (override)
        {
            str = override;
        }
        else
        {
            var ignore = (skip.indexOf(str.toLowerCase()) > -1);
            if (!ignore)
            {
                for (var x = 0; x < rules.length; x++)
                {
                    if (str.match(rules[x][0]))
                    {
                        str = str.replace(rules[x][0], rules[x][1]);
                        break;
                    }
                }
            }
        }
        return str;
    }
};

/*
  This lets us detect if an Array contains a given element
  Signature:
    Array.indexOf(item, fromIndex, compareFunc) == Integer
  Arguments:
    item - Object - object to locate in the Array
    fromIndex - Integer (optional) - starts checking from this position in the Array
    compareFunc - Function (optional) - function used to compare Array item vs passed item
  Returns:
    Integer - index position in the Array of the passed item
  Examples:
    ['hi','there'].indexOf("guys") === -1
    ['hi','there'].indexOf("hi") === 0
*/
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(item, fromIndex, compareFunc)
    {
        if (!fromIndex)
        {
            fromIndex = -1;
        }
        var index = -1;
        for (var i = fromIndex; i < this.length; i++)
        {
            if (this[i] === item || compareFunc && compareFunc(this[i], item))
            {
                index = i;
                break;
            }
        }
        return index;
    };
}

/*
  You can override this list for all Strings or just one depending on if you
  set the new values on prototype or on a given String instance.
*/
if (!String.prototype._uncountable_words)
{
    String.prototype._uncountable_words = InflectionJS.uncountable_words;
}

/*
  You can override this list for all Strings or just one depending on if you
  set the new values on prototype or on a given String instance.
*/
if (!String.prototype._plural_rules)
{
    String.prototype._plural_rules = InflectionJS.plural_rules;
}

/*
  You can override this list for all Strings or just one depending on if you
  set the new values on prototype or on a given String instance.
*/
if (!String.prototype._singular_rules)
{
    String.prototype._singular_rules = InflectionJS.singular_rules;
}

/*
  You can override this list for all Strings or just one depending on if you
  set the new values on prototype or on a given String instance.
*/
if (!String.prototype._non_titlecased_words)
{
    String.prototype._non_titlecased_words = InflectionJS.non_titlecased_words;
}

/*
  This function adds plurilization support to every String object
    Signature:
      String.pluralize(plural) == String
    Arguments:
      plural - String (optional) - overrides normal output with said String
    Returns:
      String - singular English language nouns are returned in plural form
    Examples:
      "person".pluralize() == "people"
      "octopus".pluralize() == "octopi"
      "Hat".pluralize() == "Hats"
      "person".pluralize("guys") == "guys"
*/
if (!String.prototype.pluralize)
{
    String.prototype.pluralize = function(plural)
    {
        return InflectionJS.apply_rules(
            this,
            this._plural_rules,
            this._uncountable_words,
            plural
        );
    };
}

/*
  This function adds singularization support to every String object
    Signature:
      String.singularize(singular) == String
    Arguments:
      singular - String (optional) - overrides normal output with said String
    Returns:
      String - plural English language nouns are returned in singular form
    Examples:
      "people".singularize() == "person"
      "octopi".singularize() == "octopus"
      "Hats".singularize() == "Hat"
      "guys".singularize("person") == "person"
*/
if (!String.prototype.singularize)
{
    String.prototype.singularize = function(singular)
    {
        return InflectionJS.apply_rules(
            this,
            this._singular_rules,
            this._uncountable_words,
            singular
        );
    };
}

/*
  This function adds camelization support to every String object
    Signature:
      String.camelize(lowFirstLetter) == String
    Arguments:
      lowFirstLetter - boolean (optional) - default is to capitalize the first
        letter of the results... passing true will lowercase it
    Returns:
      String - lower case underscored words will be returned in camel case
        additionally '/' is translated to '::'
    Examples:
      "message_properties".camelize() == "MessageProperties"
      "message_properties".camelize(true) == "messageProperties"
*/
if (!String.prototype.camelize)
{
     String.prototype.camelize = function(lowFirstLetter)
     {
        var str = this.toLowerCase();
        var str_path = str.split('/');
        for (var i = 0; i < str_path.length; i++)
        {
            var str_arr = str_path[i].split('_');
            var initX = ((lowFirstLetter && i + 1 === str_path.length) ? (1) : (0));
            for (var x = initX; x < str_arr.length; x++)
            {
                str_arr[x] = str_arr[x].charAt(0).toUpperCase() + str_arr[x].substring(1);
            }
            str_path[i] = str_arr.join('');
        }
        str = str_path.join('::');
        return str;
    };
}

/*
  This function adds underscore support to every String object
    Signature:
      String.underscore() == String
    Arguments:
      N/A
    Returns:
      String - camel cased words are returned as lower cased and underscored
        additionally '::' is translated to '/'
    Examples:
      "MessageProperties".camelize() == "message_properties"
      "messageProperties".underscore() == "message_properties"
*/
if (!String.prototype.underscore)
{
     String.prototype.underscore = function()
     {
        var str = this;
        var str_path = str.split('::');
        for (var i = 0; i < str_path.length; i++)
        {
            str_path[i] = str_path[i].replace(InflectionJS.uppercase, '_$1');
            str_path[i] = str_path[i].replace(InflectionJS.underbar_prefix, '');
        }
        str = str_path.join('/').toLowerCase();
        return str;
    };
}

/*
  This function adds humanize support to every String object
    Signature:
      String.humanize(lowFirstLetter) == String
    Arguments:
      lowFirstLetter - boolean (optional) - default is to capitalize the first
        letter of the results... passing true will lowercase it
    Returns:
      String - lower case underscored words will be returned in humanized form
    Examples:
      "message_properties".humanize() == "Message properties"
      "message_properties".humanize(true) == "message properties"
*/
if (!String.prototype.humanize)
{
    String.prototype.humanize = function(lowFirstLetter)
    {
        var str = this.toLowerCase();
        str = str.replace(InflectionJS.id_suffix, '');
        str = str.replace(InflectionJS.underbar, ' ');
        if (!lowFirstLetter)
        {
            str = str.capitalize();
        }
        return str;
    };
}

/*
  This function adds capitalization support to every String object
    Signature:
      String.capitalize() == String
    Arguments:
      N/A
    Returns:
      String - all characters will be lower case and the first will be upper
    Examples:
      "message_properties".capitalize() == "Message_properties"
      "message properties".capitalize() == "Message properties"
*/
if (!String.prototype.capitalize)
{
    String.prototype.capitalize = function()
    {
        var str = this.toLowerCase();
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    };
}

/*
  This function adds dasherization support to every String object
    Signature:
      String.dasherize() == String
    Arguments:
      N/A
    Returns:
      String - replaces all spaces or underbars with dashes
    Examples:
      "message_properties".capitalize() == "message-properties"
      "Message Properties".capitalize() == "Message-Properties"
*/
if (!String.prototype.dasherize)
{
    String.prototype.dasherize = function()
    {
        var str = this;
        str = str.replace(InflectionJS.space_or_underbar, '-');
        return str;
    };
}

/*
  This function adds titleize support to every String object
    Signature:
      String.titleize() == String
    Arguments:
      N/A
    Returns:
      String - capitalizes words as you would for a book title
    Examples:
      "message_properties".titleize() == "Message Properties"
      "message properties to keep".titleize() == "Message Properties to Keep"
*/
if (!String.prototype.titleize)
{
    String.prototype.titleize = function()
    {
        var str = this.toLowerCase();
        str = str.replace(InflectionJS.underbar, ' ');
        var str_arr = str.split(' ');
        for (var x = 0; x < str_arr.length; x++)
        {
            var d = str_arr[x].split('-');
            for (var i = 0; i < d.length; i++)
            {
                if (this._non_titlecased_words.indexOf(d[i].toLowerCase()) < 0)
                {
                    d[i] = d[i].capitalize();
                }
            }
            str_arr[x] = d.join('-');
        }
        str = str_arr.join(' ');
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    };
}

/*
  This function adds demodulize support to every String object
    Signature:
      String.demodulize() == String
    Arguments:
      N/A
    Returns:
      String - removes module names leaving only class names (Ruby style)
    Examples:
      "Message::Bus::Properties".demodulize() == "Properties"
*/
if (!String.prototype.demodulize)
{
    String.prototype.demodulize = function()
    {
        var str = this;
        var str_arr = str.split('::');
        str = str_arr[str_arr.length - 1];
        return str;
    };
}

/*
  This function adds tableize support to every String object
    Signature:
      String.tableize() == String
    Arguments:
      N/A
    Returns:
      String - renders camel cased words into their underscored plural form
    Examples:
      "MessageBusProperty".tableize() == "message_bus_properties"
*/
if (!String.prototype.tableize)
{
    String.prototype.tableize = function()
    {
        var str = this;
        str = str.underscore().pluralize();
        return str;
    };
}

/*
  This function adds classification support to every String object
    Signature:
      String.classify() == String
    Arguments:
      N/A
    Returns:
      String - underscored plural nouns become the camel cased singular form
    Examples:
      "message_bus_properties".classify() == "MessageBusProperty"
*/
if (!String.prototype.classify)
{
    String.prototype.classify = function()
    {
        var str = this;
        str = str.camelize().singularize();
        return str;
    };
}

/*
  This function adds foreign key support to every String object
    Signature:
      String.foreign_key(dropIdUbar) == String
    Arguments:
      dropIdUbar - boolean (optional) - default is to seperate id with an
        underbar at the end of the class name, you can pass true to skip it
    Returns:
      String - camel cased singular class names become underscored with id
    Examples:
      "MessageBusProperty".foreign_key() == "message_bus_property_id"
      "MessageBusProperty".foreign_key(true) == "message_bus_propertyid"
*/
if (!String.prototype.foreign_key)
{
    String.prototype.foreign_key = function(dropIdUbar)
    {
        var str = this;
        str = str.demodulize().underscore() + ((dropIdUbar) ? ('') : ('_')) + 'id';
        return str;
    };
}

/*
  This function adds ordinalize support to every String object
    Signature:
      String.ordinalize() == String
    Arguments:
      N/A
    Returns:
      String - renders all found numbers their sequence like "22nd"
    Examples:
      "the 1 pitch".ordinalize() == "the 1st pitch"
*/
if (!String.prototype.ordinalize)
{
    String.prototype.ordinalize = function()
    {
        var str = this;
        var str_arr = str.split(' ');
        for (var x = 0; x < str_arr.length; x++)
        {
            var i = parseInt(str_arr[x]);
            if (i === NaN)
            {
                var ltd = str_arr[x].substring(str_arr[x].length - 2);
                var ld = str_arr[x].substring(str_arr[x].length - 1);
                var suf = "th";
                if (ltd != "11" && ltd != "12" && ltd != "13")
                {
                    if (ld === "1")
                    {
                        suf = "st";
                    }
                    else if (ld === "2")
                    {
                        suf = "nd";
                    }
                    else if (ld === "3")
                    {
                        suf = "rd";
                    }
                }
                str_arr[x] += suf;
            }
        }
        str = str_arr.join(' ');
        return str;
    };
};var Settings = {
	
	timeout: null,

	/**
	 * Loads the settings
	 */
	registerSettings : function() {

		// Nanoscroller
		this.nanoscroller();

		// Tracks input change event
		this.inputChange();
	},

	flushCache : function() {
		$("#flush_cache").click(function(e) {
			e.preventDefault();
			// Self
			var self = this,
				ciims = CiiMSDashboard.getAuthData();

			$.ajax({
				url: Settings.getRoute() + "/flushcache",
				type: 'GET',
				headers: {
					'X-Auth-Email': ciims.email,
					'X-Auth-Token': ciims.token
				},
				beforeSend: function() {
					$("#nav-icon").removeClass("fa-ellipsis-v");

					if ($("#nav-icon").find("span").length == 0)
					{
						var element = $("<span>").addClass("fa fa-spinner fa-spin active");
						$("#nav-icon").append($(element));
					}

					$("legend").parent().find(".alert").remove();
				},
				complete: function() {
					setTimeout(function() {
						$("#nav-icon").addClass("fa-ellipsis-v");
						$("#nav-icon").find("span").remove(); 
					}, 1000);
				}
			});

			return false;
		});
	},

	/**
	 * Tests email connection settings
	 */
	testEmailSettings : function() {
		$("a#testEmailSettings").click(function(e) {
			e.preventDefault();
			// Self
			var self = this,
				ciims = CiiMSDashboard.getAuthData();

			$.ajax({
				url: Settings.getRoute() + "test",
				type: 'GET',
				headers: {
					'X-Auth-Email': ciims.email,
					'X-Auth-Token': ciims.token
				},
				beforeSend: function() {
					$("#nav-icon").removeClass("fa-ellipsis-v");

					if ($("#nav-icon").find("span").length == 0)
					{
						var element = $("<span>").addClass("fa fa-spinner fa-spin active");
						$("#nav-icon").append($(element));
					}

					$("legend").parent().find(".alert").remove();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");

					alert.html(message);
					$("legend").after($(alert));
				},
				success: function(json, textStatus, jqXHR) {
					var message = json.message,
						alert = $("<div>").addClass("alert alert-success");

					alert.html(message);
					$("legend").after($(alert));
				},
				complete: function() {
					setTimeout(function() {
						$("#nav-icon").addClass("fa-ellipsis-v");
						$("#nav-icon").find("span").remove(); 
					}, 1000);
				}
			});

			return false;
		});
	},

	/**
	 * Change event tracking
	 */
	inputChange : function() {
		var self = this;
		$("form :input").change(function() {
			self.changeEvent();
		});

		$("form :input").keyup(function() {
			self.changeEvent();
		});
	},

	changeEvent : function() {

		// Self
		var self = this,
			ciims = CiiMSDashboard.getAuthData();

		// Clears the previously set timeout
		clearTimeout(this.timeout);

		// Sets the timeout
		this.timeout = setTimeout(function() {
			$.ajax({
				url: self.getRoute(),
				data: self.getAttributes(),
				type: 'POST',
				headers: {
					'X-Auth-Email': ciims.email,
					'X-Auth-Token': ciims.token
				},
				beforeSend: function() {
					$("#nav-icon").removeClass("fa-ellipsis-v");

					if ($("#nav-icon").find("span").length == 0)
					{
						var element = $("<span>").addClass("fa fa-spinner fa-spin active");
						$("#nav-icon").append($(element));
					}
				},
				complete: function() {
					setTimeout(function() {
						$("#nav-icon").addClass("fa-ellipsis-v");
						$("#nav-icon").find("span").remove(); 
					}, 1000);
				}
			});
		}, 500);
	},
	
	/**
	 * Retrieves the appropriate route
	 * @return string
	 */
	getRoute : function() {
		var origin 		= window.location.origin,
			uri 		= window.location.pathname,
			path 		= uri.split('/'),
			controller 	= path[2].singularize();

		path[1] = 'api';
		path[2] = controller;

		return path.join("/");
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		return $(".nano").nanoScroller({ iOSNativeScrolling: true }); 
	},

	/**
	 * Retrieves the settings form attributes
	 * @return Object
	 */
	getAttributes : function() {
		var inputs = $("form :input"),
			values = {};

		$(inputs).each(function() { 
			if ($(this).attr("type") == "checkbox")
				values[this.name] = $(this).prop('checked') == true ? 1 : 0;
			else
				values[this.name] = $(this).val();
		});

		return values;
	}
};;var Theme = {
	
	/**
	 * CiiMS's data information
	 * @var array ciims
	 */
	ciims : {},

	init : function() {
		Settings.nanoscroller();

		this.ciims = $.parseJSON(localStorage.getItem('ciims'));

		$(".theme-details").readmore({
			maxHeight: 300
		});

		hljs.initHighlightingOnLoad();

		this.checkforUpdates();
		this.update();
		this.changeTheme();
	},

	/**
	 * Checks if an update is available for a theme and provides actionalable feedback to the end user
	 */
	checkforUpdates : function() {
		var self = this;
		$(".updater").each(function() {
			var name = $(this).attr('data-attr-name');
			var btn = this;

			$.ajax({
				url: window.location.origin + '/api/theme/updateCheck/name/'+name,
				type: 'GET',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				success : function(data) {
					if (data.response)
					{
						$(btn).hide();
						$(btn).parent().find('.update-available').show();
					}
					else
					{
						$(btn).hide();
						$(btn).parent().find('.uptodate').show();
					}

				}
			});
		});
	},

	/**
	 * Attempts to apply an update to the theme
	 */
	update : function() {
		var self = this;
		$(".update-available").click(function() {
			var name = $(this).attr('data-attr-name');
			var btn = this;

			$.ajax({
				url: window.location.origin + '/api/theme/update/name/'+name,
				type: 'GET',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				beforeSend : function() {
					$(btn).hide();
					$(btn).parent().find('.updating').show();
				},
				success : function(data) {
					$(btn).parent().find('.updating').hide();
					$(btn).parent().find('.uptodate').show();
					$(btn).parent().parent().find('.version').text(data.response['latest-version']);
				},
				error : function() {
					$(btn).parent().find('.updating').hide();
					$(btn).parent().find('.updatefailed').show();
				}
			});
		});
	},

	changeTheme : function() {
		var self = this;
		$(".usetheme").click(function() {
			var name = $(this).attr('data-attr-name');
			var btn = this;

			$.ajax({
				url: window.location.origin + '/api/theme/changetheme/name/'+name,
				type: 'GET',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				success : function(data) {
					var activeTheme = $(".activetheme").clone(),
						present = $(btn).clone();

					$(".activetheme").after($(present));
					$(".activetheme").remove();

					$(btn).hide();
					$(btn).after($(activeTheme));

					self.changeTheme();
				}
			});
		});
	}
};;var Users = {

	/**
	 * CiiMS data from localStorage
	 */
	ciims : {},

	/**
	 * The current page
	 */
	page : 1,

	/**
	 * Search query, if any
	 */
	query : null,

	/**
	 * Users that we have currently loaded
	 * Ajax response should store their information here to prevent having to fire off an Ajax
	 * Request to display the data
	 */
	users : [],

	/**
	 * Search timeout
	 */
	searchTimeout : null,

	/**
	 * Bootstrap endpoint
	 */
	registerUsers : function() {
		// Populate the api credentials
		this.ciims = CiiMSDashboard.getAuthData();

		// Load the initial user list
		this.list(false, this.query, this.page);

		// Bind the search form functionality
		this.bindSearch();

		// Bind the invitation form ajax callbacks
		this.bindInvite();

		// Bind the registration form ajax callbacks
		this.bindRegister();

		$("#NewUserButton").click(function() {
			$("#register_form, #invite_form").show();
			$("#user_edit").hide();
			$(".paginated_results ul li").removeClass("active");
		});
	},

	/**
	 * Bind the registration form
	 */
	bindRegister : function() {
		var self = this;

		$("#RegistrationForm_Submit").click(function() {
			return $("#registration-form").submit();
		});

		$("#registration-form").submit(function(e) {
			$.ajax({
				url: window.location.origin + '/api/user',
				type: 'POST',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				data: {
					'email': $("#RegisterForm_email").val(),
					'password': $("#RegisterForm_password").val(),
					'password_repeat': $("#RegisterForm_password_repeat").val(),
					'displayName' : $("#RegisterForm_displayName").val(),
				},
				beforeSend: function() {
					$("#registration-form :input").removeClass("error");
					$("#registration-form").find(".alert").remove();
					self.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");


					$.each(json.response, function(k, v) { 
						$("#RegisterForm_" + k).addClass("error");
						alert.append($("<p>").text(v));
					});

					$("#registration-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					// Clear the field
					$("#registration-form :input").not("#RegistrationForm_Submit").val('');
					self.renderLi(data.response, $(".paginated_results ul"), true);

					self.ajaxSuccess(data.success);
				},
				completed: self.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Ajax Before send parent
	 */
	ajaxBeforeSend: function() {
		$("#nav-icon").removeClass("fa-ellipsis-v");

		if ($("#nav-icon").find("span").length == 0)
		{
			var element = $("<span>").addClass("fa fa-spinner fa-spin active");
			$("#nav-icon").append($(element));
		}

		// Remove all the previous success messages
		$(".alert-show").remove();
	},

	/**
	 * Ajax completed callback
	 */
	ajaxCompleted: function() {
		setTimeout(function() {
			$("#nav-icon").addClass("fa-ellipsis-v");
			$("#nav-icon").find("span").remove(); 
		}, 1000);
	},

	/**
	 * Ajax success callback
	 */
	ajaxSuccess: function(message) {

		var self = this,
			alert = $("<section>").addClass("settings_container alert-show"),
			fieldset = $("<fieldset>"),
			divOverflow = $("<div>"),
			div = $("<div>").addClass("alert alert-success").css("width", "auto").css("margin-bottom", "0px").text(message);

		$(divOverflow).append($(div));
		$(fieldset).append($(divOverflow));
		$(alert).append($(fieldset));

		if (message != null)
		{
			$("main .paginated_results").after(alert);

			// Automatically hide the alert after 5s
			setTimeout(function() {
				$(".alert-show").remove();
			}, 5000);
		}

		// Bind behaviors
		self.clickBehavior();
		self.nanoscroller();
	},

	/**
	 * Binds the invitation data to the model
	 */
	bindInvite : function() {
		var self = this;

		$("#InvitationForm_Submit").click(function() {
			return $("#invitation-form").submit();
		});

		$("#invitation-form").submit(function(e) {
			$.ajax({
				url: window.location.origin + '/api/user/invite',
				type: 'POST',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				data: {
					'email': $("#InvitationForm_email").val()
				},
				beforeSend: function() {
					$("#InvitationForm_email").removeClass("error");
					$("#invitation-form").find(".alert").remove();
					self.ajaxBeforeSend();
				},
				error: function(data) {
					$("#InvitationForm_email").addClass("error");
					var alert = $("<div>").addClass("alert alert-error").text($.parseJSON(data.responseText).response.email[0]);
					$("#invitation-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					// Clear the field
					$("#InvitationForm_email").val('');
					self.renderLi(data.response, $(".paginated_results ul"), true);

					self.ajaxSuccess(data.message);
				},
				completed: self.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Renders an LI element
	 * @param object data
	 * @param DOM ul
	 * @param boolean prepend
	 */
	renderLi: function(data, ul, prepend) {
		this.users[data.id] = data;
		if (prepend == undefined)
			prepend = false;

		var li = $("<li>").attr('userId', data.id),
			info = $("<div>");

		// Build the info object
		$(info).addClass("user-info");
		$(info).append($("<h6>").text(data.name));
		$(info).append($("<span>").text(data.email)).attr('title', data.email);
		$(info).append($("<span>").text(data.displayName));

		// Build the list element
		$(li).addClass(data.role.name);
		$(li).append($("<img>").addClass("user-image").attr("src", "https://www.gravatar.com/avatar/" + md5(data.email) + "?s=40"));
		$(li).append($(info));
		
		// Append it to the list
		if (prepend)
			$(ul).prepend($(li));
		else
			$(ul).append($(li));

	},

	/**
	 * Binds search functionality to the list view
	 */
	bindSearch : function() {
		// When the search field changes
		var self = this;
		$("#search").keyup(function() {
			// Set a timeout to perform the search
			clearTimeout(self.searchTimeout);
			self.searchTimeout = setTimeout(function() {
				self.query = $("#search").val();
				self.list(true, self.query, 1);
			}, 500);
		});
	},

	/**
	 * Rebinds the click behavior to the appropriate elements
	 */
	clickBehavior : function() {
		var self = this;
		$(".paginated_results ul li").unbind("click");
		$(".paginated_results ul li").click(function() {

			// Remove the active class from the other attributes
			$(".paginated_results ul li").removeClass("active");

			$("#invite_form, #register_form").hide();

			self.populate(Users.users[$(this).attr('userId')]);

			$(this).addClass("active");

			$("#UserForm_Submit").unbind("click");
			$("#UserForm_Submit").click(function(e) {
				e.preventDefault();
				
				var data = {};

				// Select all form elements, except for the button
				$("#user-form :input[type!='button']").each(function() {
					var val = $(this).val(),
						name = $(this).attr('name').replace("Users[", "").replace("]", "");

					data[name] = val;
				});

				$.ajax({
					url: window.location.origin + '/api/user/index/id/' + $("#Users_id").val(),
					type: 'POST',
					headers: {
						'X-Auth-Email': self.ciims.email,
						'X-Auth-Token': self.ciims.token
					},
					data: data,
					beforeSend: function() {
						$("#user-form :input[type!='button']").removeClass("error");
						$("#user-form").find(".alert").remove();
						self.ajaxBeforeSend();
					},
					error: function(data) {
						var json = $.parseJSON(data.responseText),
							message = json.message,
							alert = $("<div>").addClass("alert alert-error");

						$.each(json.response, function(k, v) { 
							$("#Users_" + k).addClass("error");
							alert.append($("<p>").text(v));
						});

						$("#user-form").prepend($(alert));
					},
					success: function(data, textStatus, jqXHR) {
						self.ajaxSuccess(data.message);

						// Update the information we have on record
						self.users[data.response.id] = data.response;

						// Reutilize the click to transition the view
						$("#NewUserButton").click();
					},
					completed: self.ajaxCompleted()
				});

				return false;
			});
		});
	},

	/**
	 * Populates the user-form with the data provided from Users.users[]
	 * @param object data
	 */
	populate : function(data) {
		$.each(data, function(k, v) {
			$("#user-form :input#Users_"+k).val(v);
		});
		$("#user_edit").show();
	},

	/**
	 * Performs an AJAX GET query to load the available users
	 * @param boolean clear
	 * @param string query
	 * @param int page
	 */
	list : function(clear, query, page) {
		var self = this;
		$.ajax({
			url: window.location.origin + '/api/user?page=' + page + (query == null ? '' : '&Users[displayName]='+query),
			type: 'GET',
			headers: {
				'X-Auth-Email': self.ciims.email,
				'X-Auth-Token': self.ciims.token
			},
			beforeSend: function() {
				// Clear the results on before send, if requested
				if (clear)
					$(".paginated_results ul").empty();

				self.page = page;

				self.ajaxBeforeSend();
			},
			error: function(data) {
				var json = $.parseJSON(data.responseText);

				// unbind the scrolling event to prevent unecessary requests to the API
				if (json.status == 404)
					$(".paginated_results .nano .nano-content").unbind("scroll");
			},
			success: function(data, textStatus, jqXHR) {
				var ul = $(".paginated_results ul");
				$(data.response).each(function() {
					self.renderLi(this, ul);
				});

				self.ajaxSuccess(null);
			},
			completed: self.ajaxCompleted()
		});
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		// Froce nanoscroller to rebuild itself
		var self = this;
		$(".paginated_results .nano").nanoScroller({ destroy: true });
		$(".paginated_results .nano").nanoScroller({ iOSNativeScrolling: true }); 

		// Rebind the scrollend behavior
		$(".paginated_results .nano .nano-content").unbind("scroll");
		$(".paginated_results .nano .nano-content").bind("scroll", function(e) {
			if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight - 1)
		    	self.list(false, self.query, ++self.page);
		});
	},
};