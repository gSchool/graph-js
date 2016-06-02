'use strict'

describe("Graph", function() {
  const expect = require('chai').expect;
  const Graph = require('../graph.js');
  var graph;
  const graphData = [
    [1,2],
    [0,2],
    [0,1,3,6,7],
    [2,5],
    [5,8],
    [3,4],
    [2],
    [2,8],
    [4,7]
  ]

  beforeEach(function() {
    graph = new Graph(graphData);
    graph.createGraph()
  });

  describe("#createGraph", function(){
    it("sets graph.vertices to an object", function(){
      let isAnObject = graph.vertices.hasOwnProperty(0);

      expect(isAnObject).to.equal(true)
    })
    it("can show the first vertex", function() {
      let firstVertex = graph.vertices[0];

      expect(firstVertex).to.deep.equal({ edges: [ 1, 2 ] })
    });
    it("can show the last vertex", function() {
      let lastVertex = graph.vertices[8];

      expect(lastVertex).to.deep.equal({ edges: [ 4, 7 ] })
    });
  })

  describe("#addVertexWithEdges", function(){

    describe("when adding a vertex with one edge", function() {
      it("adds a new vertex with the edge", function(){
        graph.addVertexWithEdges([1]);

        expect(graph.vertices[9].edges).to.deep.equal([1])
      })
      it("adds the new vertex as an edge to existing vertices it may be connected to", function(){
        graph.addVertexWithEdges([1]);
        expect(graph.vertices[1].edges).to.deep.equal([0,2,9])
      })
    })

    describe("when adding a vertex with more than one edge", function(){
      it("adds a new vertex with the edges", function(){
        graph.addVertexWithEdges([1,2,3]);

        expect(graph.vertices[9].edges).to.deep.equal([1,2,3])
      })
      it("adds the new vertex as an edge to existing vertices it may be connected to", function(){
        graph.addVertexWithEdges([1,2,3]);

        expect(graph.vertices[1].edges).to.deep.equal([0,2,9])
        expect(graph.vertices[2].edges).to.deep.equal([0,1,3,6,7,9])
        expect(graph.vertices[3].edges).to.deep.equal([2,5,9])
      })
    })
  })

  describe("#deleteVertex",function(){
    it("should remove that vertex from vertices",function(){
      graph.deleteVertex(2);

      expect(graph.vertices[2]).to.deep.equal(undefined)
    })
    it("should remove that vertex from all the edges",function(){
      graph.deleteVertex(1);

      expect(graph.vertices[0].edges).to.deep.equal([2])
      expect(graph.vertices[2].edges).to.deep.equal([0,3,6,7])
    })
  })

  describe("Measuring distances", function() {

    describe("#initializeDistances", function() {
        it("adds a distance property to each vertex and makes it equal to '-1'", function(){
          let firstVertex = graph.initializeDistances(graph.vertices)[0];

          expect(firstVertex.distance).to.equal(-1)
        })
    })

    describe("#getDistances",function(){
      it("shows distances from vertex 0", function(){
        let thirdVertex = graph.getDistances(0)[3]

        expect(thirdVertex.distance).to.equal(2)
      })
    })
  })

  describe("#shortestPath",function(){
    it("finds the shortest path between 0 to 4",function(){
      expect(graph.shortestPath(0,4)).to.equal(4)
    })
    it("finds the shortest path between 0 to 1", function(){
      expect(graph.shortestPath(0,1)).to.equal(1)
    })
    it("finds the shortest path between 1 to 4",function(){
      expect(graph.shortestPath(1,4)).to.equal(4)
    })
    it("finds the shortest path between 5 to 4",function(){
      expect(graph.shortestPath(5,4)).to.equal(1)
    })
    it("finds the shortest path between 3 to 5",function(){
      expect(graph.shortestPath(3,5)).to.equal(1)
    })
    it("finds the shortest path between 3 to 4",function(){
      expect(graph.shortestPath(3,4)).to.equal(2)
    })
  })

});
