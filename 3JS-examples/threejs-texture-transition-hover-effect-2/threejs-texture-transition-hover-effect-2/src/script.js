/* Utils ------------------------------------------ */
const textureLoader = new THREE.TextureLoader()

/* Scene Subjects ----------------------------------------- */
class PlaneSubject {
  raycaster = new THREE.Raycaster()
  scene = null

  constructor(scene) {
    const geometry = new THREE.PlaneBufferGeometry(5, 7)
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv; 

        void main() {
          vUv = uv;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float; 

        varying vec2 vUv; 

        uniform float dispFactor; 

        uniform sampler2D disp; 
        uniform sampler2D tex1; 
        uniform sampler2D tex2; 

        void main() {
          vec2 uv = vUv;

          vec4 _currentImage;
          vec4 _nextImage;

          float intensity = 0.5;

          vec4 orig1 = texture2D(tex1, uv);
          vec4 orig2 = texture2D(tex2, uv);

          _currentImage = texture2D(tex1, vec2(
            uv.x, 
            uv.y + dispFactor * (orig2 * intensity)
          ));

          _nextImage = texture2D(tex2, vec2(
            uv.x, 
            uv.y + (1.0 - dispFactor) * (orig1 * intensity)
          ));

          vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

          gl_FragColor = finalTexture;
        }
      `,
      uniforms: {
        dispFactor: {
          type: 'f',
          value: 0.0
        },
        tex1: {
          type: 't',
          value: textureLoader.load('https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80')
        },
        tex2: {
          type: 't',
          value: textureLoader.load('https://images.unsplash.com/photo-1562235033-824d84fc4524?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
        }
      }
    })
    material.transparent = true
    const mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    this.scene = scene
    this.mesh = mesh
  }

  update(delta, time) {}

  mouseHandler(mouse, camera) {
    const { scene, mesh, raycaster } = this

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children)

    TweenMax.to(mesh.material.uniforms.dispFactor, 0.5, {
      value: intersects.length
    })

    TweenMax.to(mesh.scale, 0.5, {
      x: 1 - mouse.y * 0.1,
      y: 1 - mouse.y * 0.1
    })

    TweenMax.to(mesh.position, 0.5, {
      x: mouse.x
    })

    TweenMax.to(mesh.rotation, 0.5, {
      x: -mouse.y * (Math.PI / 3) * 0.3,
      y: mouse.x * (Math.PI / 3) * 0.3
    })
  }
}

/* Scene Manager ------------------------------------------------ */
class SceneManager {
  clock = new THREE.Clock()
  mouse = new THREE.Vector2()

  buildScene = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#111')

    return scene
  }

  buildRender = ({ width, height }) => {
    const { canvas } = this

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1
    renderer.setPixelRatio(DPR)
    renderer.setSize(width, height)

    renderer.gammaInput = true
    renderer.gammaOutput = true

    return renderer
  }

  buildCamera = ({ width, height }) => {
    const aspectRatio = width / height
    const fieldOfView = 60
    const nearPlane = 1
    const farPlane = 100
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    camera.position.z = 8

    return camera
  }

  createSceneSubjects = scene => {
    const sceneSubjects = [new PlaneSubject(scene)]

    return sceneSubjects
  }

  constructor(canvas) {
    this.canvas = canvas
    this.screenDimentions = {
      width: this.canvas.width,
      height: this.canvas.height
    }

    this.scene = this.buildScene()
    this.renderer = this.buildRender(this.screenDimentions)
    this.camera = this.buildCamera(this.screenDimentions)
    this.sceneSubjects = this.createSceneSubjects(this.scene)
  }

  update() {
    const delta = this.clock.getDelta()
    const elapsed = this.clock.getElapsedTime()

    this.sceneSubjects.map(s => (s.update ? s.update(delta, elapsed) : null))

    this.renderer.render(this.scene, this.camera)
  }

  resizeHandler() {
    const { width, height } = this.canvas

    this.screenDimentions = { width, height }

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
  }

  mouseHandler(mousePos) {
    Object.assign(this.mouse, mousePos)

    this.sceneSubjects.map(s =>
      s.mouseHandler ? s.mouseHandler(this.mouse, this.camera) : null
    )
  }
}

/* Init stuff */
const canvas = document.getElementById('canvas')

const sceneManager = new SceneManager(canvas)

const resizeCanvas = () => {
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  sceneManager.resizeHandler()
}

const mouseHandler = e => {
  sceneManager.mouseHandler({
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: -(e.clientY / window.innerHeight) * 2 + 1
  })
}

const bindEvents = () => {
  window.onresize = resizeCanvas
  resizeCanvas()

  window.onmousemove = mouseHandler
}

const render = () => {
  window.requestAnimationFrame(render)
  sceneManager.update()
}

bindEvents()
render()