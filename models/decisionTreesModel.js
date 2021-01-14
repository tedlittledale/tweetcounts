import { types, onSnapshot, flow } from "mobx-state-tree";

import { DescisionTreeModel } from "./decisionTreeModel";
import { QuizModel } from "./quizModel";
import { DescisionTreeNode } from "./decisionTreeNode";
import { find, propEq, clone } from "ramda";

import auth from "../utils/auth";

export const DescisionTreesModel = types
  .model("DescisionTreesModel", {
    trees: types.array(DescisionTreeModel),
    quizes: types.array(QuizModel),
    currentTree: types.maybe(types.number),
    currentQuiz: types.maybe(types.number),
  })
  .actions(self => {
    return {
      copyTree: ({
        treeName,
        consumerKey,
        userId,
        twitterHandle,
        identityId,
        identity,
        originalId,
      }) => {
        const originalTree = self.getTreeById(originalId);
        const copiedNodes = originalTree.allNodes.map(node => {
          const copyNode = clone(node);
          copyNode.tweetId && delete copyNode.tweetId;
          //copyNode.mediaId && delete copyNode.mediaId;
          //copyNode.mediaUrl && delete copyNode.mediaUrl;
          return copyNode;
        });
        console.log({ originalTree });
        const newTree = DescisionTreeModel.create({
          savedJson: {},
          name: treeName,
          allNodes: copiedNodes,
          updated: `${new Date().getTime()}`,
          consumerKey,
          userId,
          twitterHandle,
          identityId,
          startNode: originalTree.startNode,
        });
        self.trees.push(newTree);
        self.currentTree = self.trees.length - 1;
        self.trees[self.currentTree].saveTree({ identity });
      },
      newTree: ({
        treeName,
        consumerKey,
        userId,
        twitterHandle,
        identityId,
        identity,
      }) => {
        const startId = `${Math.round(Math.random() * 1000000000)}`;
        const newTree = DescisionTreeModel.create({
          savedJson: {},
          name: treeName,
          allNodes: [
            DescisionTreeNode.create({
              text:
                "This is the start of the threadventure. Click 'Edit Node' to edit me.👇",
              id: startId,
            }),
          ],
          updated: `${new Date().getTime()}`,
          consumerKey,
          userId,
          twitterHandle,
          identityId,
        });
        self.trees.push(newTree);
        self.currentTree = self.trees.length - 1;
        self.trees[self.currentTree].updateStartNode({ startId });
        self.trees[self.currentTree].saveTree({ identity });
      },
      newQuiz: ({ quizName, consumerKey, userId, identityId, identity }) => {
        const newTree = QuizModel.create({
          savedJson: {},
          name: quizName,
          allNodes: [
            DescisionTreeNode.create({
              text:
                "This is the start of the threadventure. Click 'Edit Node' to edit me.👇",
              id: `${Math.round(Math.random() * 1000000000)}`,
            }),
          ],
          updated: `${new Date().getTime()}`,
          consumerKey,
          userId,
          identityId,
        });
        self.quizes.push(newTree);
        self.currentQuiz = self.quizes.length - 1;
        //self.quizes[self.currentTree].saveTree({ identity })
      },
      setCurrentQuiz: index => {
        if (self.trees[index]) {
          self.currentQuiz = index;
        }
      },
      setCurrent: index => {
        if (self.trees[index]) {
          self.currentTree = index;
        }
      },
      fetchTrees: flow(function* fetchTrees(identity) {
        // <- note the star, this a generator function!

        try {
          // ... yield can be used in async/await style
          const headers = yield auth.generateHeaders(identity);
          const trees = yield fetch("/.netlify/functions/fauna-gettrees", {
            method: "GET",
            headers,
          }).then(response => {
            if (!response.ok) {
              return response.text().then(err => {
                throw err;
              });
            }
            return response.json();
          });

          self.trees = trees;
          self.currentTree = 0;
          return trees;
        } catch (error) {
          // ... including try/catch error handling
          console.error("Failed to fetch projects", error);
          self.state = "error";
        }
      }),
      deleteTree: flow(function* deleteTree({ identity, treeId }) {
        // <- note the star, this a generator function!

        try {
          // ... yield can be used in async/await style
          const headers = yield auth.generateHeaders(identity);
          yield fetch("/.netlify/functions/fauna-deleteTree", {
            method: "POST",
            headers,
            body: JSON.stringify({
              treeId,
            }),
          }).then(response => {
            if (!response.ok) {
              return response.text().then(err => {
                throw err;
              });
            }
            return response.json();
          });
          self.trees = self.trees.filter(({ _id }) => _id !== treeId);
          self.currentTree = 0;
          return self.trees;
        } catch (error) {
          // ... including try/catch error handling
          console.error("Failed to fetch projects", error);
          self.state = "error";
        }
      }),
    };
  })
  .views(self => {
    return {
      getTreeById: id => {
        return find(propEq("_id", id))(self.trees);
      },
    };
  });
