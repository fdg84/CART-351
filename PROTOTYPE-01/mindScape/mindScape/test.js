

const graphData = {
    "nodes": [
        {"id": "Mind", "group": 1, "text": "My Mind is Searching", "imageURL": "graph.png"},
        {"id": "Illusions", "group": 3},
        {"id": "Dreams", "group": 2},
        {"id": "Networks", "group": 4},
     ],
    "links": [
        {"source": "Illusions", "target": "Mind", "value": 1},
        {"source": "Dreams", "target": "Mind", "value": 8},
    ]
}



const Graph = ForceGraph3D()
  (document.getElementById('3d-graph'))
    .width('1370')
    .graphData(graphData)
    .nodeAutoColorBy('group')
    .nodeLabel('id')
    .onNodeClick((node, e) => onClick(node, e))
    .nodeThreeObject(node => {
    //   const sprite = new SpriteText(node.id);
    //   sprite.material.depthWrite = false; // make sprite background transparent
    //   sprite.color = node.color;
    //   sprite.textHeight = 8;
    //   return sprite;
    });

function onClick(node, e) {
    const nodeTitle = document.getElementById("nodeTitle")
    const nodeBody = document.getElementById("nodeBody")
    
    const { nodes, links } = Graph.graphData()
    const id = nodes.length;
    const targets = nodes.map(node => node.id)
    const target = targets[Math.round(Math.random() * (id-1))]
    console.log('targ',targets)
    Graph.graphData({
      nodes: [...nodes, { id, group: Math.round(Math.random() * (3))}],
      links: [...links, { source: id, target: target }]
      }
    )
    
    const img = document.getElementById("nodeImage")
    nodeTitle.innerHTML = node.id
    nodeBody.innerHTML = node.text
    img.src = node.imageURL
}
    
// Spread nodes a little wider
Graph.d3Force('charge').strength(-120);
