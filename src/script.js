import './style.css'
import './index.html'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/Textures/NormalMap (4).png')



const gui = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')


const scene = new THREE.Scene()




const geometry = new THREE.SphereBufferGeometry( 0.8, 64, 64 );



const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0xffffff)
material.roughness = 0.2
material.normalMap = normalTexture;


const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)


const pointLight = new THREE.PointLight(0xff0000, 0.8)
pointLight.position.x = 0
pointLight.position.y = 3
pointLight.position.z = 0
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x15949D, 0.5)
pointLight2.position.x = 0
pointLight2.position.y = -3
pointLight2.position.z = 0
scene.add(pointLight2)



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    // targetx = mousex * 0.001
    // targety = mousey * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .3 * elapsedTime
    // sphere.rotation.y += 0.5 * (targetx - sphere.rotation.y)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()