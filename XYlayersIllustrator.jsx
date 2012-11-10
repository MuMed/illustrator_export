if (app.documents.length > 0) 

{ 
var doc = app.activeDocument;
var x, y, t;
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

//Create text frame in first layer on position 0,0
t = doc.layers[0].textFrames.add();
        t.contents = out_txt;
 
} 