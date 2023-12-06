import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext'
import GUI from 'lil-gui';

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';

// set the link categories 
let groups = ["Memory", "Dream", "Hallucination", "Prophecy"]

// random node suggestions
let defaultNodes = [
  {"id": "Illusions", "group": groups[0], "text": "Illusions are Fleeting"},
  {"id": "Dreams", "group": groups[2], "text": "Dreams are Vivid"},
  {"id": "Networks", "group": groups[3], "text": "Networks of Confusion"},
  {"id": "Echoes", "group": groups[0], "text": "Echoes of Silence"},
  {"id": "Sensations", "group": groups[1], "text": "Sensations of Tension"},
  {"id": "Poetry", "group": groups[2], "text": "Poetry of the Soul"},
  {"id": "Noise", "group": groups[3], "text": "Aching Noise"},
  {"id": "Trip", "group": groups[0], "text": "Trip of a Lifetime"},
  {"id": "Chaos", "group": groups[1], "text": "Chaos is Everywhere"},
  {"id": "Nature", "group": groups[2], "text": "Nature is Healing"},
  {"id": "Creatures", "group": groups[3], "text": "Creatures of the Night"},
  {"id": "Music", "group": groups[0], "text": "Music in the Wind"},
  {"id": "Love", "group": groups[1], "text": "Love Goes Beyond"},
  {"id": "Flowers", "group": groups[2], "text": "Flowers are Growing"},
  {"id": "Light", "group": groups[3], "text": "White Light Wonders"},
]

let testNodes = []
let textArray = [""]
let textIsAnimated = false
let textObject = {}
let colours = ['rgb(10,255,10,1)', 'rgb(25,225,50,1)', 'rgb(100,255,100,1)', 'rgb(25,175,100,1)']

let highlightNodes = new Set();
const highlightLinks = new Set();
let hoverNode = null;

let randomAxis = 0
let randomDirection = 1
let axis = new THREE.Vector3(5,1,.2)

let orbTexture = "texture3.jpg"
let bgImage = "texture2.jpg"

let userObj = {}

const animationTime = 200
let animationCount = 0
const translateSpeed = 1
let graphTest

//read the initial graph data from JSON file
const request = new XMLHttpRequest()
request.open("GET", "graph.json", false)
request.send(null)

if (request.status === 200) {
  graphTest = JSON.parse(request.response)
}

// load the force graph object
const Graph = ForceGraph3D()
  (document.getElementById('3d-graph'))
  .graphData(graphTest)
  .nodeLabel('text')
  .nodeColor(node => colours[node.group - 1]) 
  .nodeColor(node => highlightNodes.has(node) ?  'rgba(255,255,255,1)' : 'rgba(255,160,100,1)' )
  .onNodeHover(node => onHover(node))
  .linkWidth(link => highlightLinks.has(link) ? 6 : 3)
  .linkDirectionalParticles(link => highlightLinks.has(link) ? 4 : 0)
  .linkDirectionalParticleWidth(4)
  .onNodeClick((node, e) => onClick(node, e))
  .onLinkHover(link => {
    highlightNodes.clear();
    highlightLinks.clear();
    const group = link?.group
    Graph.graphData().links.filter(lk => lk.group === group).forEach(ln => {
      if (ln) {
        highlightLinks.add(ln);
        highlightNodes.add(ln.source);
        highlightNodes.add(ln.target);
      }
    })
    updateHighlight();
  })

  // centre node
  .nodeThreeObject(({ id}) => {
    if (id === 0) {
      return new THREE.Mesh(new THREE.SphereGeometry(8), new THREE.MeshBasicMaterial({opacity:.6, transparent: true, map: new THREE.TextureLoader().load(orbTexture) }))
    }
    return false
  })

// initialize the scene   
init()

// add the menu
const gui = new GUI();
gui.add(userObj, 'group', ['Memory', 'Dream', 'Hallucination', 'Prophecy']);
gui.add(userObj, 'text'); 	
gui.add(userObj, 'Add'); 	
gui.add(userObj, 'Reset');
gui.add(userObj, 'Origin'); 

// extends the graph
Graph.d3Force('charge').strength(-120);

// add initial text
makeText("*")

// create the background
let materialArray = []
for (let i = 0; i < 6; i++)
  materialArray.push(
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(bgImage),
      side: THREE.BackSide
    })
  );

// size of the world
let skyGeometry = new THREE.BoxGeometry(100000, 100000, 100000)
let skybox = new THREE.Mesh(skyGeometry, materialArray)
Graph.scene().add(skybox)


// the animation loop
Graph.renderer().setAnimationLoop(async (e) => {

  if (textIsAnimated) {
    switch (randomAxis){
      case 0:
        textObject.translateX(translateSpeed * randomDirection)
        break;
      case 1:
        textObject.translateY(translateSpeed * randomDirection)
        break;
      case 2:
        textObject.translateZ(translateSpeed * randomDirection)
        break;     
    }
    
    textObject.rotateOnAxis(axis, 0.05)
    animationCount++
    textObject.material.opacity -= 1/animationTime

    if (animationCount > animationTime) {
      textObject.material.opacity = 0
      textIsAnimated = false
      animationCount = 0
    }
  }

})

// add the post processing effects
Graph.postProcessingComposer().addPass(new RenderPass(Graph.scene(), Graph.camera()))
const effect1 = new ShaderPass(DotScreenShader);
effect1.uniforms['scale'].value = 6;
Graph.postProcessingComposer().addPass(effect1);
const effect2 = new ShaderPass(RGBShiftShader);
effect2.uniforms['amount'].value = 0.0015;
Graph.postProcessingComposer().addPass(effect2);
const effect3 = new OutputPass();
Graph.postProcessingComposer().addPass(effect3);

