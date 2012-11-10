if (app.documents.length > 0) 

{ 
var doc = app.activeDocument;
var x;
var y;
var t; 
app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM; 
var count = doc.layers.length; 
var out_txt=""; 

for ( var i = 0; i < count; ++i)
{ 
doc.activeLayer = doc.layers[i]; 
doc.layers[i].hasSelectedArtwork = true; 
}


for ( var i = 0; i < count; ++i)
{
x = doc.selection[i].position[0]; 
y = doc.selection[i].position[1]*(-1); 
// Layer name, X, Y, layer number
out_txt += doc.layers[i].name + ";;;;x=" + x.toFixed(0) + ";;;;y=" + y.toFixed(0) + ";;;;" + i +"\n"; 
} 

t = doc.layers[0].textFrames.add();
        t.contents = out_txt;
 
} 