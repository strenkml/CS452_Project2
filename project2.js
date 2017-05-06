var gl;
var myShaderProgram;
var myShaderProgram2;
var Mvector;
var alpha, beta;
var transY, transX;
var transYLoc, transXLoc;
var chairImage, deskImage, laptopImage;
var numVertices;
var numTriangles;
var Ialoc;
var Idloc;
var Isloc;
	
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
	
	numVertices = 104;
	numTriangles = 156;
	
	myShaderProgram2 = initShaders( gl,"vertex-shader2", "fragment-shader" );
	gl.useProgram(myShaderProgram2);
    

    var e = vec3(200, 0, 100);//eye
    var a = vec3(0.0, 0.0, 0.0);//at point
    var vup = vec3(0.0, 1.0, 0.0);//up vector
    var n = normalize( vec3(e[0]-a[0], e[1]-a[1], e[2]-a[2]));
    var u = normalize(cross(vup, n));
    var v = normalize(cross(n, u));
    var modelviewMatrix = [u[0], v[0], n[0], 0.0, 
                        u[1], v[1], n[1], 0.0,
                        u[2], v[2], n[2], 0.0,
                        -u[0]*e[0]-u[1]*e[1]-u[2]*e[2],
                        -v[0]*e[0]-v[1]*e[1]-v[2]*e[2],
                        -n[0]*e[0]-n[1]*e[1]-n[2]*e[2], 1.0];
    var modelviewMatrixInverseTranspose = [u[0], v[0], n[0], e[0],
                                u[1], v[1], n[1], e[1],
                                u[2], v[2], n[2], e[2],
                                0.0, 0.0, 0.0, 1.0];
    var modelviewMatrixLocation = gl.getUniformLocation(myShaderProgram, "M");
    gl.uniformMatrix4fv(modelviewMatrixLocation, false, modelviewMatrix);
    var modelviewMatrixInverseTransposeLocation = gl.getUniformLocation(myShaderProgram, "M_inversetranspose");
    gl.uniformMatrix4fv(modelviewMatrixInverseTransposeLocation, false, modelviewMatrixInverseTranspose);

    //projection matrix
    var left = -50.0;
    var right = 50.0;
    var top = 50.0;
    var bottom = -50.0;
    var near = 50.0;
    var far = 200.0;

    var perpectiveProjectionMatrix = [2.0*near/(right-left), .0, .0, .0,
                                0, 2.0*near/(top-bottom), .0, .0,
                                (right+left)/(right-left), (top+bottom)/(top-bottom), -(far+near)/(far-near), -1.0,
                                .0, .0, -2.0*far*near/(far-near), .0];
    var perpectiveProjectionMatrixLocation = gl.getUniformLocation(myShaderProgram, "P_persp");
    gl.uniformMatrix4fv(perpectiveProjectionMatrixLocation, false, perpectiveProjectionMatrix);

    orthographicIsOn = 1;
    orthographicIsOnLocation = gl.getUniformLocation(myShaderProgram, "orthIsOn");
    gl.uniform1f(orthographicIsOnLocation, orthographicIsOn);

    var kaloc = gl.getUniformLocation(myShaderProgram, "ka");
    var kdloc = gl.getUniformLocation(myShaderProgram, "kd");
    var ksloc = gl.getUniformLocation(myShaderProgram, "ks");
    gl.uniform3f(kaloc, 0.5, 0.5, 0.5);
    gl.uniform3f(kdloc, 0.5, 0.5, 0.5);
    gl.uniform3f(ksloc, 1.0, 1.0, 1.0);
    var alphaloc = gl.getUniformLocation(myShaderProgram, "alpha");
    gl.uniform1f(alphaloc, 4.0);

    var p0loc = gl.getUniformLocation(myShaderProgram, "p0");
    gl.uniform3f(p0loc, 0.0, 0.0, 45.0);
    Ialoc = gl.getUniformLocation(myShaderProgram, "Ia");
    Idloc = gl.getUniformLocation(myShaderProgram, "Id");
    Isloc = gl.getUniformLocation(myShaderProgram, "Is");
    gl.uniform3f(Ialoc, .1, .1, .1);
    gl.uniform3f(Idloc, .8, .8, .5);
    gl.uniform3f(Isloc, .8, .8, .8);

    render();

}

function drawTable() {  
	var vertices = getDeskVertices();
    var indexList = getDeskFaces();
	
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

	
	
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(deskIndexList), gl.STATIC_DRAW);
	
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(deskVertices), gl.STATIC_DRAW);
	
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
	
	var faceNormals=getFaceNormals(vertices, indexList, numTriangles);
    var vertexNormals=getVertexNormals(vertices, indexList, faceNormals, numVertices, numTriangles);

    var normalsbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);

    var vertexNormalPointer = gl.getAttribLocation(myShaderProgram, "nv");
    gl.vertexAttribPointer(vertexNormalPointer, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexNormalPointer);
}

function drawChair() {
	var chairVertices = getChairVertices();
    var chairIndexList = getChairFaces();
	
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
	
    var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(chairIndexList), gl.STATIC_DRAW);
	
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(chairVertices), gl.STATIC_DRAW);
	
	var myPosition = gl.getAttribLocation(myShaderProgram2, "myPosition");
	gl.vertexAttribPointer(myPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(myPosition);
	
	var textureBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoordinates), gl.STATIC_DRAW);

	var texturePosition = gl.getAttribLocation(myShaderProgram2, "textureCoordinate");
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
	//transXLoc = gl.getUniformLocation(myShaderProgram, "transX");
	//gl.uniform1f(transXLoc, transX);

	transY = 0;
	//transYLoc = gl.getUniformLocation(myShaderProgram, "transY");
	//gl.uniform1f(transYLoc, transY);
	
	var faceNormals=getFaceNormals(vertices, indexList, numTriangles);
    var vertexNormals=getVertexNormals(vertices, indexList, faceNormals, numVertices, numTriangles);

    var normalsbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);

    var vertexNormalPointer = gl.getAttribLocation(myShaderProgram, "nv");
    gl.vertexAttribPointer(vertexNormalPointer, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexNormalPointer);
}

function drawLaptop() { 
	var laptopVertices = getLaptopVertices();
    var laptopIndexList = getLaptopFaces();
	
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
	
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(laptopIndexList), gl.STATIC_DRAW);
	
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(laptopVertices), gl.STATIC_DRAW);
	
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
	
	var faceNormals=getFaceNormals(vertices, indexList, numTriangles);
    var vertexNormals=getVertexNormals(vertices, indexList, faceNormals, numVertices, numTriangles);

    var normalsbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);

    var vertexNormalPointer = gl.getAttribLocation(myShaderProgram, "nv");
    gl.vertexAttribPointer(vertexNormalPointer, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexNormalPointer);
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

function transF(){
  transX += .1;
  transXLoc = gl.getUniformLocation(myShaderProgram2, "transX");
  gl.uniform1f(transXLoc, transX);
}//end function transX

function transB(){
  transX -= .1;
  transXLoc = gl.getUniformLocation(myShaderProgram2, "transX");
  gl.uniform1f(transXLoc, transX);
}//end function transX