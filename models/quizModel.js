import { types, onSnapshot, flow } from "mobx-state-tree";
import {
  find,
  propEq,
  clone,
  lensPath,
  set,
  hasPath,
  path,
  findIndex,
} from "ramda";
import { DescisionTreeNode } from "./decisionTreeNode";
import auth from "../utils/auth";

const Answer = types.model("AnswerModel", {
  answer: types.string,
  prompt: types.string,
});

const Question = types.model("QuestionModel", {
  question: types.string,
  answers: types.array(Answer),
  correctAnswer: types.number,
});

export const QuizModel = types
  .model("QuizModel", {
    updated: `${new Date().getTime()}`,
    name: types.string,
    savedJson: types.frozen(),
    questions: types.array(Question),
    currentNode: types.maybeNull(types.string),
    allNodes: types.array(DescisionTreeNode),
    consumerKey: types.maybe(types.string),
    userId: types.maybe(types.string),
    identityId: types.maybe(types.string),
    _id: types.maybeNull(types.string),
  })
  .actions(self => {
    return {
      addQuestion: question => {
        self.questions.push(question);
      },
      updatedSavedJson: json => {
        self.savedJson = json;
      },
      updateUpdated: () => {
        self.updated = `${new Date().getTime()}`;
      },
      setApp: consumerKey => {
        self.consumerKey = consumerKey;
      },
      setUser: userId => {
        self.userId = userId;
      },
      addStartNode: data => {
        self.allNodes.push(
          DescisionTreeNode.create({
            ...data,
            id: `${Math.round(Math.random() * 10000)}`,
          })
        );
      },
      updateName: name => {
        self.name = name;
      },
      setCurrentNode: id => {
        self.currentNode = id;
      },
      deleteNode: ({ id, identity }) => {
        const sibling = find(propEq("forkNode", id), self.allNodes);
        const parent = find(propEq("childNode", id), self.allNodes);

        const siblingIndex = findIndex(propEq("forkNode", id), self.allNodes);
        const parentIndex = findIndex(propEq("childNode", id), self.allNodes);
        const nodeIndex = findIndex(propEq("id", id), self.allNodes);

        if (sibling) {
          delete sibling.forkNode;
          self.allNodes.splice(siblingIndex, 1, sibling);
        }
        if (parent) {
          delete parent.childNode;
          self.allNodes.splice(parentIndex, 1, parent);
        }
        self.allNodes.splice(nodeIndex, 1);
        const all = clone(self.allNodes.toJSON());

        self.allNodes = [];
        self.allNodes = all;
        const unOrphanedNodes = [];
        const iterateNodes = ({ node: { childNode, forkNode, id }, node }) => {
          unOrphanedNodes.push(node.toJSON());
          if (forkNode && self.getNodeById(forkNode)) {
            iterateNodes({
              node: self.getNodeById(forkNode),
            });
          }
          if (childNode && self.getNodeById(childNode)) {
            iterateNodes({
              node: self.getNodeById(childNode),
            });
          }
        };

        const parentNode = self.allNodes[0];
        iterateNodes({ node: parentNode });

        self.allNodes = [];
        self.allNodes = unOrphanedNodes;
        self.currentNode = null;
        self.currentNode = all[0].id;

        self.saveTree({ identity });

        //self.updateUpdated()
      },
      saveNode: flow(function* saveNode({ node, identity }) {
        self.allNodes.push(node);
        self.saveTree({ identity });
      }),
      saveTree: flow(function* saveTree({ identity }) {
        const allNodes = self.allNodes.toJSON();
        const {
          name,
          consumerKey,
          updated,
          userId,
          identityId,
        } = self.toJSON();

        const headers = yield auth.generateHeaders(identity);

        if (self._id) {
          const response = yield fetch("/.netlify/functions/fauna-saveTree", {
            method: "POST",
            headers,
            body: JSON.stringify({
              allNodes: encodeURIComponent(JSON.stringify(allNodes)),
              treeId: self._id,
              name,
              consumerKey,
              updated,
              userId,
              identityId,
            }),
          }).then(response => {
            return response.json();
          });
          const getUpdated = path(["results", "data", "updateTrees"]);
          const updatedResults = getUpdated(response);
        } else {
          const response = yield fetch(
            "/.netlify/functions/fauna-saveNewTree",
            {
              method: "POST",
              headers,
              body: JSON.stringify({
                allNodes: encodeURIComponent(JSON.stringify(allNodes)),
                treeId: self._id,
                name,
                consumerKey,
                updated,
                userId,
                identityId,
              }),
            }
          ).then(response => {
            return response.json();
          });
          const getUpdated = path(["results", "data", "createTrees"]);
          const updatedResults = getUpdated(response);

          self._id = updatedResults._id;
        }
      }),
    };
  })
  .views(self => {
    return {
      getNodeById: id => {
        return find(propEq("id", id), self.allNodes);
      },
      getSentTweets: id => {
        return self.allNodes.filter(({ tweetId }) => !!tweetId).length;
      },
      getTreeJson: ({ clean } = { clean: true }) => {
        let updatedJson = {};
        const iterateNodes = ({
          node: { childNode, forkNode },
          jsonObj,
          pathArr,
        }) => {
          if (forkNode && self.getNodeById(forkNode)) {
            const clonePushArr = clone(pathArr);
            clonePushArr.push("fork");
            const nodePath = lensPath(clonePushArr);
            const forkNodeJson = self.getNodeById(forkNode).toJSON();
            const jsonToUse = clean
              ? {
                  text: forkNodeJson.text,
                }
              : { ...forkNodeJson, clonePushArr };
            updatedJson = set(nodePath, jsonToUse, updatedJson);
            iterateNodes({
              node: self.getNodeById(forkNode),
              pathArr: clonePushArr,
            });
          }
          if (childNode && self.getNodeById(childNode)) {
            const clonePushArr = clone(pathArr);
            clonePushArr.push("child");
            const nodePath = lensPath(clonePushArr);
            const childNodeJson = self.getNodeById(childNode).toJSON();
            const jsonToUse = clean
              ? {
                  text: childNodeJson.text,
                }
              : { ...childNodeJson, clonePushArr };
            updatedJson = set(nodePath, jsonToUse, updatedJson);

            iterateNodes({
              node: self.getNodeById(childNode),
              pathArr: clonePushArr,
            });
          }
        };

        const parentNode = self.allNodes[0];
        if (!parentNode) {
          return {};
        }
        const jsonObj = { ...parentNode.toJSON() };
        updatedJson = { ...parentNode.toJSON() };
        iterateNodes({ node: parentNode, jsonObj, pathArr: [] });
        return updatedJson;
      },
      getTreeJsonForD3: () => {
        let updatedJson = {};
        const iterateNodes = ({
          node: { childNode, forkNode },
          jsonObj,
          pathArr,
        }) => {
          const clonePushArr = clone(pathArr);
          clonePushArr.push("children");
          if (forkNode && self.getNodeById(forkNode)) {
            let depth = 0;
            while (hasPath([...clonePushArr, depth], updatedJson)) {
              depth += 1;
            }
            const nodePath = lensPath([...clonePushArr, depth]);
            updatedJson = set(
              nodePath,
              self.getNodeById(forkNode).toJSON(),
              updatedJson
            );
            clonePushArr.push(depth);
            iterateNodes({
              node: self.getNodeById(forkNode),
              pathArr: clonePushArr,
            });
          }
          if (childNode && self.getNodeById(childNode)) {
            const clonePushArr = clone(pathArr);
            let depth = 0;
            clonePushArr.push("children");
            while (hasPath([...clonePushArr, depth], updatedJson)) {
              depth += 1;
            }
            const nodePath = lensPath([...clonePushArr, depth]);
            updatedJson = set(
              nodePath,
              self.getNodeById(childNode).toJSON(),
              updatedJson
            );

            clonePushArr.push(depth);
            iterateNodes({
              node: self.getNodeById(childNode),
              pathArr: clonePushArr,
            });
          }
        };

        const parentNode = self.allNodes[0];
        if (!parentNode) {
          return {};
        }
        const jsonObj = { ...parentNode.toJSON() };
        updatedJson = clone(parentNode);
        iterateNodes({ node: parentNode, jsonObj, pathArr: [] });
        return updatedJson;
      },
    };
  });
