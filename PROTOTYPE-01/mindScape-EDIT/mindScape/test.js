const graphData = {
    "nodes": [
        {"id": "Mind", "group": 1, "text": "My Mind is Searching", "imageURL": "images/AI1x.jpg"},
        {"id": "Illusions", "group": 2, "text": "Illusions are Fleeting", "imageURL": "images/AI7x.jpg"},
        {"id": "Dreams", "group": 3, "text": "Dreams are Vivid", "imageURL": "images/AI5x.jpg"},
        {"id": "Networks", "group": 4, "text": "Networks of Confusion", "imageURL": "images/AI6x.jpg"},
        {"id": "Echoes", "group": 1, "text": "Echoes of Silence", "imageURL": "images/AI2x.jpg"},
        {"id": "Sensations", "group": 2, "text": "Sensations of Tension", "imageURL": "images/AI10x.jpg"},
        {"id": "Poetry", "group": 3, "text": "Poetry of the Soul", "imageURL": "images/AI9x.jpg"},
        {"id": "Noise", "group": 4, "text": "Aching Noise", "imageURL": "images/AI4x.jpg"},
        {"id": "Trip", "group": 1, "text": "Trip of a Lifetime", "imageURL": "images/AI12x.jpg"},
        {"id": "Chaos", "group": 2, "text": "Chaos is Everywhere", "imageURL": "images/AI21x.jpg"},
        {"id": "Nature", "group": 3, "text": "Nature is Healing", "imageURL": "images/AI22x.jpg"},
        {"id": "Creatures", "group": 4, "text": "Creatures of the Night", "imageURL": "images/AI17x.jpg"},
        {"id": "Music", "group": 1, "text": "Music in the Wind", "imageURL": "images/AI16x.jpg"},
        {"id": "Love", "group": 2, "text": "Love Goes Beyond", "imageURL": "images/AI14x.jpg"},
        {"id": "Flowers", "group": 3, "text": "Flowers are Growing", "imageURL": "images/AI20x.jpg"},
        {"id": "Wet", "group": 4, "text": "Wet Light Wonders", "imageURL": "images/AI19x.jpg"},
     ],
    "links": [
        {"source": "Illusions", "target": "Mind", "value": 1},
        {"source": "Dreams", "target": "Dreams", "value": 3},
        {"source": "Illusions", "target": "Echoes", "value": 2},
        {"source": "Dreams", "target": "Poetry", "value": 5},
        {"source": "Trip", "target": "Noise", "value": 4},
        {"source": "Dreams", "target": "Illusions", "value": 2},
        {"source": "Illusions", "target": "Sensations", "value": 1},
        {"source": "Dreams", "target": "Networks", "value": 5},
        {"source": "Echoes", "target": "Trip", "value": 1},
        {"source": "Music", "target": "Chaos", "value": 3},
        {"source": "Flowers", "target": "Nature", "value": 1},
        {"source": "Love", "target": "Creatures", "value": 2},
        {"source": "Poetry", "target": "Music", "value": 1},
        {"source": "Dreams", "target": "Love", "value": 3},
        {"source": "Illusions", "target": "Flowers", "value": 5},
        {"source": "Chaos", "target": "Wet", "value": 3},
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
