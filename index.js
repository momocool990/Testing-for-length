// A simplified visualization of the JS trigger
const gl = canvas.getContext('webgl2');

// Setting the "Memory Instruction" (the variable you mentioned)
// This tells the driver how many pixels are in a row/layer
gl.pixelStorei(gl.UNPACK_IMAGE_HEIGHT, 10); 

// The actual image data being sent is much larger (e.g., 100x100x100)
// The driver allocates for 10, but the hardware copies 100.
gl.texImage3D(
    gl.TEXTURE_3D, 
    0,                  // Level of detail
    gl.RGBA,            // Internal format
    100, 100, 100,      // Actual Dimensions (Width, Height, Depth)
    0,                  // Border
    gl.RGBA,            // Format
    gl.UNSIGNED_BYTE,   // Type
    largePixelData      // The "100-pixel" data being poured in
);
