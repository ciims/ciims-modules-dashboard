/*! pace 0.4.16 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q=[].slice,R={}.hasOwnProperty,S=function(a,b){function c(){this.constructor=a}for(var d in b)R.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},T=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};s={catchupTime:500,initialRate:.03,minTime:500,ghostTime:500,maxProgressPerFrame:10,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!1}},A=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance?"function"==typeof performance.now?performance.now():void 0:void 0)?a:+new Date},C=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,r=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==C&&(C=function(a){return setTimeout(a,50)},r=function(a){return clearTimeout(a)}),E=function(a){var b,c;return b=A(),c=function(){var d;return d=A()-b,d>=33?(b=A(),a(d,function(){return C(c)})):setTimeout(c,33-d)},c()},D=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?Q.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},t=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?Q.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)R.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?t(b[a],e):b[a]=e);return b},o=function(a){var b,c,d,e,f;for(c=b=0,e=0,f=a.length;f>e;e++)d=a[e],c+=Math.abs(d),b++;return c/b},v=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},null==window.Pace&&(window.Pace={}),B=Pace.options=t(s,window.paceOptions,v()),h=function(a){function b(){return O=b.__super__.constructor.apply(this,arguments)}return S(b,a),b}(Error),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;if(null==this.el){if(a=document.querySelector(B.target),!a)throw new h;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace("pace-done",""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)}return this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(a){h=a}return this.el=void 0},a.prototype.render=function(){var a,b;return null==document.querySelector(B.target)?!1:(a=this.getElement(),a.children[0].style.width=""+this.progress+"%",(!this.lastRenderedProgress||0|(this.lastRenderedProgress|0!==this.progress))&&(a.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?b="99":(b=this.progress<10?"0":"",b+=0|this.progress),a.children[0].setAttribute("data-progress",""+b)),this.lastRenderedProgress=this.progress)},a.prototype.done=function(){return this.progress>=100},a}(),g=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),L=window.XMLHttpRequest,K=window.XDomainRequest,J=window.WebSocket,u=function(a,b){var c,d,e,f;f=[];for(d in b.prototype)try{e=b.prototype[d],null==a[d]&&"function"!=typeof e?f.push(a[d]=e):f.push(void 0)}catch(g){c=g}return f},y=[],Pace.ignore=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?Q.call(arguments,1):[],y.unshift("ignore"),c=b.apply(null,a),y.shift(),c},Pace.track=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?Q.call(arguments,1):[],y.unshift("track"),c=b.apply(null,a),y.shift(),c},G=function(a){var b;if(null==a&&(a="GET"),"track"===y[0])return"force";if(!y.length&&B.ajax){if("socket"===a&&B.ajax.trackWebSockets)return!0;if(b=a.toUpperCase(),T.call(B.ajax.trackMethods,b)>=0)return!0}return!1},i=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){return G(d)&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new L(b),a(c),c},u(window.XMLHttpRequest,L),null!=K&&(window.XDomainRequest=function(){var b;return b=new K,a(b),b},u(window.XDomainRequest,K)),null!=J&&B.ajax.trackWebSockets&&(window.WebSocket=function(a,b){var d;return d=new J(a,b),G("socket")&&c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d},u(window.WebSocket,J))}return S(b,a),b}(g),M=null,w=function(){return null==M&&(M=new i),M},w().on("request",function(b){var c,d,e,f;return f=b.type,e=b.request,Pace.running||B.restartOnRequestAfter===!1&&"force"!==G(f)?void 0:(d=arguments,c=B.restartOnRequestAfter||0,"boolean"==typeof c&&(c=0),setTimeout(function(){var b,c,g,h,i,j,k;if(c="socket"===f?e.readyState<2:0<(i=e.readyState)&&4>i){for(Pace.restart(),j=Pace.sources,k=[],g=0,h=j.length;h>g;g++){if(b=j[g],b instanceof a){b.watch.apply(b,d);break}k.push(void 0)}return k}},c))}),a=function(){function a(){var a=this;this.elements=[],w().on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d;return d=a.type,b=a.request,c="socket"===d?new l(b):new m(b),this.elements.push(c)},a}(),m=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2}),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100});else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),l=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100})}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},B.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d,e,f=this;this.progress=0,a=0,e=[],d=0,c=A(),b=setInterval(function(){var g;return g=A()-c-50,c=A(),e.push(g),e.length>B.eventLag.sampleCount&&e.shift(),a=o(e),++d>=B.eventLag.minSamples&&a<B.eventLag.lagThreshold?(f.progress=100,clearInterval(b)):f.progress=100*(3/(a+3))},50)}return a}(),k=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=B.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=D(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=D(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/B.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,B.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+B.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),H=null,F=null,p=null,I=null,n=null,q=null,Pace.running=!1,x=function(){return B.restartOnPushState?Pace.restart():void 0},null!=window.history.pushState&&(N=window.history.pushState,window.history.pushState=function(){return x(),N.apply(window.history,arguments)}),null!=window.history.replaceState&&(P=window.history.replaceState,window.history.replaceState=function(){return x(),P.apply(window.history,arguments)}),j={ajax:a,elements:d,document:c,eventLag:f},(z=function(){var a,c,d,e,f,g,h,i,l;for(Pace.sources=H=[],h=["ajax","elements","document","eventLag"],d=0,f=h.length;f>d;d++)c=h[d],B[c]!==!1&&H.push(new j[c](B[c]));for(l=null!=(i=B.extraSources)?i:[],e=0,g=l.length;g>e;e++)a=l[e],H.push(new a(B));return Pace.bar=p=new b,F=[],I=new k})(),Pace.stop=function(){return Pace.running=!1,p.destroy(),q=!0,null!=n&&("function"==typeof r&&r(n),n=null),z()},Pace.restart=function(){return Pace.stop(),Pace.start()},Pace.go=function(){return Pace.running=!0,p.render(),q=!1,n=E(function(a,b){var c,d,e,f,g,h,i,j,l,m,n,o,r,s,t,u,v,w;for(j=100-p.progress,d=r=0,e=!0,h=s=0,u=H.length;u>s;h=++s)for(n=H[h],m=null!=F[h]?F[h]:F[h]=[],g=null!=(w=n.elements)?w:[n],i=t=0,v=g.length;v>t;i=++t)f=g[i],l=null!=m[i]?m[i]:m[i]=new k(f),e&=l.done,l.done||(d++,r+=l.tick(a));return c=r/d,p.update(I.tick(a,c)),o=A(),p.done()||e||q?(p.update(100),setTimeout(function(){return p.finish(),Pace.running=!1},Math.max(B.ghostTime,Math.min(B.minTime,A()-o)))):b()})},Pace.start=function(a){t(B,a),Pace.running=!0;try{p.render()}catch(b){h=b}return document.querySelector(".pace")?Pace.go():setTimeout(Pace.start,50)},"function"==typeof define&&define.amd?define(function(){return Pace}):"object"==typeof exports?module.exports=Pace:B.startOnPageLoad&&Pace.start()}).call(this);
(function(){(function(e,c,a){var b,f,d;d="shapeshift";f={selector:"*",enableDrag:true,enableCrossDrop:true,enableResize:true,enableTrash:false,align:"center",colWidth:null,columns:null,minColumns:1,autoHeight:true,maxHeight:null,minHeight:100,gutterX:10,gutterY:10,paddingX:10,paddingY:10,animated:true,animateOnInit:false,animationSpeed:225,animationThreshold:100,dragClone:false,deleteClone:true,dragRate:100,dragWhitelist:"*",crossDropWhitelist:"*",cutoffStart:null,cutoffEnd:null,handle:false,cloneClass:"ss-cloned-child",activeClass:"ss-active-child",draggedClass:"ss-dragged-child",placeholderClass:"ss-placeholder-child",originalContainerClass:"ss-original-container",currentContainerClass:"ss-current-container",previousContainerClass:"ss-previous-container"};b=(function(){function g(i,h){this.element=i;this.options=e.extend({},f,h);this.globals={};this.$container=e(i);if(this.errorCheck()){this.init()}}g.prototype.errorCheck=function(){var h,j,k,i;i=this.options;k=false;j="Shapeshift ERROR:";if(i.colWidth===null){h=this.$container.children(i.selector);if(h.length===0){k=true;console.error(""+j+" option colWidth must be specified if Shapeshift is initialized with no active children.")}}return !k};g.prototype.init=function(){this.createEvents();this.setGlobals();this.setIdentifier();this.setActiveChildren();this.enableFeatures();this.gridInit();this.render();return this.afterInit()};g.prototype.createEvents=function(){var i,h,j=this;h=this.options;i=this.$container;i.off("ss-arrange").on("ss-arrange",function(l,k){if(k==null){k=false}return j.render(false,k)});i.off("ss-rearrange").on("ss-rearrange",function(){return j.render(true)});i.off("ss-setTargetPosition").on("ss-setTargetPosition",function(){return j.setTargetPosition()});return i.off("ss-destroy").on("ss-destroy",function(){return j.destroy()})};g.prototype.setGlobals=function(){return this.globals.animated=this.options.animateOnInit};g.prototype.afterInit=function(){return this.globals.animated=this.options.animated};g.prototype.setIdentifier=function(){this.identifier="shapeshifted_container_"+Math.random().toString(36).substring(7);return this.$container.addClass(this.identifier)};g.prototype.enableFeatures=function(){if(this.options.enableResize){this.enableResize()}if(this.options.enableDrag||this.options.enableCrossDrop){return this.enableDragNDrop()}};g.prototype.setActiveChildren=function(){var s,p,h,j,o,q,t,r,m,l,n,k;t=this.options;s=this.$container.children(t.selector);p=t.activeClass;r=s.length;for(o=m=0;0<=r?m<r:m>r;o=0<=r?++m:--m){e(s[o]).addClass(p)}this.setParsedChildren();j=t.columns;k=[];for(o=l=0,n=this.parsedChildren.length;0<=n?l<n:l>n;o=0<=n?++l:--l){h=this.parsedChildren[o].colspan;q=t.minColumns;if(h>j&&h>q){t.minColumns=h;k.push(console.error("Shapeshift ERROR: There are child elements that have a larger colspan than the minimum columns set through options.\noptions.minColumns has been set to "+h))}else{k.push(void 0)}}return k};g.prototype.setParsedChildren=function(){var m,h,o,j,n,k,l;h=this.$container.find("."+this.options.activeClass).filter(":visible");k=h.length;n=[];for(j=l=0;0<=k?l<k:l>k;j=0<=k?++l:--l){m=e(h[j]);o={i:j,el:m,colspan:parseInt(m.attr("data-ss-colspan"))||1,height:m.outerHeight()};n.push(o)}return this.parsedChildren=n};g.prototype.gridInit=function(){var i,h,k,j,l;j=this.options.gutterX;if(!(this.options.colWidth>=1)){k=this.parsedChildren[0];h=k.el.outerWidth();i=k.colspan;l=(h-((i-1)*j))/i;return this.globals.col_width=l+j}else{return this.globals.col_width=this.options.colWidth+j}};g.prototype.render=function(i,h){if(i==null){i=false}this.setGridColumns();return this.arrange(i,h)};g.prototype.setGridColumns=function(){var p,o,j,l,i,n,h,m,q,k;l=this.globals;q=this.options;o=l.col_width;n=q.gutterX;k=q.paddingX;h=this.$container.innerWidth()-(k*2);m=q.minColumns;j=q.columns||Math.floor((h+n)/o);if(m&&m>j){j=m}l.columns=j;p=this.parsedChildren.length;if(j>p){j=p}l.child_offset=k;switch(q.align){case"center":i=(j*o)-n;return l.child_offset+=(h-i)/2;case"right":i=(j*o)-n;return l.child_offset+=h-i}};g.prototype.arrange=function(m,y){var z,v,x,h,r,o,s,q,n,w,j,u,B,p,A,t,l,k;if(m){this.setParsedChildren()}n=this.globals;p=this.options;v=this.$container;o=this.getPositions();A=this.parsedChildren;l=A.length;x=n.animated&&l<=p.animationThreshold;h=p.animationSpeed;q=p.draggedClass;for(w=k=0;0<=l?k<l:k>l;w=0<=l?++k:--k){z=A[w].el;r=o[w];j=z.hasClass(q);if(j){t=p.placeholderClass;z=z.siblings("."+t)}if(x&&!j){z.stop(true,false).animate(r,h,function(){})}else{z.css(r)}}if(y){if(x){setTimeout((function(){return v.trigger("ss-drop-complete")}),h)}else{v.trigger("ss-drop-complete")}}v.trigger("ss-arranged");if(p.autoHeight){s=n.container_height;u=p.maxHeight;B=p.minHeight;if(B&&s<B){s=B}else{if(u&&s>u){s=u}}return v.height(s)}};g.prototype.getPositions=function(v){var n,y,q,o,l,z,h,w,m,t,B,p,A,x,s,k,j,r,u=this;if(v==null){v=true}l=this.globals;m=this.options;h=m.gutterY;t=m.paddingY;o=m.draggedClass;B=this.parsedChildren;k=B.length;n=[];for(w=j=0,r=l.columns;0<=r?j<r:j>r;w=0<=r?++j:--j){n.push(t)}x=function(I){var D,H,C,G,E,F,i;D=I.col;H=I.colspan;G=(I.col*l.col_width)+l.child_offset;E=n[D];p[I.i]={left:G,top:E};n[D]+=I.height+h;if(H>=1){i=[];for(C=F=1;1<=H?F<H:F>H;C=1<=H?++F:--F){i.push(n[D+C]=n[D])}return i}};y=function(i){var N,E,C,M,I,D,H,L,J,K,G,F;J=n.length-i.colspan+1;L=n.slice(0).splice(0,J);N=void 0;for(H=G=0;0<=J?G<J:G>J;H=0<=J?++G:--G){E=u.lowestCol(L,H);C=i.colspan;M=n[E];I=true;for(K=F=1;1<=C?F<C:F>C;K=1<=C?++F:--F){D=n[E+K];if(M<D){I=false;break}}if(I){N=E;break}}return N};s=[];A=function(){var J,i,E,I,K,G,D,H,C,F;K=[];for(I=G=0,H=s.length;0<=H?G<H:G>H;I=0<=H?++G:--G){E=s[I];E.col=y(E);if(E.col>=0){x(E);K.push(I)}}F=[];for(i=D=C=K.length-1;D>=0;i=D+=-1){J=K[i];F.push(s.splice(J,1))}return F};p=[];(q=function(){var D,C,i;i=[];for(w=C=0;0<=k?C<k:C>k;w=0<=k?++C:--C){D=B[w];if(!(!v&&D.el.hasClass(o))){if(D.colspan>1){D.col=y(D)}else{D.col=u.lowestCol(n)}if(D.col===void 0){s.push(D)}else{x(D)}i.push(A())}else{i.push(void 0)}}return i})();if(m.autoHeight){z=n[this.highestCol(n)]-h;l.container_height=z+t}return p};g.prototype.enableDragNDrop=function(){var p,v,n,y,l,t,o,w,q,z,m,s,j,x,r,k,i,h,u=this;j=this.options;v=this.$container;l=j.activeClass;m=j.draggedClass;r=j.placeholderClass;x=j.originalContainerClass;o=j.currentContainerClass;k=j.previousContainerClass;w=j.deleteClone;z=j.dragRate;q=j.dragClone;t=j.cloneClass;y=n=p=h=i=null;s=false;if(j.enableDrag){v.children("."+l).filter(j.dragWhitelist).draggable({addClasses:false,containment:"document",handle:j.handle,zIndex:9999,start:function(C,B){var A;y=e(C.target);if(q){p=y.clone(true).insertBefore(y).addClass(t)}y.addClass(m);A=y.prop("tagName");n=e("<"+A+" class='"+r+"' style='height: "+(y.height())+"px; width: "+(y.width())+"'></"+A+">");y.parent().addClass(x).addClass(o);h=y.outerHeight()/2;return i=y.outerWidth()/2},drag:function(B,A){if(!s&&!(q&&w&&e("."+o)[0]===e("."+x)[0])){n.remove().appendTo("."+o);e("."+o).trigger("ss-setTargetPosition");s=true;c.setTimeout((function(){return s=false}),z)}A.position.left=B.pageX-y.parent().offset().left-i;return A.position.top=B.pageY-y.parent().offset().top-h},stop:function(){var A,C,B;C=e("."+x);A=e("."+o);B=e("."+k);y.removeClass(m);e("."+r).remove();if(q){if(w&&e("."+o)[0]===e("."+x)[0]){p.remove();e("."+o).trigger("ss-rearrange")}else{p.removeClass(t)}}if(C[0]===A[0]){A.trigger("ss-rearranged",y)}else{C.trigger("ss-removed",y);A.trigger("ss-added",y)}C.trigger("ss-arrange").removeClass(x);A.trigger("ss-arrange",true).removeClass(o);B.trigger("ss-arrange").removeClass(k);return y=n=null}})}if(j.enableCrossDrop){return v.droppable({accept:j.crossDropWhitelist,tolerance:"intersect",over:function(A){e("."+k).removeClass(k);e("."+o).removeClass(o).addClass(k);return e(A.target).addClass(o)},drop:function(E,B){var A,D,C;if(u.options.enableTrash){D=e("."+x);A=e("."+o);C=e("."+k);y=e(B.helper);A.trigger("ss-trashed",y);y.remove();D.trigger("ss-rearrange").removeClass(x);A.trigger("ss-rearrange").removeClass(o);return C.trigger("ss-arrange").removeClass(k)}}})}};g.prototype.setTargetPosition=function(){var C,A,k,t,j,y,u,n,p,m,B,w,z,o,s,q,r,v,x,h,l,i;m=this.options;if(!m.enableTrash){p=m.draggedClass;C=e("."+p);A=C.parent();B=this.parsedChildren;j=this.getPositions(false);x=j.length;s=C.offset().left-A.offset().left+(this.globals.col_width/2);q=C.offset().top-A.offset().top+(C.height()/2);r=9999999;v=0;if(x>1){u=m.cutoffStart+1||0;y=m.cutoffEnd||x;for(z=i=u;u<=y?i<y:i>y;z=u<=y?++i:--i){t=j[z];if(t){l=s-t.left;h=q-t.top;if(l>0&&h>0){n=Math.sqrt((h*h)+(l*l));if(n<r){r=n;v=z;if(z===x-1){if(l>B[z].height/2){v++}}}}}}if(v===B.length){k=B[v-1].el;C.insertAfter(k)}else{k=B[v].el;C.insertBefore(k)}}else{if(x===1){t=j[0];if(t.left<s){this.$container.append(C)}else{this.$container.prepend(C)}}else{this.$container.append(C)}}this.arrange(true);if(A[0]!==C.parent()[0]){o=m.previousContainerClass;return e("."+o).trigger("ss-rearrange")}}else{w=this.options.placeholderClass;return e("."+w).remove()}};g.prototype.enableResize=function(){var i,j,h,k=this;i=this.options.animationSpeed;h=false;j="resize."+this.identifier;return e(c).on(j,function(){if(!h){h=true;setTimeout((function(){return k.render()}),i/3);setTimeout((function(){return k.render()}),i/3);return setTimeout(function(){h=false;return k.render()},i/3)}})};g.prototype.lowestCol=function(j,i){var h;if(i==null){i=0}h=j.map(function(l,k){return[l,k]});h.sort(function(l,k){var m;m=l[0]-k[0];if(m===0){m=l[1]-k[1]}return m});return h[i][1]};g.prototype.highestCol=function(h){return e.inArray(Math.max.apply(c,h),h)};g.prototype.destroy=function(){var h,j,i;j=this.$container;j.off("ss-arrange");j.off("ss-rearrange");j.off("ss-setTargetPosition");j.off("ss-destroy");i=this.options.activeClass;h=j.find("."+i);if(this.options.enableDrag){h.draggable("destroy")}if(this.options.enableCrossDrop){j.droppable("destroy")}h.removeClass(i);return j.removeClass(this.identifier)};return g})();return e.fn[d]=function(g){return this.each(function(){var j,h,i;h=(i=e(this).attr("class").match(/shapeshifted_container_\w+/))!=null?i[0]:void 0;if(h){j="resize."+h;e(c).off(j);e(this).removeClass(h)}return e.data(this,"plugin_"+d,new b(this,g))})}})(jQuery,window,document)}).call(this);
/*! nanoScrollerJS - v0.8.0 - 2014
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

/*
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
}
var Settings = {
	
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
			ciims = $.parseJSON(localStorage.getItem('ciims'));

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
};
var Users = {

	ciims : {},

	page : 1,

	registerUsers : function() {
		this.ciims = $.parseJSON(localStorage.getItem('ciims'));

		this.list();
		this.bindSearch();
	},

	bindSearch : function() {

	},

	/**
	 * Rebinds the click behavior to the appropriate elements
	 */
	clickBehavior : function() {
		// Unbind the existing click behaviors
		$(".paginated_results ul li").unbind("click");

		// Rebind it
		$(".paginated_results ul li").click(function() {
			// Remove the active state from all elements
			$(".paginated_results ul li").removeClass("active");

			$(this).addClass("active");
		});
	},

	/**
	 * Performs an AJAX GET query to load the available users
	 */
	list : function(clear, query, page) {

		if (query == undefined)
			query = "";

		if (page == undefined)
			page = 1;

		if (clear == undefined)
			clear = false;

		var self = this;
		$.ajax({
			url: window.location.origin + '/api/user?page=' + page,
			type: 'GET',
			headers: {
				'X-Auth-Email': self.ciims.email,
				'X-Auth-Token': self.ciims.token
			},
			beforeSend: function() {
				// Clear the results on before send, if requested
				if (clear)
					$(".paginated_results ul").empty()
			},
			success: function(data, textStatus, jqXHR) {
				this.page++;
				var ul = $(".paginated_results ul");
				$(data.response).each(function() {
					var li = $("<li>"),
						info = $("<div>");

					// Build the info object
					$(info).addClass("user-info");
					$(info).append($("<h6>").text(this.name));
					$(info).append($("<span>").text(this.email));
					$(info).append($("<span>").text(this.displayName));

					// Build the list element
					$(li).addClass(this.role.name);
					$(li).append($("<img>").addClass("user-image").attr("src", "https://www.gravatar.com/avatar/" + md5(this.email) + "?s=40"));
					$(li).append($(info));
					
					// Append it to the list
					$(ul).append($(li));
				});

				Users.clickBehavior();
				self.nanoscroller();
			}
		});
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		$(".nano").nanoScroller({ destroy: true });
		return $(".nano").nanoScroller({ iOSNativeScrolling: true }); 
	},
};