var gl;
var myShaderProgram;
var Mvector;
var alpha, beta;
var transY, transX;
var transYLoc, transXLoc;
var chairImage, deskImage, laptopImage;
	
function init() {
    var canvas=document.getElementById("gl-canvas");
	
	chairImage = document.getElementById("chairPicture");
	deskImage = document.getElementById("deskPicture");
	laptopImage = document.getElementById("laptopPicture");
	
    gl=WebGLUtils.setupWebGL(canvas);
	
	alpha = 0; beta = 0;
    
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( .5, .5, .5, 1 );
    
    myShaderProgram = initShaders( gl,"vertex-shader", "fragment-shader" );
	gl.useProgram(myShaderProgram);
	
	var alpha_uniform = gl.getUniformLocation(myShaderProgram, "alpha");
	gl.uniform1f(alpha_uniform, alpha);
	
	var beta_uniform = gl.getUniformLocation(myShaderProgram, "beta");
	gl.uniform1f(beta_uniform, beta);
	
    gl.enable( gl.DEPTH_TEST );

    render();

}

function drawTable() {
    var vertices = [vec4( -.5,  .01,  -.2), //TOP
                    vec4( -.5, -.01,  -.2), 
                    vec4(  .5, -.01,  -.2), 
                    vec4(  .5,  .01,  -.2), 
                    vec4(  .5,  .01,  .2), 
                    vec4( -.5,  .01,  .2), 
                    vec4( -.5, -.01,  .2), 
                    vec4(  .5, -.01,  .2),
					
					vec4( -.01+.49,  .1-.1,  -.01+.19), //LEG1
                    vec4( -.01+.49, -.1-.1,  -.01+.19), 
                    vec4(  .01+.49, -.1-.1,  -.01+.19), 
                    vec4(  .01+.49,  .1-.1,  -.01+.19), 
                    vec4(  .01+.49,  .1-.1,  .01+.19), 
                    vec4( -.01+.49,  .1-.1,  .01+.19), 
                    vec4( -.01+.49, -.1-.1,  .01+.19), 
                    vec4(  .01+.49, -.1-.1,  .01+.19),
					
					vec4( -.01-.49,  .1-.1,  -.01-.19), //LEG2
                    vec4( -.01-.49, -.1-.1,  -.01-.19), 
                    vec4(  .01-.49, -.1-.1,  -.01-.19), 
                    vec4(  .01-.49,  .1-.1,  -.01-.19), 
                    vec4(  .01-.49,  .1-.1,  .01-.19), 
                    vec4( -.01-.49,  .1-.1,  .01-.19), 
                    vec4( -.01-.49, -.1-.1,  .01-.19), 
                    vec4(  .01-.49, -.1-.1,  .01-.19),
					
					vec4( -.01+.49,  .1-.1,  -.01-.19), //LEG3
                    vec4( -.01+.49, -.1-.1,  -.01-.19), 
                    vec4(  .01+.49, -.1-.1,  -.01-.19), 
                    vec4(  .01+.49,  .1-.1,  -.01-.19), 
                    vec4(  .01+.49,  .1-.1,  .01-.19), 
                    vec4( -.01+.49,  .1-.1,  .01-.19), 
                    vec4( -.01+.49, -.1-.1,  .01-.19), 
                    vec4(  .01+.49, -.1-.1,  .01-.19),
					
					vec4( -.01-.49,  .1-.1,  -.01+.19), //LEG4
                    vec4( -.01-.49, -.1-.1,  -.01+.19), 
                    vec4(  .01-.49, -.1-.1,  -.01+.19), 
                    vec4(  .01-.49,  .1-.1,  -.01+.19), 
                    vec4(  .01-.49,  .1-.1,  .01+.19), 
                    vec4( -.01-.49,  .1-.1,  .01+.19), 
                    vec4( -.01-.49, -.1-.1,  .01+.19), 
                    vec4(  .01-.49, -.1-.1,  .01+.19)];

    /* var vertexColors = [vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1),
						vec4( 1, 1, 1, 1)]; */

	var textureCoordinates = [vec2(0.0, 0.0),//top
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//leg1
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//leg2
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//leg3
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//leg4
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0)];
						
						
    var indexList = [0, 1, 3,
                     1, 2, 3,
                     6, 5, 7,
                     4, 7, 5,
                     0, 6, 1,
                     5, 6, 0,
                     2, 4, 3,
                     2, 7, 4,
                     0, 4, 5,
                     0, 3, 4,
                     2, 1, 6,
                     2, 6, 7,
					 
					 0+8, 1+8, 3+8,
                     1+8, 2+8, 3+8,
                     6+8, 5+8, 7+8,
                     4+8, 7+8, 5+8,
                     0+8, 6+8, 1+8,
                     5+8, 6+8, 0+8,
                     2+8, 4+8, 3+8,
                     2+8, 7+8, 4+8,
                     0+8, 4+8, 5+8,
                     0+8, 3+8, 4+8,
                     2+8, 1+8, 6+8,
                     2+8, 6+8, 7+8,
					 
					 0+16, 1+16, 3+16,
                     1+16, 2+16, 3+16,
                     6+16, 5+16, 7+16,
                     4+16, 7+16, 5+16,
                     0+16, 6+16, 1+16,
                     5+16, 6+16, 0+16,
                     2+16, 4+16, 3+16,
                     2+16, 7+16, 4+16,
                     0+16, 4+16, 5+16,
                     0+16, 3+16, 4+16,
                     2+16, 1+16, 6+16,
                     2+16, 6+16, 7+16,
					 
					 0+24, 1+24, 3+24,
                     1+24, 2+24, 3+24,
                     6+24, 5+24, 7+24,
                     4+24, 7+24, 5+24,
                     0+24, 6+24, 1+24,
                     5+24, 6+24, 0+24,
                     2+24, 4+24, 3+24,
                     2+24, 7+24, 4+24,
                     0+24, 4+24, 5+24,
                     0+24, 3+24, 4+24,
                     2+24, 1+24, 6+24,
                     2+24, 6+24, 7+24,
					 
					 0+32, 1+32, 3+32,
                     1+32, 2+32, 3+32,
                     6+32, 5+32, 7+32,
                     4+32, 7+32, 5+32,
                     0+32, 6+32, 1+32,
                     5+32, 6+32, 0+32,
                     2+32, 4+32, 3+32,
                     2+32, 7+32, 4+32,
                     0+32, 4+32, 5+32,
                     0+32, 3+32, 4+32,
                     2+32, 1+32, 6+32,
                     2+32, 6+32, 7+32];
    
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), gl.STATIC_DRAW);
	
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
	gl.vertexAttribPointer(myPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(myPosition);
	
	/* var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
	
	var myColor = gl.getAttribLocation(myShaderProgram, "myColor");
	gl.vertexAttribPointer(myColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(myColor); */
	
	var textureBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoordinates), gl.STATIC_DRAW);

	var texturePosition = gl.getAttribLocation(myShaderProgram, "textureCoordinate");
	gl.vertexAttribPointer(texturePosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(texturePosition);

	textureImage = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, deskImage);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	
	gl.drawElements(gl.TRIANGLES, 180, gl.UNSIGNED_BYTE, 0);
}

