import random from 'lodash/random'

// Array of available nodes to connect to
// const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]
const nodes = [process.env.REACT_APP_NODE_1]

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  // console.log(randomIndex)
  return nodes[randomIndex]
}

export default getNodeUrl
