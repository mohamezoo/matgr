<script type='text/javascript'>
//<![CDATA[

// SelectNav.js - by: https://github.com/lukaszfiszer/selectnav.js
window.selectnav=function(){"use strict";var e=function(e,t){function c(e){var t;if(!e)e=window.event;if(e.target)t=e.target;else if(e.srcElement)t=e.srcElement;if(t.nodeType===3)t=t.parentNode;if(t.value)window.location.href=t.value}function h(e){var t=e.nodeName.toLowerCase();return t==="ul"||t==="ol"}function p(e){for(var t=1;document.getElementById("selectnav"+t);t++);return e?"selectnav"+t:"selectnav"+(t-1)}function d(e){a++;var t=e.children.length,n="",l="",c=a-1;if(!t){return}if(c){while(c--){l+=o}l+=" "}for(var v=0;v<t;v++){var m=e.children[v].children[0];if(typeof m!=="undefined"){var g=m.innerText||m.textContent;var y="";if(r){y=m.className.search(r)!==-1||m.parentNode.className.search(r)!==-1?f:""}if(i&&!y){y=m.href===document.URL?f:""}n+='<option value="'+m.href+'" '+y+">"+l+g+"</option>";if(s){var b=e.children[v].children[1];if(b&&h(b)){n+=d(b)}}}}if(a===1&&u){n='<option value="">'+u+"</option>"+n}if(a===1){n='<select class="selectnav" id="'+p(true)+'">'+n+"</select>"}a--;return n}e=document.getElementById(e);if(!e){return}if(!h(e)){return}if(!("insertAdjacentHTML"in window.document.documentElement)){return}document.documentElement.className+=" js";var n=t||{},r=n.activeclass||"active",i=typeof n.autoselect==="boolean"?n.autoselect:true,s=typeof n.nested==="boolean"?n.nested:true,o=n.indent||"-",u=n.label||"القائمه",a=0,f=" selected ";e.insertAdjacentHTML("afterend",d(e));var l=document.getElementById(p());if(l.addEventListener){l.addEventListener("change",c)}if(l.attachEvent){l.attachEvent("onchange",c)}return l};return function(t,n){e(t,n)}}();$(document).ready(function(){selectnav('nav');});

