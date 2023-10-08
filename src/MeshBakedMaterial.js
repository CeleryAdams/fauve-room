// MIT License

// Copyright (c) 2023 Luke Schaefer

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


import * as THREE from 'three'

const before = `totalDiffuse + totalSpecular + totalEmissiveRadiance`;
const after = `sampledDiffuseColor.rgb + reflectedLight.indirectDiffuse + totalSpecular + totalEmissiveRadiance`;
/** Drop-in replacement for MeshStandardMaterial that is useful for baked textures. */

export class MeshBakedMaterial extends THREE.MeshStandardMaterial {
    constructor(parameters) {
        super(parameters);
        let userProvidedOnBeforeCompile = (shader) => { };
        // Replace the a line in the shader code with our own:
        const onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(before, after);
            userProvidedOnBeforeCompile(shader);
        };
        // Do some magic so that we can still call the user-provided onBeforeCompile function:
        Object.defineProperty(this, 'onBeforeCompile', {
            set: (handler) => {
                userProvidedOnBeforeCompile = handler;
            },
            get: () => {
                return onBeforeCompile;
            }
        });
    }
}