function drawChair() {
    var vertices = [vec4( -.1,  .01,  -.1-.5), //BOTTOM
                    vec4( -.1, -.01,  -.1-.5), 
                    vec4(  .1, -.01,  -.1-.5), 
                    vec4(  .1,  .01,  -.1-.5), 
                    vec4(  .1,  .01,  .1-.5), 
                    vec4( -.1,  .01,  .1-.5), 
                    vec4( -.1, -.01,  .1-.5), 
                    vec4(  .1, -.01,  .1-.5),
					
					vec4( -.01-.09,  .1+.09,  -.1-.5), //BACK
                    vec4( -.01-.09, -.1+.09,  -.1-.5), 
                    vec4(  .01-.09, -.1+.09,  -.1-.5), 
                    vec4(  .01-.09,  .1+.09,  -.1-.5), 
                    vec4(  .01-.09,  .1+.09,  .1-.5), 
                    vec4( -.01-.09,  .1+.09,  .1-.5), 
                    vec4( -.01-.09, -.1+.09,  .1-.5), 
                    vec4(  .01-.09, -.1+.09,  .1-.5),
					
					vec4( -.01+.09,  .1-.1,  -.01-.59), //LEG1
                    vec4( -.01+.09, -.1-.1,  -.01-.59), 
                    vec4(  .01+.09, -.1-.1,  -.01-.59), 
                    vec4(  .01+.09,  .1-.1,  -.01-.59), 
                    vec4(  .01+.09,  .1-.1,  .01-.59), 
                    vec4( -.01+.09,  .1-.1,  .01-.59), 
                    vec4( -.01+.09, -.1-.1,  .01-.59), 
                    vec4(  .01+.09, -.1-.1,  .01-.59),
					
					vec4( -.01-.09,  .1-.1,  -.01-.59), //LEG2
                    vec4( -.01-.09, -.1-.1,  -.01-.59), 
                    vec4(  .01-.09, -.1-.1,  -.01-.59), 
                    vec4(  .01-.09,  .1-.1,  -.01-.59), 
                    vec4(  .01-.09,  .1-.1,  .01-.59), 
                    vec4( -.01-.09,  .1-.1,  .01-.59), 
                    vec4( -.01-.09, -.1-.1,  .01-.59), 
                    vec4(  .01-.09, -.1-.1,  .01-.59),
					
					vec4( -.01+.09,  .1-.1,  -.01-.41), //LEG3
                    vec4( -.01+.09, -.1-.1,  -.01-.41), 
                    vec4(  .01+.09, -.1-.1,  -.01-.41), 
                    vec4(  .01+.09,  .1-.1,  -.01-.41), 
                    vec4(  .01+.09,  .1-.1,  .01-.41), 
                    vec4( -.01+.09,  .1-.1,  .01-.41), 
                    vec4( -.01+.09, -.1-.1,  .01-.41), 
                    vec4(  .01+.09, -.1-.1,  .01-.41), 	
					
					vec4( -.01-.09,  .1-.1,  -.01-.41), //LEG4
                    vec4( -.01-.09, -.1-.1,  -.01-.41), 
                    vec4(  .01-.09, -.1-.1,  -.01-.41), 
                    vec4(  .01-.09,  .1-.1,  -.01-.41), 
                    vec4(  .01-.09,  .1-.1,  .01-.41), 
                    vec4( -.01-.09,  .1-.1,  .01-.41), 
                    vec4( -.01-.09, -.1-.1,  .01-.41), 
                    vec4(  .01-.09, -.1-.1,  .01-.41)];
					
	var textureCoordinates = [vec2(0.0, 0.0),//bottom
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//back
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//leg1
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//leg2
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//leg3
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//leg4
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0)];

    /*var vertexColors = [vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
					
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1)];*/

    var indexList = [
					0, 1, 3,
                     1, 2, 3,
                     6, 5, 7,
                     4, 7, 5,
                     0, 6, 1,
                     5, 6, 0,
                     2, 4, 3,
                     2, 7, 4,
                     0, 4, 5,
                     0, 3, 4,
                     2, 1, 6,
                     2, 6, 7,
					 
					 0+8, 1+8, 3+8,
                     1+8, 2+8, 3+8,
                     6+8, 5+8, 7+8,
                     4+8, 7+8, 5+8,
                     0+8, 6+8, 1+8,
                     5+8, 6+8, 0+8,
                     2+8, 4+8, 3+8,
                     2+8, 7+8, 4+8,
                     0+8, 4+8, 5+8,
                     0+8, 3+8, 4+8,
                     2+8, 1+8, 6+8,
                     2+8, 6+8, 7+8,
					 
					 0+16, 1+16, 3+16,
                     1+16, 2+16, 3+16,
                     6+16, 5+16, 7+16,
                     4+16, 7+16, 5+16,
                     0+16, 6+16, 1+16,
                     5+16, 6+16, 0+16,
                     2+16, 4+16, 3+16,
                     2+16, 7+16, 4+16,
                     0+16, 4+16, 5+16,
                     0+16, 3+16, 4+16,
                     2+16, 1+16, 6+16,
                     2+16, 6+16, 7+16,
					 
					 0+24, 1+24, 3+24,
                     1+24, 2+24, 3+24,
                     6+24, 5+24, 7+24,
                     4+24, 7+24, 5+24,
                     0+24, 6+24, 1+24,
                     5+24, 6+24, 0+24,
                     2+24, 4+24, 3+24,
                     2+24, 7+24, 4+24,
                     0+24, 4+24, 5+24,
                     0+24, 3+24, 4+24,
                     2+24, 1+24, 6+24,
                     2+24, 6+24, 7+24,
					 
					 0+32, 1+32, 3+32,
                     1+32, 2+32, 3+32,
                     6+32, 5+32, 7+32,
                     4+32, 7+32, 5+32,
                     0+32, 6+32, 1+32,
                     5+32, 6+32, 0+32,
                     2+32, 4+32, 3+32,
                     2+32, 7+32, 4+32,
                     0+32, 4+32, 5+32,
                     0+32, 3+32, 4+32,
                     2+32, 1+32, 6+32,
                     2+32, 6+32, 7+32,
					 
					 0+40, 1+40, 3+40,
                     1+40, 2+40, 3+40,
                     6+40, 5+40, 7+40,
                     4+40, 7+40, 5+40,
                     0+40, 6+40, 1+40,
                     5+40, 6+40, 0+40,
                     2+40, 4+40, 3+40,
                     2+40, 7+40, 4+40,
                     0+40, 4+40, 5+40,
                     0+40, 3+40, 4+40,
                     2+40, 1+40, 6+40,
                     2+40, 6+40, 7+40];
	
    
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), gl.STATIC_DRAW);
	
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
	gl.vertexAttribPointer(myPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(myPosition);
	
	/* var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
	
	var myColor = gl.getAttribLocation(myShaderProgram, "myColor");
	gl.vertexAttribPointer(myColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(myColor); */
	
	var textureBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoordinates), gl.STATIC_DRAW);

	var texturePosition = gl.getAttribLocation(myShaderProgram, "textureCoordinate");
	gl.vertexAttribPointer(texturePosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(texturePosition);

	textureImage = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, chairImage);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

	gl.drawElements(gl.TRIANGLES, 216, gl.UNSIGNED_BYTE, 0);

	transX = 0;
	transXLoc = gl.getUniformLocation(myShaderProgram, "transX");
	gl.uniform1f(transXLoc, transX);

	transY = 0;
	transYLoc = gl.getUniformLocation(myShaderProgram, "transY");
	gl.uniform1f(transYLoc, transY);
}