// Plugin: jQuery owl Slider v2.2 
;(function($,window,document,undefined){function Owl(element,options){this.settings=null;this.options=$.extend({},Owl.Defaults,options);this.$element=$(element);this._handlers={};this._plugins={};this._supress={};this._current=null;this._speed=null;this._coordinates=[];this._breakpoint=null;this._width=null;this._items=[];this._clones=[];this._mergers=[];this._widths=[];this._invalidated={};this._pipe=[];this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null};this._states={current:{},tags:{'initializing':['busy'],'animating':['busy'],'dragging':['interacting']}};$.each(['onResize','onThrottledResize'],$.proxy(function(i,handler){this._handlers[handler]=$.proxy(this[handler],this);},this));$.each(Owl.Plugins,$.proxy(function(key,plugin){this._plugins[key.charAt(0).toLowerCase()+key.slice(1)]=new plugin(this);},this));$.each(Owl.Workers,$.proxy(function(priority,worker){this._pipe.push({'filter':worker.filter,'run':$.proxy(worker.run,this)});},this));this.setup();this.initialize();}
Owl.Defaults={items:3,loop:false,center:false,rewind:false,mouseDrag:true,touchDrag:true,pullDrag:true,freeDrag:false,margin:0,stagePadding:0,merge:false,mergeFit:true,autoWidth:false,startPosition:0,rtl:false,smartSpeed:250,fluidSpeed:false,dragEndSpeed:false,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:window,fallbackEasing:'swing',info:false,nestedItemSelector:false,itemElement:'div',stageElement:'div',refreshClass:'owl-refresh',loadedClass:'owl-loaded',loadingClass:'owl-loading',rtlClass:'owl-rtl',responsiveClass:'owl-responsive',dragClass:'owl-drag',itemClass:'owl-item',stageClass:'owl-stage',stageOuterClass:'owl-stage-outer',grabClass:'owl-grab'};Owl.Width={Default:'default',Inner:'inner',Outer:'outer'};Owl.Type={Event:'event',State:'state'};Owl.Plugins={};Owl.Workers=[{filter:['width','settings'],run:function(){this._width=this.$element.width();}},{filter:['width','items','settings'],run:function(cache){cache.current=this._items&&this._items[this.relative(this._current)];}},{filter:['items','settings'],run:function(){this.$stage.children('.cloned').remove();}},{filter:['width','items','settings'],run:function(cache){var margin=this.settings.margin||'',grid=!this.settings.autoWidth,rtl=this.settings.rtl,css={'width':'auto','margin-left':rtl?margin:'','margin-right':rtl?'':margin};!grid&&this.$stage.children().css(css);cache.css=css;}},{filter:['width','items','settings'],run:function(cache){var width=(this.width()/ this.settings.items).toFixed(3)-this.settings.margin,merge=null,iterator=this._items.length,grid=!this.settings.autoWidth,widths=[];cache.items={merge:false,width:width};while(iterator--){merge=this._mergers[iterator];merge=this.settings.mergeFit&&Math.min(merge,this.settings.items)||merge;cache.items.merge=merge>1||cache.items.merge;widths[iterator]=!grid?this._items[iterator].width():width*merge;}
this._widths=widths;}},{filter:['items','settings'],run:function(){var clones=[],items=this._items,settings=this.settings,view=Math.max(settings.items*2,4),size=Math.ceil(items.length / 2)*2,repeat=settings.loop&&items.length?settings.rewind?view:Math.max(view,size):0,append='',prepend='';repeat /=2;while(repeat--){clones.push(this.normalize(clones.length / 2,true));append=append+items[clones[clones.length-1]][0].outerHTML;clones.push(this.normalize(items.length-1-(clones.length-1)/ 2,true));prepend=items[clones[clones.length-1]][0].outerHTML+prepend;}
this._clones=clones;$(append).addClass('cloned').appendTo(this.$stage);$(prepend).addClass('cloned').prependTo(this.$stage);}},{filter:['width','items','settings'],run:function(){var rtl=this.settings.rtl?1:-1,size=this._clones.length+this._items.length,iterator=-1,previous=0,current=0,coordinates=[];while(++iterator<size){previous=coordinates[iterator-1]||0;current=this._widths[this.relative(iterator)]+this.settings.margin;coordinates.push(previous+current*rtl);}
this._coordinates=coordinates;}},{filter:['width','items','settings'],run:function(){var padding=this.settings.stagePadding,coordinates=this._coordinates,css={'width':Math.ceil(Math.abs(coordinates[coordinates.length-1]))+padding*2,'padding-left':padding||'','padding-right':padding||''};this.$stage.css(css);}},{filter:['width','items','settings'],run:function(cache){var iterator=this._coordinates.length,grid=!this.settings.autoWidth,items=this.$stage.children();if(grid&&cache.items.merge){while(iterator--){cache.css.width=this._widths[this.relative(iterator)];items.eq(iterator).css(cache.css);}}else if(grid){cache.css.width=cache.items.width;items.css(cache.css);}}},{filter:['items'],run:function(){this._coordinates.length<1&&this.$stage.removeAttr('style');}},{filter:['width','items','settings'],run:function(cache){cache.current=cache.current?this.$stage.children().index(cache.current):0;cache.current=Math.max(this.minimum(),Math.min(this.maximum(),cache.current));this.reset(cache.current);}},{filter:['position'],run:function(){this.animate(this.coordinates(this._current));}},{filter:['width','position','items','settings'],run:function(){var rtl=this.settings.rtl?1:-1,padding=this.settings.stagePadding*2,begin=this.coordinates(this.current())+padding,end=begin+this.width()*rtl,inner,outer,matches=[],i,n;for(i=0,n=this._coordinates.length;i<n;i++){inner=this._coordinates[i-1]||0;outer=Math.abs(this._coordinates[i])+padding*rtl;if((this.op(inner,'<=',begin)&&(this.op(inner,'>',end)))||(this.op(outer,'<',begin)&&this.op(outer,'>',end))){matches.push(i);}}
this.$stage.children('.active').removeClass('active');this.$stage.children(':eq('+matches.join('), :eq(')+')').addClass('active');if(this.settings.center){this.$stage.children('.center').removeClass('center');this.$stage.children().eq(this.current()).addClass('center');}}}];Owl.prototype.initialize=function(){this.enter('initializing');this.trigger('initialize');this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl);if(this.settings.autoWidth&&!this.is('pre-loading')){var imgs,nestedSelector,width;imgs=this.$element.find('img');nestedSelector=this.settings.nestedItemSelector?'.'+this.settings.nestedItemSelector:undefined;width=this.$element.children(nestedSelector).width();if(imgs.length&&width<=0){this.preloadAutoWidthImages(imgs);}}
this.$element.addClass(this.options.loadingClass);this.$stage=$('<'+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>');this.$element.append(this.$stage.parent());this.replace(this.$element.children().not(this.$stage.parent()));if(this.$element.is(':visible')){this.refresh();}else{this.invalidate('width');}
this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);this.registerEventHandlers();this.leave('initializing');this.trigger('initialized');};Owl.prototype.setup=function(){var viewport=this.viewport(),overwrites=this.options.responsive,match=-1,settings=null;if(!overwrites){settings=$.extend({},this.options);}else{$.each(overwrites,function(breakpoint){if(breakpoint<=viewport&&breakpoint>match){match=Number(breakpoint);}});settings=$.extend({},this.options,overwrites[match]);if(typeof settings.stagePadding==='function'){settings.stagePadding=settings.stagePadding();}
delete settings.responsive;if(settings.responsiveClass){this.$element.attr('class',this.$element.attr('class').replace(new RegExp('('+this.options.responsiveClass+'-)\\S+\\s','g'),'$1'+match));}}
this.trigger('change',{property:{name:'settings',value:settings}});this._breakpoint=match;this.settings=settings;this.invalidate('settings');this.trigger('changed',{property:{name:'settings',value:this.settings}});};Owl.prototype.optionsLogic=function(){if(this.settings.autoWidth){this.settings.stagePadding=false;this.settings.merge=false;}};Owl.prototype.prepare=function(item){var event=this.trigger('prepare',{content:item});if(!event.data){event.data=$('<'+this.settings.itemElement+'/>').addClass(this.options.itemClass).append(item)}
this.trigger('prepared',{content:event.data});return event.data;};Owl.prototype.update=function(){var i=0,n=this._pipe.length,filter=$.proxy(function(p){return this[p]},this._invalidated),cache={};while(i<n){if(this._invalidated.all||$.grep(this._pipe[i].filter,filter).length>0){this._pipe[i].run(cache);}
i++;}
this._invalidated={};!this.is('valid')&&this.enter('valid');};Owl.prototype.width=function(dimension){dimension=dimension||Owl.Width.Default;switch(dimension){case Owl.Width.Inner:case Owl.Width.Outer:return this._width;default:return this._width-this.settings.stagePadding*2+this.settings.margin;}};Owl.prototype.refresh=function(){this.enter('refreshing');this.trigger('refresh');this.setup();this.optionsLogic();this.$element.addClass(this.options.refreshClass);this.update();this.$element.removeClass(this.options.refreshClass);this.leave('refreshing');this.trigger('refreshed');};Owl.prototype.onThrottledResize=function(){window.clearTimeout(this.resizeTimer);this.resizeTimer=window.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate);};Owl.prototype.onResize=function(){if(!this._items.length){return false;}
if(this._width===this.$element.width()){return false;}
if(!this.$element.is(':visible')){return false;}
this.enter('resizing');if(this.trigger('resize').isDefaultPrevented()){this.leave('resizing');return false;}
this.invalidate('width');this.refresh();this.leave('resizing');this.trigger('resized');};Owl.prototype.registerEventHandlers=function(){if($.support.transition){this.$stage.on($.support.transition.end+'.owl.core',$.proxy(this.onTransitionEnd,this));}
if(this.settings.responsive!==false){this.on(window,'resize',this._handlers.onThrottledResize);}
if(this.settings.mouseDrag){this.$element.addClass(this.options.dragClass);this.$stage.on('mousedown.owl.core',$.proxy(this.onDragStart,this));this.$stage.on('dragstart.owl.core selectstart.owl.core',function(){return false});}
if(this.settings.touchDrag){this.$stage.on('touchstart.owl.core',$.proxy(this.onDragStart,this));this.$stage.on('touchcancel.owl.core',$.proxy(this.onDragEnd,this));}};Owl.prototype.onDragStart=function(event){var stage=null;if(event.which===3){return;}
if($.support.transform){stage=this.$stage.css('transform').replace(/.*\(|\)| /g,'').split(',');stage={x:stage[stage.length===16?12:4],y:stage[stage.length===16?13:5]};}else{stage=this.$stage.position();stage={x:this.settings.rtl?stage.left+this.$stage.width()-this.width()+this.settings.margin:stage.left,y:stage.top};}
if(this.is('animating')){$.support.transform?this.animate(stage.x):this.$stage.stop()
this.invalidate('position');}
this.$element.toggleClass(this.options.grabClass,event.type==='mousedown');this.speed(0);this._drag.time=new Date().getTime();this._drag.target=$(event.target);this._drag.stage.start=stage;this._drag.stage.current=stage;this._drag.pointer=this.pointer(event);$(document).on('mouseup.owl.core touchend.owl.core',$.proxy(this.onDragEnd,this));$(document).one('mousemove.owl.core touchmove.owl.core',$.proxy(function(event){var delta=this.difference(this._drag.pointer,this.pointer(event));$(document).on('mousemove.owl.core touchmove.owl.core',$.proxy(this.onDragMove,this));if(Math.abs(delta.x)<Math.abs(delta.y)&&this.is('valid')){return;}
event.preventDefault();this.enter('dragging');this.trigger('drag');},this));};Owl.prototype.onDragMove=function(event){var minimum=null,maximum=null,pull=null,delta=this.difference(this._drag.pointer,this.pointer(event)),stage=this.difference(this._drag.stage.start,delta);if(!this.is('dragging')){return;}
event.preventDefault();if(this.settings.loop){minimum=this.coordinates(this.minimum());maximum=this.coordinates(this.maximum()+1)-minimum;stage.x=(((stage.x-minimum)%maximum+maximum)%maximum)+minimum;}else{minimum=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum());maximum=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum());pull=this.settings.pullDrag?-1*delta.x / 5:0;stage.x=Math.max(Math.min(stage.x,minimum+pull),maximum+pull);}
this._drag.stage.current=stage;this.animate(stage.x);};Owl.prototype.onDragEnd=function(event){var delta=this.difference(this._drag.pointer,this.pointer(event)),stage=this._drag.stage.current,direction=delta.x>0^this.settings.rtl?'left':'right';$(document).off('.owl.core');this.$element.removeClass(this.options.grabClass);if(delta.x!==0&&this.is('dragging')||!this.is('valid')){this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed);this.current(this.closest(stage.x,delta.x!==0?direction:this._drag.direction));this.invalidate('position');this.update();this._drag.direction=direction;if(Math.abs(delta.x)>3||new Date().getTime()-this._drag.time>300){this._drag.target.one('click.owl.core',function(){return false;});}}
if(!this.is('dragging')){return;}
this.leave('dragging');this.trigger('dragged');};Owl.prototype.closest=function(coordinate,direction){var position=-1,pull=30,width=this.width(),coordinates=this.coordinates();if(!this.settings.freeDrag){$.each(coordinates,$.proxy(function(index,value){if(direction==='left'&&coordinate>value-pull&&coordinate<value+pull){position=index;}else if(direction==='right'&&coordinate>value-width-pull&&coordinate<value-width+pull){position=index+1;}else if(this.op(coordinate,'<',value)&&this.op(coordinate,'>',coordinates[index+1]||value-width)){position=direction==='left'?index+1:index;}
return position===-1;},this));}
if(!this.settings.loop){if(this.op(coordinate,'>',coordinates[this.minimum()])){position=coordinate=this.minimum();}else if(this.op(coordinate,'<',coordinates[this.maximum()])){position=coordinate=this.maximum();}}
return position;};Owl.prototype.animate=function(coordinate){var animate=this.speed()>0;this.is('animating')&&this.onTransitionEnd();if(animate){this.enter('animating');this.trigger('translate');}
if($.support.transform3d&&$.support.transition){this.$stage.css({transform:'translate3d('+coordinate+'px,0px,0px)',transition:(this.speed()/ 1000)+'s'});}else if(animate){this.$stage.animate({left:coordinate+'px'},this.speed(),this.settings.fallbackEasing,$.proxy(this.onTransitionEnd,this));}else{this.$stage.css({left:coordinate+'px'});}};Owl.prototype.is=function(state){return this._states.current[state]&&this._states.current[state]>0;};Owl.prototype.current=function(position){if(position===undefined){return this._current;}
if(this._items.length===0){return undefined;}
position=this.normalize(position);if(this._current!==position){var event=this.trigger('change',{property:{name:'position',value:position}});if(event.data!==undefined){position=this.normalize(event.data);}
this._current=position;this.invalidate('position');this.trigger('changed',{property:{name:'position',value:this._current}});}
return this._current;};Owl.prototype.invalidate=function(part){if($.type(part)==='string'){this._invalidated[part]=true;this.is('valid')&&this.leave('valid');}
return $.map(this._invalidated,function(v,i){return i});};Owl.prototype.reset=function(position){position=this.normalize(position);if(position===undefined){return;}
this._speed=0;this._current=position;this.suppress(['translate','translated']);this.animate(this.coordinates(position));this.release(['translate','translated']);};Owl.prototype.normalize=function(position,relative){var n=this._items.length,m=relative?0:this._clones.length;if(!this.isNumeric(position)||n<1){position=undefined;}else if(position<0||position>=n+m){position=((position-m / 2)%n+n)%n+m / 2;}
return position;};Owl.prototype.relative=function(position){position-=this._clones.length / 2;return this.normalize(position,true);};Owl.prototype.maximum=function(relative){var settings=this.settings,maximum=this._coordinates.length,iterator,reciprocalItemsWidth,elementWidth;if(settings.loop){maximum=this._clones.length / 2+this._items.length-1;}else if(settings.autoWidth||settings.merge){iterator=this._items.length;reciprocalItemsWidth=this._items[--iterator].width();elementWidth=this.$element.width();while(iterator--){reciprocalItemsWidth+=this._items[iterator].width()+this.settings.margin;if(reciprocalItemsWidth>elementWidth){break;}}
maximum=iterator+1;}else if(settings.center){maximum=this._items.length-1;}else{maximum=this._items.length-settings.items;}
if(relative){maximum-=this._clones.length / 2;}
return Math.max(maximum,0);};Owl.prototype.minimum=function(relative){return relative?0:this._clones.length / 2;};Owl.prototype.items=function(position){if(position===undefined){return this._items.slice();}
position=this.normalize(position,true);return this._items[position];};Owl.prototype.mergers=function(position){if(position===undefined){return this._mergers.slice();}
position=this.normalize(position,true);return this._mergers[position];};Owl.prototype.clones=function(position){var odd=this._clones.length / 2,even=odd+this._items.length,map=function(index){return index%2===0?even+index / 2:odd-(index+1)/ 2};if(position===undefined){return $.map(this._clones,function(v,i){return map(i)});}
return $.map(this._clones,function(v,i){return v===position?map(i):null});};Owl.prototype.speed=function(speed){if(speed!==undefined){this._speed=speed;}
return this._speed;};Owl.prototype.coordinates=function(position){var multiplier=1,newPosition=position-1,coordinate;if(position===undefined){return $.map(this._coordinates,$.proxy(function(coordinate,index){return this.coordinates(index);},this));}
if(this.settings.center){if(this.settings.rtl){multiplier=-1;newPosition=position+1;}
coordinate=this._coordinates[position];coordinate+=(this.width()-coordinate+(this._coordinates[newPosition]||0))/ 2*multiplier;}else{coordinate=this._coordinates[newPosition]||0;}
coordinate=Math.ceil(coordinate);return coordinate;};Owl.prototype.duration=function(from,to,factor){if(factor===0){return 0;}
return Math.min(Math.max(Math.abs(to-from),1),6)*Math.abs((factor||this.settings.smartSpeed));};Owl.prototype.to=function(position,speed){var current=this.current(),revert=null,distance=position-this.relative(current),direction=(distance>0)-(distance<0),items=this._items.length,minimum=this.minimum(),maximum=this.maximum();if(this.settings.loop){if(!this.settings.rewind&&Math.abs(distance)>items / 2){distance+=direction*-1*items;}
position=current+distance;revert=((position-minimum)%items+items)%items+minimum;if(revert!==position&&revert-distance<=maximum&&revert-distance>0){current=revert-distance;position=revert;this.reset(current);}}else if(this.settings.rewind){maximum+=1;position=(position%maximum+maximum)%maximum;}else{position=Math.max(minimum,Math.min(maximum,position));}
this.speed(this.duration(current,position,speed));this.current(position);if(this.$element.is(':visible')){this.update();}};Owl.prototype.next=function(speed){speed=speed||false;this.to(this.relative(this.current())+1,speed);};Owl.prototype.prev=function(speed){speed=speed||false;this.to(this.relative(this.current())-1,speed);};Owl.prototype.onTransitionEnd=function(event){if(event!==undefined){event.stopPropagation();if((event.target||event.srcElement||event.originalTarget)!==this.$stage.get(0)){return false;}}
this.leave('animating');this.trigger('translated');};Owl.prototype.viewport=function(){var width;if(this.options.responsiveBaseElement!==window){width=$(this.options.responsiveBaseElement).width();}else if(window.innerWidth){width=window.innerWidth;}else if(document.documentElement&&document.documentElement.clientWidth){width=document.documentElement.clientWidth;}else{console.warn('Can not detect viewport width.');}
return width;};Owl.prototype.replace=function(content){this.$stage.empty();this._items=[];if(content){content=(content instanceof jQuery)?content:$(content);}
if(this.settings.nestedItemSelector){content=content.find('.'+this.settings.nestedItemSelector);}
content.filter(function(){return this.nodeType===1;}).each($.proxy(function(index,item){item=this.prepare(item);this.$stage.append(item);this._items.push(item);this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge')*1||1);},this));this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0);this.invalidate('items');};Owl.prototype.add=function(content,position){var current=this.relative(this._current);position=position===undefined?this._items.length:this.normalize(position,true);content=content instanceof jQuery?content:$(content);this.trigger('add',{content:content,position:position});content=this.prepare(content);if(this._items.length===0||position===this._items.length){this._items.length===0&&this.$stage.append(content);this._items.length!==0&&this._items[position-1].after(content);this._items.push(content);this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge')*1||1);}else{this._items[position].before(content);this._items.splice(position,0,content);this._mergers.splice(position,0,content.find('[data-merge]').addBack('[data-merge]').attr('data-merge')*1||1);}
this._items[current]&&this.reset(this._items[current].index());this.invalidate('items');this.trigger('added',{content:content,position:position});};Owl.prototype.remove=function(position){position=this.normalize(position,true);if(position===undefined){return;}
this.trigger('remove',{content:this._items[position],position:position});this._items[position].remove();this._items.splice(position,1);this._mergers.splice(position,1);this.invalidate('items');this.trigger('removed',{content:null,position:position});};Owl.prototype.preloadAutoWidthImages=function(images){images.each($.proxy(function(i,element){this.enter('pre-loading');element=$(element);$(new Image()).one('load',$.proxy(function(e){element.attr('src',e.target.src);element.css('opacity',1);this.leave('pre-loading');!this.is('pre-loading')&&!this.is('initializing')&&this.refresh();},this)).attr('src',element.attr('src')||element.attr('data-src')||element.attr('data-src-retina'));},this));};Owl.prototype.destroy=function(){this.$element.off('.owl.core');this.$stage.off('.owl.core');$(document).off('.owl.core');if(this.settings.responsive!==false){window.clearTimeout(this.resizeTimer);this.off(window,'resize',this._handlers.onThrottledResize);}
for(var i in this._plugins){this._plugins[i].destroy();}
this.$stage.children('.cloned').remove();this.$stage.unwrap();this.$stage.children().contents().unwrap();this.$stage.children().unwrap();this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr('class',this.$element.attr('class').replace(new RegExp(this.options.responsiveClass+'-\\S+\\s','g'),'')).removeData('owl.carousel');};Owl.prototype.op=function(a,o,b){var rtl=this.settings.rtl;switch(o){case'<':return rtl?a>b:a<b;case'>':return rtl?a<b:a>b;case'>=':return rtl?a<=b:a>=b;case'<=':return rtl?a>=b:a<=b;default:break;}};Owl.prototype.on=function(element,event,listener,capture){if(element.addEventListener){element.addEventListener(event,listener,capture);}else if(element.attachEvent){element.attachEvent('on'+event,listener);}};Owl.prototype.off=function(element,event,listener,capture){if(element.removeEventListener){element.removeEventListener(event,listener,capture);}else if(element.detachEvent){element.detachEvent('on'+event,listener);}};Owl.prototype.trigger=function(name,data,namespace,state,enter){var status={item:{count:this._items.length,index:this.current()}},handler=$.camelCase($.grep(['on',name,namespace],function(v){return v}).join('-').toLowerCase()),event=$.Event([name,'owl',namespace||'carousel'].join('.').toLowerCase(),$.extend({relatedTarget:this},status,data));if(!this._supress[name]){$.each(this._plugins,function(name,plugin){if(plugin.onTrigger){plugin.onTrigger(event);}});this.register({type:Owl.Type.Event,name:name});this.$element.trigger(event);if(this.settings&&typeof this.settings[handler]==='function'){this.settings[handler].call(this,event);}}
return event;};Owl.prototype.enter=function(name){$.each([name].concat(this._states.tags[name]||[]),$.proxy(function(i,name){if(this._states.current[name]===undefined){this._states.current[name]=0;}
this._states.current[name]++;},this));};Owl.prototype.leave=function(name){$.each([name].concat(this._states.tags[name]||[]),$.proxy(function(i,name){this._states.current[name]--;},this));};Owl.prototype.register=function(object){if(object.type===Owl.Type.Event){if(!$.event.special[object.name]){$.event.special[object.name]={};}
if(!$.event.special[object.name].owl){var _default=$.event.special[object.name]._default;$.event.special[object.name]._default=function(e){if(_default&&_default.apply&&(!e.namespace||e.namespace.indexOf('owl')===-1)){return _default.apply(this,arguments);}
return e.namespace&&e.namespace.indexOf('owl')>-1;};$.event.special[object.name].owl=true;}}else if(object.type===Owl.Type.State){if(!this._states.tags[object.name]){this._states.tags[object.name]=object.tags;}else{this._states.tags[object.name]=this._states.tags[object.name].concat(object.tags);}
this._states.tags[object.name]=$.grep(this._states.tags[object.name],$.proxy(function(tag,i){return $.inArray(tag,this._states.tags[object.name])===i;},this));}};Owl.prototype.suppress=function(events){$.each(events,$.proxy(function(index,event){this._supress[event]=true;},this));};Owl.prototype.release=function(events){$.each(events,$.proxy(function(index,event){delete this._supress[event];},this));};Owl.prototype.pointer=function(event){var result={x:null,y:null};event=event.originalEvent||event||window.event;event=event.touches&&event.touches.length?event.touches[0]:event.changedTouches&&event.changedTouches.length?event.changedTouches[0]:event;if(event.pageX){result.x=event.pageX;result.y=event.pageY;}else{result.x=event.clientX;result.y=event.clientY;}
return result;};Owl.prototype.isNumeric=function(number){return!isNaN(parseFloat(number));};Owl.prototype.difference=function(first,second){return{x:first.x-second.x,y:first.y-second.y};};$.fn.owlCarousel=function(option){var args=Array.prototype.slice.call(arguments,1);return this.each(function(){var $this=$(this),data=$this.data('owl.carousel');if(!data){data=new Owl(this,typeof option=='object'&&option);$this.data('owl.carousel',data);$.each(['next','prev','to','destroy','refresh','replace','add','remove'],function(i,event){data.register({type:Owl.Type.Event,name:event});data.$element.on(event+'.owl.carousel.core',$.proxy(function(e){if(e.namespace&&e.relatedTarget!==this){this.suppress([event]);data[event].apply(this,[].slice.call(arguments,1));this.release([event]);}},data));});}
if(typeof option=='string'&&option.charAt(0)!=='_'){data[option].apply(data,args);}});};$.fn.owlCarousel.Constructor=Owl;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var AutoRefresh=function(carousel){this._core=carousel;this._interval=null;this._visible=null;this._handlers={'initialized.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.autoRefresh){this.watch();}},this)};this._core.options=$.extend({},AutoRefresh.Defaults,this._core.options);this._core.$element.on(this._handlers);};AutoRefresh.Defaults={autoRefresh:true,autoRefreshInterval:500};AutoRefresh.prototype.watch=function(){if(this._interval){return;}
this._visible=this._core.$element.is(':visible');this._interval=window.setInterval($.proxy(this.refresh,this),this._core.settings.autoRefreshInterval);};AutoRefresh.prototype.refresh=function(){if(this._core.$element.is(':visible')===this._visible){return;}
this._visible=!this._visible;this._core.$element.toggleClass('owl-hidden',!this._visible);this._visible&&(this._core.invalidate('width')&&this._core.refresh());};AutoRefresh.prototype.destroy=function(){var handler,property;window.clearInterval(this._interval);for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.AutoRefresh=AutoRefresh;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var Lazy=function(carousel){this._core=carousel;this._loaded=[];this._handlers={'initialized.owl.carousel change.owl.carousel resized.owl.carousel':$.proxy(function(e){if(!e.namespace){return;}
if(!this._core.settings||!this._core.settings.lazyLoad){return;}
if((e.property&&e.property.name=='position')||e.type=='initialized'){var settings=this._core.settings,n=(settings.center&&Math.ceil(settings.items / 2)||settings.items),i=((settings.center&&n*-1)||0),position=(e.property&&e.property.value!==undefined?e.property.value:this._core.current())+i,clones=this._core.clones().length,load=$.proxy(function(i,v){this.load(v)},this);while(i++<n){this.load(clones / 2+this._core.relative(position));clones&&$.each(this._core.clones(this._core.relative(position)),load);position++;}}},this)};this._core.options=$.extend({},Lazy.Defaults,this._core.options);this._core.$element.on(this._handlers);};Lazy.Defaults={lazyLoad:false};Lazy.prototype.load=function(position){var $item=this._core.$stage.children().eq(position),$elements=$item&&$item.find('.owl-lazy');if(!$elements||$.inArray($item.get(0),this._loaded)>-1){return;}
$elements.each($.proxy(function(index,element){var $element=$(element),image,url=(window.devicePixelRatio>1&&$element.attr('data-src-retina'))||$element.attr('data-src');this._core.trigger('load',{element:$element,url:url},'lazy');if($element.is('img')){$element.one('load.owl.lazy',$.proxy(function(){$element.css('opacity',1);this._core.trigger('loaded',{element:$element,url:url},'lazy');},this)).attr('src',url);}else{image=new Image();image.onload=$.proxy(function(){$element.css({'background-image':'url("'+url+'")','opacity':'1'});this._core.trigger('loaded',{element:$element,url:url},'lazy');},this);image.src=url;}},this));this._loaded.push($item.get(0));};Lazy.prototype.destroy=function(){var handler,property;for(handler in this.handlers){this._core.$element.off(handler,this.handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.Lazy=Lazy;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var AutoHeight=function(carousel){this._core=carousel;this._handlers={'initialized.owl.carousel refreshed.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.autoHeight){this.update();}},this),'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.autoHeight&&e.property.name=='position'){this.update();}},this),'loaded.owl.lazy':$.proxy(function(e){if(e.namespace&&this._core.settings.autoHeight&&e.element.closest('.'+this._core.settings.itemClass).index()===this._core.current()){this.update();}},this)};this._core.options=$.extend({},AutoHeight.Defaults,this._core.options);this._core.$element.on(this._handlers);};AutoHeight.Defaults={autoHeight:false,autoHeightClass:'owl-height'};AutoHeight.prototype.update=function(){var start=this._core._current,end=start+this._core.settings.items,visible=this._core.$stage.children().toArray().slice(start,end),heights=[],maxheight=0;$.each(visible,function(index,item){heights.push($(item).height());});maxheight=Math.max.apply(null,heights);this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass);};AutoHeight.prototype.destroy=function(){var handler,property;for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.AutoHeight=AutoHeight;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var Video=function(carousel){this._core=carousel;this._videos={};this._playing=null;this._handlers={'initialized.owl.carousel':$.proxy(function(e){if(e.namespace){this._core.register({type:'state',name:'playing',tags:['interacting']});}},this),'resize.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.video&&this.isInFullScreen()){e.preventDefault();}},this),'refreshed.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.is('resizing')){this._core.$stage.find('.cloned .owl-video-frame').remove();}},this),'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name==='position'&&this._playing){this.stop();}},this),'prepared.owl.carousel':$.proxy(function(e){if(!e.namespace){return;}
var $element=$(e.content).find('.owl-video');if($element.length){$element.css('display','none');this.fetch($element,$(e.content));}},this)};this._core.options=$.extend({},Video.Defaults,this._core.options);this._core.$element.on(this._handlers);this._core.$element.on('click.owl.video','.owl-video-play-icon',$.proxy(function(e){this.play(e);},this));};Video.Defaults={video:false,videoHeight:false,videoWidth:false};Video.prototype.fetch=function(target,item){var type=(function(){if(target.attr('data-vimeo-id')){return'vimeo';}else if(target.attr('data-vzaar-id')){return'vzaar'}else{return'youtube';}})(),id=target.attr('data-vimeo-id')||target.attr('data-youtube-id')||target.attr('data-vzaar-id'),width=target.attr('data-width')||this._core.settings.videoWidth,height=target.attr('data-height')||this._core.settings.videoHeight,url=target.attr('href');if(url){id=url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);if(id[3].indexOf('youtu')>-1){type='youtube';}else if(id[3].indexOf('vimeo')>-1){type='vimeo';}else if(id[3].indexOf('vzaar')>-1){type='vzaar';}else{throw new Error('Video URL not supported.');}
id=id[6];}else{throw new Error('Missing video URL.');}
this._videos[url]={type:type,id:id,width:width,height:height};item.attr('data-video',url);this.thumbnail(target,this._videos[url]);};Video.prototype.thumbnail=function(target,video){var tnLink,icon,path,dimensions=video.width&&video.height?'style="width:'+video.width+'px;height:'+video.height+'px;"':'',customTn=target.find('img'),srcType='src',lazyClass='',settings=this._core.settings,create=function(path){icon='<div class="owl-video-play-icon"></div>';if(settings.lazyLoad){tnLink='<div class="owl-video-tn '+lazyClass+'" '+srcType+'="'+path+'"></div>';}else{tnLink='<div class="owl-video-tn" style="opacity:1;background-image:url('+path+')"></div>';}
target.after(tnLink);target.after(icon);};target.wrap('<div class="owl-video-wrapper"'+dimensions+'></div>');if(this._core.settings.lazyLoad){srcType='data-src';lazyClass='owl-lazy';}
if(customTn.length){create(customTn.attr(srcType));customTn.remove();return false;}
if(video.type==='youtube'){path="//img.youtube.com/vi/"+video.id+"/hqdefault.jpg";create(path);}else if(video.type==='vimeo'){$.ajax({type:'GET',url:'//vimeo.com/api/v2/video/'+video.id+'.json',jsonp:'callback',dataType:'jsonp',success:function(data){path=data[0].thumbnail_large;create(path);}});}else if(video.type==='vzaar'){$.ajax({type:'GET',url:'//vzaar.com/api/videos/'+video.id+'.json',jsonp:'callback',dataType:'jsonp',success:function(data){path=data.framegrab_url;create(path);}});}};Video.prototype.stop=function(){this._core.trigger('stop',null,'video');this._playing.find('.owl-video-frame').remove();this._playing.removeClass('owl-video-playing');this._playing=null;this._core.leave('playing');this._core.trigger('stopped',null,'video');};Video.prototype.play=function(event){var target=$(event.target),item=target.closest('.'+this._core.settings.itemClass),video=this._videos[item.attr('data-video')],width=video.width||'100%',height=video.height||this._core.$stage.height(),html;if(this._playing){return;}
this._core.enter('playing');this._core.trigger('play',null,'video');item=this._core.items(this._core.relative(item.index()));this._core.reset(item.index());if(video.type==='youtube'){html='<iframe width="'+width+'" height="'+height+'" src="//www.youtube.com/embed/'+
video.id+'?autoplay=1&rel=0&v='+video.id+'" frameborder="0" allowfullscreen></iframe>';}else if(video.type==='vimeo'){html='<iframe src="//player.vimeo.com/video/'+video.id+'?autoplay=1" width="'+width+'" height="'+height+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';}else if(video.type==='vzaar'){html='<iframe frameborder="0"'+'height="'+height+'"'+'width="'+width+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen '+'src="//view.vzaar.com/'+video.id+'/player?autoplay=true"></iframe>';}
$('<div class="owl-video-frame">'+html+'</div>').insertAfter(item.find('.owl-video'));this._playing=item.addClass('owl-video-playing');};Video.prototype.isInFullScreen=function(){var element=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;return element&&$(element).parent().hasClass('owl-video-frame');};Video.prototype.destroy=function(){var handler,property;this._core.$element.off('click.owl.video');for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.Video=Video;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var Animate=function(scope){this.core=scope;this.core.options=$.extend({},Animate.Defaults,this.core.options);this.swapping=true;this.previous=undefined;this.next=undefined;this.handlers={'change.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name=='position'){this.previous=this.core.current();this.next=e.property.value;}},this),'drag.owl.carousel dragged.owl.carousel translated.owl.carousel':$.proxy(function(e){if(e.namespace){this.swapping=e.type=='translated';}},this),'translate.owl.carousel':$.proxy(function(e){if(e.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)){this.swap();}},this)};this.core.$element.on(this.handlers);};Animate.Defaults={animateOut:false,animateIn:false};Animate.prototype.swap=function(){if(this.core.settings.items!==1){return;}
if(!$.support.animation||!$.support.transition){return;}
this.core.speed(0);var left,clear=$.proxy(this.clear,this),previous=this.core.$stage.children().eq(this.previous),next=this.core.$stage.children().eq(this.next),incoming=this.core.settings.animateIn,outgoing=this.core.settings.animateOut;if(this.core.current()===this.previous){return;}
if(outgoing){left=this.core.coordinates(this.previous)-this.core.coordinates(this.next);previous.one($.support.animation.end,clear).css({'left':left+'px'}).addClass('animated owl-animated-out').addClass(outgoing);}
if(incoming){next.one($.support.animation.end,clear).addClass('animated owl-animated-in').addClass(incoming);}};Animate.prototype.clear=function(e){$(e.target).css({'left':''}).removeClass('animated owl-animated-out owl-animated-in').removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);this.core.onTransitionEnd();};Animate.prototype.destroy=function(){var handler,property;for(handler in this.handlers){this.core.$element.off(handler,this.handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.Animate=Animate;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var Autoplay=function(carousel){this._core=carousel;this._timeout=null;this._paused=false;this._handlers={'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name==='settings'){if(this._core.settings.autoplay){this.play();}else{this.stop();}}else if(e.namespace&&e.property.name==='position'){if(this._core.settings.autoplay){this._setAutoPlayInterval();}}},this),'initialized.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.autoplay){this.play();}},this),'play.owl.autoplay':$.proxy(function(e,t,s){if(e.namespace){this.play(t,s);}},this),'stop.owl.autoplay':$.proxy(function(e){if(e.namespace){this.stop();}},this),'mouseover.owl.autoplay':$.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is('rotating')){this.pause();}},this),'mouseleave.owl.autoplay':$.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is('rotating')){this.play();}},this),'touchstart.owl.core':$.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is('rotating')){this.pause();}},this),'touchend.owl.core':$.proxy(function(){if(this._core.settings.autoplayHoverPause){this.play();}},this)};this._core.$element.on(this._handlers);this._core.options=$.extend({},Autoplay.Defaults,this._core.options);};Autoplay.Defaults={autoplay:false,autoplayTimeout:5000,autoplayHoverPause:false,autoplaySpeed:false};Autoplay.prototype.play=function(timeout,speed){this._paused=false;if(this._core.is('rotating')){return;}
this._core.enter('rotating');this._setAutoPlayInterval();};Autoplay.prototype._getNextTimeout=function(timeout,speed){if(this._timeout){window.clearTimeout(this._timeout);}
return window.setTimeout($.proxy(function(){if(this._paused||this._core.is('busy')||this._core.is('interacting')||document.hidden){return;}
this._core.next(speed||this._core.settings.autoplaySpeed);},this),timeout||this._core.settings.autoplayTimeout);};Autoplay.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout();};Autoplay.prototype.stop=function(){if(!this._core.is('rotating')){return;}
window.clearTimeout(this._timeout);this._core.leave('rotating');};Autoplay.prototype.pause=function(){if(!this._core.is('rotating')){return;}
this._paused=true;};Autoplay.prototype.destroy=function(){var handler,property;this.stop();for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.autoplay=Autoplay;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){'use strict';var Navigation=function(carousel){this._core=carousel;this._initialized=false;this._pages=[];this._controls={};this._templates=[];this.$element=this._core.$element;this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to};this._handlers={'prepared.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.dotsData){this._templates.push('<div class="'+this._core.settings.dotClass+'">'+
$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot')+'</div>');}},this),'added.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.dotsData){this._templates.splice(e.position,0,this._templates.pop());}},this),'remove.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.dotsData){this._templates.splice(e.position,1);}},this),'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name=='position'){this.draw();}},this),'initialized.owl.carousel':$.proxy(function(e){if(e.namespace&&!this._initialized){this._core.trigger('initialize',null,'navigation');this.initialize();this.update();this.draw();this._initialized=true;this._core.trigger('initialized',null,'navigation');}},this),'refreshed.owl.carousel':$.proxy(function(e){if(e.namespace&&this._initialized){this._core.trigger('refresh',null,'navigation');this.update();this.draw();this._core.trigger('refreshed',null,'navigation');}},this)};this._core.options=$.extend({},Navigation.Defaults,this._core.options);this.$element.on(this._handlers);};Navigation.Defaults={nav:false,navText:['prev','next'],navSpeed:false,navElement:'div',navContainer:false,navContainerClass:'owl-nav',navClass:['owl-prev','owl-next'],slideBy:1,dotClass:'owl-dot',dotsClass:'owl-dots',dots:true,dotsEach:false,dotsData:false,dotsSpeed:false,dotsContainer:false};Navigation.prototype.initialize=function(){var override,settings=this._core.settings;this._controls.$relative=(settings.navContainer?$(settings.navContainer):$('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');this._controls.$previous=$('<'+settings.navElement+'>').addClass(settings.navClass[0]).html(settings.navText[0]).prependTo(this._controls.$relative).on('click',$.proxy(function(e){this.prev(settings.navSpeed);},this));this._controls.$next=$('<'+settings.navElement+'>').addClass(settings.navClass[1]).html(settings.navText[1]).appendTo(this._controls.$relative).on('click',$.proxy(function(e){this.next(settings.navSpeed);},this));if(!settings.dotsData){this._templates=[$('<div>').addClass(settings.dotClass).append($('<span>')).prop('outerHTML')];}
this._controls.$absolute=(settings.dotsContainer?$(settings.dotsContainer):$('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');this._controls.$absolute.on('click','div',$.proxy(function(e){var index=$(e.target).parent().is(this._controls.$absolute)?$(e.target).index():$(e.target).parent().index();e.preventDefault();this.to(index,settings.dotsSpeed);},this));for(override in this._overrides){this._core[override]=$.proxy(this[override],this);}};Navigation.prototype.destroy=function(){var handler,control,property,override;for(handler in this._handlers){this.$element.off(handler,this._handlers[handler]);}
for(control in this._controls){this._controls[control].remove();}
for(override in this.overides){this._core[override]=this._overrides[override];}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};Navigation.prototype.update=function(){var i,j,k,lower=this._core.clones().length / 2,upper=lower+this._core.items().length,maximum=this._core.maximum(true),settings=this._core.settings,size=settings.center||settings.autoWidth||settings.dotsData?1:settings.dotsEach||settings.items;if(settings.slideBy!=='page'){settings.slideBy=Math.min(settings.slideBy,settings.items);}
if(settings.dots||settings.slideBy=='page'){this._pages=[];for(i=lower,j=0,k=0;i<upper;i++){if(j>=size||j===0){this._pages.push({start:Math.min(maximum,i-lower),end:i-lower+size-1});if(Math.min(maximum,i-lower)===maximum){break;}
j=0,++k;}
j+=this._core.mergers(this._core.relative(i));}}};Navigation.prototype.draw=function(){var difference,settings=this._core.settings,disabled=this._core.items().length<=settings.items,index=this._core.relative(this._core.current()),loop=settings.loop||settings.rewind;this._controls.$relative.toggleClass('disabled',!settings.nav||disabled);if(settings.nav){this._controls.$previous.toggleClass('disabled',!loop&&index<=this._core.minimum(true));this._controls.$next.toggleClass('disabled',!loop&&index>=this._core.maximum(true));}
this._controls.$absolute.toggleClass('disabled',!settings.dots||disabled);if(settings.dots){difference=this._pages.length-this._controls.$absolute.children().length;if(settings.dotsData&&difference!==0){this._controls.$absolute.html(this._templates.join(''));}else if(difference>0){this._controls.$absolute.append(new Array(difference+1).join(this._templates[0]));}else if(difference<0){this._controls.$absolute.children().slice(difference).remove();}
this._controls.$absolute.find('.active').removeClass('active');this._controls.$absolute.children().eq($.inArray(this.current(),this._pages)).addClass('active');}};Navigation.prototype.onTrigger=function(event){var settings=this._core.settings;event.page={index:$.inArray(this.current(),this._pages),count:this._pages.length,size:settings&&(settings.center||settings.autoWidth||settings.dotsData?1:settings.dotsEach||settings.items)};};Navigation.prototype.current=function(){var current=this._core.relative(this._core.current());return $.grep(this._pages,$.proxy(function(page,index){return page.start<=current&&page.end>=current;},this)).pop();};Navigation.prototype.getPosition=function(successor){var position,length,settings=this._core.settings;if(settings.slideBy=='page'){position=$.inArray(this.current(),this._pages);length=this._pages.length;successor?++position:--position;position=this._pages[((position%length)+length)%length].start;}else{position=this._core.relative(this._core.current());length=this._core.items().length;successor?position+=settings.slideBy:position-=settings.slideBy;}
return position;};Navigation.prototype.next=function(speed){$.proxy(this._overrides.to,this._core)(this.getPosition(true),speed);};Navigation.prototype.prev=function(speed){$.proxy(this._overrides.to,this._core)(this.getPosition(false),speed);};Navigation.prototype.to=function(position,speed,standard){var length;if(!standard&&this._pages.length){length=this._pages.length;$.proxy(this._overrides.to,this._core)(this._pages[((position%length)+length)%length].start,speed);}else{$.proxy(this._overrides.to,this._core)(position,speed);}};$.fn.owlCarousel.Constructor.Plugins.Navigation=Navigation;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){'use strict';var Hash=function(carousel){this._core=carousel;this._hashes={};this.$element=this._core.$element;this._handlers={'initialized.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.startPosition==='URLHash'){$(window).trigger('hashchange.owl.navigation');}},this),'prepared.owl.carousel':$.proxy(function(e){if(e.namespace){var hash=$(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');if(!hash){return;}
this._hashes[hash]=e.content;}},this),'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name==='position'){var current=this._core.items(this._core.relative(this._core.current())),hash=$.map(this._hashes,function(item,hash){return item===current?hash:null;}).join();if(!hash||window.location.hash.slice(1)===hash){return;}
window.location.hash=hash;}},this)};this._core.options=$.extend({},Hash.Defaults,this._core.options);this.$element.on(this._handlers);$(window).on('hashchange.owl.navigation',$.proxy(function(e){var hash=window.location.hash.substring(1),items=this._core.$stage.children(),position=this._hashes[hash]&&items.index(this._hashes[hash]);if(position===undefined||position===this._core.current()){return;}
this._core.to(this._core.relative(position),false,true);},this));};Hash.Defaults={URLhashListener:false};Hash.prototype.destroy=function(){var handler,property;$(window).off('hashchange.owl.navigation');for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.Hash=Hash;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var style=$('<support>').get(0).style,prefixes='Webkit Moz O ms'.split(' '),events={transition:{end:{WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd',transition:'transitionend'}},animation:{end:{WebkitAnimation:'webkitAnimationEnd',MozAnimation:'animationend',OAnimation:'oAnimationEnd',animation:'animationend'}}},tests={csstransforms:function(){return!!test('transform');},csstransforms3d:function(){return!!test('perspective');},csstransitions:function(){return!!test('transition');},cssanimations:function(){return!!test('animation');}};function test(property,prefixed){var result=false,upper=property.charAt(0).toUpperCase()+property.slice(1);$.each((property+' '+prefixes.join(upper+' ')+upper).split(' '),function(i,property){if(style[property]!==undefined){result=prefixed?property:true;return false;}});return result;}
function prefixed(property){return test(property,true);}
if(tests.csstransitions()){$.support.transition=new String(prefixed('transition'))
$.support.transition.end=events.transition.end[$.support.transition];}
if(tests.cssanimations()){$.support.animation=new String(prefixed('animation'))
$.support.animation.end=events.animation.end[$.support.animation];}
if(tests.csstransforms()){$.support.transform=new String(prefixed('transform'));$.support.transform3d=tests.csstransforms3d();}})(window.Zepto||window.jQuery,window,document);

/*
* jquery-simplecart 
* License MIT
*/
(function(p,f){var s="string",k=function(e,f){return typeof e===f},e=function(e){return k(e,"undefined")},h=function(e){return k(e,"function")},y=function(e){return"object"===typeof HTMLElement?e instanceof HTMLElement:"object"===typeof e&&1===e.nodeType&&"string"===typeof e.nodeName},C=function(q){function E(a){return b.extend({attr:"",label:"",view:"attr",text:"",className:"",hide:!1},a||{})}function F(){if(!b.isReady){try{f.documentElement.doScroll("left")}catch(a){setTimeout(F,1);return}b.init()}}
var t={MooTools:"$$",Prototype:"$$",jQuery:"*"},n=0,r={},x=q||"simpleCart",z={};q={};q={};var v=p.localStorage,l=p.console||{msgs:[],log:function(a){l.msgs.push(a)}},D={USD:{code:"USD",symbol:"&#36;",name:"US Dollar"},AUD:{code:"AUD",symbol:"&#36;",name:"Australian Dollar"},BRL:{code:"BRL",symbol:"R&#36;",name:"Brazilian Real"},CAD:{code:"CAD",symbol:"&#36;",name:"Canadian Dollar"},CZK:{code:"CZK",symbol:"&nbsp;&#75;&#269;",name:"Czech Koruna",after:!0},DKK:{code:"DKK",symbol:"DKK&nbsp;",name:"Danish Krone"},
EUR:{code:"EUR",symbol:"&euro;",name:"Euro"},HKD:{code:"HKD",symbol:"&#36;",name:"Hong Kong Dollar"},HUF:{code:"HUF",symbol:"&#70;&#116;",name:"Hungarian Forint"},ILS:{code:"ILS",symbol:"&#8362;",name:"Israeli New Sheqel"},JPY:{code:"JPY",symbol:"&yen;",name:"Japanese Yen",accuracy:0},MXN:{code:"MXN",symbol:"&#36;",name:"Mexican Peso"},NOK:{code:"NOK",symbol:"NOK&nbsp;",name:"Norwegian Krone"},NZD:{code:"NZD",symbol:"&#36;",name:"New Zealand Dollar"},PLN:{code:"PLN",symbol:"PLN&nbsp;",name:"Polish Zloty"},
GBP:{code:"GBP",symbol:"&pound;",name:"Pound Sterling"},SGD:{code:"SGD",symbol:"&#36;",name:"Singapore Dollar"},SEK:{code:"SEK",symbol:"SEK&nbsp;",name:"Swedish Krona"},CHF:{code:"CHF",symbol:"CHF&nbsp;",name:"Swiss Franc"},THB:{code:"THB",symbol:"&#3647;",name:"Thai Baht"},BTC:{code:"BTC",symbol:" BTC",name:"Bitcoin",accuracy:4,after:!0}},m={checkout:{type:"PayPal",email:"you@yours.com"},currency:"USD",language:"english-us",cartStyle:"div",cartColumns:[{attr:"name",label:"Name"},{attr:"price",label:"Price",
view:"currency"},{view:"decrement",label:!1},{attr:"quantity",label:"Qty"},{view:"increment",label:!1},{attr:"total",label:"SubTotal",view:"currency"},{view:"remove",text:"Remove",label:!1}],excludeFromCheckout:["thumb"],shippingFlatRate:0,shippingQuantityRate:0,shippingTotalRate:0,shippingCustom:null,taxRate:0,taxShipping:!1,data:{}},b=function(a){if(h(a))return b.ready(a);if(k(a,"object"))return b.extend(m,a)},A,B;b.extend=function(a,d){var c;e(d)&&(d=a,a=b);for(c in d)Object.prototype.hasOwnProperty.call(d,
c)&&(a[c]=d[c]);return a};b.extend({copy:function(a){a=C(a);a.init();return a}});b.extend({isReady:!1,add:function(a,d){var c=new b.Item(a||{}),g=!0,u=!0===d?d:!1;if(!u&&(g=b.trigger("beforeAdd",[c]),!1===g))return!1;(g=b.has(c))?(g.increment(c.quantity()),c=g):r[c.id()]=c;b.update();u||b.trigger("afterAdd",[c,e(g)]);return c},each:function(a,d){var c,g=0,u,e,w;if(h(a))e=a,w=r;else if(h(d))e=d,w=a;else return;for(c in w)if(Object.prototype.hasOwnProperty.call(w,c)){u=e.call(b,w[c],g,c);if(!1===u)break;
g+=1}},find:function(a){var d=[];if(k(r[a],"object"))return r[a];if(k(a,"object"))return b.each(function(c){var g=!0;b.each(a,function(a,b,d){k(a,s)?a.match(/<=.*/)?(a=parseFloat(a.replace("<=","")),c.get(d)&&parseFloat(c.get(d))<=a||(g=!1)):a.match(/</)?(a=parseFloat(a.replace("<","")),c.get(d)&&parseFloat(c.get(d))<a||(g=!1)):a.match(/>=/)?(a=parseFloat(a.replace(">=","")),c.get(d)&&parseFloat(c.get(d))>=a||(g=!1)):a.match(/>/)?(a=parseFloat(a.replace(">","")),c.get(d)&&parseFloat(c.get(d))>a||
(g=!1)):c.get(d)&&c.get(d)===a||(g=!1):c.get(d)&&c.get(d)===a||(g=!1);return g});g&&d.push(c)}),d;e(a)&&b.each(function(a){d.push(a)});return d},items:function(){return this.find()},has:function(a){var d=!1;b.each(function(b){b.equals(a)&&(d=b)});return d},empty:function(){var a={};b.each(function(b){!1===b.remove(!0)&&(a[b.id()]=b)});r=a;b.update()},quantity:function(){var a=0;b.each(function(b){a+=b.quantity()});return a},total:function(){var a=0;b.each(function(b){a+=b.total()});return a},grandTotal:function(){return b.total()+
b.tax()+b.shipping()},update:function(){b.save();b.trigger("update")},init:function(){b.load();b.update();b.ready()},$:function(a){return new b.ELEMENT(a)},$create:function(a){return b.$(f.createElement(a))},setupViewTool:function(){var a,d=p,c;for(c in t)if(Object.prototype.hasOwnProperty.call(t,c)&&p[c]&&(a=t[c].replace("*",c).split("."),(a=a.shift())&&(d=d[a]),"function"===typeof d)){A=d;b.extend(b.ELEMENT._,z[c]);break}},ids:function(){var a=[];b.each(function(b){a.push(b.id())});return a},save:function(){b.trigger("beforeSave");
var a={};b.each(function(d){a[d.id()]=b.extend(d.fields(),d.options())});v.setItem(x+"_items",JSON.stringify(a));b.trigger("afterSave")},load:function(){r={};var a=v.getItem(x+"_items");if(a){try{b.each(JSON.parse(a),function(a){b.add(a,!0)})}catch(d){b.error("Error Loading data: "+d)}b.trigger("load")}},ready:function(a){h(a)?b.isReady?a.call(b):b.bind("ready",a):e(a)&&!b.isReady&&(b.trigger("ready"),b.isReady=!0)},error:function(a){var d="";k(a,s)?d=a:k(a,"object")&&k(a.message,s)&&(d=a.message);
try{l.log("simpleCart(js) Error: "+d)}catch(c){}b.trigger("error",a)}});b.extend({tax:function(){var a=m.taxShipping?b.total()+b.shipping():b.total(),d=b.taxRate()*a;b.each(function(a){a.get("tax")?d+=a.get("tax"):a.get("taxRate")&&(d+=a.get("taxRate")*a.total())});return parseFloat(d)},taxRate:function(){return m.taxRate||0},shipping:function(a){if(h(a))b({shippingCustom:a});else{var d=m.shippingQuantityRate*b.quantity()+m.shippingTotalRate*b.total()+m.shippingFlatRate;h(m.shippingCustom)&&(d+=m.shippingCustom.call(b));
b.each(function(a){d+=parseFloat(a.get("shipping")||0)});return parseFloat(d)}}});B={attr:function(a,b){return a.get(b.attr)||""},currency:function(a,d){return b.toCurrency(a.get(d.attr)||0)},link:function(a,b){return"<a href='"+a.get(b.attr)+"'>"+b.text+"</a>"},decrement:function(a,b){return"<a href='javascript:;' class='"+x+"_decrement'>"+(b.text||"-")+"</a>"},increment:function(a,b){return"<a href='javascript:;' class='"+x+"_increment'>"+(b.text||"+")+"</a>"},image:function(a,b){return"<img src='"+
a.get(b.attr)+"'/>"},input:function(a,b){return"<input type='text' value='"+a.get(b.attr)+"' class='"+x+"_input'/>"},remove:function(a,b){return"<a href='javascript:;' class='"+x+"_remove'>"+(b.text||"X")+"</a>"}};b.extend({writeCart:function(a){var d=m.cartStyle.toLowerCase(),c="table"===d,g=c?"tr":"div",u=c?"th":"div",e=c?"td":"div",w=b.$create(d),d=b.$create(g).addClass("headerRow"),f,h;b.$(a).html(" ").append(w);w.append(d);c=0;for(h=m.cartColumns.length;c<h;c+=1)f=E(m.cartColumns[c]),a="item-"+
(f.attr||f.view||f.label||f.text||"cell")+" "+f.className,f=f.label||"",d.append(b.$create(u).addClass(a).html(f));b.each(function(a,d){b.createCartRow(a,d,g,e,w)});return w},createCartRow:function(a,d,c,g,u){d=b.$create(c).addClass("itemRow row-"+d+" "+(d%2?"even":"odd")).attr("id","cartItem_"+a.id());var e,f,l;u.append(d);u=0;for(c=m.cartColumns.length;u<c;u+=1)e=E(m.cartColumns[u]),f="item-"+(e.attr||(k(e.view,s)?e.view:e.label||e.text||"cell"))+" "+e.className,l=a,l=(h(e.view)?e.view:k(e.view,
s)&&h(B[e.view])?B[e.view]:B.attr).call(b,l,e),f=b.$create(g).addClass(f).html(l),d.append(f);return d}});b.Item=function(a){function d(){k(c.price,s)&&(c.price=parseFloat(c.price.replace(b.currency().decimal,".").replace(/[^0-9\.]+/ig,"")));isNaN(c.price)&&(c.price=0);0>c.price&&(c.price=0);k(c.quantity,s)&&(c.quantity=parseInt(c.quantity.replace(b.currency().delimiter,""),10));isNaN(c.quantity)&&(c.quantity=1);0>=c.quantity&&g.remove()}var c={},g=this;k(a,"object")&&b.extend(c,a);n+=1;for(c.id=
c.id||"SCI-"+n;!e(r[c.id]);)n+=1,c.id="SCI-"+n;g.get=function(a,b){var d=!b;return e(a)?a:h(c[a])?c[a].call(g):e(c[a])?h(g[a])&&d?g[a].call(g):!e(g[a])&&d?g[a]:c[a]:c[a]};g.set=function(a,b){e(a)||(c[a.toLowerCase()]=b,"price"!==a.toLowerCase()&&"quantity"!==a.toLowerCase()||d());return g};g.equals=function(a){for(var b in c)if(Object.prototype.hasOwnProperty.call(c,b)&&"quantity"!==b&&"id"!==b&&a.get(b)!==c[b])return!1;return!0};g.options=function(){var a={};b.each(c,function(d,c,e){var f=!0;b.each(g.reservedFields(),
function(a){a===e&&(f=!1);return f});f&&(a[e]=g.get(e))});return a};d()};b.Item._=b.Item.prototype={increment:function(a){a=parseInt(a||1,10);this.quantity(this.quantity()+a);return 1>this.quantity()?(this.remove(),null):this},decrement:function(a){return this.increment(-parseInt(a||1,10))},remove:function(a){if(!1===b.trigger("beforeRemove",[r[this.id()]]))return!1;delete r[this.id()];a||b.update();return null},reservedFields:function(){return"quantity id item_number price name shipping tax taxRate".split(" ")},
fields:function(){var a={},d=this;b.each(d.reservedFields(),function(b){d.get(b)&&(a[b]=d.get(b))});return a},quantity:function(a){return e(a)?parseInt(this.get("quantity",!0)||1,10):this.set("quantity",a)},price:function(a){return e(a)?parseFloat(this.get("price",!0).toString().replace(b.currency().symbol,"").replace(b.currency().delimiter,"")||1):this.set("price",parseFloat(a.toString().replace(b.currency().symbol,"").replace(b.currency().delimiter,"")))},id:function(){return this.get("id",!1)},
total:function(){return this.quantity()*this.price()}};b.extend({checkout:function(){if("custom"===m.checkout.type.toLowerCase()&&h(m.checkout.fn))m.checkout.fn.call(b,m.checkout);else if(h(b.checkout[m.checkout.type])){var a=b.checkout[m.checkout.type].call(b,m.checkout);a.data&&a.action&&a.method&&!1!==b.trigger("beforeCheckout",[a.data])&&b.generateAndSendForm(a)}else b.error("No Valid Checkout Method Specified")},extendCheckout:function(a){return b.extend(b.checkout,a)},generateAndSendForm:function(a){var d=
b.$create("form");d.attr("style","display:none;");d.attr("action",a.action);d.attr("method",a.method);b.each(a.data,function(a,g,e){d.append(b.$create("input").attr("type","hidden").attr("name",e).val(a))});b.$("body").append(d);d.el.submit();d.remove()}});b.extendCheckout({PayPal:function(a){if(!a.email)return b.error("No email provided for PayPal checkout");var d={cmd:"_cart",upload:"1",currency_code:b.currency().code,business:a.email,rm:"GET"===a.method?"0":"2",tax_cart:(1*b.tax()).toFixed(2),
handling_cart:(1*b.shipping()).toFixed(2),charset:"utf-8"},c=a.sandbox?"https://www.sandbox.paypal.com/cgi-bin/webscr":"https://www.paypal.com/cgi-bin/webscr",g="GET"===a.method?"GET":"POST";a.success&&(d["return"]=a.success);a.cancel&&(d.cancel_return=a.cancel);a.notify&&(d.notify_url=a.notify);b.each(function(a,c){var g=c+1,e=a.options(),f=0,h;d["item_name_"+g]=a.get("name");d["quantity_"+g]=a.quantity();d["amount_"+g]=(1*a.price()).toFixed(2);d["item_number_"+g]=a.get("item_number")||g;b.each(e,
function(a,c,e){10>c&&(h=!0,b.each(m.excludeFromCheckout,function(a){a===e&&(h=!1)}),h&&(f+=1,d["on"+c+"_"+g]=e,d["os"+c+"_"+g]=a))});d["option_index_"+c]=Math.min(10,f)});return{action:c,method:g,data:d}},GoogleCheckout:function(a){if(!a.merchantID)return b.error("No merchant id provided for GoogleCheckout");if("USD"!==b.currency().code&&"GBP"!==b.currency().code)return b.error("Google Checkout only accepts USD and GBP");var d={ship_method_name_1:"Shipping",ship_method_price_1:b.shipping(),ship_method_currency_1:b.currency().code,
_charset_:""},c="https://checkout.google.com/api/checkout/v2/checkoutForm/Merchant/"+a.merchantID;a="GET"===a.method?"GET":"POST";b.each(function(a,c){var e=c+1,f=[],h;d["item_name_"+e]=a.get("name");d["item_quantity_"+e]=a.quantity();d["item_price_"+e]=a.price();d["item_currency_ "+e]=b.currency().code;d["item_tax_rate"+e]=a.get("taxRate")||b.taxRate();b.each(a.options(),function(a,d,c){h=!0;b.each(m.excludeFromCheckout,function(a){a===c&&(h=!1)});h&&f.push(c+": "+a)});d["item_description_"+e]=f.join(", ")});
return{action:c,method:a,data:d}},AmazonPayments:function(a){if(!a.merchant_signature)return b.error("No merchant signature provided for Amazon Payments");if(!a.merchant_id)return b.error("No merchant id provided for Amazon Payments");if(!a.aws_access_key_id)return b.error("No AWS access key id provided for Amazon Payments");var d={aws_access_key_id:a.aws_access_key_id,merchant_signature:a.merchant_signature,currency_code:b.currency().code,tax_rate:b.taxRate(),weight_unit:a.weight_unit||"lb"},c="https://payments"+
(a.sandbox?"-sandbox":"")+".amazon.com/checkout/"+a.merchant_id,g="GET"===a.method?"GET":"POST";b.each(function(c,g){var e=g+1,f=[];d["item_title_"+e]=c.get("name");d["item_quantity_"+e]=c.quantity();d["item_price_"+e]=c.price();d["item_sku_ "+e]=c.get("sku")||c.id();d["item_merchant_id_"+e]=a.merchant_id;c.get("weight")&&(d["item_weight_"+e]=c.get("weight"));m.shippingQuantityRate&&(d["shipping_method_price_per_unit_rate_"+e]=m.shippingQuantityRate);b.each(c.options(),function(a,d,c){var g=!0;b.each(m.excludeFromCheckout,
function(a){a===c&&(g=!1)});g&&"weight"!==c&&"tax"!==c&&f.push(c+": "+a)});d["item_description_"+e]=f.join(", ")});return{action:c,method:g,data:d}},SendForm:function(a){if(!a.url)return b.error("URL required for SendForm Checkout");var d={currency:b.currency().code,shipping:b.shipping(),tax:b.tax(),taxRate:b.taxRate(),itemCount:b.find({}).length},c=a.url,g="GET"===a.method?"GET":"POST";b.each(function(a,c){var g=c+1,e=[],f;d["item_name_"+g]=a.get("name");d["item_quantity_"+g]=a.quantity();d["item_price_"+
g]=a.price();b.each(a.options(),function(a,d,c){f=!0;b.each(m.excludeFromCheckout,function(a){a===c&&(f=!1)});f&&e.push(c+": "+a)});d["item_options_"+g]=e.join(", ")});a.success&&(d["return"]=a.success);a.cancel&&(d.cancel_return=a.cancel);a.extra_data&&(d=b.extend(d,a.extra_data));return{action:c,method:g,data:d}}});q={bind:function(a,d){if(!h(d))return this;this._events||(this._events={});var c=a.split(/ +/);b.each(c,function(a){!0===this._events[a]?d.apply(this):e(this._events[a])?this._events[a]=
[d]:this._events[a].push(d)});return this},trigger:function(a,b){var c=!0,g,f;this._events||(this._events={});if(!e(this._events[a])&&h(this._events[a][0]))for(g=0,f=this._events[a].length;g<f;g+=1)c=this._events[a][g].apply(this,b||[]);return!1===c?!1:!0}};q.on=q.bind;b.extend(q);b.extend(b.Item._,q);q={beforeAdd:null,afterAdd:null,load:null,beforeSave:null,afterSave:null,update:null,ready:null,checkoutSuccess:null,checkoutFail:null,beforeCheckout:null,beforeRemove:null};b(q);b.each(q,function(a,
d,c){b.bind(c,function(){h(m[c])&&m[c].apply(this,arguments)})});b.extend({toCurrency:function(a,d){var c=parseFloat(a),g=d||{},g=b.extend(b.extend({symbol:"$",decimal:".",delimiter:",",accuracy:2,after:!1},b.currency()),g),e=c.toFixed(g.accuracy).split("."),c=e[1],e=e[0],e=b.chunk(e.reverse(),3).join(g.delimiter.reverse()).reverse();return(g.after?"":g.symbol)+e+(c?g.decimal+c:"")+(g.after?g.symbol:"")},chunk:function(a,b){"undefined"===typeof b&&(b=2);return a.match(RegExp(".{1,"+b+"}","g"))||[]}});
String.prototype.reverse=function(){return this.split("").reverse().join("")};b.extend({currency:function(a){if(k(a,s)&&!e(D[a]))m.currency=a;else if(k(a,"object"))D[a.code]=a,m.currency=a.code;else return D[m.currency]}});b.extend({bindOutlets:function(a){b.each(a,function(a,c,e){b.bind("update",function(){b.setOutlet("."+x+"_"+e,a)})})},setOutlet:function(a,d){var c=d.call(b,a);k(c,"object")&&c.el?b.$(a).html(" ").append(c):e(c)||b.$(a).html(c)},bindInputs:function(a){b.each(a,function(a){b.setInput("."+
x+"_"+a.selector,a.event,a.callback)})},setInput:function(a,d,c){b.$(a).live(d,c)}});b.ELEMENT=function(a){this.create(a);this.selector=a||null};b.extend(z,{MooTools:{text:function(a){return this.attr("text",a)},html:function(a){return this.attr("html",a)},val:function(a){return this.attr("value",a)},attr:function(a,b){if(e(b))return this.el[0]&&this.el[0].get(a);this.el.set(a,b);return this},remove:function(){this.el.dispose();return null},addClass:function(a){this.el.addClass(a);return this},removeClass:function(a){this.el.removeClass(a);
return this},append:function(a){this.el.adopt(a.el);return this},each:function(a){h(a)&&b.each(this.el,function(b,c,e){a.call(c,c,b,e)});return this},click:function(a){h(a)?this.each(function(b){b.addEvent("click",function(c){a.call(b,c)})}):e(a)&&this.el.fireEvent("click");return this},live:function(a,d){var c=this.selector;h(d)&&b.$("body").el.addEvent(a+":relay("+c+")",function(a,b){d.call(b,a)})},match:function(a){return this.el.match(a)},parent:function(){return b.$(this.el.getParent())},find:function(a){return b.$(this.el.getElements(a))},
closest:function(a){return b.$(this.el.getParent(a))},descendants:function(){return this.find("*")},tag:function(){return this.el[0].tagName},submit:function(){this.el[0].submit();return this},create:function(a){this.el=A(a)}},Prototype:{text:function(a){if(e(a))return this.el[0].innerHTML;this.each(function(b,c){$(c).update(a)});return this},html:function(a){return this.text(a)},val:function(a){return this.attr("value",a)},attr:function(a,b){if(e(b))return this.el[0].readAttribute(a);this.each(function(c,
e){$(e).writeAttribute(a,b)});return this},append:function(a){this.each(function(b,c){a.el?a.each(function(a,b){$(c).appendChild(b)}):y(a)&&$(c).appendChild(a)});return this},remove:function(){this.each(function(a,b){$(b).remove()});return this},addClass:function(a){this.each(function(b,c){$(c).addClassName(a)});return this},removeClass:function(a){this.each(function(b,c){$(c).removeClassName(a)});return this},each:function(a){h(a)&&b.each(this.el,function(b,c,e){a.call(c,c,b,e)});return this},click:function(a){h(a)?
this.each(function(b,c){$(c).observe("click",function(b){a.call(c,b)})}):e(a)&&this.each(function(a,b){$(b).fire("click")});return this},live:function(a,b){if(h(b)){var c=this.selector;f.observe(a,function(a,e){e===A(a).findElement(c)&&b.call(e,a)})}},parent:function(){return b.$(this.el.up())},find:function(a){return b.$(this.el.getElementsBySelector(a))},closest:function(a){return b.$(this.el.up(a))},descendants:function(){return b.$(this.el.descendants())},tag:function(){return this.el.tagName},
submit:function(){this.el[0].submit()},create:function(a){k(a,s)?this.el=A(a):y(a)&&(this.el=[a])}},jQuery:{passthrough:function(a,b){if(e(b))return this.el[a]();this.el[a](b);return this},text:function(a){return this.passthrough("text",a)},html:function(a){return this.passthrough("html",a)},val:function(a){return this.passthrough("val",a)},append:function(a){this.el.append(a.el||a);return this},attr:function(a,b){if(e(b))return this.el.attr(a);this.el.attr(a,b);return this},remove:function(){this.el.remove();
return this},addClass:function(a){this.el.addClass(a);return this},removeClass:function(a){this.el.removeClass(a);return this},each:function(a){return this.passthrough("each",a)},click:function(a){return this.passthrough("click",a)},live:function(a,b){A(f).delegate(this.selector,a,b);return this},parent:function(){return b.$(this.el.parent())},find:function(a){return b.$(this.el.find(a))},closest:function(a){return b.$(this.el.closest(a))},tag:function(){return this.el[0].tagName},descendants:function(){return b.$(this.el.find("*"))},
submit:function(){return this.el.submit()},create:function(a){this.el=A(a)}}});b.ELEMENT._=b.ELEMENT.prototype;b.ready(b.setupViewTool);b.ready(function(){b.bindOutlets({total:function(){return b.toCurrency(b.total())},quantity:function(){return b.quantity()},items:function(a){b.writeCart(a)},tax:function(){return b.toCurrency(b.tax())},taxRate:function(){return b.taxRate().toFixed()},shipping:function(){return b.toCurrency(b.shipping())},grandTotal:function(){return b.toCurrency(b.grandTotal())}});
b.bindInputs([{selector:"checkout",event:"click",callback:function(){b.checkout()}},{selector:"empty",event:"click",callback:function(){b.empty()}},{selector:"increment",event:"click",callback:function(){b.find(b.$(this).closest(".itemRow").attr("id").split("_")[1]).increment();b.update()}},{selector:"decrement",event:"click",callback:function(){b.find(b.$(this).closest(".itemRow").attr("id").split("_")[1]).decrement();b.update()}},{selector:"remove",event:"click",callback:function(){b.find(b.$(this).closest(".itemRow").attr("id").split("_")[1]).remove()}},
{selector:"input",event:"change",callback:function(){var a=b.$(this),d=a.parent(),c=d.attr("class").split(" ");b.each(c,function(c){c.match(/item-.+/i)&&(c=c.split("-")[1],b.find(d.closest(".itemRow").attr("id").split("_")[1]).set(c,a.val()),b.update())})}},{selector:"shelfItem .item_add",event:"click",callback:function(){var a={};b.$(this).closest("."+x+"_shelfItem").descendants().each(function(d,c){var e=b.$(c);e.attr("class")&&e.attr("class").match(/item_.+/)&&!e.attr("class").match(/item_add/)&&
b.each(e.attr("class").split(" "),function(b){var c,d;if(b.match(/item_.+/)){b=b.split("_")[1];c="";switch(e.tag().toLowerCase()){case "input":case "textarea":case "select":d=e.attr("type");if(!d||("checkbox"===d.toLowerCase()||"radio"===d.toLowerCase())&&e.attr("checked")||"text"===d.toLowerCase()||"number"===d.toLowerCase())c=e.val();break;case "img":c=e.attr("src");break;default:c=e.text()}null!==c&&""!==c&&(a[b.toLowerCase()]=a[b.toLowerCase()]?a[b.toLowerCase()]+", "+c:c)}})});b.add(a)}}])});
f.addEventListener?p.DOMContentLoaded=function(){f.removeEventListener("DOMContentLoaded",DOMContentLoaded,!1);b.init()}:f.attachEvent&&(p.DOMContentLoaded=function(){"complete"===f.readyState&&(f.detachEvent("onreadystatechange",DOMContentLoaded),b.init())});(function(){if("complete"===f.readyState)return setTimeout(b.init,1);if(f.addEventListener)f.addEventListener("DOMContentLoaded",DOMContentLoaded,!1),p.addEventListener("load",b.init,!1);else if(f.attachEvent){f.attachEvent("onreadystatechange",
DOMContentLoaded);p.attachEvent("onload",b.init);var a=!1;try{a=null===p.frameElement}catch(d){}f.documentElement.doScroll&&a&&F()}})();return b};p.simpleCart=C()})(window,document);var JSON;JSON||(JSON={});
(function(){function p(e){return 10>e?"0"+e:e}function f(f){e.lastIndex=0;return e.test(f)?'"'+f.replace(e,function(e){var f=C[e];return"string"===typeof f?f:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+f+'"'}function s(e,k){var t,n,r,p,z=h,v,l=k[e];l&&"object"===typeof l&&"function"===typeof l.toJSON&&(l=l.toJSON(e));"function"===typeof q&&(l=q.call(k,e,l));switch(typeof l){case "string":return f(l);case "number":return isFinite(l)?String(l):"null";case "boolean":case "null":return String(l);
case "object":if(!l)return"null";h+=y;v=[];if("[object Array]"===Object.prototype.toString.apply(l)){p=l.length;for(t=0;t<p;t+=1)v[t]=s(t,l)||"null";r=0===v.length?"[]":h?"[\n"+h+v.join(",\n"+h)+"\n"+z+"]":"["+v.join(",")+"]";h=z;return r}if(q&&"object"===typeof q)for(p=q.length,t=0;t<p;t+=1)"string"===typeof q[t]&&(n=q[t],(r=s(n,l))&&v.push(f(n)+(h?": ":":")+r));else for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(r=s(n,l))&&v.push(f(n)+(h?": ":":")+r);r=0===v.length?"{}":h?"{\n"+h+v.join(",\n"+
h)+"\n"+z+"}":"{"+v.join(",")+"}";h=z;return r}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+p(this.getUTCMonth()+1)+"-"+p(this.getUTCDate())+"T"+p(this.getUTCHours())+":"+p(this.getUTCMinutes())+":"+p(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var k=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
e=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,h,y,C={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},q;"function"!==typeof JSON.stringify&&(JSON.stringify=function(e,f,k){var n;y=h="";if("number"===typeof k)for(n=0;n<k;n+=1)y+=" ";else"string"===typeof k&&(y=k);if((q=f)&&"function"!==typeof f&&("object"!==typeof f||"number"!==typeof f.length))throw Error("JSON.stringify");return s("",{"":e})});
"function"!==typeof JSON.parse&&(JSON.parse=function(e,f){function h(e,k){var n,p,l=e[k];if(l&&"object"===typeof l)for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(p=h(l,n),void 0!==p?l[n]=p:delete l[n]);return f.call(e,k,l)}var n;e=String(e);k.lastIndex=0;k.test(e)&&(e=e.replace(k,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(e.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return n=eval("("+e+")"),"function"===typeof f?h({"":n},""):n;throw new SyntaxError("JSON.parse");})})();
(function(){if(!this.localStorage)if(this.globalStorage)try{this.localStorage=this.globalStorage}catch(p){}else{var f=document.createElement("div");f.style.display="none";document.getElementsByTagName("head")[0].appendChild(f);if(f.addBehavior){f.addBehavior("#default#userdata");var s=this.localStorage={length:0,setItem:function(e,h){f.load("localStorage");e=k(e);f.getAttribute(e)||this.length++;f.setAttribute(e,h);f.save("localStorage")},getItem:function(e){f.load("localStorage");e=k(e);return f.getAttribute(e)},
removeItem:function(e){f.load("localStorage");e=k(e);f.removeAttribute(e);f.save("localStorage");this.length=0},clear:function(){f.load("localStorage");for(var e=0;attr=f.XMLDocument.documentElement.attributes[e++];)f.removeAttribute(attr.name);f.save("localStorage");this.length=0},key:function(e){f.load("localStorage");return f.XMLDocument.documentElement.attributes[e]}},k=function(e){return e.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
"-")};f.load("localStorage");s.length=f.XMLDocument.documentElement.attributes.length}}})();

/*
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,i=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),n=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-i(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(n-a))<=o?r[r.length-1]=s.add(e):r.push(e),n=a}),r},n=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=n(e);if(o.remove){var i=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(i)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.0",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=i,r._parseOptions=n,r._apply=function(e,o){var s=n(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),i=e.css("display");"inline-block"!==i&&"flex"!==i&&"inline-flex"!==i&&(i="block");var a={
display:i};a[s.property]="",e.css(a),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=i(e.css("border-top-width"))+i(e.css("border-bottom-width")),o+=i(e.css("padding-top"))+i(e.css("padding-bottom"))),e.css(s.property,n-o+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),i=o.attr("data-mh")||o.attr("data-match-height");i in e?e[i]=e[i].add(o):e[i]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(i,a){if(a&&"resize"===a.type){var n=t(window).width();if(n===e)return;e=n;
}i?-1===o&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})});

$(window).load(function() {
    $('.owl-carousel').owlCarousel({
    items:3,
 autoplay:true,
    autoplayTimeout:5000,
    stagePadding:0,
      nav:true,
      loop:true,
      margin:10,
      navText:["", ""],
      responsiveClass: true,
                responsive: {
                  0: {
                    items: 1
                  },
                  768: {
                    items: 2 
                  },
                  1000: {
                    items: 3,
                    loop: true
                  }
                }
});
    });

$(document).ready(function () {
        simpleCart({
            cartColumns: [{
                view: 'image'
                , attr: 'thumb'
                , label: false
            }, {
                attr: "name"
                , label: false
            }, {
                attr: "price"
                , label: false
                , view: 'currency'
            }, {
                view: "decrement"
                , label: false
                , text: "<i class='fa fa-minus-square-o'></i>"
            }, {
                attr: "quantity"
                , label: false
            }, {
                view: "increment"
                , label: false
                , text: "<i class='fa fa-plus-square-o'></i>"
            }, {
                attr: "total"
                , label: false
                , view: 'currency'
            }, {
                view: "remove"
                , text: "<i class='fa fa-window-close'></i>"
                , label: false
            }, ]
        });
    });

$('#search-icon').on('click',function(){$('#nav-search').slideToggle(250)});var $navFormValue=$('.mega-menu-full #s').val();$('.mega-menu-full #s').blur(function(){if(this.value.length===0){this.value=$navFormValue}});$('.mega-menu-full #s').focus(function(){if(this.value===$navFormValue){this.value=''}});$(document).ready(function(){$(".sora_product_price_remove .sora_product_label_remove").each(function(){var e=$(this).text();if(e.substr(0,10).match("price")){e=e.replace("price_","");$(this).html('<div class="sora_product_item_price item_price"><span class="sora-product-price-text">السعر:   </span><span class="sora_product_price">'+e+"</span></div>")}
$(".sora_product_item_price").parent(".sora_product_label_remove").replaceWith(function(){return $(this).contents()});$(".sora_product_price_remove").replaceWith(function(){return $(this).contents()})});$(".widget.Label span.label-size").each(function(){var e=$(this).text();if(e.substr(0,10).match("price")){e=e.replace("price_","");$(this).find('a').html('<span class="sora_product_tag_remove">'+e+"</span>");$(".sora_product_tag_remove").parent('a').parent("span.label-size").remove()}});$(".widget.Label a").each(function(){var e=$(this).text();if(e.substr(0,10).match("price")){e=e.replace("price_","");$(this).html('<span class="sora_product_tag_remove">'+e+"</span>");$(".sora_product_tag_remove").parent("a").parent('li').remove()}});$(".sora_product_label_remove").remove()});$(document).ready(function(){$(".sora_product_dis_remove .sora_product_dis_label_remove").each(function(){var e=$(this).text();if(e.substr(0,10).match("off")){e=e.replace("off@","");$(this).html('<div class="sora_product_item_dis"><span class="sora_product_dis">'+e+"</span></div>")}
$(".sora_product_item_dis").parent(".sora_product_dis_label_remove").replaceWith(function(){return $(this).contents()});$(".sora_product_dis_remove").replaceWith(function(){return $(this).contents()})});$(".widget.Label span.label-size").each(function(){var e=$(this).text();if(e.substr(0,10).match("off")){e=e.replace("off@","");$(this).find('a').html('<span class="sora_product_dis_tag_remove">'+e+"</span>");$(".sora_product_dis_tag_remove").parent('a').parent("span.label-size").remove()}});$(".widget.Label a").each(function(){var e=$(this).text();if(e.substr(0,10).match("off")){e=e.replace("off@","");$(this).html('<span class="sora_product_dis_tag_remove">'+e+"</span>");$(".sora_product_dis_tag_remove").parent("a").parent('li').remove()}});$(".sora_product_dis_label_remove").remove()});$(document).ready(function(){$('.item_add').click(function(){var $this=$(this);$this.toggleClass('productad');if($this.hasClass('productad')){$this.html('<i class="fa fa-check-square"></i>صفحة المنتج');}else{$this.html('<i class="fa fa-shopping-basket"></i>أضف إلى العربه');}});})
$(function(){$('.index .post-grid-item, .archive .post-grid-item').matchHeight();$(".post-body img").parent("a").css("margin","0 auto!important");});
$('.ty-slide-show .HTML .widget-content div.latestposts').each(function() {
    var b = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/posts/default?alt=json-in-script&max-results=" + b,
        type: 'get',
        dataType: "jsonp",
        success: function(e) {
            var u = "";
            var h = '<div class="ty-slide flexslider"><ul class="slides owl-carousel">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == "alternate") {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                var g = e.feed.entry[i].title.$t;
                var s = e.feed.entry[i].category[0].term;
                var y = e.feed.entry[i].author[0].name.$t;
                var d = e.feed.entry[i].published.$t,
                    t = d.substring(0, 4),
                    w = d.substring(5, 7),
                    f = d.substring(8, 10),
                    r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                var c = e.feed.entry[i].content.$t;
                var $c = $('<div>').html(c);
                if (c.indexOf("//www.youtube.com/embed/") > -1) {
                    var p = e.feed.entry[i].media$thumbnail.url.replace('/default.jpg', '/mqdefault.jpg');
                    var k = p
                } else if (c.indexOf("<img") > -1) {
                    var q = $c.find('img:first').attr('src').replace('s72-c', 's1600');
                    var k = q
                } else {
                    var k = no_image
                }
                h += '<li><div class="ty-wow"><a class="ty-thumb-bonos" href="' + u + '"><img alt="' + g + '" src="' + k + '"/><span class="tyimg-lay"/></a><div class="ty-slide-con"><div class="ty-slide-con"><div class="ty-slide-con-tab"><h3 class="ty-bonos-entry"><a href="' + u + '">' + g + '</a></h3><a class="recent-shop" href="' + u + '"><i class="fa fa-shopping-basket"></i>تسوق الآن</a></div></div></div></div></li>'
            }
            h += '</ul></div>';
            $('.ty-slide-show .HTML .widget-content div.latestposts').each(function() {
                var text = $(this).attr("data-no");
                if (text == b) {
                    $(this).parent().html(h)
                }
            })
        }
    })
});
$('.ty-slide-show .HTML .widget-content div.tagpost').each(function() {
    var v = $(this).attr("data-label"),
        b = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=" + b,
        type: 'get',
        dataType: "jsonp",
        success: function(e) {
            var u = "";
            var h = '<div class="ty-slide flexslider"><ul class="slides owl-carousel">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == "alternate") {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                var g = e.feed.entry[i].title.$t;
                var s = e.feed.entry[i].category[0].term;
                var y = e.feed.entry[i].author[0].name.$t;
                var d = e.feed.entry[i].published.$t,
                    t = d.substring(0, 4),
                    w = d.substring(5, 7),
                    f = d.substring(8, 10),
                    r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                var c = e.feed.entry[i].content.$t;
                var $c = $('<div>').html(c);
                if (c.indexOf("//www.youtube.com/embed/") > -1) {
                    var p = e.feed.entry[i].media$thumbnail.url.replace('/default.jpg', '/mqdefault.jpg');
                    var k = p
                } else if (c.indexOf("<img") > -1) {
                    var q = $c.find('img:first').attr('src').replace('s72-c', 's1600');
                    var k = q
                } else {
                    var k = no_image
                }
                h += '<li><div class="ty-wow"><a class="ty-thumb-bonos" href="' + u + '"><img alt="' + g + '" src="' + k + '"/><span class="tyimg-lay"/></a><div class="ty-slide-con"><div class="ty-slide-con"><div class="ty-slide-con-tab"><h3 class="ty-bonos-entry"><a href="' + u + '">' + g + '</a></h3><a class="recent-shop" href="' + u + '"><i class="fa fa-shopping-basket"></i>تسوق الآن</a></div></div></div></div></li>'
            }
            h += '</ul></div>';
            $(".ty-slide-show .HTML .widget-content div.tagpost").each(function() {
                var text = $(this).attr("data-label");
                if (text == v) {
                    $(this).parent().html(h)
                }
            })
        }
    })
});
$('.ready-widget .HTML .widget-content span.labelpost').each(function() {
    var v = $(this).attr("data-label"),
        b = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/posts/default/-/" + v + "?alt=json-in-script&max-results=" + b,
        type: 'get',
        dataType: "jsonp",
        success: function(e) {
            var u = "";
            var h = '<ul class="custom-widget">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == "alternate") {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                var g = e.feed.entry[i].title.$t;
                var s = e.feed.entry[i].category[0].term;
                var y = e.feed.entry[i].author[0].name.$t;
                var d = e.feed.entry[i].published.$t,
                    t = d.substring(0, 4),
                    w = d.substring(5, 7),
                    f = d.substring(8, 10),
                    r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + t;
                var c = e.feed.entry[i].content.$t;
                var $c = $('<div>').html(c);
                if (c.indexOf("//www.youtube.com/embed/") > -1) {
                    var p = e.feed.entry[i].media$thumbnail.url.replace('/default.jpg', '/mqdefault.jpg');
                    var k = p
                } else if (c.indexOf("<img") > -1) {
                    var q = $c.find('img:first').attr('src').replace('s72-c', 's1600');
                    var k = q
                } else {
                    var k = no_image
                }
                h += '<li><div class="feat-pro-thumb"><a class="rcthumb" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a></div><div class="post-panel"><h3 class="rcp-title"><a href="' + u + '">' + g + '</a></h3><a class="feat-read" href="' + u + '"><i class="fa fa-shopping-basket"></i>تسوق الآن</a></div></li>'
            }
            h += '</ul>';
            $(".ready-widget .HTML .widget-content span.labelpost").each(function() {
                var text = $(this).attr("data-label");
                if (text == v) {
                    $(this).parent().html(h)
                }
            })
        }
    })
});
$('.ready-widget .HTML .widget-content span.randomposts').each(function() {
    var b = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/posts/default?alt=json-in-script",
        type: 'get',
        dataType: "jsonp",
        success: function(t) {
            t = t.feed.entry.length - 3, t = Math.floor(Math.random() * (t - 0 + 1)) + 0, 0 == t && (t = Math.floor(Math.random() * (t - 0 + 1)) + 1), t == 0 && (t == 1), $.ajax({
                url: "/feeds/posts/default?alt=json-in-script&start-index=" + t + "&max-results=" + b,
                type: 'get',
                dataType: "jsonp",
                success: function(data) {
                    var url = "";
                    var randomcode = '<ul class="custom-widget">';
                    for (var i = 0; i < data.feed.entry.length; i++) {
                        for (var j = 0; j < data.feed.entry[i].link.length; j++) {
                            if (data.feed.entry[i].link[j].rel == "alternate") {
                                url = data.feed.entry[i].link[j].href;
                                break
                            }
                        }
                        var title = data.feed.entry[i].title.$t;
                        var get_date = data.feed.entry[i].published.$t,
                            year = get_date.substring(0, 4),
                            month = get_date.substring(5, 7),
                            day = get_date.substring(8, 10),
                            date = month_format[parseInt(month, 10)] + ' ' + day + ', ' + year;
                        var content = data.feed.entry[i].content.$t;
                        var $content = $('<div>').html(content);
                        if (content.indexOf("http://www.youtube.com/embed/") > -1 || content.indexOf("https://www.youtube.com/embed/") > -1) {
                            var src2 = data.feed.entry[i].media$thumbnail.url;
                            var image = src2
                        } else if (content.indexOf("<img") > -1) {
                            var src = $content.find('img:first').attr('src');
                            var image = src
                        } else {
                            var image = no_image
                        }
                        randomcode += '<li><div class="ran-pro-thumb"><a class="rcthumb" href="' + url + '" style="background:url(' + image + ') no-repeat center center;background-size: cover"><span class="img-overlay"/></a></div><div class="post-panel"><h3 class="rcp-title"><a href="' + url + '">' + title + '</a></h3><a class="ran-read" href="' + url + '"><i class="fa fa-shopping-basket"></i>تسوق الآن</a></div></li>'
                    }
                    randomcode += '</ul><div class="clear"/>';
                    $('.ready-widget .HTML .widget-content span.randomposts').each(function() {
                        if ($(this).attr("class").match("randomposts")) {
                            $(this).html(randomcode);
                            $(this).find('.rcthumb').each(function() {
                                $(this).attr('style', function(i, src) {
                                    return src.replace('/default.jpg', '/mqdefault.jpg')
                                }).attr('style', function(i, src) {
                                    return src.replace('s72-c', 's1600')
                                })
                            })
                        }
                    })
                }
            })
        }
    })
});
$('.deep-widget .HTML .widget-content span.recentcomments').each(function() {
    var b = $(this).attr("data-no");
    $.ajax({
        url: "/feeds/comments/default?alt=json-in-script&max-results=" + b,
        type: 'get',
        dataType: "jsonp",
        success: function(e) {
            var u = "";
            var h = '<ul class="cmm-widget">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                if (i == e.feed.entry.length) break;
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == 'alternate') {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                if ("content" in e.feed.entry[i]) {
                    var c = e.feed.entry[i].content.$t
                } else if ("summary" in b_rc) {
                    var c = e.feed.entry[i].summary.$t
                } else var c = "";
                var re = /<\S[^>]*>/g;
                c = c.replace(re, "");
                if (c.length > 70) {
                    c = '' + c.substring(0, 50) + '...'
                }
                var y = e.feed.entry[i].author[0].name.$t;
                var yk = e.feed.entry[i].author[0].gd$image.src;
                if (yk.match('http://img1.blogblog.com/img/blank.gif')) {
                    var k = 'http://img1.blogblog.com/img/anon36.png'
                } else {
                    if (yk.match('http://img2.blogblog.com/img/b16-rounded.gif')) {
                        var k = 'http://img1.blogblog.com/img/anon36.png'
                    } else {
                        var k = yk
                    }
                };
                h += '<li><div class="cmm-avatar"><img class="cmm-img" src="' + k + '"/></div><a href="' + u + '">' + y + '</a><span>"' + c + '"</span></li>'
            }
            h += '</ul><div class="clear"/>';
            $('.deep-widget .HTML .widget-content span.recentcomments').each(function() {
                var text = $(this).attr("data-no");
                if (text == b) {
                    $(this).parent().html(h)
                }
            })
        }
    })
});
$(".post-home-image .post-thumb img, .sora-product-image img").attr("src", function($this, img) {
    if (img.match("hqdefault.jpg")) {
        return img.replace("/hqdefault.jpg", "/mqdefault.jpg")
    } else if (img.match("default.jpg")) {
        return img.replace("/default.jpg", "/mqdefault.jpg")
    } else if (img.match("s72-c")) {
        return img.replace("/s72-c", "/s1600")
    } else if (img.match("w72-h72-p-nu")) {
        return img.replace("/w72-h72-p-nu", "/s1600")
    } else {
        return img.replace("http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png", no_image)
    }
});
$(".PopularPosts ul li img").attr("src", function($this, img) {
    if (img.match("hqdefault.jpg")) {
        return img.replace("/hqdefault.jpg", "/mqdefault.jpg")
    } else if (img.match("default.jpg")) {
        return img.replace("/default.jpg", "/mqdefault.jpg")
    } else if (img.match("s72-c")) {
        return img.replace("/s72-c", "/s100-c")
    } else if (img.match("w72-h72-p-nu")) {
        return img.replace("/w72-h72-p-nu", "/s100-c")
    } else {
        return img.replace("http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png", no_image)
    }
});
$(".popular-product .PopularPosts ul li img").attr("src", function($this, img) {
    if (img.match("hqdefault.jpg")) {
        return img.replace("/hqdefault.jpg", "/maxresdefault.jpg")
    } else if (img.match("default.jpg")) {
        return img.replace("/default.jpg", "/maxresdefault.jpg")
    } else if (img.match("s72-c")) {
        return img.replace("/s72-c", "/s400")
    } else if (img.match("w72-h72-p-nu")) {
        return img.replace("/w72-h72-p-nu", "/s400")
    } else if (img.match("/w72-h72-p-k-no-nu")) {
        return img.replace("/w72-h72-p-k-no-nu", "/s400")
    } else {
        return img.replace("http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png", no_image)
    }
});
$(".comments .avatar-image-container img").attr("src", function($this, img) {
    if (img.match("hqdefault.jpg")) {
        return img.replace("/hqdefault.jpg", "/mqdefault.jpg")
    } else if (img.match("default.jpg")) {
        return img.replace("/default.jpg", "/mqdefault.jpg")
    } else if (img.match("s35-c")) {
        return img.replace("/s35-c", "/s100-c")
    } else if (img.match("s72-c")) {
        return img.replace("/s72-c", "/s100-c")
    } else if (img.match("w72-h72-p-nu")) {
        return img.replace("/w72-h72-p-nu", "/s100-c")
    } else {
        return img.replace("http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png", no_image)
    }
});
$(document).ready(function() {
    $(".featured-product h2, .random-product h2, .popular-product h2").wrap("<div class='custom-title'></div>");
    $('.item .post-body img:first').remove()
});
$('.popular-product .PopularPosts .widget-content ul li').each(function() {
    var $this = $(this),
        getPost = $this.find('.item-title a'),
        postURL = getPost.attr('href');
    $.ajax({
        url: postURL,
        type: "get",
        success: function(data) {
            var itemurl = this.url;
            getPost.parent().after('<div class="item-meta"><a class="pop-read" href="' + itemurl + '"><i class="fa fa-shopping-basket"></i>تسوق الآن</a></div>')
        }
    })
});
$(document)['ready'](function() {
    var _0xab12x1 = '<span style=\'color:$maincolor;\'>اشترك </span> لتصلك أقوى العروض والخصومات';
    var _0xab12x2 = 'اشترك فى نشرة أخبار المتجر لتحصل على أخر أخبار وخصومات وعروض المنتجات';
    $('.email-folower h2')['remove']();
    var _0xab12x3 = $('.FollowByEmail .widget-content');
    if (_0xab12x3['length']) {
        _0xab12x3['prepend']('<div class=\'email-letter-text\'><h3 class=\'subhead\'>' + _0xab12x1 + '</h3><p class=\'subtext\'>' + _0xab12x2 + '</p></div>')
    }
});
$('#related-posts')['each'](function() {
    var _0xab12x4 = $(this)['html']();
    $['ajax']({
        url: '/feeds/posts/default/-/' + ا_0xab12x4 + '?alt=json-in-script&max-results=' + related_number,
        type: 'get',
        dataType: 'jsonp',
        success: function(_0xab12x5) {
            var _0xab12x6 = '';
            var _0xab12x7 = '<div class="related">';
            for (var _0xab12x8 = 0; _0xab12x8 < _0xab12x5['feed']['entry']['length']; _0xab12x8++) {
                for (var _0xab12x9 = 0; _0xab12x9 < _0xab12x5['feed']['entry'][_0xab12x8]['link']['length']; _0xab12x9++) {
                    if (_0xab12x5['feed']['entry'][_0xab12x8]['link'][_0xab12x9]['rel'] == 'alternate') {
                        _0xab12x6 = _0xab12x5['feed']['entry'][_0xab12x8]['link'][_0xab12x9]['href'];
                        break
                    }
                };
                var _0xab12xa = _0xab12x5['feed']['entry'][_0xab12x8]['title']['$t'];
                var _0xab12xb = _0xab12x5['feed']['entry'][_0xab12x8]['category'][0]['term'];
                var _0xab12xc = _0xab12x5['feed']['entry'][_0xab12x8]['published']['$t'],
                    _0xab12xd = _0xab12xc['substring'](0, 4),
                    _0xab12xe = _0xab12xc['substring'](5, 7),
                    _0xab12xf = _0xab12xc['substring'](8, 10),
                    _0xab12x10 = month_format[parseInt(_0xab12xe, 10)] + ' ' + _0xab12xf + ', ' + _0xab12xd;
                var _0xab12x11 = _0xab12x5['feed']['entry'][_0xab12x8]['content']['$t'];
                var _0xab12x12 = $('<div>')['html'](_0xab12x11);
                if (_0xab12x11['indexOf']('http://www.youtube.com/embed/') > -1 || _0xab12x11['indexOf']('https://www.youtube.com/embed/') > -1) {
                    var _0xab12x13 = _0xab12x5['feed']['entry'][_0xab12x8]['media$thumbnail']['url'];
                    var _0xab12x14 = '<a class="related-img" href="' + _0xab12x6 + '" style="background:url(' + _0xab12x13 + ') no-repeat center center;background-size: cover"/>'
                } else {
                    if (_0xab12x11['indexOf']('<img') > -1) {
                        var _0xab12x15 = _0xab12x12['find']('img:first')['attr']('src');
                        var _0xab12x14 = '<a class="related-img" href="' + _0xab12x6 + '" style="background:url(' + _0xab12x15 + ') no-repeat center center;background-size: cover"><span class="related-overlay"></span></a>'
                    } else {
                        var _0xab12x14 = '<a class="related-img" href="' + _0xab12x6 + '" style="background:url(' + no_image + ') no-repeat center center;background-size: cover"><span class="related-overlay"></span></a>'
                    }
                };
                _0xab12x7 += '<li><span class="related-tag">' + _0xab12xb + '</span><div class="related-thumb">' + _0xab12x14 + '</div><div class="related-content"><h3 class="related-title"><a href="' + _0xab12x6 + '">' + _0xab12xa + '</a></h3><a class="rel-read" href="' + _0xab12x6 + '"><i class="fa fa-shopping-basket"></i>تسوق الآن</a></div></li>'
            };
            _0xab12x7 += '</div><div class="clear"/>';
            $('#related-posts')['html'](_0xab12x7);
            $('.related-img')['each'](function() {
                $(this)['attr']('style', function(_0xab12x8, _0xab12x15) {
                    return _0xab12x15['replace']('/default.jpg', '/mqdefault.jpg')
                })['attr']('style', function(_0xab12x8, _0xab12x15) {
                    return _0xab12x15['replace']('s72-c', 's1600')
                })
            })
        }
    })
});
$(document)['ready'](function() {
    if ($('#egymoon')['attr']('href') != 'http://www.egymoon.com') {
        window['location']['href'] = 'http://www.egymoon.com'
    };
    if ($('#egymoon')['html']() != 'ايجى مون') {
        window['location']['href'] = 'http://www.egymoon.com'
    };
    if ($('#egymoon')['css']('display') == 'none') {
        window['location']['href'] = 'http://www.egymoon.com'
    };
    if ($('#egymoon')['css']('visibility') != 'visible') {
        window['location']['href'] = 'http://www.egymoon.com'
    }
})
  //]]>
</script>
