import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface WebGLProps {
  domElement: HTMLCanvasElement;
}

export const WebGL = ({ domElement }: WebGLProps) => {
  const sizes = {
    width: domElement.clientWidth,
    height: domElement.clientHeight,
  };

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    sizes.width / sizes.height,
    0.01,
    1000
  );
  camera.position.set(2, 2, 2);
  scene.add(camera);

  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({
    canvas: domElement,
    antialias: true,
    // alpha: true,
  });

  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // const gltfLoader = new GLTFLoader();

  // const raycaster = new THREE.Raycaster();
  // const pointer = new THREE.Vector2();

  // window.addEventListener("pointermove", (e) => {
  //   pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  //   pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  // });

  // let objectOfInterest: THREE.Object3D | null = null;

  // *****************************************************************************

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 50);
  pointLight.position.set(5, 10, 5);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  scene.add(pointLight);

  const mesh = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
  );
  scene.add(mesh);

  // const lockToObject = (pos: THREE.Vector3) => {
  //   controls.target.set(pos.x, pos.y, pos.z);
  // };

  // *****************************************************************************

  const tick = () => {
    controls.update();

    // raycaster.setFromCamera(pointer, camera);
    // const intersects = raycaster.intersectObjects(scene.children);

    // if (intersects[0] && intersects[0].object.parent) {
    //   let parent = intersects[0].object.parent;
    //   while (parent.parent?.name) {
    //     parent = parent.parent;
    //   }
    //   objectOfInterest !== parent && (objectOfInterest = parent);
    // }

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();
};

// const updateAllMaterials = (scene: THREE.Scene) => {
//   scene.traverse((child) => {
//     if (
//       child instanceof THREE.Mesh &&
//       (child.material instanceof THREE.MeshStandardMaterial ||
//         child.material instanceof THREE.MeshPhysicalMaterial)
//     ) {
//       child.material.needsUpdate = true;
//     }
//   });
// };