function drawLaptop() {
    var vertices = [vec4( -.05,  .01+.02,  -.05), //BOTTOM
                    vec4( -.05, -.01+.02,  -.05), 
                    vec4(  .05, -.01+.02,  -.05), 
                    vec4(  .05,  .01+.02,  -.05), 
                    vec4(  .05,  .01+.02,  .05), 
                    vec4( -.05,  .01+.02,  .05), 
                    vec4( -.05, -.01+.02,  .05), 
                    vec4(  .05, -.01+.02,  .05),
					
					vec4( -.05,  .05+.06,  -.01+.04), //TOP
                    vec4( -.05, -.05+.06,  -.01+.04), 
                    vec4(  .05, -.05+.06,  -.01+.04), 
                    vec4(  .05,  .05+.06,  -.01+.04), 
                    vec4(  .05,  .05+.06,  .01+.04), 
                    vec4( -.05,  .05+.06,  .01+.04), 
                    vec4( -.05, -.05+.06,  .01+.04), 
                    vec4(  .05, -.05+.06,  .01+.04)];
					
    /* var vertexColors = [
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1),
						vec4( 0, 0, 0, 1)
						]; */
	
	var textureCoordinates = [vec2(0.0, 0.0),//bottom
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  
							  vec2(0.0, 0.0),//top
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0),
							  vec2(0.0, 0.0),
							  vec2(0.0, 1.0),
							  vec2(1.0, 0.0),
							  vec2(1.0, 1.0)];
	
    var indexList = [
					0, 1, 3,
                     1, 2, 3,
                     6, 5, 7,
                     4, 7, 5,
                     0, 6, 1,
                     5, 6, 0,
                     2, 4, 3,
                     2, 7, 4,
                     0, 4, 5,
                     0, 3, 4,
                     2, 1, 6,
                     2, 6, 7,
					 
					 0+8, 1+8, 3+8,
                     1+8, 2+8, 3+8,
                     6+8, 5+8, 7+8,
                     4+8, 7+8, 5+8,
                     0+8, 6+8, 1+8,
                     5+8, 6+8, 0+8,
                     2+8, 4+8, 3+8,
                     2+8, 7+8, 4+8,
                     0+8, 4+8, 5+8,
                     0+8, 3+8, 4+8,
                     2+8, 1+8, 6+8,
                     2+8, 6+8, 7+8];
    
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), gl.STATIC_DRAW);
	
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
	gl.vertexAttribPointer(myPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(myPosition);
	
	/* var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
	
	var myColor = gl.getAttribLocation(myShaderProgram, "myColor");
	gl.vertexAttribPointer(myColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(myColor); */
	
	var textureBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoordinates), gl.STATIC_DRAW);

	var texturePosition = gl.getAttribLocation(myShaderProgram, "textureCoordinate");
	gl.vertexAttribPointer(texturePosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(texturePosition);

	textureImage = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, laptopImage);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	
	
	gl.drawElements(gl.TRIANGLES, 72, gl.UNSIGNED_BYTE, 0);
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	drawTable();
	drawChair();
	drawLaptop();
	requestAnimFrame(render);
}

function rotateAroundX() {
	alpha += 0.1;
	
	var alpha_uniform = gl.getUniformLocation(myShaderProgram, "alpha");
	gl.uniform1f(alpha_uniform, alpha);
}

function rotateAroundY() {
	beta += 0.1;
	
	var beta_uniform = gl.getUniformLocation(myShaderProgram, "beta");
	gl.uniform1f(beta_uniform, beta);
}

