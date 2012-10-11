google.maps.Marker.prototype.type="marker";google.maps.Polyline.prototype.type="polyline";google.maps.Polygon.prototype.type="polygon";google.maps.Rectangle.prototype.type="rectangle";google.maps.Circle.prototype.type="circle";
Wkt.Wkt.prototype.construct={point:function(config,component){var c=component||this.components;config=config||{};config.position=new google.maps.LatLng(c[0].y,c[0].x);return new google.maps.Marker(config)},multipoint:function(config){var i,c,arr;c=this.components;config=config||{};arr=[];for(i=0;i<c.length;i+=1)arr.push(this.construct.point(config,c[i]));return arr},linestring:function(config,component){var i,c;c=component||this.components;config=config||{editable:false};config.path=[];for(i=0;i<
c.length;i+=1)config.path.push(new google.maps.LatLng(c[i].y,c[i].x));return new google.maps.Polyline(config)},multilinestring:function(config){var i,c,arr;c=this.components;config=config||{editable:false};config.path=[];arr=[];for(i=0;i<c.length;i+=1)arr.push(this.construct.linestring(config,c[i]));return arr},polygon:function(config){var j,k,c,rings,verts;c=this.components;config=config||{editable:false};config.paths=[];rings=[];for(j=0;j<c.length;j+=1){verts=[];for(k=0;k<c[j].length;k+=1)verts.push(new google.maps.LatLng(c[j][k].y,
c[j][k].x));if(j!==0)verts.reverse();rings.push(verts)}config.paths=config.paths.concat(rings);if(this.isRectangle)console.log("Rectangles are not yet supported; set the isRectangle property to false (default).");else return new google.maps.Polygon(config)},multipolygon:function(config){var i,j,k,c,rings,verts;c=this.components;config=config||{editable:false};config.paths=[];for(i=0;i<c.length;i+=1){rings=[];for(j=0;j<c[i].length;j+=1){verts=[];for(k=0;k<c[i][j].length;k+=1)verts.push(new google.maps.LatLng(c[i][j][k].y,
c[i][j][k].x));rings.push(verts)}config.paths=config.paths.concat(rings)}return new google.maps.Polygon(config)}};
Wkt.Wkt.prototype.deconstruct=function(obj){var i,j,verts,rings,tmp;if(obj.getPosition&&typeof obj.getPosition==="function")return{type:"point",components:[{x:obj.getPosition().lng(),y:obj.getPosition().lat()}]};else if(obj.getPath&&!obj.getPaths){verts=[];for(i=0;i<obj.getPath().length;i+=1){tmp=obj.getPath().getAt(i);verts.push({x:tmp.lng(),y:tmp.lat()})}return{type:"linestring",components:verts}}else if(obj.getPaths){rings=[];for(i=0;i<obj.getPaths().length;i+=1){tmp=obj.getPaths().getAt(i);verts=
[];for(j=0;j<obj.getPaths().getAt(i).length;j+=1)verts.push({x:tmp.getAt(j).lng(),y:tmp.getAt(j).lat()});verts.push({x:tmp.getAt(0).lng(),y:tmp.getAt(0).lat()});if(obj.getPaths().length>1)verts=[verts];rings.push(verts)}return{type:"polygon",components:rings}}else if(obj.getBounds&&!obj.getRadius){tmp=obj.getBounds();return{type:"polygon",isRectangle:true,components:[[{x:tmp.getSouthWest().lng(),y:tmp.getNorthEast().lat()},{x:tmp.getNorthEast().lng(),y:tmp.getNorthEast().lat()},{x:tmp.getNorthEast().lng(),
y:tmp.getSouthWest().lat()},{x:tmp.getSouthWest().lng(),y:tmp.getSouthWest().lat()},{x:tmp.getSouthWest().lng(),y:tmp.getNorthEast().lat()}]]}}else if(obj.getBounds&&obj.getRadius)console.log("Deconstruction of google.maps.Circle objects is not yet supported");else console.log("The passed object does not have any recognizable properties.")};Wkt.Wkt.prototype.isRectangle=false;