// move the camera to the centre node
function onOrigin(){
  moveCameraToNode(Graph.graphData().nodes[0])
}

// initialization function 
function init() {
  Graph.graphData(graphTest)
  
  testNodes = [...new Set(defaultNodes)]

  userObj = {text: 'A Shock To The System',
    group: 'Memory',
    Add: onSave,
    Reset: onReset,
    Origin: onOrigin 
  }
  
  if (Graph.scene().getObjectByName("compiledText")) {
    Graph.scene().remove(Graph.scene().getObjectByName("compiledText"))
  }
  
  textArray = []
  moveCameraToNode(Graph.graphData().nodes[0])  
}

// node click handler
function onClick(node) {
  let textString = ""
  
  // create the text of all the nodes of the family
  textArray = Graph.graphData().nodes.filter(textNode => textNode.group === node.group).map(textNode => textNode.text)

  textArray.forEach(text => {
    textString += text + '\n'
  })

  // remove the old text before showing new text
  if (Graph.scene().getObjectByName("compiledText")) {
    Graph.scene().remove(Graph.scene().getObjectByName("compiledText"))
  }

  // create text sprite and place in centre of the screen
  const compiledText = new SpriteText(textString, 5, "0x00ff00");
  compiledText.name = "compiledText"
  compiledText.color = "white"
  Graph.scene().add(compiledText)
  
  // move camera to clicked node
  moveCameraToNode(node)
  
  // pause and then display floating text
  setTimeout(() => {
    makeText(node.text)
    textIsAnimated = true
    animationCount = 0 
  }, 500);
 
}

// link animation effect and node highlight on hover
function onHover(node) {

  if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

  highlightNodes.clear();
  highlightLinks.clear();
  
  if (node) {
    const { nodes} = Graph.graphData()
    highlightNodes = new Set([...nodes.filter(otherNode => otherNode.group === node.group)])
    highlightNodes.add(node);
  }

  hoverNode = node || null;

  updateHighlight();
}

function onReset() {
  init() 
}

// when you click Add in the menu to create a new node
function onSave() {
  
  // get the data from the menu
  const text = gui.controllers[1].getValue()
  const group = gui.controllers[0].getValue()
  const { nodes, links } = Graph.graphData()
  const id = nodes.length;
  
  if (nodes.find(node => node.group === group)) {
    Graph.graphData({
      nodes: [...nodes, { id, group, text }],
      links: [...links, { source: Math.max(...nodes.filter(node => group === node.group).map(node => node.id)), target: id, group: group }]
    }
    )
  } else {
    Graph.graphData({
      nodes: [...nodes, { id, group, text }],
      links: [...links, { source: 0, target: id, group: group }]
    }
    )
  }

  // SAVE GRAPH JSON DATA
  // To be continued

  // display new text in centre
  let textString = ""
  
  textArray = textArray.filter((nodeText) => nodeText !== text)

  textArray.push(text)
  textArray.forEach(nodeText => {
    textString += nodeText + '\n'
  })

  if (Graph.scene().getObjectByName("compiledText")) {
    Graph.scene().remove(Graph.scene().getObjectByName("compiledText"))
  }

  const compiledText = new SpriteText(textString, 5, "0x00ff00");
  compiledText.name = "compiledText"
  compiledText.material.alphaHash = true
  compiledText.color = "white"
  compiledText.color
  Graph.scene().add(compiledText)

  // extends the graph
  Graph.d3Force('charge').strength(-120);


  // wait and then start floating text animation
  setTimeout(() => {
    makeText(text)
    textIsAnimated = true
    animationCount = 0 
  }, 500);

  // random new values in the menu
  let rand = Math.floor(testNodes.length * Math.random())
  
  gui.controllers[0].setValue(testNodes[rand].group)
  gui.controllers[1].setValue(testNodes[rand].text)
  testNodes.splice(rand, 1)

  let newNodes = Graph.graphData().nodes
  
  setTimeout(() => {
    moveCameraToNode(newNodes[newNodes.length-1])
  }, 250);
  
}

// move the camera smoothly to specific node
function moveCameraToNode(node){
  const distance = 100;
  const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

  const newPos = node.x || node.y || node.z
    ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
    : { x: 0, y: 0, z: distance }; 
  console.log(newPos, node)
  Graph.cameraPosition(
    newPos, 
    node, 
    3000  
  );
}

// used to highlight node families on hover
function updateHighlight() {
  Graph
    .nodeColor(Graph.nodeColor())
    .linkWidth(Graph.linkWidth())
    .linkDirectionalParticles(Graph.linkDirectionalParticles());
}


// this creates the 3D floating text 
function makeText(text) {
  
  if (Graph.scene().getObjectByName("3Dtext")) {
    Graph.scene().remove(Graph.scene().getObjectByName("3Dtext"))
  }
  
  axis = new THREE.Vector3(Math.random(),Math.random(),Math.random())
  randomAxis = Math.floor(3*Math.random())
  randomDirection = Math.random() > .5 ? -1 : 1

  const loader = new FontLoader();
  loader.load('./fonts/helvetiker_regular.typeface.json', function (font) {

    const geometry = new TextGeometry(text, {
      font: font,
      size: 40,
      height: 6,
      curveSegments: 12,
    });
    
    const material = new THREE.MeshBasicMaterial({ color: 'white', transparent: true }); //0x00ff00
    
    textObject = new THREE.Mesh(geometry, material);
    textObject.name = "3Dtext"
    textObject.position.set(-30, 0, 0);
    Graph.scene().add(textObject)
  })
}
