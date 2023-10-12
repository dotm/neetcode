/**
 * Definition for GraphNode.
*/
class GraphNode {
    val: number
    neighbors: GraphNode[]
    constructor(val?: number, neighbors?: GraphNode[]) {
        this.val = (val===undefined ? 0 : val)
        this.neighbors = (neighbors===undefined ? [] : neighbors)
    }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
	if(node === null){
    return null
  }
	if(node.neighbors.length === 0){
    return new GraphNode(node.val)
  }

  let nodeMap = new Map<number, GraphNode>()
  function dfs(node: GraphNode): GraphNode {
    const existingGraphNode = nodeMap.get(node.val)
    if(existingGraphNode !== undefined){
      return existingGraphNode
    }
    const newGraphNode = new GraphNode(node.val)
    nodeMap.set(node.val, newGraphNode) //set to trigger the existingGraphNode guard above
    let newNeighbors: GraphNode[] = []
    for(let i=0;i<node.neighbors.length;i++){
      newNeighbors.push(dfs(node.neighbors[i]))
    }
    newGraphNode.neighbors = newNeighbors
    nodeMap.set(node.val, newGraphNode) //set with copy
    return newGraphNode
  }
  return dfs(node)
};
