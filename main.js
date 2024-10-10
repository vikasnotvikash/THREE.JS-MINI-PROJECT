import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 3;


let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load("./earth.jpeg")
texture.colorSpace = THREE.SRGBColorSpace;

let texture2 = textureLoader.load("./clouds.jpeg")
texture2.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(1, 250, 250);
const material = new THREE.MeshStandardMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material)

const geometry2 = new THREE.SphereGeometry(1.01, 250, 250);
const material2 = new THREE.MeshStandardMaterial({ alphaMap: texture2 });
const mesh2 = new THREE.Mesh(geometry2, material2)
material2.transparent = true;


scene.add(mesh);
scene.add(mesh2);


let hdri = new RGBELoader()
hdri.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/zwartkops_curve_afternoon_2k.hdr", function( hdritexture){
  hdritexture.mapping = THREE.EquirectangularRefractionMapping;
  scene.environment = hdritexture;
  scene.background = hdritexture;
})

const canvas = document.querySelector("canvas"); 
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.1;
// let clock = new THREE.Clock();

let animate = () => {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update();
    mesh.rotation.y += 0.001;
    mesh2.rotation.y += 0.003;
  // camera.position.z += 0.01;
  // mesh.rotation.y += clock.getElapsedTime()  * -110
}
animate()


// Q. How things rotate on the basis of PI value

// mesh.rotation.z = 1.57 
// 90 = PI / 2;
// 180 = Math.PI
// 270 = (Math.PI / 2) * 3
//360 = 2 * Math.PI


// Q. To add Sphere 

// const sphereGeo = new THREE.SphereGeometry(1,10,10);
// const sphereMat = new THREE.MeshBasicMaterial({ color : "red"})
// const sphere = new THREE.Mesh(sphereGeo, sphereMat);
// sphere.position.x = 1;


// Q. How clock works beacuse fps id depends upon the device and every device has a different type of fps so with the help
// of clock how 3D animation works in every devices in the same frame or speed, thats what mentioned below down -

// let clock = new THREE.Clock();
// function animate()
// {
//   renderer.render(scene,camera)   
//   window.requestAnimationFrame(animate);
//   mesh.rotation.y = clock.getElapsedTime();
// }
// animate()


// Q. How can we use group multiple geometries in the scene.

// const group = new THREE.Group()
// group.add(cube);
// group.add(sphere);
// group.position.x = -2
// scene.add(group)

