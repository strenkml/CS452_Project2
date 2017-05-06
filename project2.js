var gl;
var myShaderProgram;
var Mvector;
var alpha, beta;
var transX;
var chairImage, deskImage, laptopImage;
	
function init() {
    var canvas=document.getElementById("gl-canvas");
	
	chairImage = document.getElementById("chairPicture");
	deskImage = document.getElementById("deskPicture");
	laptopImage = document.getElementById("laptopPicture");
	
    gl=WebGLUtils.setupWebGL(canvas);
	
	alpha = 0; beta = 0;
	
	transX = 0;
    
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( .4, .4, .4, 1 );
    
    myShaderProgram = initShaders( gl,"vertex-shader", "fragment-shader" );
	gl.useProgram(myShaderProgram);
	
	var alpha_uniform = gl.getUniformLocation(myShaderProgram, "alpha");
	gl.uniform1f(alpha_uniform, alpha);
	
	var beta_uniform = gl.getUniformLocation(myShaderProgram, "beta");
	gl.uniform1f(beta_uniform, beta);
	
    gl.enable( gl.DEPTH_TEST );
	
	//Look at method
	var e = vec3(0, .3, -1.6); //eye
	var a = vec3(0, 0, 0); //at point
	var vup = vec3(0, 1, 0); //up vector
	var n = normalize(vec3(e[0]-a[0], e[1]-a[1], e[2]-a[2]));
	var u = normalize(cross(vup, n));
	var v = normalize(cross(n, u));
	var modelviewMatrix = [u[0], v[0], n[0], 0,
						u[1], v[1], n[1], 0,
						u[2], v[2], n[2], 0,
						-u[0]*e[0]-u[1]*e[1]-u[2]*e[2],
						-v[0]*e[0]-v[1]*e[1]-v[2]*e[2],
						-n[0]*e[0]-n[1]*e[1]-n[2]*e[2], 1];
	var modelviewMatrixLocation = gl.getUniformLocation(myShaderProgram, "M");
	gl.uniformMatrix4fv(modelviewMatrixLocation, false, modelviewMatrix);
	
	//Projection matrix	
	var left = -1; var right = 1; var top_ = 1; var bottom = -1; var near = 1; var far = 5;
	var perspectiveProjectionMatrix = [2*near/(right-left), .0, .0, .0,
										.0, 2*near/(top_-bottom), .0, .0,
										(right+left)/(right-left), (top_+bottom)/(top_-bottom), -(far+near)/(far-near), -1,
										.0, .0, -2*far*near/(far-near), .0];
	var perspectiveProjectionMatrixLocation = gl.getUniformLocation(myShaderProgram, "P_persp");
	gl.uniformMatrix4fv(perspectiveProjectionMatrixLocation, false, perspectiveProjectionMatrix);
	
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
    var vertices = [vec4( -.1+transX,  .01,  -.1-.5), //BOTTOM
                    vec4( -.1+transX, -.01,  -.1-.5), 
                    vec4(  .1+transX, -.01,  -.1-.5), 
                    vec4(  .1+transX,  .01,  -.1-.5), 
                    vec4(  .1+transX,  .01,  .1-.5), 
                    vec4( -.1+transX,  .01,  .1-.5), 
                    vec4( -.1+transX, -.01,  .1-.5), 
                    vec4(  .1+transX, -.01,  .1-.5),
					
					vec4( -.01-.09+transX,  .1+.09,  -.1-.5), //BACK
                    vec4( -.01-.09+transX, -.1+.09,  -.1-.5), 
                    vec4(  .01-.09+transX, -.1+.09,  -.1-.5), 
                    vec4(  .01-.09+transX,  .1+.09,  -.1-.5), 
                    vec4(  .01-.09+transX,  .1+.09,  .1-.5), 
                    vec4( -.01-.09+transX,  .1+.09,  .1-.5), 
                    vec4( -.01-.09+transX, -.1+.09,  .1-.5), 
                    vec4(  .01-.09+transX, -.1+.09,  .1-.5),
					           
					vec4( -.01+.09+transX,  .1-.1,  -.01-.59), //LEG1
                    vec4( -.01+.09+transX, -.1-.1,  -.01-.59), 
                    vec4(  .01+.09+transX, -.1-.1,  -.01-.59), 
                    vec4(  .01+.09+transX,  .1-.1,  -.01-.59), 
                    vec4(  .01+.09+transX,  .1-.1,  .01-.59), 
                    vec4( -.01+.09+transX,  .1-.1,  .01-.59), 
                    vec4( -.01+.09+transX, -.1-.1,  .01-.59), 
                    vec4(  .01+.09+transX, -.1-.1,  .01-.59),
					            
					vec4( -.01-.09+transX,  .1-.1,  -.01-.59), //LEG2
                    vec4( -.01-.09+transX, -.1-.1,  -.01-.59), 
                    vec4(  .01-.09+transX, -.1-.1,  -.01-.59), 
                    vec4(  .01-.09+transX,  .1-.1,  -.01-.59), 
                    vec4(  .01-.09+transX,  .1-.1,  .01-.59), 
                    vec4( -.01-.09+transX,  .1-.1,  .01-.59), 
                    vec4( -.01-.09+transX, -.1-.1,  .01-.59), 
                    vec4(  .01-.09+transX, -.1-.1,  .01-.59),
					            
					vec4( -.01+.09+transX,  .1-.1,  -.01-.41), //LEG3
                    vec4( -.01+.09+transX, -.1-.1,  -.01-.41), 
                    vec4(  .01+.09+transX, -.1-.1,  -.01-.41), 
                    vec4(  .01+.09+transX,  .1-.1,  -.01-.41), 
                    vec4(  .01+.09+transX,  .1-.1,  .01-.41), 
                    vec4( -.01+.09+transX,  .1-.1,  .01-.41), 
                    vec4( -.01+.09+transX, -.1-.1,  .01-.41), 
                    vec4(  .01+.09+transX, -.1-.1,  .01-.41), 	
					            
					vec4( -.01-.09+transX,  .1-.1,  -.01-.41), //LEG4
                    vec4( -.01-.09+transX, -.1-.1,  -.01-.41), 
                    vec4(  .01-.09+transX, -.1-.1,  -.01-.41), 
                    vec4(  .01-.09+transX,  .1-.1,  -.01-.41), 
                    vec4(  .01-.09+transX,  .1-.1,  .01-.41), 
                    vec4( -.01-.09+transX,  .1-.1,  .01-.41), 
                    vec4( -.01-.09+transX, -.1-.1,  .01-.41), 
                    vec4(  .01-.09+transX, -.1-.1,  .01-.41)];
					            
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

function transF(){
  transX += 0.1;
}

function transB(){
  transX -= 0.1;
}