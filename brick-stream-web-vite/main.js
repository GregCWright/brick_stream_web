import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

camera.position.setZ(10);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial( {color: 0xFF6708, wireframe: true } );
const torus = new THREE.Mesh( geometry, material ); 

scene.add(torus);

torus.rotation.x = 0.3;
torus.rotation.y = 0.5;

function animate() {
    requestAnimationFrame(animate);

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);

    camera.position.setX(window.innerWidth / -300);

    torus.rotation.x += 0.005;
    //torus.rotation.y += 0;
    //torus.rotation.z += 0;

    renderer.render(scene, camera);
}

animate()