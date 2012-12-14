if (app.documents.length > 0) 

{ 
var doc = app.activeDocument;
var x;
var y;
var t; 
var layerName = "";
var docHeight = doc.height;
app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM; 
var count = doc.layers.length; 

// PLIST header
var out_txt= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + "<!DOCTYPE plist PUBLIC \"-\//Apple Computer\//DTD PLIST 1.0\//EN\" \"http:\//www.apple.com\/DTDs\/PropertyList-1.0.dtd\">\n" + "<plist version=\"1.0\">\n<dict>\n\t<key>frames</key>\n\t<dict>\n"; 

for ( var i = 0; i < count; ++i)
{ 
doc.activeLayer = doc.layers[i]; 
doc.layers[i].hasSelectedArtwork = true; 
}


for ( var i = 0; i < count; ++i)
{
x = doc.selection[i].position[0] + (doc.selection[i].width / 2); 
y = docHeight - (doc.selection[i].position[1]*(-1)) - (doc.selection[i].height / 2); 
w = doc.selection[i].width;
h = doc.selection[i].height;

//Delete symbol # as layer prefix
layerName = doc.layers[i].name;
layerName = layerName.replace("#","");


/////// Old deleting of symbol #
/*if (doc.layers[i].name.substring(0,1) == "#")
{
layerName = doc.layers[i].name.substring(1);
}*/

// output text in PLIST
out_txt += "\n" 
+ "\t\t<key>" + layerName + "_" + i + "</key>\n" 
+ "\t\t<dict>\n" 

    /////// Define TYPE as string
	var type = "";
	
	////// Button
	if ( layerName.substring(0,3) == "Btn")
	{
		type += 
		  "\t\t\t<key>Type</key>\n"
		+ "\t\t\t<string>Button</string>\n"
	}
	
	/////// RadioButton
	else if ( layerName.substring(0,4) == "RBtn")
	{
		type += 
		  "\t\t\t<key>Type</key>\n"
		+ "\t\t\t<string>RadioButton</string>\n"
	}
	
	/////// Selector
	else if ( layerName.substring(0,2) == "S_")
	{
		type += 
		  "\t\t\t<key>Type</key>\n"
		+ "\t\t\t<string>Selector</string>\n"
	}
	
	////// Slider
	else if ( layerName.substring(0,3) == "Sl_")
	{
		type += 
		  "\t\t\t<key>Type</key>\n"
		+ "\t\t\t<string>Slider</string>\n"
	}
	
	////// ScrollView	
	else if ( layerName.substring(0,4) == "Scrl")
	{
		type += 
		  "\t\t\t<key>Type</key>\n"
		+ "\t\t\t<string>ScrollView</string>\n"
	}
	
	////// Slot
	else if ( layerName.substring(0,4) == "Slot")
	{
		type += 
		  "\t\t\t<key>Type</key>\n"
		+ "\t\t\t<string>Slot</string>\n"
	}
	
	////// Label
	else if (layerName.substring(0,2) == "L_")
	{
		type += 
		  "\t\t\t<key>Type</key>\n"
		+ "\t\t\t<string>Label</string>\n"
	}
	
	////// Picture as default
	else
	{
	type += "\t\t\t<key>Type</key>\n"
	+ "\t\t\t<string>Picture</string>\n"
	}
	
	out_txt += type;
	//////////////////////// End TYPE block
	
	out_txt +=

	 "\t\t\t<key>ClipNames</key>\n"
	+ "\t\t\t<array>\n"

	///////////////// Apply Font Name
	if (layerName.substring(0,2) == "L_")
	{
	out_txt +=
	 "\t\t\t\t<string>Agent Orange</string>\n"
	}
	else
	{
	out_txt +=
	 "\t\t\t\t<string>" + layerName + ".png" +"</string>\n"
	}
	////////////////////////////////

	out_txt +=
  "\t\t\t</array>\n"
+ "\t\t\t<key>Position</key>\n"
+ "\t\t\t<string>{" + x.toFixed(0) + "," + y.toFixed(0) + "}</string>\n"
+ "\t\t\t<key>Sizes</key>\n"
+ "\t\t\t<string>{" + w.toFixed(0) + "," + h.toFixed(0) + "}</string>\n"
+ "\t\t\t<key>Scale</key>\n"
+ "\t\t\t<string>{1.0,1.0}</string>\n"
+ "\t\t\t<key>Rotation</key>\n"
+ "\t\t\t<string>0</string>\n"
+ "\t\t\t<key>zOrder</key>\n"
+ "\t\t\t<string>" + i + "</string>\n"
+ "\t\t\t<key>TransformCenter</key>\n"
+ "\t\t\t<string>{0.5,0.5}</string>\n"

	// Event and Value added
	+ "\t\t\t<key>Event</key>\n"
	+ "\t\t\t<string>functionName</string>\n"
	+ "\t\t\t<key>Value</key>\n"
	+ "\t\t\t<string>functionValue</string>\n"
	
	////// Special 
	+ "\t\t\t<key>Special</key>\n"
	+ "\t\t\t<dict>\n"
	
	////// Text Block
	if ( layerName.substring(0,2) == "L_") 
	{
	out_txt += 
	  "\t\t\t\t<key>Text</key>\n"
	+ "\t\t\t\t<string>Any Text</string>\n"
	+ "\t\t\t\t<key>TextSize</key>\n"
	+ "\t\t\t\t<string>20</string>\n"
	+ "\t\t\t\t<key>TextColor</key>\n"
	+ "\t\t\t\t<string>#000000</string>\n"
	+ "\t\t\t\t<key>TextAlignment</key>\n"
	+ "\t\t\t\t<string>Center</string>\n"
	} 	
	//////////////////////////
	
	
	//////// Scroll View Block
	
	if ( layerName.substring(0,4) == "Scrl") 
	{
	out_txt += 
	  "\t\t\t\t<key>NumWindows</key>\n"
	+ "\t\t\t\t<string>1</string>\n"
	+ "\t\t\t\t<key>Picker</key>\n"
	+ "\t\t\t\t<string>NO</string>\n"
	+ "\t\t\t\t<key>SlideSensivity</key>\n"
	+ "\t\t\t\t<string>{1.0,0.0}</string>\n"
	+ "\t\t\t\t<key>SlidePercent</key>\n"
	+ "\t\t\t\t<string>35.0</string>\n"
	+ "\t\t\t\t<key>SlideTime</key>\n"
	+ "\t\t\t\t<string>0.5</string>\n"
	} 		
	
	//////////////////////////
	
	//////// Slider Block
	
	if ( layerName.substring(0,3) == "Sl_") 
	{
		if ( h > w )
		{
			out_txt += 
			  "\t\t\t\t<key>Direction</key>\n"
			+ "\t\t\t\t<string>Vertical</string>\n"
			+ "\t\t\t\t<key>MinPos</key>\n"
			+ "\t\t\t\t<string>{" + bottomCenter + "}</string>\n"
			+ "\t\t\t\t<key>MaxPos</key>\n"
			+ "\t\t\t\t<string>{" + topCenter + "}</string>\n"
			+ "\t\t\t\t<key>StripeHeight</key>\n"
			+ "\t\t\t\t<string>{" + w +"}</string>\n"
			+ "\t\t\t\t<key>ScrollBar</key>\n"
			+ "\t\t\t\t<string>Yes</string>\n"
			+ "\t\t\t\t<key>Touchable</key>\n"
			+ "\t\t\t\t<string>NO</string>\n"
		}
		
		else
		{
			out_txt += 
			  "\t\t\t\t<key>Direction</key>\n"
			+ "\t\t\t\t<string>Horizontal</string>\n"
			+ "\t\t\t\t<key>MinPos</key>\n"
			+ "\t\t\t\t<string>{" + leftCenter + "}</string>\n"
			+ "\t\t\t\t<key>MaxPos</key>\n"
			+ "\t\t\t\t<string>{" + rightCenter + "}</string>\n"
			+ "\t\t\t\t<key>StripeHeight</key>\n"
			+ "\t\t\t\t<string>{" + h +"}</string>\n"
			+ "\t\t\t\t<key>ScrollBar</key>\n"
			+ "\t\t\t\t<string>Yes</string>\n"
			+ "\t\t\t\t<key>Touchable</key>\n"
			+ "\t\t\t\t<string>NO</string>\n"		
		}
	}

	//////////////////////////
	
	out_txt +=
	"\t\t\t</dict>\n"
	
+ "\t\t\t<key>Childs</key>\n"
+ "\t\t\t<dict>\n"
+ "\t\t\t</dict>\n"
+ "\t\t\t<key>Animation</key>\n"
+ "\t\t\t<dict>\n"
+ "\t\t\t\t<key>Moving</key>\n"
+ "\t\t\t\t<string>{0.0,0.0}</string>\n"
+ "\t\t\t\t<key>Jumping</key>\n"
+ "\t\t\t\t<string>0</string>\n"

	// Pulse Added
	+ "\t\t\t\t<key>PulseInterval</key>\n"
	+ "\t\t\t\t<string>0</string>\n"
	
+ "\t\t\t</dict>\n"
+ "\t\t</dict>\n\n"

} 

// PLIST footer
out_txt += "\t</dict>\n"

+ "\n\t<key>metadata</key>\t\n" 
+ "\t<dict>\n" 
+ "\t\t<key>atlasFileName</key>\n" 
+ "\t\t<string>" + app.activeDocument.name.match(/([^\.]+)/)[1] + ".png" + "</string>\n" 
+ "\t</dict>\n\n" 

+ "</dict>\n"
+ "</plist>";

//t = doc.layers[0].textFrames.add();
//        t.contents = out_txt;

// Use this to export PLIST file to same directory where file is located
    var mySourceFilePath = activeDocument.fullName.path + "/";
// create a reference to a file for output
    var csvFile = new File(mySourceFilePath.toString().match(/([^\.]+)/)[1] + app.activeDocument.name.match(/([^\.]+)/)[1] + ".plist");
// open the file, write the data, then close the file
csvFile.open('w');
csvFile.writeln(out_txt);
csvFile.close();		

// alert
alert("Operation Complete!" + "\n" + "Layer coordinates were successfully exported to:" + "\n" + "\n" + mySourceFilePath.toString().match(/([^\.]+)/)[1] + app.activeDocument.name.match(/([^\.]+)/)[1] + ".plist");

} 
