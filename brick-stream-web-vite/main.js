import './style.css'

import * as THREE from 'three';


// SCENE SETUP
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

camera.position.setZ(10);

// TORUS CONFIGURATION
const torus_geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torus_material = new THREE.MeshBasicMaterial( {color: 0xFF6708, wireframe: true } );
const torus_mesh = new THREE.Mesh( torus_geometry, torus_material ); 

scene.add(torus_mesh);

torus_mesh.rotation.x = 1;
torus_mesh.rotation.y = 0.5;

// SINE TUBE CONFIGURATION
class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 100 - 1.5;
		const ty = 0.3*Math.sin( 50 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}
const path_1 = new CustomSinCurve( 10 );
const tube_geometry_1 = new THREE.TubeGeometry( path_1, 1000, 2, 10, false );
const tube_material_1 = new THREE.MeshBasicMaterial( { color: 0x0b73c3, wireframe: true } );
const tube_mesh_1 = new THREE.Mesh( tube_geometry_1, tube_material_1 );
tube_mesh_1.position.x = -9;
tube_mesh_1.position.y = -30;
tube_mesh_1.position.z = 1
// tube_mesh_1.rotation.y = 0.4
scene.add(tube_mesh_1);

const path_2 = new CustomSinCurve( 10 );
const tube_geometry_2 = new THREE.TubeGeometry( path_2, 1000, 2, 10, false );
const tube_material_2 = new THREE.MeshBasicMaterial( { color: 0x553cf7, wireframe: true } );
const tube_mesh_2 = new THREE.Mesh( tube_geometry_2, tube_material_2 );
tube_mesh_2.position.x = -70;
tube_mesh_2.position.y = -20;
tube_mesh_2.position.z = -5
// tube_mesh_1.rotation.y = 0.4
scene.add(tube_mesh_2);




function animate() {
    requestAnimationFrame(animate);

    // TORUS ANIMATION 
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);

    camera.position.setX(window.innerWidth / -300);

    torus_mesh.rotation.x += 0.001;
    //torus_mesh.rotation.y += 0;
    //torus_mesh.rotation.z += 0;

    // TUBE ANIMATION
    tube_mesh_1.position.x -= 0.01;

    if( tube_mesh_1.position.x <= -92 * 30 ) {
        tube_mesh_1.position.x = -9
    }

    tube_mesh_2.position.x -= 0.01;

    if( tube_mesh_2.position.x <= (-92 * 30) - 61 ) {
        tube_mesh_2.position.x = -70
    }
    // tube_mesh_1.rotation.y += 0.001;

    renderer.render(scene, camera);
}

function move_camera() {

    const t = document.body.getBoundingClientRect().top;

    camera.position.y = t * 0.015

}

animate()
document.body.onscroll = move_camera
